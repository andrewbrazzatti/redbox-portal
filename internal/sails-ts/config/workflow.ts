/**
 * Workflow Configuration
 * (sails.config.workflow)
 *
 * Defines workflow stages for each record type.
 */

import { WorkflowConfig } from '@researchdatabox/redbox-core-types';

const workflowConfig: WorkflowConfig = {
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
