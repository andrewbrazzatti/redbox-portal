"use strict";
/**
 * HTTP Server Settings
 * (sails.config.http)
 *
 * Configuration for the underlying HTTP server in Sails.
 * Only applies to HTTP requests (not WebSockets)
 */
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require('passport');
const redboxSessionMiddleware = require('../api/middleware/redboxSession');
const redboxSessionConfig = require('./redboxSession').redboxSession;
const existsSync = require('fs').existsSync;
const httpConfig = {
    rootContext: '',
    middleware: {
        redboxSession: redboxSessionMiddleware(redboxSessionConfig),
        passportInit: passport.initialize(),
        passportSession: passport.session(),
        brandingAndPortalAwareStaticRouter: function (req, res, next) {
            // Checks the branding and portal parameters if the resource isn't overidden for the required portal and branding,
            // it routes the request to the default location
            var url = req.url;
            var splitUrl = url.split('/');
            if (splitUrl.length > 3) {
                var branding = splitUrl[1];
                var portal = splitUrl[2];
                if (req.options.locals == null) {
                    req.options.locals = {};
                }
                if (branding != null && req.options.locals.branding == null) {
                    req.options.locals.branding = branding;
                }
                if (portal != null && req.options.locals.portal == null) {
                    req.options.locals.portal = portal;
                }
                var resourceLocation = splitUrl.slice(3, splitUrl.length).join("/");
                if (resourceLocation.lastIndexOf('?') != -1) {
                    resourceLocation = resourceLocation.substring(0, resourceLocation.lastIndexOf('?'));
                }
                var resolvedPath = null;
                var locationToTest = sails.config.appPath + "/.tmp/public/" + branding + "/" + portal + "/" + resourceLocation;
                if (existsSync(locationToTest)) {
                    resolvedPath = "/" + branding + "/" + portal + "/" + resourceLocation;
                }
                if (resolvedPath == null) {
                    locationToTest = sails.config.appPath + "/.tmp/public/default/" + portal + "/" + resourceLocation;
                    if (existsSync(locationToTest)) {
                        resolvedPath = "/default/" + portal + "/" + resourceLocation;
                    }
                }
                if (resolvedPath == null) {
                    locationToTest = sails.config.appPath + "/.tmp/public/default/default/" + resourceLocation;
                    if (existsSync(locationToTest)) {
                        resolvedPath = "/default/default/" + resourceLocation;
                    }
                }
                //We found the resource in a location so let's set the url on the request to it so that the static server can serve it
                if (resolvedPath != null) {
                    req.url = resolvedPath;
                }
            }
            next();
        },
        translate: function (req, res, next) {
            next();
        },
        order: [
            'cacheControl',
            'redirectNoCacheHeaders',
            'startRequestTimer',
            'cookieParser',
            'redboxSession',
            'passportInit',
            'passportSession',
            'myBodyParser',
            'handleBodyParserError',
            'compress',
            'methodOverride',
            'poweredBy',
            'router',
            'translate',
            'brandingAndPortalAwareStaticRouter',
            'www',
            'favicon',
            '404',
            '500'
        ],
        myBodyParser: function (req, res, next) {
            // ignore if there is '/attach/' on the url
            if (req.url.toLowerCase().includes('/attach')) {
                return next();
            }
            var skipper = require('skipper')({});
            return skipper(req, res, next);
        },
        poweredBy: function (req, res, next) {
            res.set('X-Powered-By', "QCIF");
            return next();
        },
        redirectNoCacheHeaders: function (req, res, next) {
            const originalRedirect = res.redirect;
            // Patch the redirect function so that it sets the no-cache headers
            res.redirect = function (location) {
                res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
                res.set('Pragma', 'no-cache');
                res.set('Expires', '0');
                return originalRedirect.call(this, location);
            };
            return next();
        },
        cacheControl: function (req, res, next) {
            let sessionTimeoutSeconds = (_.isUndefined(sails.config.session.cookie) || _.isUndefined(sails.config.session.cookie.maxAge) ? 31536000 : sails.config.session.cookie.maxAge / 1000);
            let cacheControlHeaderVal = null;
            let expiresHeaderVal = null;
            if (sessionTimeoutSeconds > 0) {
                let isMatch = _.find(sails.config.custom.cacheControl.noCache, ((path) => {
                    return _.endsWith(req.path, path);
                }));
                if (!_.isEmpty(isMatch)) {
                    cacheControlHeaderVal = 'no-cache, no-store';
                    expiresHeaderVal = new Date(0).toUTCString();
                }
                else {
                    cacheControlHeaderVal = 'max-age=' + sessionTimeoutSeconds + ', private';
                    const expiresMilli = new Date().getTime() + (sessionTimeoutSeconds * 1000);
                    expiresHeaderVal = new Date(expiresMilli).toUTCString();
                }
            }
            else {
                // when session expiry isn't set, defaults to one year for everything...
                cacheControlHeaderVal = 'max-age=' + 31536000 + ', private';
                expiresHeaderVal = new Date(new Date().getTime() + (31536000 * 1000)).toUTCString();
            }
            if (!_.isEmpty(cacheControlHeaderVal)) {
                res.set('Cache-Control', cacheControlHeaderVal);
            }
            if (!_.isEmpty(expiresHeaderVal)) {
                res.set('Expires', expiresHeaderVal);
            }
            res.set('Pragma', 'no-cache');
            return next();
        }
    },
};
module.exports.http = httpConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2ludGVybmFsL3NhaWxzLXRzL2NvbmZpZy9odHRwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7O0dBTUc7O0FBSUgsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3JDLE1BQU0sdUJBQXVCLEdBQUcsT0FBTyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7QUFDM0UsTUFBTSxtQkFBbUIsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxhQUFhLENBQUM7QUFDckUsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQztBQUs1QyxNQUFNLFVBQVUsR0FBZTtJQUM3QixXQUFXLEVBQUUsRUFBRTtJQUVmLFVBQVUsRUFBRTtRQUNWLGFBQWEsRUFBRSx1QkFBdUIsQ0FBQyxtQkFBbUIsQ0FBQztRQUMzRCxZQUFZLEVBQUUsUUFBUSxDQUFDLFVBQVUsRUFBRTtRQUNuQyxlQUFlLEVBQUUsUUFBUSxDQUFDLE9BQU8sRUFBRTtRQUNuQyxrQ0FBa0MsRUFBRSxVQUFVLEdBQVEsRUFBRSxHQUFRLEVBQUUsSUFBZ0I7WUFDaEYsa0hBQWtIO1lBQ2xILGdEQUFnRDtZQUNoRCxJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDO1lBQ2xCLElBQUksUUFBUSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFOUIsSUFBSSxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDO2dCQUN4QixJQUFJLFFBQVEsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDekIsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sSUFBSSxJQUFJLEVBQUUsQ0FBQztvQkFDL0IsR0FBRyxDQUFD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