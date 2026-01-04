"use strict";
/**
 * Named Query Configuration
 * (sails.config.namedQuery)
 *
 * Defines named queries for database operations.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const namedQueryConfig = {
    'listRDMPRecords': {
        collectionName: 'record',
        brandIdFieldPath: 'metaMetadata.brandId',
        resultObjectMapping: {
            oid: '<%= record.redboxOid%>',
            title: '<%= record.metadata.title %>',
            contributor_ci: '<%= record.metadata.contributor_ci.text_full_name %>',
            contributor_data_manager: '<%= record.metadata.contributor_data_manager.text_full_name %>'
        },
        mongoQuery: {
            'metaMetadata.type': 'rdmp',
            'metadata.title': null,
            'dateCreated': null
        },
        sort: [{ 'lastSaveDate': 'DESC' }],
        queryParams: {
            'title': {
                type: 'string',
                path: 'metadata.title',
                queryType: 'contains',
                whenUndefined: 'defaultValue',
                defaultValue: ''
            },
            'dateCreatedBefore': {
                type: 'string',
                path: 'dateCreated',
                queryType: '<=',
                whenUndefined: 'defaultValue',
                defaultValue: '3000-01-01T00:00:00.000Z'
            },
            'dateCreatedAfter': {
                type: 'string',
                path: 'dateCreated',
                queryType: '>=',
                whenUndefined: 'defaultValue',
                defaultValue: '1900-01-01T00:00:00.000Z'
            },
            'dateModifiedBefore': {
                type: 'string',
                path: 'lastSaveDate',
                queryType: '<=',
                whenUndefined: 'defaultValue',
                defaultValue: '3000-01-01T00:00:00.000Z'
            },
            'dateModifiedAfter': {
                type: 'string',
                path: 'lastSaveDate',
                queryType: '>=',
                whenUndefined: 'defaultValue',
                defaultValue: '1900-01-01T00:00:00.000Z'
            }
        }
    },
    'listDRRecords': {
        collectionName: 'record',
        brandIdFieldPath: 'metaMetadata.brandId',
        resultObjectMapping: {},
        mongoQuery: {
            'metaMetadata.type': 'dataRecord',
            'metadata.title': null,
            'dateCreated': null
        },
        queryParams: {
            'title': {
                type: 'string',
                path: 'metadata.title',
                queryType: 'contains',
                whenUndefined: 'defaultValue',
                defaultValue: ''
            },
            'dateCreatedBefore': {
                type: 'string',
                path: 'dateCreated',
                queryType: '<=',
                whenUndefined: 'defaultValue',
                defaultValue: '3000-01-01T00:00:00.000Z'
            },
            'dateCreatedAfter': {
                type: 'string',
                path: 'dateCreated',
                queryType: '>=',
                whenUndefined: 'defaultValue',
                defaultValue: '1900-01-01T00:00:00.000Z'
            },
            'dateModifiedBefore': {
                type: 'string',
                path: 'lastSaveDate',
                queryType: '<=',
                whenUndefined: 'defaultValue',
                defaultValue: '3000-01-01T00:00:00.000Z'
            },
            'dateModifiedAfter': {
                type: 'string',
                path: 'lastSaveDate',
                queryType: '>=',
                whenUndefined: 'defaultValue',
                defaultValue: '1900-01-01T00:00:00.000Z'
            }
        }
    },
    'listDPRecords': {
        collectionName: 'record',
        brandIdFieldPath: 'metaMetadata.brandId',
        resultObjectMapping: {},
        mongoQuery: {
            'metaMetadata.type': 'dataPublication',
            'metadata.title': null,
            'dateCreated': null
        },
        queryParams: {
            'title': {
                type: 'string',
                path: 'metadata.title',
                queryType: 'contains',
                whenUndefined: 'defaultValue',
                defaultValue: ''
            },
            'dateCreatedBefore': {
                type: 'string',
                path: 'dateCreated',
                queryType: '<=',
                whenUndefined: 'defaultValue',
                defaultValue: '3000-01-01T00:00:00.000Z'
            },
            'dateCreatedAfter': {
                type: 'string',
                path: 'dateCreated',
                queryType: '>=',
                whenUndefined: 'defaultValue',
                defaultValue: '1900-01-01T00:00:00.000Z'
            },
            'dateModifiedBefore': {
                type: 'string',
                path: 'lastSaveDate',
                queryType: '<=',
                whenUndefined: 'defaultValue',
                defaultValue: '3000-01-01T00:00:00.000Z'
            },
            'dateModifiedAfter': {
                type: 'string',
                path: 'lastSaveDate',
                queryType: '>=',
                whenUndefined: 'defaultValue',
                defaultValue: '1900-01-01T00:00:00.000Z'
            }
        }
    },
    'listEmbargoedDPRecords': {
        collectionName: 'record',
        brandIdFieldPath: 'metaMetadata.brandId',
        resultObjectMapping: {},
        mongoQuery: {
            'metaMetadata.type': 'dataPublication',
            'workflow.stage': 'embargoed',
            'metadata.title': null,
            'metadata.embargoUntil': null,
            'dateCreated': null
        },
        queryParams: {
            'title': {
                type: 'string',
                path: 'metadata.title',
                queryType: 'contains',
                whenUndefined: 'defaultValue',
                defaultValue: ''
            },
            'dateCreatedBefore': {
                type: 'string',
                path: 'dateCreated',
                queryType: '<=',
                whenUndefined: 'defaultValue',
                defaultValue: '3000-01-01T00:00:00.000Z'
            },
            'dateCreatedAfter': {
                type: 'string',
                path: 'dateCreated',
                queryType: '>=',
                whenUndefined: 'defaultValue',
                defaultValue: '1900-01-01T00:00:00.000Z'
            },
            'dateModifiedBefore': {
                type: 'string',
                path: 'lastSaveDate',
                queryType: '<=',
                whenUndefined: 'defaultValue',
                defaultValue: '3000-01-01T00:00:00.000Z'
            },
            'dateModifiedAfter': {
                type: 'string',
                path: 'lastSaveDate',
                queryType: '>=',
                whenUndefined: 'defaultValue',
                defaultValue: '1900-01-01T00:00:00.000Z'
            },
            'dateEmbargoedBefore': {
                type: 'string',
                path: 'metadata.embargoUntil',
                queryType: '<=',
                whenUndefined: 'defaultValue',
                defaultValue: '3000-01-01T00:00:00.000Z'
            },
            'dateEmbargoedAfter': {
                type: 'string',
                path: 'metadata.embargoUntil',
                queryType: '>=',
                whenUndefined: 'defaultValue',
                defaultValue: '1900-01-01T00:00:00.000Z'
            }
        }
    },
    'listWorkspaceRecords': {
        collectionName: 'record',
        brandIdFieldPath: 'metaMetadata.brandId',
        resultObjectMapping: {},
        mongoQuery: {
            'metaMetadata.packageType': 'workspace',
            'metadata.title': null,
            'dateCreated': null
        },
        queryParams: {
            'title': {
                type: 'string',
                path: 'metadata.title',
                queryType: 'contains',
                whenUndefined: 'defaultValue',
                defaultValue: ''
            },
            'dateCreatedBefore': {
                type: 'string',
                path: 'dateCreated',
                queryType: '<=',
                whenUndefined: 'defaultValue',
                defaultValue: '3000-01-01T00:00:00.000Z'
            },
            'dateCreatedAfter': {
                type: 'string',
                path: 'dateCreated',
                queryType: '>=',
                whenUndefined: 'defaultValue',
                defaultValue: '1900-01-01T00:00:00.000Z'
            },
            'dateModifiedBefore': {
                type: 'string',
                path: 'lastSaveDate',
                queryType: '<=',
                whenUndefined: 'defaultValue',
                defaultValue: '3000-01-01T00:00:00.000Z'
            },
            'dateModifiedAfter': {
                type: 'string',
                path: 'lastSaveDate',
                queryType: '>=',
                whenUndefined: 'defaultValue',
                defaultValue: '1900-01-01T00:00:00.000Z'
            }
        }
    },
    'listDraftInactiveRDMPRecords': {
        collectionName: 'record',
        brandIdFieldPath: 'metaMetadata.brandId',
        resultObjectMapping: {},
        mongoQuery: {
            'metaMetadata.type': 'rdmp',
            'workflow.stage': 'draft'
        },
        queryParams: {
            'lastSaveDateToCheck': {
                type: 'date',
                path: 'lastSaveDate',
                queryType: '<=',
                format: 'days',
                whenUndefined: 'defaultValue',
                defaultValue: '-365'
            }
        }
    },
    'listUsers': {
        collectionName: 'user',
        resultObjectMapping: {
            type: '<%= record.type %>',
            name: '<%= record.name %>',
            email: '<%= record.email %>',
            username: '<%= record.username %>',
            lastLogin: '<%= record.lastLogin %>'
        },
        mongoQuery: {},
        queryParams: {
            'dateCreatedBefore': {
                type: 'string',
                path: 'createdAt',
                queryType: '<=',
                whenUndefined: 'defaultValue',
                defaultValue: '3000-01-01T00:00:00.000Z'
            },
            'dateCreatedAfter': {
                type: 'string',
                path: 'createdAt',
                queryType: '>=',
                whenUndefined: 'defaultValue',
                defaultValue: '1900-01-01T00:00:00.000Z'
            },
            'lastLoginBefore': {
                type: 'string',
                path: 'lastLogin',
                queryType: '<=',
                whenUndefined: 'defaultValue',
                defaultValue: '3000-01-01T00:00:00.000Z'
            },
            'lastLoginAfter': {
                type: 'string',
                path: 'lastLogin',
                queryType: '>=',
                whenUndefined: 'defaultValue',
                defaultValue: '1900-01-01T00:00:00.000Z'
            },
            'userType': {
                type: 'string',
                path: 'type',
                whenUndefined: 'ignore'
            }
        }
    }
};
module.exports.namedQuery = namedQueryConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmFtZWRRdWVyeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2ludGVybmFsL3NhaWxzLXRzL2NvbmZpZy9uYW1lZFF1ZXJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7R0FLRzs7QUFJSCxNQUFNLGdCQUFnQixHQUF1QjtJQUMzQyxpQkFBaUIsRUFBRTtRQUNqQixjQUFjLEVBQUUsUUFBUTtRQUN4QixnQkFBZ0IsRUFBRSxzQkFBc0I7UUFDeEMsbUJBQW1CLEVBQUU7WUFDbkIsR0FBRyxFQUFFLHdCQUF3QjtZQUM3QixLQUFLLEVBQUUsOEJBQThCO1lBQ3JDLGNBQWMsRUFBRSxzREFBc0Q7WUFDdEUsd0JBQXdCLEVBQUUsZ0VBQWdFO1NBQzNGO1FBQ0QsVUFBVSxFQUFFO1lBQ1YsbUJBQW1CLEVBQUUsTUFBTTtZQUMzQixnQkFBZ0IsRUFBRSxJQUFJO1lBQ3RCLGFBQWEsRUFBRSxJQUFJO1NBQ3BCO1FBQ0QsSUFBSSxFQUFFLENBQUMsRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLENBQUM7UUFDbEMsV0FBVyxFQUFFO1lBQ1gsT0FBTyxFQUFFO2dCQUNQLElBQUksRUFBRSxRQUFRO2dCQUNkLElBQUksRUFBRSxnQkFBZ0I7Z0JBQ3RCLFNBQVMsRUFBRSxVQUFVO2dCQUNyQixhQUFhLEVBQUUsY0FBYztnQkFDN0IsWUFBWSxFQUFFLEVBQUU7YUFDakI7WUFDRCxtQkFBbUIsRUFBRTtnQkFDbkIsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsSUFBSSxFQUFFLGFBQWE7Z0JBQ25CLFNBQVMsRUFBRSxJQUFJO2dCQUNmLGFBQWEsRUFBRSxjQUFjO2dCQUM3QixZQUFZLEVBQUUsMEJBQTBCO2FBQ3pDO1lBQ0Qsa0JBQWtCLEVBQUU7Z0JBQ2xCLElBQUksRUFBRSxRQUFRO2dCQUNkLElBQUksRUFBRSxhQUFhO2dCQUNuQixTQUFTLEVBQUUsSUFBSTtnQkFDZixhQUFhLEVBQUUsY0FBYztnQkFDN0IsWUFBWSxFQUFFLDBCQUEwQjthQUN6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