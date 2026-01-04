/**
 * Autoreload configuration
 * (sails.config.autoreload)
 *
 * For development only - automatically restarts the server when files change
 */

interface AutoreloadConfig {
  active?: boolean;
  usePolling?: boolean;
  dirs?: string[];
  ignored?: string[];
}

const autoreloadConfig: AutoreloadConfig = {};

module.exports.autoreload = autoreloadConfig;
