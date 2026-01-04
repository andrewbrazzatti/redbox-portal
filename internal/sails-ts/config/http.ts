/**
 * HTTP Server Settings
 * (sails.config.http)
 *
 * Configuration for the underlying HTTP server in Sails.
 * Only applies to HTTP requests (not WebSockets)
 */

import { HttpConfig } from '@researchdatabox/redbox-core-types';

const passport = require('passport');
const redboxSessionMiddleware = require('../api/middleware/redboxSession');
const redboxSessionConfig = require('./redboxSession').redboxSession;
const existsSync = require('fs').existsSync;

declare var sails: any;
declare var _: any;

const httpConfig: HttpConfig = {
  rootContext: '',

  middleware: {
    redboxSession: redboxSessionMiddleware(redboxSessionConfig),
    passportInit: passport.initialize(),
    passportSession: passport.session(),
    brandingAndPortalAwareStaticRouter: function (req: any, res: any, next: () => void) {
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
        var resolvedPath: string | null = null;
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
    translate: function (req: any, res: any, next: () => void) {
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

    myBodyParser: function (req: any, res: any, next: () => void) {
      // ignore if there is '/attach/' on the url
      if (req.url.toLowerCase().includes('/attach')) {
        return next();
      }
      var skipper = require('skipper')({});
      return skipper(req, res, next);
    },

    poweredBy: function (req: any, res: any, next: () => void) {
      res.set('X-Powered-By', "QCIF");
      return next();
    },

    redirectNoCacheHeaders: function (req: any, res: any, next: () => void) {
      const originalRedirect = res.redirect;

      // Patch the redirect function so that it sets the no-cache headers
      res.redirect = function (location: string) {
        res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.set('Pragma', 'no-cache');
        res.set('Expires', '0');
        return originalRedirect.call(this, location);
      };

      return next();
    },

    cacheControl: function (req: any, res: any, next: () => void) {
      let sessionTimeoutSeconds = (_.isUndefined(sails.config.session.cookie) || _.isUndefined(sails.config.session.cookie.maxAge) ? 31536000 : sails.config.session.cookie.maxAge / 1000);
      let cacheControlHeaderVal: string | null = null;
      let expiresHeaderVal: string | null = null;
      if (sessionTimeoutSeconds > 0) {
        let isMatch = _.find(sails.config.custom.cacheControl.noCache, ((path: string) => {
          return _.endsWith(req.path, path);
        }));
        if (!_.isEmpty(isMatch)) {
          cacheControlHeaderVal = 'no-cache, no-store';
          expiresHeaderVal = new Date(0).toUTCString();
        } else {
          cacheControlHeaderVal = 'max-age=' + sessionTimeoutSeconds + ', private';
          const expiresMilli = new Date().getTime() + (sessionTimeoutSeconds * 1000);
          expiresHeaderVal = new Date(expiresMilli).toUTCString();
        }
      } else {
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
