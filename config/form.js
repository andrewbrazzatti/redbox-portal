"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
const formConfig = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2ludGVybmFsL3NhaWxzLXRzL2NvbmZpZy9mb3JtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBS0EsNkJBQTZCO0FBQzdCLE1BQU0sQ0FBQyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUM1QixhQUFhO0FBQ2IsTUFBTSxjQUFjLEdBQUcsT0FBTyxDQUFDLHdDQUF3QyxDQUFDLENBQUM7QUFDekUsYUFBYTtBQUNiLE1BQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO0FBQ2hFLGFBQWE7QUFDYixNQUFNLG1CQUFtQixHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLDZDQUE2QyxDQUFDLENBQUMsQ0FBQztBQUNoRyxhQUFhO0FBQ2IsTUFBTSw0QkFBNEIsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxpREFBaUQsQ0FBQyxDQUFDLENBQUM7QUFDN0csYUFBYTtBQUNiLE1BQU0sNEJBQTRCLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsaURBQWlELENBQUMsQ0FBQyxDQUFDO0FBQzdHLGFBQWE7QUFDYixNQUFNLHlCQUF5QixHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLDhDQUE4QyxDQUFDLENBQUMsQ0FBQztBQUN2RyxhQUFhO0FBQ2IsTUFBTSwwQkFBMEIsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQywrQ0FBK0MsQ0FBQyxDQUFDLENBQUM7QUFDekcsYUFBYTtBQUNiLE1BQU0sOEJBQThCLEdBQUcsT0FBTyxDQUFDLDBEQUEwRCxDQUFDLENBQUM7QUFFM0csTUFBTSxVQUFVLEdBQWU7SUFDN0IsV0FBVyxFQUFFLG1CQUFtQjtJQUNoQyxLQUFLLEVBQUU7UUFDTCxtQkFBbUIsRUFBRSxRQUFRO1FBQzdCLHNCQUFzQixFQUFFLGNBQWM7UUFDdEMsMkJBQTJCLEVBQUUsbUJBQW1CO1FBQ2hELCtCQUErQixFQUFFLDRCQUE0QjtRQUM3RCwrQkFBK0IsRUFBRSw0QkFBNEI7UUFDN0QsNEJBQTRCLEVBQUUseUJBQXlCO1FBQ3ZELDZCQUE2QixFQUFFLDBCQUEwQjtRQUN6RCw4QkFBOEIsRUFBRSw4QkFBOEI7S0FDL0Q7Q0FDRixDQUFDO0FBRUYsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDIn0=