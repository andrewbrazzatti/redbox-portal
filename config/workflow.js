"use strict";
/**
 * Workflow Configuration
 * (sails.config.workflow)
 *
 * Defines workflow stages for each record type.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const workflowConfig = {
    "rdmp": {
        "draft": {
            config: {
                workflow: {
                    stage: 'draft',
                    stageLabel: 'Draft',
                },
                authorization: {
                    viewRoles: ['Admin', 'Librarians'],
                    editRoles: ['Admin', 'Librarians']
                },
                form: 'default-1.0-draft'
            },
            starting: true
        }
    },
    "dataRecord": {
        "draft": {
            config: {
                workflow: {
                    stage: 'draft',
                    stageLabel: 'Draft',
                },
                authorization: {
                    viewRoles: ['Admin', 'Librarians'],
                    editRoles: ['Admin', 'Librarians']
                },
                form: 'dataRecord-1.0-draft'
            },
            starting: true
        }
    },
    "dataPublication": {
        "draft": {
            config: {
                workflow: {
                    stage: 'draft',
                    stageLabel: 'Draft',
                },
                authorization: {
                    viewRoles: ['Admin', 'Librarians'],
                    editRoles: ['Admin', 'Librarians']
                },
                form: 'dataPublication-1.0-draft',
                displayIndex: 1
            },
            starting: true
        },
        "queued": {
            config: {
                workflow: {
                    stage: 'queued',
                    stageLabel: 'Queued For Review',
                },
                authorization: {
                    viewRoles: ['Admin', 'Librarians'],
                    editRoles: ['Admin', 'Librarians']
                },
                form: 'dataPublication-1.0-queued',
                displayIndex: 2
            }
        },
        "embargoed": {
            config: {
                workflow: {
                    stage: 'embargoed',
                    stageLabel: 'Embargoed',
                },
                authorization: {
                    viewRoles: ['Admin', 'Librarians'],
                    editRoles: ['Admin', 'Librarians']
                },
                form: 'dataPublication-1.0-embargoed',
                displayIndex: 3
            }
        },
        "published": {
            config: {
                workflow: {
                    stage: 'published',
                    stageLabel: 'Published',
                },
                authorization: {
                    viewRoles: ['Admin', 'Librarians'],
                    editRoles: ['Admin']
                },
                form: 'dataPublication-1.0-published',
                displayIndex: 6
            }
        },
        "retired": {
            config: {
                workflow: {
                    stage: 'retired',
                    stageLabel: 'Retired',
                },
                authorization: {
                    viewRoles: ['Admin', 'Librarians'],
                    editRoles: ['Admin']
                },
                form: 'dataPublication-1.0-retired',
                displayIndex: 7
            }
        }
    },
    "existing-locations": {
        "existing-locations-draft": {
            config: {
                workflow: {
                    stage: 'existing-locations-draft',
                    stageLabel: 'Draft',
                },
                authorization: {
                    viewRoles: ['Admin', 'Librarians'],
                    editRoles: ['Admin', 'Librarians']
                },
                form: 'existing-locations-1.0-draft',
                dashboard: {
                    table: {
                        rowConfig: [
                            {
                                title: '@workspace-name',
                                variable: 'metadata.title',
                                template: "{{metadata.title}}",
                                initialSort: 'desc'
                            },
                            {
                                title: '@workspace-type',
                                variable: 'metadata.storage_type',
                                template: "{{metadata.storage_type}}"
                            },
                            {
                                title: '@related-rdmp-title',
                                variable: 'metadata.rdmpOid',
                                template: "<a href='{{rootContext}}/{{branding}}/{{portal}}/record/view/{{metadata.rdmpOid}}'>{{metadata.rdmpTitle}}</a>"
                            }
                        ]
                    }
                }
            },
            starting: true
        }
    },
    "consolidated": {
        "consolidated": {
            config: {
                workflow: {
                    stage: 'consolidated',
                    stageLabel: 'Consolidated',
                },
                authorization: {
                    viewRoles: ['Admin', 'Librarians'],
                    editRoles: ['Admin', 'Librarians']
                },
                form: 'default-1.0-draft',
                baseRecordType: 'rdmp',
                dashboard: {
                    table: {
                        rowConfig: [
                            {
                                title: 'header-record-type',
                                variable: 'metaMetadata.type',
                                template: '{{metaMetadata.type}}',
                            },
                            {
                                title: 'Record Title',
                                variable: 'metadata.title',
                                template: `<a href='{{rootContext}}/{{branding}}/{{portal}}/record/view/{{oid}}'>{{metadata.title}}</a>
                            <span class="dashboard-controls">
                              {{#if hasEditAccess}}
                                <a href='{{rootContext}}/{{branding}}/{{portal}}/record/edit/{{oid}}' aria-label='{{t "edit-link-label"}}'><i class="fa fa-pencil" aria-hidden="true"></i></a>
                              {{/if}}
                            </span>
                          `
                            },
                            {
                                title: 'header-ci',
                                variable: 'metadata.contributor_ci.text_full_name',
                                template: '{{#if metadata.contributor_ci}}{{metadata.contributor_ci.text_full_name}}{{/if}}',
                            },
                            {
                                title: 'header-created',
                                variable: 'metaMetadata.createdOn',
                                template: '{{dateCreated}}',
                            },
                            {
                                title: 'header-modified',
                                variable: 'metaMetadata.lastSaveDate',
                                template: '{{dateModified}}'
                            },
                            {
                                title: 'Actions',
                                variable: '',
                                template: `{{evaluateRowLevelRules rulesConfig metadata metaMetadata workflow oid "dashboardActionsPerRow"}}`
                            }
                        ],
                        formatRules: {
                            filterBy: { filterBase: 'user', filterBaseFieldOrValue: 'user.email', filterField: 'metadata.contributor_ci.email', filterMode: 'equal' },
                            sortBy: '',
                            groupBy: 'groupedByRecordType',
                            sortGroupBy: [
                                { rowLevel: 0, compareFieldValue: 'rdmp' },
                                { rowLevel: 1, compareFieldValue: 'dataRecord' },
                                { rowLevel: 2, compareFieldValue: 'dataPublication' }
                            ]
                        },
                        rowRulesConfig: [
                            {
                                ruleSetName: 'dashboardActionsPerRow',
                                applyRuleSet: true,
                                type: 'multi-item-rendering',
                                separator: ' | ',
                                rules: [
                                    {
                                        name: 'Edit',
                                        action: 'show',
                                        renderItemTemplate: `<a href='{{rootContext}}/{{branding}}/{{portal}}/record/edit/{{oid}}'>{{name}}</a>`,
                                        evaluateRulesTemplate: `{{eq (get workflow "stage") "draft"}}`
                                    },
                                    {
                                        name: 'Create dataset from this plan',
                                        action: 'show',
                                        renderItemTemplate: '{{name}}',
                                        evaluateRulesTemplate: `{{and (eq (get workflow "stage") "draft") (eq (get metaMetadata "type") "rdmp")}}`
                                    },
                                    {
                                        name: 'Close data plan',
                                        action: 'show',
                                        renderItemTemplate: '{{name}}',
                                        evaluateRulesTemplate: `{{and (eq (get workflow "stage") "draft") (eq (get metaMetadata "type") "rdmp")}}`
                                    },
                                    {
                                        name: 'Create a publication record from this dataset',
                                        action: 'show',
                                        renderItemTemplate: '{{name}}',
                                        evaluateRulesTemplate: `{{and (eq (get workflow "stage") "draft") (eq (get metaMetadata "type") "dataRecord")}}`
                                    },
                                    {
                                        name: 'Close dataset info',
                                        action: 'show',
                                        renderItemTemplate: '{{name}}',
                                        evaluateRulesTemplate: `{{and (eq (get workflow "stage") "draft") (eq (get metaMetadata "type") "dataRecord")}}`
                                    },
                                    {
                                        name: 'Submit for library review',
                                        action: 'show',
                                        renderItemTemplate: '{{name}}',
                                        evaluateRulesTemplate: `{{and (eq (get workflow "stage") "draft") (eq (get metaMetadata "type") "dataPublication")}}`
                                    }
                                ]
                            }
                        ],
                        groupRowConfig: [
                            {
                                title: 'Actions',
                                variable: '',
                                template: `{{evaluateGroupRowRules groupRulesConfig groupedItems "dashboardActionsPerGroupRow"}}`
                            }
                        ],
                        groupRowRulesConfig: [
                            {
                                ruleSetName: 'dashboardActionsPerGroupRow',
                                applyRuleSet: true,
                                rules: [
                                    {
                                        name: 'Send for Conferral',
                                        action: 'show',
                                        mode: 'alo',
                                        renderItemTemplate: `{{name}}`,
                                        evaluateRulesTemplate: `{{eq (get workflow "stage") "draft"}}`
                                    }
                                ]
                            }
                        ]
                    }
                }
            },
            starting: false,
            consolidated: true
        }
    },
    "party": {
        "draft": {
            config: {
                workflow: {
                    stage: 'draft',
                    stageLabel: 'Draft',
                },
                authorization: {
                    viewRoles: ['Admin', 'Librarians'],
                    editRoles: ['Admin', 'Librarians']
                },
                form: 'generated-view-only',
                dashboard: {
                    table: {
                        rowConfig: [
                            {
                                title: 'Party Name',
                                variable: 'metadata.GIVEN_NAME',
                                template: `<a href='{{rootContext}}/{{branding}}/{{portal}}/record/view/{{oid}}'>{{metadata.GIVEN_NAME}} {{metadata.FAMILY_NAME}}</a>`,
                                initialSort: 'desc'
                            },
                            {
                                title: 'Party Title',
                                variable: 'metadata.JOB_TITLE',
                                template: '{{metadata.JOB_TITLE}}',
                                initialSort: 'desc'
                            },
                            {
                                title: 'Party Email',
                                variable: 'metadata.EMAIL',
                                template: '{{metadata.EMAIL}}',
                                initialSort: 'desc'
                            },
                            {
                                title: 'header-created',
                                variable: 'metaMetadata.createdOn',
                                template: '{{formatDateLocale dateCreated "DATETIME_MED"}}',
                                initialSort: 'desc'
                            },
                            {
                                title: 'header-modified',
                                variable: 'metaMetadata.lastSaveDate',
                                template: '{{formatDateLocale dateModified "DATETIME_MED"}}',
                                initialSort: 'desc'
                            }
                        ]
                    }
                }
            },
            starting: true
        }
    }
};
module.exports.workflow = workflowConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2Zsb3cuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9pbnRlcm5hbC9zYWlscy10cy9jb25maWcvd29ya2Zsb3cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7OztHQUtHOztBQUlILE1BQU0sY0FBYyxHQUFtQjtJQUNyQyxNQUFNLEVBQUU7UUFDTixPQUFPLEVBQUU7WUFDUCxNQUFNLEVBQUU7Z0JBQ04sUUFBUSxFQUFFO29CQUNSLEtBQUssRUFBRSxPQUFPO29CQUNkLFVBQVUsRUFBRSxPQUFPO2lCQUNwQjtnQkFDRCxhQUFhLEVBQUU7b0JBQ2IsU0FBUyxFQUFFLENBQUMsT0FBTyxFQUFFLFlBQVksQ0FBQztvQkFDbEMsU0FBUyxFQUFFLENBQUMsT0FBTyxFQUFFLFlBQVksQ0FBQztpQkFDbkM7Z0JBQ0QsSUFBSSxFQUFFLG1CQUFtQjthQUMxQjtZQUNELFFBQVEsRUFBRSxJQUFJO1NBQ2Y7S0FDRjtJQUNELFlBQVksRUFBRTtRQUNaLE9BQU8sRUFBRTtZQUNQLE1BQU0sRUFBRTtnQkFDTixRQUFRLEVBQUU7b0JBQ1IsS0FBSyxFQUFFLE9BQU87b0JBQ2QsVUFBVSxFQUFFLE9BQU87aUJBQ3BCO2dCQUNELGFBQWEsRUFBRTtvQkFDYixTQUFTLEVBQUUsQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDO29CQUNsQyxTQUFTLEVBQUUsQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDO2lCQUNuQztnQkFDRCxJQUFJLEVBQUUsc0JBQXNCO2FBQzdCO1lBQ0QsUUFBUSxFQUFFLElBQUk7U0FDZjtLQUNGO0lBQ0QsaUJBQWlCLEVBQUU7UUFDakIsT0FBTyxFQUFFO1lBQ1AsTUFBTSxFQUFFO2dCQUNOLFFBQVEsRUFBRTtvQkFDUixLQUFLLEVBQUUsT0FBTztvQkFDZCxVQUFVLEVBQUUsT0FBTztpQkFDcEI7Z0JBQ0QsYUFBYSxFQUFFO29CQUNiLFNBQVMsRUFBRSxDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUM7b0JBQ2xDLFNBQVMsRUFB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