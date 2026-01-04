/**
 * Blueprints configuration
 * (sails.config.blueprints)
 *
 * These settings are for the global configuration of blueprint API methods.
 * You may also override blueprint settings on a per-controller basis by defining a '_config' key in your controller.
 */

interface BlueprintsConfig {
  actions?: boolean;
  rest?: boolean;
  shortcuts?: boolean;
  prefix?: string;
  restPrefix?: string;
  pluralize?: boolean;
  populate?: boolean;
  autoWatch?: boolean;
}

const blueprintsConfig: BlueprintsConfig = {};

module.exports.blueprints = blueprintsConfig;
