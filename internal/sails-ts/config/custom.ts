/**
 * Custom configuration settings
 */

interface CustomConfig {
  cacheControl: {
    noCache: string[];
  };
}

const customConfig: CustomConfig = {
  cacheControl: {
    noCache: [
      'csrfToken',
      'dynamic/apiClientConfig',
      'login',
      'begin_oidc',
      'login_oidc',
      'logout'
    ]
  },
};

module.exports.custom = customConfig;
