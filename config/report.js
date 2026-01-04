"use strict";
/**
 * Report Configuration
 * (sails.config.reports)
 *
 * Defines reports configuration with filters and columns.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const reportsConfig = {
    "rdmpRecords": {
        "title": "List RDMP records",
        "reportSource": "database",
        "databaseQuery": {
            queryName: "listRDMPRecords"
        },
        "filter": [
            {
                "paramName": "dateObjectModifiedRange",
                "type": "date-range",
                "message": "Filter by date modified",
                "database": {
                    "fromProperty": "dateModifiedAfter",
                    "toProperty": "dateModifiedBefore",
                }
            },
            {
                "paramName": "dateObjectCreatedRange",
                "type": "date-range",
                "message": "Filter by date created",
                "database": {
                    "fromProperty": "dateCreatedAfter",
                    "toProperty": "dateCreatedBefore",
                }
            },
            {
                "paramName": "title",
                "type": "text",
                "property": "title",
                "message": "Filter by title"
            }
        ],
        "columns": [
            { "label": "Id", "property": "oid", "hide": true },
            {
                "label": "Title",
                "property": "title",
                "template": "<a href='{{optTemplateData.brandingAndPortalUrl}}/record/view/{{oid}}'>{{title}}</a>",
                "exportTemplate": "{{title}}"
            },
            {
                "label": "External URL",
                "property": "reportExternalURL",
                "exportTemplate": "{{optTemplateData.brandingAndPortalUrl}}/record/view/{{oid}}",
                "hide": true
            },
            { "label": "Date Modified", "property": "lastSaveDate", "template": "{{formatDate lastSaveDate \"dd/MM/yyyy hh:mm a\"}}" },
            { "label": "Date Created", "property": "dateCreated", "template": "{{formatDate dateCreated \"dd/MM/yyyy hh:mm a\"}}" },
            { "label": "Chief Investigator", "property": "metadata.contributor_ci.text_full_name", "template": "{{get this \"metadata.contributor_ci.text_full_name\"}}" },
            { "label": "Data Manager", "property": "metadata.contributor_data_manager.text_full_name", "template": "{{get this \"metadata.contributor_data_manager.text_full_name\"}}" }
        ]
    },
    "dataRecords": {
        "title": "List archival data records",
        "reportSource": "database",
        "databaseQuery": {
            queryName: "listDRRecords"
        },
        "filter": [
            {
                "paramName": "dateObjectModifiedRange",
                "type": "date-range",
                "message": "Filter by date modified",
                "database": {
                    "fromProperty": "dateModifiedAfter",
                    "toProperty": "dateModifiedBefore",
                }
            },
            {
                "paramName": "dateObjectCreatedRange",
                "type": "date-range",
                "message": "Filter by date created",
                "database": {
                    "fromProperty": "dateCreatedAfter",
                    "toProperty": "dateCreatedBefore",
                }
            },
            {
                "paramName": "title",
                "type": "text",
                "property": "title",
                "message": "Filter by title"
            }
        ],
        "columns": [
            { "label": "Id", "property": "oid", "hide": true },
            {
                "label": "Title",
                "property": "title",
                "template": "<a href='{{optTemplateData.brandingAndPortalUrl}}/record/view/{{oid}}'>{{title}}</a>",
                "exportTemplate": "{{title}}"
            },
            {
                "label": "External URL",
                "property": "reportExternalURL",
                "exportTemplate": "{{optTemplateData.brandingAndPortalUrl}}/record/view/{{oid}}",
                "hide": true
            },
            { "label": "Date Modified", "property": "lastSaveDate", "template": "{{formatDate lastSaveDate \"dd/MM/yyyy hh:mm a\"}}" },
            { "label": "Date Created", "property": "dateCreated", "template": "{{formatDate dateCreated \"dd/MM/yyyy hh:mm a\"}}" },
            { "label": "Chief Investigator", "property": "metadata.contributor_ci.text_full_name", "template": "{{get this \"metadata.contributor_ci.text_full_name\"}}" },
            { "label": "Data Manager", "property": "metadata.contributor_data_manager.text_full_name", "template": "{{get this \"metadata.contributor_data_manager.text_full_name\"}}" }
        ]
    },
    "dataPublications": {
        "title": "List data publication records",
        "reportSource": "database",
        "databaseQuery": {
            queryName: "listDPRecords"
        },
        "filter": [
            {
                "paramName": "dateObjectModifiedRange",
                "type": "date-range",
                "message": "Filter by date modified",
                "database": {
                    "fromProperty": "dateModifiedAfter",
                    "toProperty": "dateModifiedBefore",
                }
            },
            {
                "paramName": "dateObjectCreatedRange",
                "type": "date-range",
                "message": "Filter by date created",
                "database": {
                    "fromProperty": "dateCreatedAfter",
                    "toProperty": "dateCreatedBefore",
                }
            },
            {
                "paramName": "title",
                "type": "text",
                "property": "title",
                "message": "Filter by title"
            }
        ],
        "columns": [
            { "label": "Id", "property": "oid", "hide": true },
            {
                "label": "Title",
                "property": "title",
                "template": "<a href='{{optTemplateData.brandingAndPortalUrl}}/record/view/{{oid}}'>{{title}}</a>",
                "exportTemplate": "{{title}}"
            },
            {
                "label": "External URL",
                "property": "reportExternalURL",
                "exportTemplate": "{{optTemplateData.brandingAndPortalUrl}}/record/view/{{oid}}",
                "hide": true
            },
            { "label": "Date Modified", "property": "lastSaveDate", "template": "{{formatDate lastSaveDate \"dd/MM/yyyy hh:mm a\"}}" },
            { "label": "Date Created", "property": "dateCreated", "template": "{{formatDate dateCreated \"dd/MM/yyyy hh:mm a\"}}" },
            { "label": "Chief Investigator", "property": "metadata.contributor_ci.text_full_name", "template": "{{get this \"metadata.contributor_ci.text_full_name\"}}" },
            { "label": "Data Manager", "property": "metadata.contributor_data_manager.text_full_name", "template": "{{get this \"metadata.contributor_data_manager.text_full_name\"}}" }
        ]
    },
    "embargoedDataPublications": {
        "title": "List embargoed data publication records",
        "reportSource": "database",
        "databaseQuery": {
            queryName: "listEmbargoedDPRecords"
        },
        "filter": [
            {
                "paramName": "dateEmbargoedRange",
                "type": "date-range",
                "message": "Filter by date embargoed",
                "database": {
                    "fromProperty": "dateEmbargoedAfter",
                    "toProperty": "dateEmbargoedBefore",
                }
            },
            {
                "paramName": "dateObjectModifiedRange",
                "type": "date-range",
                "message": "Filter by date modified",
                "database": {
                    "fromProperty": "dateModifiedAfter",
                    "toProperty": "dateModifiedBefore",
                }
            },
            {
                "paramName": "dateObjectCreatedRange",
                "type": "date-range",
                "message": "Filter by date created",
                "database": {
                    "fromProperty": "dateCreatedAfter",
                    "toProperty": "dateCreatedBefore",
                }
            },
            {
                "paramName": "title",
                "type": "text",
                "property": "title",
                "message": "Filter by title"
            }
        ],
        "columns": [
            { "label": "Id", "property": "oid", "hide": true },
            {
                "label": "Title",
                "property": "title",
                "template": "<a href='{{optTemplateData.brandingAndPortalUrl}}/record/view/{{oid}}'>{{title}}</a>",
                "exportTemplate": "{{title}}"
            },
            {
                "label": "External URL",
                "property": "reportExternalURL",
                "exportTemplate": "{{optTemplateData.brandingAndPortalUrl}}/record/view/{{oid}}",
                "hide": true
            },
            { "label": "Date Modified", "property": "lastSaveDate", "template": "{{formatDate lastSaveDate \"dd/MM/yyyy hh:mm a\"}}" },
            { "label": "Embargoed Until", "property": "metadata.embargoUntil", "template": "{{formatDate (get this \"metadata.embargoUntil\") \"dd/MM/yyyy\"}}" },
            { "label": "Chief Investigator", "property": "metadata.contributor_ci.text_full_name", "template": "{{get this \"metadata.contributor_ci.text_full_name\"}}" },
            { "label": "Data Manager", "property": "metadata.contributor_data_manager.text_full_name", "template": "{{get this \"metadata.contributor_data_manager.text_full_name\"}}" }
        ]
    },
    "workspaces": {
        "title": "List workspace records",
        "reportSource": "database",
        "databaseQuery": {
            queryName: "listWorkspaceRecords"
        },
        "filter": [
            {
                "paramName": "dateObjectModifiedRange",
                "type": "date-range",
                "message": "Filter by date modified",
                "database": {
                    "fromProperty": "dateModifiedAfter",
                    "toProperty": "dateModifiedBefore",
                }
            },
            {
                "paramName": "dateObjectCreatedRange",
                "type": "date-range",
                "message": "Filter by date created",
                "database": {
                    "fromProperty": "dateCreatedAfter",
                    "toProperty": "dateCreatedBefore",
                }
            },
            {
                "paramName": "title",
                "type": "text",
                "property": "title",
                "message": "Filter by title"
            }
        ],
        "columns": [
            { "label": "Id", "property": "oid", "hide": true },
            {
                "label": "Title",
                "property": "title",
                "template": "<a href='{{optTemplateData.brandingAndPortalUrl}}/record/view/{{oid}}'>{{title}}</a>",
                "exportTemplate": "{{title}}"
            },
            {
                "label": "External URL",
                "property": "reportExternalURL",
                "exportTemplate": "{{optTemplateData.brandingAndPortalUrl}}/record/view/{{oid}}",
                "hide": true
            },
            { "label": "Date Modified", "property": "lastSaveDate", "template": "{{formatDate lastSaveDate \"dd/MM/yyyy hh:mm a\"}}" },
            { "label": "Date Created", "property": "dateCreated", "template": "{{formatDate dateCreated \"dd/MM/yyyy hh:mm a\"}}" },
            { "label": "Chief Investigator", "property": "metadata.contributor_ci.text_full_name", "template": "{{get this \"metadata.contributor_ci.text_full_name\"}}" },
            { "label": "Data Manager", "property": "metadata.contributor_data_manager.text_full_name", "template": "{{get this \"metadata.contributor_data_manager.text_full_name\"}}" }
        ]
    },
    "user": {
        "title": "List users",
        "reportSource": "database",
        "databaseQuery": {
            queryName: "listUsers"
        },
        "filter": [
            {
                "paramName": "dateObjectModifiedRange",
                "type": "date-range",
                "message": "Filter by last login date",
                "database": {
                    "fromProperty": "lastLoginAfter",
                    "toProperty": "lastLoginBefore",
                }
            },
            {
                "paramName": "dateObjectCreatedRange",
                "type": "date-range",
                "message": "Filter by date created",
                "database": {
                    "fromProperty": "dateCreatedAfter",
                    "toProperty": "dateCreatedBefore",
                }
            },
            {
                "paramName": "userType",
                "type": "text",
                "property": "userType",
                "message": "Filter by user type"
            }
        ],
        "columns": [
            { "label": "Name", "property": "name", "template": "{{get this \"metadata.name\"}}" },
            { "label": "Email", "property": "oid", "template": "{{get this \"metadata.email\"}}" },
            { "label": "Username", "property": "title", "template": "{{get this \"metadata.username\"}}" },
            { "label": "User Type", "property": "userType", "template": "{{get this \"metadata.type\"}}" },
            { "label": "Date Last Login", "property": "lastLogin", "template": "{{formatDate (get this \"metadata.lastLogin\") \"dd/MM/yyyy hh:mm a\"}}" },
            { "label": "Date Created", "property": "dateCreated", "template": "{{formatDate dateCreated \"dd/MM/yyyy hh:mm a\"}}" }
        ]
    }
};
module.exports.reports = reportsConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vaW50ZXJuYWwvc2FpbHMtdHMvY29uZmlnL3JlcG9ydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7O0dBS0c7O0FBSUgsTUFBTSxhQUFhLEdBQWtCO0lBQ25DLGFBQWEsRUFBRTtRQUNiLE9BQU8sRUFBRSxtQkFBbUI7UUFDNUIsY0FBYyxFQUFFLFVBQVU7UUFDMUIsZUFBZSxFQUFFO1lBQ2YsU0FBUyxFQUFFLGlCQUFpQjtTQUM3QjtRQUNELFFBQVEsRUFBRTtZQUNSO2dCQUNFLFdBQVcsRUFBRSx5QkFBeUI7Z0JBQ3RDLE1BQU0sRUFBRSxZQUFZO2dCQUNwQixTQUFTLEVBQUUseUJBQXlCO2dCQUNwQyxVQUFVLEVBQUU7b0JBQ1YsY0FBYyxFQUFFLG1CQUFtQjtvQkFDbkMsWUFBWSxFQUFFLG9CQUFvQjtpQkFDbkM7YUFDRjtZQUNEO2dCQUNFLFdBQVcsRUFBRSx3QkFBd0I7Z0JBQ3JDLE1BQU0sRUFBRSxZQUFZO2dCQUNwQixTQUFTLEVBQUUsd0JBQXdCO2dCQUNuQyxVQUFVLEVBQUU7b0JBQ1YsY0FBYyxFQUFFLGtCQUFrQjtvQkFDbEMsWUFBWSxFQUFFLG1CQUFtQjtpQkFDbEM7YUFDRjtZQUNEO2dCQUNFLFdBQVcsRUFBRSxPQUFPO2dCQUNwQixNQUFNLEVBQUUsTUFBTTtnQkFDZCxVQUFVLEVBQUUsT0FBTztnQkFDbkIsU0FBUyxFQUFFLGlCQUFpQjthQUM3QjtTQUNGO1FBQ0QsU0FBUyxFQUFFO1lBQ1QsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtZQUNsRDtnQkFDRSxPQUFPLEVBQUUsT0FBTztnQkFDaEIsVUFBVSxFQUFFLE9BQU87Z0JBQ25CLFVBQVUsRUFBRSxzRkFBc0Y7Z0JBQ2xHLGdCQUFnQixFQUFFLFdBQVc7YUFDOUI7WUFDRDtnQkFDRSxPQUFPLEVBQUUsY0FBYztnQkFD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