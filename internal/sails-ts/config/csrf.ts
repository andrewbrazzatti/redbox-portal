/**
 * Cross-Site Request Forgery Protection Settings
 * (sails.config.csrf)
 *
 * CSRF tokens are like a tracking chip. While a session tells the server that a user
 * "is who they say they are", a csrf token tells the server "you are where you say you are".
 */

interface SecurityConfig {
  csrf: boolean;
}

const securityConfig: SecurityConfig = {
  csrf: true
};

module.exports.security = securityConfig;
