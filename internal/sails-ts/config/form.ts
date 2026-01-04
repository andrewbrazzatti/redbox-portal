/**
 * Form related configuration
 */
import { FormConfig } from '@researchdatabox/redbox-core-types';

// Import form configurations
const _ = require('lodash');
// @ts-ignore
const dataRecordForm = require('../form-config/dataRecord-1.0-draft.js');
// @ts-ignore
const rdmpForm = require('../form-config/default-1.0-draft.js');
// @ts-ignore
const dataPublicationForm = _.cloneDeep(require('../form-config/dataPublication-1.0-draft.js'));
// @ts-ignore
const dataPublicationEmbargoedForm = _.cloneDeep(require('../form-config/dataPublication-1.0-embargoed.js'));
// @ts-ignore
const dataPublicationPublishedForm = _.cloneDeep(require('../form-config/dataPublication-1.0-published.js'));
// @ts-ignore
const dataPublicationQueuedForm = _.cloneDeep(require('../form-config/dataPublication-1.0-queued.js'));
// @ts-ignore
const dataPublicationRetiredForm = _.cloneDeep(require('../form-config/dataPublication-1.0-retired.js'));
// @ts-ignore
const existingLocationsWorkspaceForm = require('../form-config/existing-locations-workspace-1.0-draft.js');

const formConfig: FormConfig = {
  defaultForm: "default-1.0-draft",
  forms: {
    "default-1.0-draft": rdmpForm,
    "dataRecord-1.0-draft": dataRecordForm,
    "dataPublication-1.0-draft": dataPublicationForm,
    "dataPublication-1.0-embargoed": dataPublicationEmbargoedForm,
    "dataPublication-1.0-published": dataPublicationPublishedForm,
    "dataPublication-1.0-queued": dataPublicationQueuedForm,
    "dataPublication-1.0-retired": dataPublicationRetiredForm,
    "existing-locations-1.0-draft": existingLocationsWorkspaceForm
  }
};

module.exports.form = formConfig;
