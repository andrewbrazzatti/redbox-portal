/**
 * Default model configuration
 * (sails.config.models)
 *
 * Unless you override them, the following properties will be included
 * in each of your models.
 */

interface ModelsConfig {
  connection: string | null;
  migrate: string;
  fetchRecordsOnUpdate: boolean;
  fetchRecordsOnCreate: boolean;
  fetchRecordsOnCreateEach: boolean;
  datastore: string;
  attributes: {
    createdAt: { type: string; autoCreatedAt: boolean };
    updatedAt: { type: string; autoUpdatedAt: boolean };
    id: { type: string; columnName: string };
  };
}

const modelsConfig: ModelsConfig = {
  connection: null,
  migrate: 'safe',
  fetchRecordsOnUpdate: true,
  fetchRecordsOnCreate: true,
  fetchRecordsOnCreateEach: true,
  datastore: 'mongodb',
  attributes: {
    createdAt: { type: 'string', autoCreatedAt: true },
    updatedAt: { type: 'string', autoUpdatedAt: true },
    id: { type: 'string', columnName: '_id' }
  }
};

module.exports.models = modelsConfig;
