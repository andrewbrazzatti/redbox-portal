import { ActionConfig } from '@researchdatabox/redbox-core-types';

const actionConfig: ActionConfig = {
  // Here you can configure your own custom actions, for hooks, etc.
  // Follow the sample convention below:
  // publishToCKAN: {service: "sails.services.ckanservice", method: "publishToCKAN" }
};

module.exports.action = actionConfig;
