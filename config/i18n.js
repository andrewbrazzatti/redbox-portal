"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const i18nConfig = {
    // locales: ['en', 'es', 'fr', 'de'],
    // defaultLocale: 'en',
    // updateFiles: false,
    // localesDirectory: '/config/locales'
    // i18next specific config, 'backend.loadPath' is intentionally not included as this configuration is shared with angular-i18next
    next: {
        init: {
            supportedLngs: ['en'],
            // preload is required in the server-side
            preload: ['en'],
            debug: true,
            fallbackLng: 'en',
            lowerCaseLng: true,
            initImmediate: false,
            skipOnVariables: false,
            returnEmptyString: false,
            ns: [
                'translation'
            ],
            detection: {
                // order and from where user language should be detected
                order: ['cookie'],
                // keys or params to lookup language from
                lookupCookie: 'lng',
                // cache user language on
                caches: ['cookie'],
                // optional expire and domain for set cookie
                cookieMinutes: 10080, // 7 days
                // cookieDomain: I18NEXT_LANG_COOKIE_DOMAIN
                lookupSession: 'lang',
                // lookupQuerystring: 'lng'
            }
        }
    }
};
module.exports.i18n = i18nConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaTE4bi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2ludGVybmFsL3NhaWxzLXRzL2NvbmZpZy9pMThuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsTUFBTSxVQUFVLEdBQWU7SUFDN0IscUNBQXFDO0lBQ3JDLHVCQUF1QjtJQUN2QixzQkFBc0I7SUFDdEIsc0NBQXNDO0lBRXRDLGlJQUFpSTtJQUNqSSxJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUU7WUFDSixhQUFhLEVBQUUsQ0FBQyxJQUFJLENBQUM7WUFDckIseUNBQXlDO1lBQ3pDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQztZQUNmLEtBQUssRUFBRSxJQUFJO1lBQ1gsV0FBVyxFQUFFLElBQUk7WUFDakIsWUFBWSxFQUFFLElBQUk7WUFDbEIsYUFBYSxFQUFFLEtBQUs7WUFDcEIsZUFBZSxFQUFFLEtBQUs7WUFDdEIsaUJBQWlCLEVBQUUsS0FBSztZQUN4QixFQUFFLEVBQUU7Z0JBQ0YsYUFBYTthQUNkO1lBQ0QsU0FBUyxFQUFFO2dCQUNULHdEQUF3RDtnQkFDeEQsS0FBSyxFQUFFLENBQUMsUUFBUSxDQUFDO2dCQUNqQix5Q0FBeUM7Z0JBQ3pDLFlBQVksRUFBRSxLQUFLO2dCQUNuQix5QkFBeUI7Z0JBQ3pCLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQztnQkFDbEIsNENBQTRDO2dCQUM1QyxhQUFhLEVBQUUsS0FBSyxFQUFFLFNBQVM7Z0JBQy9CLDJDQUEyQztnQkFDM0MsYUFBYSxFQUFFLE1BQU07Z0JBQ3JCLDJCQUEyQjthQUM1QjtTQUNGO0tBQ0Y7Q0FDRixDQUFDO0FBRUYsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDIn0=