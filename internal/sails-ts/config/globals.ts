/**
 * Globals Configuration
 * THIS FILE WAS ADDED AUTOMATICALLY by the Sails 1.0 app migration tool.
 */

const _ = require('lodash');
const async = require('async');

interface GlobalsConfig {
  _: typeof _;
  async: typeof async;
  models: boolean;
  sails: boolean;
}

const globalsConfig: GlobalsConfig = {
  _: _,
  async: async,
  models: true,
  sails: true
};

module.exports.globals = globalsConfig;
