/**
 * Data record form
 */
module.exports = {
  name: 'dataRecord-1.0-draft',
  type: 'dataRecord',
  skipValidationOnSave: false,
  editCssClasses: 'row col-md-12',
  viewCssClasses: 'row col-md-offset-1 col-md-10',
  messages: {
    "saving": ["@dmpt-form-saving"],
    "validationFail": ["@dmpt-form-validation-fail-prefix", "@dmpt-form-validation-fail-suffix"],
    "saveSuccess": ["@dmpt-form-save-success"],
    "saveError": ["@dmpt-form-save-error"]
  },
  fields: [{
      class: 'Container',
      compClass: 'TextBlockComponent',
      viewOnly: true,
      definition: {
        name: 'title',
        type: 'h1'
      }
    },
    {
      class: "AnchorOrButton",
      viewOnly: true,
      definition: {
        label: 'Edit this plan',
        value: '/@branding/@portal/record/edit/@oid',
        cssClasses: 'btn btn-large btn-info margin-15',
        showPencil: true,
        controlType: 'anchor'
      },
      variableSubstitutionFields: ['value']
    },
    {
      class: 'TextArea',
      viewOnly: true,
      definition: {
        name: 'description',
        label: 'Description'
      }
    },
    {
      class: "TabOrAccordionContainer",
      compClass: "TabOrAccordionContainerComponent",
      definition: {
        fields: [
          // -------------------------------------------------------------------
          // About Tab
          // -------------------------------------------------------------------
          {
            class: "Container",
            definition: {
              id: "about",
              label: "@dataRecord-about-tab",
              active: true,
              fields: [{
                  class: 'Container',
                  compClass: 'TextBlockComponent',
                  definition: {
                    value: '@dataRecord-about-heading',
                    type: 'h3'
                  }
                },
                {
                  class: 'TextField',
                  definition: {
                    name: 'title',
                    label: '@dataRecord-title',
                    help: '@dataRecord-title-help',
                    type: 'text'
                  }
                },
                {
                  class: 'TextArea',
                  compClass: 'TextAreaComponent',
                  definition: {
                    name: 'description',
                    label: '@dataRecord-description',
                    help: '@dataRecord-description-help',
                    type: 'text'
                  }
                },
                {
                  class: 'SelectionField',
                  compClass: 'DropdownFieldComponent',
                  definition: {
                    name: 'dc:subject_anzsrc:toa_rdf:resource',
                    label: '@dataRecord-datatype',
                    help: '@dataRecord-datatype-help',
                    options: [{
                        value: "",
                        label: "@dataRecord-dataype-select:Empty"
                      },
                      {
                        value: "catalogueOrIndex",
                        label: "@dataRecord-dataype-select:catalogueOrIndex"
                      },
                      {
                        value: "collection",
                        label: "@dataRecord-dataype-select:collection"
                      },
                      {
                        value: "dataset",
                        label: "@dataRecord-dataype-select:dataset"
                      },
                      {
                        value: "registry",
                        label: "@dataRecord-dataype-select:registry"
                      },
                      {
                        value: "repository",
                        label: "@dataRecord-dataype-select:repository"
                      }
                    ]
                  }
                },
                {
                  class: 'RepeatableContainer',
                  compClass: 'RepeatableTextfieldComponent',
                  definition: {
                    label: "@dataRecord-keywords",
                    help: "@dataRecord-keywords-help",
                    name: "finalKeywords",
                    editOnly: true,
                    fields: [{
                      class: 'TextField',
                      definition: {
                        type: 'text'
                      }
                    }]
                  }
                }

              ]
            }
          },
          // -------------------------------------------------------------------
          // Aim Tab
          // -------------------------------------------------------------------
          {
            class: "Container",
            definition: {
              id: "aim",
              label: "@dataRecord-aim-tab",
              fields: [{
                  class: 'Container',
                  compClass: 'TextBlockComponent',
                  definition: {
                    value: '@dataRecord-about-heading',
                    type: 'h3'
                  }
                },
                {
                  class: 'RepeatableContainer',
                  compClass: 'RepeatableVocabComponent',
                  definition: {
                    name: 'foaf:fundedBy_foaf:Agent',
                    label: "@dmpt-foaf:fundedBy_foaf:Agent",
                    help: "@dmpt-foaf:fundedBy_foaf:Agent-help",
                    forceClone: ['lookupService', 'completerService'],
                    fields: [{
                      class: 'VocabField',
                      definition: {
                        disableEditAfterSelect: false,
                        vocabId: 'Funding Bodies',
                        sourceType: 'mint',
                        fieldNames: ['dc_title', 'dc_identifier', 'ID', 'repository_name'],
                        searchFields: 'dc_title',
                        titleFieldArr: ['dc_title'],
                        stringLabelToField: 'dc_title'
                      }
                    }]
                  }
                },
                {
                  class: 'RepeatableContainer',
                  compClass: 'RepeatableVocabComponent',
                  definition: {
                    name: 'foaf:fundedBy_vivo:Grant',
                    label: "@dmpt-foaf:fundedBy_vivo:Grant",
                    help: "@dmpt-foaf:fundedBy_vivo:Grant-help",
                    forceClone: ['lookupService', 'completerService'],
                    fields: [{
                      class: 'VocabField',
                      definition: {
                        disableEditAfterSelect: false,
                        vocabId: 'Research Activities',
                        sourceType: 'mint',
                        fieldNames: ['dc_title', 'grant_number', 'foaf_name', 'dc_identifier', 'known_ids', 'repository_name'],
                        searchFields: 'grant_number,dc_title',
                        titleFieldArr: ['grant_number', 'repository_name', 'dc_title'],
                        titleFieldDelim: [{
                            prefix: '[',
                            suffix: ']'
                          },
                          {
                            prefix: ' (',
                            suffix: ')'
                          },
                          {
                            prefix: ' ',
                            suffix: ''
                          }
                        ],
                        stringLabelToField: 'dc_title'
                      }
                    }],
                    publish: {
                      onValueUpdate: {
                        modelEventSource: 'valueChanges',
                        // optional, renames fields `{field: sourcefield}` accessed using _.get, remove to return the entire data set
                        fields: [{
                          'grant_number': 'grant_number[0]'
                        }, {
                          'dc_title': 'dc_title'
                        }]
                      }
                    }
                  }
                },
                {
                  class: 'SelectionField',
                  compClass: 'DropdownFieldComponent',
                  definition: {
                    name: 'dc:subject_anzsrc:toa_rdf:resource',
                    label: '@dmpt-project-activity-type',
                    help: '@dmpt-project-activity-type-help',
                    options: [{
                        value: "",
                        label: "@dmpt-select:Empty"
                      },
                      {
                        value: "pure",
                        label: "@dmpt-activity-type-pure"
                      },
                      {
                        value: "strategic",
                        label: "@dmpt-activity-type-strategic"
                      },
                      {
                        value: "applied",
                        label: "@dmpt-activity-type-applied"
                      },
                      {
                        value: "experimental",
                        label: "@dmpt-activity-type-experimental"
                      }
                    ]
                  }
                },
                {
                  class: 'RepeatableContainer',
                  compClass: 'RepeatableVocabComponent',
                  definition: {
                    label: "@dmpt-project-anzsrcFor",
                    help: "@dmpt-project-anzsrcFor-help",
                    name: "dc:subject_anzsrc:for",
                    forceClone: ['sourceData', 'completerService'],
                    fields: [{
                      class: 'VocabField',
                      definition: {
                        vocabId: 'anzsrc-for',
                        "validationMessages": {
                          "required": "Please select a valid value."
                        },
                        fieldNames: ['uri', 'label', 'notation'],
                        searchFields: 'notation,label',
                        titleFieldArr: ['notation', 'label']
                      }
                    }]
                  }
                },
                {
                  class: 'RepeatableContainer',
                  compClass: 'RepeatableVocabComponent',
                  definition: {
                    label: "@dmpt-project-anzsrcSeo",
                    help: "@dmpt-project-anzsrcSeo-help",
                    name: "dc:subject_anzsrc:seo",
                    forceClone: ['sourceData', 'completerService'],
                    fields: [{
                      class: 'VocabField',
                      definition: {
                        vocabId: 'anzsrc-seo',
                        "validationMessages": {
                          "required": "Please select a valid value."
                        },
                        fieldNames: ['uri', 'label', 'notation'],
                        searchFields: 'notation,label',
                        titleFieldArr: ['notation', 'label']
                      }
                    }]
                  }
                }
              ]
            }
          },
          // -------------------------------------------------------------------
          // People Tab
          // -------------------------------------------------------------------
          {
            class: "Container",
            definition: {
              id: "people",
              label: "@dmpt-people-tab",
              fields: [{
                  class: 'ContributorField',
                  showHeader: true,
                  definition: {
                    name: 'contributor_ci',
                    required: true,
                    label: '@dmpt-people-tab-ci',
                    role: "@dmpt-people-tab-ci-role",
                    freeText: false,
                    forceLookupOnly: true,
                    vocabId: 'Parties AND repository_name:People',
                    sourceType: 'mint',
                    disabledExpression: '<%= !_.isEmpty(oid) %>',
                    fieldNames: [{
                      'text_full_name': 'text_full_name'
                    }, {
                      'full_name_honorific': 'text_full_name_honorific'
                    }, {
                      'email': 'Email[0]'
                    }],
                    searchFields: 'text_given_name,text_family_name,text_full_name,text_full_name_honorific',
                    titleFieldArr: ['text_full_name'],
                    titleFieldDelim: '',
                    nameColHdr: '@dmpt-people-tab-name-hdr',
                    emailColHdr: '@dmpt-people-tab-email-hdr',
                    validation_required_name: '@dmpt-people-tab-validation-name-required',
                    validation_required_email: '@dmpt-people-tab-validation-email-required',
                    validation_invalid_email: '@dmpt-people-tab-validation-email-invalid',
                    publish: {
                      onValueUpdate: {
                        modelEventSource: 'valueChanges'
                      }
                    },
                    subscribe: {
                      'this': {
                        onValueUpdate: []
                      }
                    }
                  }
                },
                {
                  class: 'ContributorField',
                  showHeader: true,
                  definition: {
                    name: 'contributor_data_manager',
                    required: true,
                    label: '@dmpt-people-tab-data-manager',
                    role: "@dmpt-people-tab-data-manager-role",
                    freeText: false,
                    vocabId: 'Parties AND repository_name:People',
                    sourceType: 'mint',
                    disabledExpression: '<%= !_.isEmpty(oid) %>',
                    fieldNames: [{
                      'text_full_name': 'text_full_name'
                    }, {
                      'full_name_honorific': 'text_full_name_honorific'
                    }, {
                      'email': 'Email[0]'
                    }],
                    searchFields: 'text_given_name,text_family_name,text_full_name,text_full_name_honorific',
                    titleFieldArr: ['text_full_name'],
                    titleFieldDelim: '',
                    nameColHdr: '@dmpt-people-tab-name-hdr',
                    emailColHdr: '@dmpt-people-tab-email-hdr',
                    publish: {
                      onValueUpdate: {
                        modelEventSource: 'valueChanges'
                      }
                    },
                    subscribe: {
                      'this': {
                        onValueUpdate: []
                      }
                    }
                  }
                },
                {
                  class: 'RepeatableContainer',
                  compClass: 'RepeatableContributorComponent',
                  definition: {
                    name: "contributors",
                    skipClone: ['showHeader', 'initialValue'],
                    forceClone: [{
                      field: 'vocabField',
                      skipClone: ['injector']
                    }],
                    fields: [{
                      class: 'ContributorField',
                      showHeader: true,
                      definition: {
                        required: false,
                        label: '@dmpt-people-tab-contributors',
                        role: "@dmpt-people-tab-contributors-role",
                        freeText: false,
                        vocabId: 'Parties AND repository_name:People',
                        sourceType: 'mint',
                        fieldNames: [{
                          'text_full_name': 'text_full_name'
                        }, {
                          'full_name_honorific': 'text_full_name_honorific'
                        }, {
                          'email': 'Email[0]'
                        }],
                        searchFields: 'text_given_name,text_family_name,text_full_name,text_full_name_honorific',
                        titleFieldArr: ['text_full_name'],
                        titleFieldDelim: '',
                        nameColHdr: '@dmpt-people-tab-name-hdr',
                        emailColHdr: '@dmpt-people-tab-email-hdr',
                        publish: {
                          onValueUpdate: {
                            modelEventSource: 'valueChanges'
                          }
                        },
                        subscribe: {
                          'this': {
                            onValueUpdate: []
                          }
                        }
                      }
                    }]
                  }
                },
                {
                  class: 'ContributorField',
                  showHeader: true,
                  definition: {
                    name: 'contributor_supervisor',
                    required: false,
                    label: '@dmpt-people-tab-supervisor',
                    role: "@dmpt-people-tab-supervisor-role",
                    freeText: false,
                    forceLookupOnly: true,
                    vocabId: 'Parties AND repository_name:People',
                    sourceType: 'mint',
                    fieldNames: [{
                      'text_full_name': 'text_full_name'
                    }, {
                      'full_name_honorific': 'text_full_name_honorific'
                    }, {
                      'email': 'Email[0]'
                    }],
                    searchFields: 'text_given_name,text_family_name,text_full_name,text_full_name_honorific',
                    titleFieldArr: ['text_full_name'],
                    titleFieldDelim: '',
                    nameColHdr: '@dmpt-people-tab-name-hdr',
                    emailColHdr: '@dmpt-people-tab-email-hdr',
                    publish: {
                      onValueUpdate: {
                        modelEventSource: 'valueChanges'
                      }
                    },
                    subscribe: {
                      'this': {
                        onValueUpdate: []
                      }
                    }
                  }
                }
              ]
            }
          },
          // -------------------------------------------------------------------
          // Data Tab
          // -------------------------------------------------------------------
          {
            class: "Container",
            definition: {
              id: "data",
              label: "@dataRecord-data-tab",
              fields: [{
                  class: 'Container',
                  compClass: 'TextBlockComponent',
                  definition: {
                    value: '@dataRecord-data-heading',
                    type: 'h3'
                  }
                },
                {
                  class: 'SelectionField',
                  compClass: 'DropdownFieldComponent',
                  definition: {
                    name: 'redbox:retentionPeriod_dc:date',
                    label: '@dmpt-redbox:retentionPeriod_dc:date',
                    help: '@dmpt-redbox:retentionPeriod_dc:date-help',
                    options: [{
                        value: "",
                        label: "@dmpt-select:Empty"
                      },
                      {
                        value: "1year",
                        label: "@dmpt-redbox:retentionPeriod_dc:date-1year"
                      },
                      {
                        value: "5years",
                        label: "@dmpt-redbox:retentionPeriod_dc:date-5years"
                      },
                      {
                        value: "7years",
                        label: "@dmpt-redbox:retentionPeriod_dc:date-7years"
                      },
                      {
                        value: "15years",
                        label: "@dmpt-redbox:retentionPeriod_dc:date-15years"
                      },
                      {
                        value: "20years",
                        label: "@dmpt-redbox:retentionPeriod_dc:date-20years"
                      },
                      {
                        value: "permanent",
                        label: "@dmpt-redbox:retentionPeriod_dc:date-permanent"
                      }
                    ],
                    required: true,
                    validationMessages: {
                      required: "@dmpt-redbox:retentionPeriod_dc:date-required"
                    }
                  }
                },
                {
                  class: 'SelectionField',
                  compClass: 'DropdownFieldComponent',
                  definition: {
                    name: 'redbox:retentionPeriod_dc:date_skos:note',
                    label: '@dataRecord:retentionPeriod_dc:date_skos:note',
                    options: [{
                        value: "",
                        label: "@dmpt-select:Empty"
                      },
                      {
                        value: "heritage",
                        label: "@dmpt-redbox:retentionPeriod_dc:date_skos:note-heritage"
                      },
                      {
                        value: "controversial",
                        label: "@dmpt-redbox:retentionPeriod_dc:date_skos:note-controversial"
                      },
                      {
                        value: "ofinterest",
                        label: "@dmpt-redbox:retentionPeriod_dc:date_skos:note-ofinterest"
                      },
                      {
                        value: "costly_impossible",
                        label: "@dmpt-redbox:retentionPeriod_dc:date_skos:note-costly_impossible"
                      },
                      {
                        value: "commercial",
                        label: "@dmpt-redbox:retentionPeriod_dc:date_skos:note-commercial"
                      }
                    ]
                  }
                },
                {
                  class: 'DateTime',
                  definition: {
                    name: "disposalDate",
                    label: "@dataRecord-disposalDate",
                    help: '@dataRecord-disposalDate-help',
                    datePickerOpts: {
                      format: 'dd/mm/yyyy',
                      icon: 'fa fa-calendar',
                      autoclose: true
                    },
                    timePickerOpts: false,
                    hasClearButton: false,
                    valueFormat: 'YYYY-MM-DD',
                    displayFormat: 'L',
                    publish: {
                      onValueUpdate: {
                        modelEventSource: 'valueChanges'
                      }
                    }
                  }
                },
              ]
            }
          },
          // -------------------------------------------------------------------
          // Relationships Tab
          // -------------------------------------------------------------------
          {
            class: "Container",
            definition: {
              id: "relationships",
              label: "@dataRecord-relationships-tab",
              fields: [{
                  class: 'Container',
                  compClass: 'TextBlockComponent',
                  definition: {
                    value: '@dataRecord-relationships-heading',
                    type: 'h3'
                  }
                },

              ]
            }
          },
          // -------------------------------------------------------------------
          // Coverage Tab
          // -------------------------------------------------------------------
          {
            class: "Container",
            definition: {
              id: "coverage",
              label: "@dataRecord-coverage-tab",
              fields: [{
                  class: 'Container',
                  compClass: 'TextBlockComponent',
                  definition: {
                    value: '@dataRecord-coverage-heading',
                    type: 'h3'
                  }
                },
                {
                  class: 'Container',
                  compClass: 'TextBlockComponent',
                  definition: {
                    value: '@dataRecord-temporalcoverage-heading',
                    type: 'h4'
                  }
                },
                {
                  class: 'DateTime',
                  definition: {
                    name: "startDate",
                    label: "@dataRecord-startDate",
                    help: '@dataRecord-startDate-help',
                    datePickerOpts: {
                      format: 'dd/mm/yyyy',
                      icon: 'fa fa-calendar',
                      autoclose: true
                    },
                    timePickerOpts: false,
                    hasClearButton: false,
                    valueFormat: 'YYYY-MM-DD',
                    displayFormat: 'L',
                    publish: {
                      onValueUpdate: {
                        modelEventSource: 'valueChanges'
                      }
                    }
                  }
                },
                {
                  class: 'DateTime',
                  definition: {
                    name: "endDate",
                    label: "@dataRecord-endDate",
                    help: '@dataRecord-endDate-help',
                    datePickerOpts: {
                      format: 'dd/mm/yyyy',
                      icon: 'fa fa-calendar',
                      autoclose: true
                    },
                    timePickerOpts: false,
                    hasClearButton: false,
                    valueFormat: 'YYYY-MM-DD',
                    displayFormat: 'L',
                    publish: {
                      onValueUpdate: {
                        modelEventSource: 'valueChanges'
                      }
                    }
                  }
                },
                {
                  class: 'TextField',
                  editOnly: true,
                  definition: {
                    name: 'timePeriod',
                    label: '@dataRecord-timePeriod',
                    help: '@dataRecord-timePeriod-help',
                    type: 'text',
                    required: true
                  }
                },
                // {
                //   class: 'MapField',
                //   compClass: 'MapComponent',
                //   editOnly: true,
                //   definition: {
                //     name: 'timePeriod1',
                //     label: '@dataRecord-timePeriod1',
                //     help: '@dataRecord-timePeriod-help1'
                //   }
                // }
              ]
            }
          },
          // -------------------------------------------------------------------
          // Management Tab
          // -------------------------------------------------------------------
          {
            class: "Container",
            definition: {
              id: "management",
              label: "@dataRecord-management-tab",
              fields: [{
                  class: 'Container',
                  compClass: 'TextBlockComponent',
                  definition: {
                    value: '@dataRecord-management-heading',
                    type: 'h3'
                  }
                },
                {
                  class: 'Container',
                  compClass: 'TextBlockComponent',
                  definition: {
                    value: '@dataRecord-licensing-heading',
                    type: 'h4'
                  }
                },
                {
                  class: 'SelectionField',
                  compClass: 'DropdownFieldComponent',
                  definition: {
                    name: 'licence',
                    label: '@dataRecord-licence',
                    help: '@dataRecord-licence-help',
                    options: [{
                        value: "http://creativecommons.org/licenses/by/3.0/au",
                        label: "@dataRecord-licence-by30au"
                      },
                      {
                        value: "http://creativecommons.org/licenses/by-sa/3.0/au",
                        label: "@dataRecord-licence-bysa30au"
                      },
                      {
                        value: "http://creativecommons.org/licenses/by-nd/3.0/au",
                        label: "@dataRecord-licence-bynd30au"
                      },
                      {
                        value: "http://creativecommons.org/licenses/by-nc/3.0/au",
                        label: "@dataRecord-licence-bync30au"
                      },
                      {
                        value: "http://creativecommons.org/licenses/by-nc-sa/3.0/au",
                        label: "@dataRecord-licence-byncsa30au"
                      },
                      {
                        value: "http://creativecommons.org/licenses/by/4.0",
                        label: "@dataRecord-licence-by40au"
                      },
                      {
                        value: "http://creativecommons.org/licenses/by-sa/4.0",
                        label: "@dataRecord-licence-bysa40au"
                      },
                      {
                        value: "http://creativecommons.org/licenses/by-nd/4.0",
                        label: "@dataRecord-licence-bynd40au"
                      },
                      {
                        value: "http://creativecommons.org/licenses/by-nc/4.0",
                        label: "@dataRecord-licence-bync40au"
                      },
                      {
                        value: "http://creativecommons.org/licenses/by-nc-sa/4.0",
                        label: "@dataRecord-licence-byncsa40au"
                      },
                      {
                        value: "http://creativecommons.org/licenses/by-nc-nd/4.0",
                        label: "@dataRecord-licence-byncnd40au"
                      },
                      {
                        value: "http://creativecommons.org/licenses/by-nd/4.0",
                        label: "@dataRecord-licence-bynd40au"
                      },
                      {
                        value: "http://opendatacommons.org/licenses/pddl/1.0/",
                        label: "@dataRecord-licence-pddl10"
                      },
                      {
                        value: "http://opendatacommons.org/licenses/odbl/1.0/",
                        label: "@dataRecord-licence-odbl10"
                      }
                    ]
                  }
                },
                {
                  class: 'TextField',
                  editOnly: true,
                  definition: {
                    name: 'otherLicence',
                    label: '@dataRecord-otherLicence',
                    help: '@dataRecord-otherLicence-help',
                    type: 'text'
                  }
                },
                {
                  class: 'TextField',
                  editOnly: true,
                  definition: {
                    name: 'otherLicenceUrl',
                    label: '@dataRecord-otherLicenceUrl',
                    help: '@dataRecord-otherLicenceUrl-help',
                    type: 'text'
                  }
                },
                {
                  class: 'Container',
                  compClass: 'TextBlockComponent',
                  definition: {
                    type: 'hr'
                  }
                },
                {
                  class: 'Container',
                  compClass: 'TextBlockComponent',
                  definition: {
                    value: '@dataRecord-rights-statement',
                    type: 'h4'
                  }
                },
                {
                  class: 'TextField',
                  definition: {
                    name: 'rights',
                    label: '@dataRecord-rights',
                    help: '@dataRecord-rights-help',
                    type: 'text'
                  }
                },
                {
                  class: 'TextField',
                  definition: {
                    name: 'rightsUrl',
                    label: '@dataRecord-rightsUrl',
                    help: '@dataRecord-rightsUrl-help',
                    type: 'text'
                  }
                },
                {
                  class: 'Container',
                  compClass: 'TextBlockComponent',
                  definition: {
                    type: 'hr'
                  }
                },
                {
                  class: 'Container',
                  compClass: 'TextBlockComponent',
                  definition: {
                    value: '@dataRecord-access-conditions',
                    type: 'h4'
                  }
                },
                {
                  class: 'TextField',
                  definition: {
                    name: 'accessConditions',
                    label: '@dataRecord-accessConditions',
                    help: '@dataRecord-accessConditions-help',
                    type: 'text'
                  }
                },
                {
                  class: 'TextField',
                  definition: {
                    name: 'accessConditionsUrl',
                    label: '@dataRecord-accessConditionsUrl',
                    help: '@dataRecord-accessConditionsUrl-help',
                    type: 'text'
                  }
                },
            ]
          }
        },
          // -------------------------------------------------------------------
          // Publication Tab
          // -------------------------------------------------------------------
          {
            class: "Container",
            definition: {
              id: "publication",
              label: "@dataRecord-publication-tab",
              fields: [{
                class: 'Container',
                compClass: 'TextBlockComponent',
                definition: {
                  value: '@dataRecord-publication-heading',
                  type: 'h3'
                }
              },
              {
                class: 'Container',
                compClass: 'TextBlockComponent',
                definition: {
                  value: '@dataRecord-embargo-heading',
                  type: 'h4'
                }
              },
              {
                class: 'SelectionField',
                compClass: 'SelectionFieldComponent',
                definition: {
                  name: 'embargoEnabled',
                  controlType: 'checkbox',
                  options: [{
                      value: "embargoed",
                      label: "@dataRecord-embargoEnabled"
                    }
                  ]
                }
              },
              {
                class: 'DateTime',
                definition: {
                  name: "embargoUntil",
                  label: "@dataRecord-embargoUntil",
                  help: '@dataRecord-embargoUntil-help',
                  datePickerOpts: {
                    format: 'dd/mm/yyyy',
                    icon: 'fa fa-calendar',
                    autoclose: true
                  },
                  timePickerOpts: false,
                  hasClearButton: false,
                  valueFormat: 'YYYY-MM-DD',
                  displayFormat: 'L',
                  publish: {
                    onValueUpdate: {
                      modelEventSource: 'valueChanges'
                    }
                  }
                }
              },
              {
                class: 'TextArea',
                definition: {
                  name: 'embargoNote',
                  label: '@dataRecord-embargoNote'
                }
              }
            ]
            }
          }
        ]
      }
    },
    {
      class: "ButtonBarContainer",
      compClass: "ButtonBarContainerComponent",
      definition: {
        fields: [{
            class: "SaveButton",
            definition: {
              label: 'Save',
              cssClasses: 'btn-success'
            }
          },
          {
            class: "SaveButton",
            definition: {
              label: 'Save & Close',
              closeOnSave: true,
              redirectLocation: '/@branding/@portal/dashboard'
            },
            variableSubstitutionFields: ['redirectLocation']
          },
          {
            class: "CancelButton",
            definition: {
              label: 'Close',
            }
          }
        ]
      }
    },
    {
      class: "Container",
      definition: {
        id: "form-render-complete",
        label: "Test",
        fields: [{
          class: 'Container',
          compClass: 'TextBlockComponent',
          definition: {
            value: 'will be empty',
            type: 'span'
          }
        }]
      }
    }
  ]
};
