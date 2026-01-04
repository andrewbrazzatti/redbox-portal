/**
 * Cross-Origin Resource Sharing (CORS) Settings
 * (sails.config.cors)
 *
 * CORS is like a more modern version of JSONP-- it allows your server/API
 * to successfully respond to requests from client-side JavaScript code
 * running on some other domain (e.g. google.com)
 * Unlike JSONP, it works with POST, PUT, and DELETE requests
 *
 * For more information on CORS, check out:
 * http://en.wikipedia.org/wiki/Cross-origin_resource_sharing
 */

interface CorsConfig {
  allRoutes?: boolean;
  origin?: string;
  credentials?: boolean;
  methods?: string;
  headers?: string;
}

const corsConfig: CorsConfig = {
  // allRoutes: false,
  // origin: '*',
  // credentials: true,
  // methods: 'GET, POST, PUT, DELETE, OPTIONS, HEAD',
  // headers: 'content-type'
};

module.exports.cors = corsConfig;
