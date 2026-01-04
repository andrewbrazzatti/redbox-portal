/**
 * Datastores configuration
 * THIS FILE WAS ADDED AUTOMATICALLY by the Sails 1.0 app migration tool.
 */

const sailsMongo = require('sails-mongo');

interface DatastoreConfig {
  adapter: any;
  url: string;
}

interface DatastoresConfig {
  mongodb: DatastoreConfig;
  redboxStorage: DatastoreConfig;
}

const datastoresConfig: DatastoresConfig = {
  mongodb: {
    adapter: sailsMongo,
    url: 'mongodb://localhost:27017/redbox-portal'
  },
  redboxStorage: {
    adapter: sailsMongo,
    url: 'mongodb://mongodb:27017/redbox-storage'
  }
};

module.exports.datastores = datastoresConfig;
