"use strict";
/**
 * Record Type Configuration
 * (sails.config.recordtype)
 *
 * Defines record types, their hooks, related records, and search filters.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const recordtypeConfig = {
    "rdmp": {
        "packageType": "rdmp",
        hooks: {
            onCreate: {
                pre: [
                    {
                        function: 'sails.services.rdmpservice.assignPermissions',
                        options: {
                            "emailProperty": "email",
                            "editContributorProperties": [
                                "metadata.contributor_ci",
                                "metadata.contributor_data_manager",
                                "metadata.dataowner_email"
                            ],
                            "viewContributorProperties": [
                                "metadata.contributor_ci",
                                "metadata.contributor_data_manager",
                                "metadata.contributor_supervisor",
                                "metadata.contributors"
                            ],
                            "recordCreatorPermissions": "view&edit"
                        }
                    }
                ],
                post: []
            },
            onUpdate: {
                pre: [
                    {
                        function: 'sails.services.rdmpservice.assignPermissions',
                        options: {
                            "emailProperty": "email",
                            "editContributorProperties": [
                                "metadata.contributor_ci",
                                "metadata.contributor_data_manager",
                                "metadata.dataowner_email"
                            ],
                            "viewContributorProperties": [
                                "metadata.contributor_ci",
                                "metadata.contributor_data_manager",
                                "metadata.contributor_supervisor",
                                "metadata.contributors"
                            ],
                            "recordCreatorPermissions": "view&edit"
                        }
                    },
                    {
                        function: 'sails.services.rdmpservice.checkTotalSizeOfFilesInRecord',
                        options: {
                            triggerCondition: '<%= _.isEqual(record.workflow.stage, "draft") || _.isEqual(record.workflow.stage, "queued") || _.isEqual(record.workflow.stage, "published") %>',
                            maxUploadSizeMessageCode: 'max-total-files-upload-size-alternative-validation-error',
                            replaceOrAppend: 'append'
                        }
                    }
                ]
            }
        },
        relatedTo: [{
                "recordType": "dataRecord",
                "foreignField": "metadata.rdmp.oid"
            }],
        transferResponsibility: {
            fields: {
                chiefInvestigator: {
                    label: "@dmpt-people-tab-ci",
                    updateField: "contributor_ci",
                    updateAlso: ['dataOwner']
                },
                dataManager: {
                    label: "@dmpt-people-tab-data-manager",
                    updateField: 'contributor_data_manager'
                },
                dataOwner: {
                    label: "@dmpt-people-tab-data-owner",
                    fieldNames: {
                        email: "dataowner_email",
                        text_full_name: "dataowner_name"
                    }
                }
            },
            canEdit: {
                dataManager: ["dataManager", "chiefInvestigator", "dataOwner"],
                dataOwner: ["chiefInvestigator", "dataOwner"],
                chiefInvestigator: ["chiefInvestigator"]
            }
        },
        searchFilters: [
            { name: "text_title", title: "search-refine-title", type: "exact", typeLabel: "search-refine-contains" },
            { name: "text_description", title: "search-refine-description", type: "exact", typeLabel: "search-refine-contains" },
            { name: "grant_number_name", title: "search-refine-grant_number_name", type: "facet", typeLabel: null, alwaysActive: true },
            { name: "finalKeywords", title: "search-refine-keywords", type: "facet", typeLabel: null, alwaysActive: true },
            { name: "workflow_stageLabel", title: "search-refine-workflow_stageLabel", type: "facet", typeLabel: null, alwaysActive: true }
        ]
    },
    "dataRecord": {
        "packageType": "dataRecord",
        labels: {
            name: "Record",
            namePlural: "Records"
        },
        searchFilters: [
            { name: "text_title", title: "search-refine-title", type: "exact", typeLabel: "search-refine-contains" },
            { name: "text_description", title: "search-refine-description", type: "exact", typeLabel: "search-refine-contains" },
            { name: "grant_number_name", title: "search-refine-grant_number_name", type: "facet", typeLabel: null, alwaysActive: true },
            { name: "finalKeywords", title: "search-refine-keywords", type: "facet", typeLabel: null, alwaysActive: true },
            { name: "workflow_stageLabel", title: "search-refine-workflow_stageLabel", type: "facet", typeLabel: null, alwaysActive: true }
        ],
        relatedTo: [
            { "recordType": "rdmp", "localField": "metadata.rdmp.oid", "foreignField": "redboxOid" },
            { "recordType": "dataPublication", "foreignField": "metadata.dataRecord.oid" }
        ],
        transferResponsibility: {
            fields: {
                chiefInvestigator: {
                    label: "@dmpt-people-tab-ci",
                    updateField: "contributor_ci",
                    updateAlso: ['dataOwner']
                },
                dataManager: {
                    label: "@dmpt-people-tab-data-manager",
                    updateField: 'contributor_data_manager'
                },
                dataOwner: {
                    label: "@dmpt-people-tab-data-owner",
                    fieldNames: {
                        email: "dataowner_email",
                        text_full_name: "dataowner_name"
                    }
                }
            },
            canEdit: {
                dataManager: ["dataManager", "chiefInvestigator", "dataOwner"],
                dataOwner: ["chiefInvestigator", "dataOwner"],
                chiefInvestigator: ["chiefInvestigator"]
            }
        },
        hooks: {
            onCreate: {
                pre: [{
                        function: 'sails.services.rdmpservice.assignPermissions',
                        options: {
                            "emailProperty": "email",
                            "editContributorProperties": [
                                "metadata.contributor_ci",
                                "metadata.contributor_data_manager",
                                "metadata.dataowner_email"
                            ],
                            "viewContributorProperties": [
                                "metadata.contributor_ci",
                                "metadata.contributor_data_manager",
                                "metadata.contributor_supervisor",
                                "metadata.contributors"
                            ],
                            "recordCreatorPermissions": "view&edit"
                        }
                    }]
            },
            onUpdate: {
                pre: [{
                        function: 'sails.services.rdmpservice.assignPermissions',
                        options: {
                            "emailProperty": "email",
                            "editContributorProperties": [
                                "metadata.contributor_ci",
                                "metadata.contributor_data_manager",
                                "metadata.dataowner_email"
                            ],
                            "viewContributorProperties": [
                                "metadata.contributor_ci",
                                "metadata.contributor_data_manager",
                                "metadata.contributor_supervisor",
                                "metadata.contributors"
                            ],
                            "recordCreatorPermissions": "view&edit"
                        }
                    }]
            }
        }
    },
    "dataPublication": {
        "packageType": "dataPublication",
        labels: {
            name: "Data Publication",
            namePlural: "Data Publications"
        },
        searchFilters: [
            { name: "text_title", title: "search-refine-title", type: "exact", typeLabel: "search-refine-contains" },
            { name: "text_description", title: "search-refine-description", type: "exact", typeLabel: "search-refine-contains" },
            { name: "grant_number_name", title: "search-refine-grant_number_name", type: "facet", typeLabel: null, alwaysActive: true },
            { name: "finalKeywords", title: "search-refine-keywords", type: "facet", typeLabel: null, alwaysActive: true },
            { name: "workflow_stageLabel", title: "search-refine-workflow_stageLabel", type: "facet", typeLabel: null, alwaysActive: true }
        ],
        hooks: {
            onCreate: {
                pre: [
                    {
                        function: 'sails.services.triggerservice.transitionWorkflow',
                        options: {
                            "triggerCondition": "<%= _.isEqual(workflow.stage, 'queued') && _.isEqual(metadata.embargoByDate, true) %>",
                            "targetWorkflowStageName": "embargoed",
                            "targetWorkflowStageLabel": "Embargoed",
                            "targetForm": "dataPublication-1.0-embargoed"
                        }
                    },
                    {
                        function: 'sails.services.recordsservice.updateNotificationLog',
                        options: {
                            name: "Set Notification to Draft",
                            triggerCondition: "<%= typeof record.notification == 'undefined'%>",
                            flagName: 'notification.state',
                            flagVal: 'draft',
                            saveRecord: false
                        }
                    },
                    {
                        function: 'sails.services.rdmpservice.assignPermissions',
                        options: {
                            "emailProperty": "email",
                            "editContributorProperties": ["metadata.creators"],
                            "viewContributorProperties": ["metadata.creators"],
                            "recordCreatorPermissions": "view&edit"
                        }
                    },
                    {
                        function: 'sails.services.rdmpservice.stripUserBasedPermissions',
                        options: {
                            triggerCondition: "<%= record.workflow.stage=='published' ||  record.workflow.stage=='queued' || record.workflow.stage=='embargoed' %>"
                        }
                    },
                    {
                        function: 'sails.services.rdmpservice.restoreUserBasedPermissions',
                        options: {
                            triggerCondition: "<%= record.workflow.stage=='draft' %>"
                        }
                    }
                ],
                post: [
                    {
                        function: 'sails.services.emailservice.sendRecordNotification',
                        options: {
                            triggerCondition: "<%= record.notification != null && record.notification.state == 'draft' && record.workflow.stage == 'queued' %>",
                            to: "<%= record.metadata.contributor_ci.email %>,<%= record.metadata.contributor_data_manager.email %>,<%= record.metadata.contributor_supervisor.email %>",
                            subject: "A publication has been staged for publishing.",
                            template: "publicationStaged",
                            onNotifySuccess: [
                                {
                                    function: 'sails.services.emailservice.sendRecordNotification',
                                    options: {
                                        forceRun: true,
                                        to: "librarian@redboxresearchdata.com.au",
                                        subject: "Data publication ready for review",
                                        template: "publicationReview"
                                    }
                                },
                                {
                                    function: 'sails.services.recordsservice.updateNotificationLog',
                                    options: {
                                        name: "Set Notification to Emailed-Reviewing",
                                        forceRun: true,
                                        flagName: 'notification.state',
                                        flagVal: 'emailed-reviewing',
                                        logName: 'notification.log.reviewing',
                                        saveRecord: true
                                    }
                                }
                            ]
                        }
                    },
                    {
                        function: 'sails.services.emailservice.sendRecordNotification',
                        options: {
                            triggerCondition: "<%= record.notification != null && record.notification.state == 'emailed-reviewing' && record.workflow.stage == 'published' %>",
                            to: "<%= record.metadata.contributor_ci.email %>,<%= record.metadata.contributor_data_manager.email %>,<%= record.metadata.contributor_supervisor.email %>,librarian@redboxresearchdata.com.au,<%= _.isEmpty(record.metadata.creators) ? '' : _.join(_.map(record.metadata.creators, (creator)=>{ return creator.email; }), ',') %>",
                            subject: "A publication has been successfully published",
                            template: "publicationPublished",
                            onNotifySuccess: [
                                {
                                    function: 'sails.services.recordsservice.updateNotificationLog',
                                    options: {
                                        name: "Set Notification to Emailed-Published",
                                        forceRun: true,
                                        flagName: 'notification.state',
                                        flagVal: 'emailed-published',
                                        logName: 'notification.log.published',
                                        saveRecord: true
                                    }
                                }
                            ]
                        }
                    }
                ]
            },
            onUpdate: {
                pre: [
                    {
                        function: 'sails.services.triggerservice.transitionWorkflow',
                        options: {
                            "triggerCondition": "<%= _.isEqual(workflow.stage, 'published') && _.isEqual(metadata.embargoByDate, true) %>",
                            "targetWorkflowStageName": "embargoed",
                            "targetWorkflowStageLabel": "Embargoed",
                            "targetForm": "dataPublication-1.0-embargoed"
                        }
                    },
                    {
                        function: 'sails.services.recordsservice.updateNotificationLog',
                        options: {
                            name: "Set Notification to Draft",
                            triggerCondition: "<%= typeof record.notification == 'undefined'%>",
                            flagName: 'notification.state',
                            flagVal: 'draft',
                            saveRecord: false
                        }
                    },
                    {
                        function: 'sails.services.rdmpservice.assignPermissions',
                        options: {
                            "emailProperty": "email",
                            "editContributorProperties": ["metadata.creators"],
                            "viewContributorProperties": ["metadata.creators"],
                            "recordCreatorPermissions": "view&edit"
                        }
                    },
                    {
                        function: 'sails.services.rdmpservice.stripUserBasedPermissions',
                        options: {
                            triggerCondition: "<%= record.workflow.stage=='published' ||  record.workflow.stage=='queued' || record.workflow.stage=='embargoed' %>"
                        }
                    },
                    {
                        function: 'sails.services.rdmpservice.restoreUserBasedPermissions',
                        options: {
                            triggerCondition: "<%= record.workflow.stage=='draft' %>"
                        }
                    }
                ],
                post: [
                    {
                        function: 'sails.services.emailservice.sendRecordNotification',
                        options: {
                            triggerCondition: "<%= record.notification != null && record.notification.state == 'draft' && record.workflow.stage == 'queued' %>",
                            to: "<%= record.metadata.contributor_ci.email %>,<%= record.metadata.contributor_data_manager.email %>,<%= record.metadata.contributor_supervisor.email %>",
                            subject: "A publication has been staged for review.",
                            template: "publicationStaged",
                            onNotifySuccess: [
                                {
                                    function: 'sails.services.emailservice.sendRecordNotification',
                                    options: {
                                        forceRun: true,
                                        to: "librarian@redboxresearchdata.com.au",
                                        subject: "Data publication ready for review",
                                        template: "publicationReview"
                                    }
                                },
                                {
                                    function: 'sails.services.recordsservice.updateNotificationLog',
                                    options: {
                                        name: "Set Notification to Emailed-Reviewing",
                                        forceRun: true,
                                        flagName: 'notification.state',
                                        flagVal: 'emailed-reviewing',
                                        logName: 'notification.log.reviewing',
                                        saveRecord: true
                                    }
                                }
                            ]
                        }
                    },
                    {
                        function: 'sails.services.emailservice.sendRecordNotification',
                        options: {
                            triggerCondition: "<%= record.notification != null && record.notification.state == 'emailed-reviewing' && record.workflow.stage == 'published' %>",
                            to: "<%= record.metadata.contributor_ci.email %>,<%= record.metadata.contributor_data_manager.email %>,<%= record.metadata.contributor_supervisor.email %>,librarian@redboxresearchdata.com.au,<%= _.isEmpty(record.metadata.creators) ? '' : _.join(_.map(record.metadata.creators, (creator)=>{ return creator.email; }), ',') %>",
                            subject: "A publication has been successfully published",
                            template: "publicationPublished",
                            onNotifySuccess: [
                                {
                                    function: 'sails.services.recordsservice.updateNotificationLog',
                                    options: {
                                        name: "Set Notification to Emailed-Published",
                                        forceRun: true,
                                        flagName: 'notification.state',
                                        flagVal: 'emailed-published',
                                        logName: 'notification.log.published',
                                        saveRecord: true
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        }
    },
    "existing-locations": {
        "searchable": false,
        "packageType": "workspace",
        "packageName": "existing-locations",
        "searchFilters": [
            { name: "text_title", title: "search-refine-title", type: "exact", typeLabel: "search-refine-contains" },
            { name: "text_description", title: "search-refine-description", type: "exact", typeLabel: "search-refine-contains" }
        ],
        hooks: {
            onCreate: {
                pre: [],
                postSync: [
                    {
                        function: 'sails.services.rdmpservice.addWorkspaceToRecord',
                        options: {}
                    }
                ]
            }
        }
    },
    "consolidated": {
        "searchable": false,
        "packageType": "rdmp",
        "packageName": "consolidated",
        "searchFilters": [],
        hooks: {}
    },
    "party": {
        packageType: "party",
        dashboard: {
            showAdminSideBar: true
        },
        hooks: {
            onCreate: {
                pre: [
                    {
                        function: 'sails.services.rdmpservice.runTemplates',
                        options: {
                            parseObject: false,
                            templates: [
                                {
                                    field: "metadata.title",
                                    template: "<%= _.get(record, 'metadata.JOB_TITLE') %>"
                                }
                            ]
                        }
                    }
                ]
            },
            onUpdate: {
                pre: [
                    {
                        function: 'sails.services.rdmpservice.runTemplates',
                        options: {
                            parseObject: false,
                            templates: [
                                {
                                    field: "metadata.title",
                                    template: "<%= _.get(record, 'metadata.JOB_TITLE') %>"
                                }
                            ]
                        }
                    }
                ]
            }
        }
    }
};
module.exports.recordtype = recordtypeConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjb3JkdHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2ludGVybmFsL3NhaWxzLXRzL2NvbmZpZy9yZWNvcmR0eXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7R0FLRzs7QUFJSCxNQUFNLGdCQUFnQixHQUFzQjtJQUMxQyxNQUFNLEVBQUU7UUFDTixhQUFhLEVBQUUsTUFBTTtRQUNyQixLQUFLLEVBQUU7WUFDTCxRQUFRLEVBQUU7Z0JBQ1IsR0FBRyxFQUFFO29CQUNIO3dCQUNFLFFBQVEsRUFBRSw4Q0FBOEM7d0JBQ3hELE9BQU8sRUFBRTs0QkFDUCxlQUFlLEVBQUUsT0FBTzs0QkFDeEIsMkJBQTJCLEVBQUU7Z0NBQzNCLHlCQUF5QjtnQ0FDekIsbUNBQW1DO2dDQUNuQywwQkFBMEI7NkJBQzNCOzRCQUNELDJCQUEyQixFQUFFO2dDQUMzQix5QkFBeUI7Z0NBQ3pCLG1DQUFtQztnQ0FDbkMsaUNBQWlDO2dDQUNqQyx1QkFBdUI7NkJBQ3hCOzRCQUNELDBCQUEwQixFQUFFLFdBQVc7eUJBQ3hDO3FCQUNGO2lCQUNGO2dCQUNELElBQUksRUFBRSxFQUFFO2FBQ1Q7WUFDRCxRQUFRLEVBQUU7Z0JBQ1IsR0FBRyxFQUFFO29CQUNIO3dCQUNFLFFBQVEsRUFBRSw4Q0FBOEM7d0JBQ3hELE9BQU8sRUFBRTs0QkFDUCxlQUFlLEVBQUUsT0FBTzs0QkFDeEIsMkJBQTJCLEVBQUU7Z0NBQzNCLHlCQUF5QjtnQ0FDekIsbUNBQW1DO2dDQUNuQywwQkFBMEI7NkJBQzNCOzRCQUNELDJCQUEyQixFQUFFO2dDQUMzQix5QkFBeUI7Z0NBQ3pCLG1DQUFtQztnQ0FDbkMsaUNBQWlDO2dDQUNqQyx1QkFBdUI7NkJBQ3hCOzRCQUNELDBCQUEwQixFQUFFLFdBQVc7eUJBQ3hDO3FCQUNGO29CQUNEO3dCQUNFLFFBQVEsRUFBRSwwREFBMEQ7d0JBQ3BFLE9BQU8sRUFBRTs0QkFDUCxnQkFBZ0IsRUFBRSxpSkFBaUo7NEJBQ25LLHdC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