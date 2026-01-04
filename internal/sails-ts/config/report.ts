/**
 * Report Configuration
 * (sails.config.reports)
 *
 * Defines reports configuration with filters and columns.
 */

import { ReportsConfig } from '@researchdatabox/redbox-core-types';

const reportsConfig: ReportsConfig = {
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
