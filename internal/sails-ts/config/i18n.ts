import { I18nConfig } from '@researchdatabox/redbox-core-types';

const i18nConfig: I18nConfig = {
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
