"use strict";
/**
 * Figshare API Configuration
 * (sails.config.figshareAPI)
 *
 * Configuration for Figshare integration including mapping rules and templates.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const figshareAPIConfig = {
    frontEndURL: '',
    baseURL: '',
    APIToken: '',
    attachmentsTempDir: '/attachments',
    attachmentsFigshareTempDir: '/attachments/figshare',
    diskSpaceThreshold: 10737418240,
    testMode: false,
    extraVerboseLogging: false,
    testUsers: [],
    testLicenses: [],
    testCategories: [],
    testResponse: {},
    mapping: {
        figshareItemGroupId: 32014,
        figshareItemType: 'dataset',
        figshareAuthorUserId: 'user_id',
        figshareCurationStatus: 'status',
        figshareCurationStatusTargetValue: 'public',
        figshareDisableUpdateByCurationStatus: false,
        figshareNeedsPublishAfterFileUpload: false,
        figshareForceEmbargoUpdateAlways: false,
        figshareOnlyPublishSelectedAttachmentFiles: true,
        figshareOnlyPublishSelectedLocationURLs: true,
        figshareScheduledTransitionRecordWorkflowFromArticlePropertiesJob: {
            enabled: false,
            namedQuery: "",
            targetStep: "",
            paramMap: {},
            figshareTargetFieldKey: "",
            figshareTargetFieldValue: "",
            username: "",
            userType: "",
        },
        recordFigArticleId: 'metadata.figshare_article_id',
        recordFigArticleURL: ['metadata.figshare_article_location'],
        recordDataLocations: 'metadata.dataLocations',
        recordAuthorExternalName: 'text_full_name',
        recordAuthorUniqueBy: 'email',
        response: {
            entityId: 'entity_id',
            location: 'location',
            article: []
        },
        artifacts: {
            figshareItemEmbargoAdminGroupId: 1780
        },
        runtimeArtifacts: {
            getContributorsFromRecord: {
                template: `<% let authors = [];
                     if(!_.isUndefined(record['metadata']['contributor_ci'])) {
                        let contributorCI = record['metadata']['contributor_ci'];
                        authors.push(contributorCI);
                      }
                      let figArtOthers;
                      if(!_.isUndefined(record['metadata']['contributors'])) {
                        figArtOthers = record['metadata']['contributors'];
                        for(let contributor of figArtOthers) {
                          if(!_.isEmpty(contributor['family_name'])) {
                            authors.push(contributor);
                          } else if(!_.isEmpty(contributor['text_full_name'])) {
                            authors.push(contributor);
                          }
                        }
                      }
                      return authors;
                    %>`
            },
            getCategoryIDs: {
                template: `<% let catIDs = [];
                    let dpCategories = _.get(record,'metadata.dc:subject_anzsrc:for',[]);
                    for (let dpCategory of dpCategories) {
                      let dpForNotation = _.get(dpCategory,'notation','');
                      if(dpForNotation.length > 4) {
                        let dpCategoryId = _.find(forCodes, ['FOR2020Code', dpForNotation]);
                        if(!_.isUndefined(dpCategoryId) && _.has(dpCategoryId, 'FigCatId') && dpCategoryId.FigCatId > 0) {
                          catIDs.push(dpCategoryId.FigCatId);
                        }
                      }
                    }
                    return catIDs;
                    %>`
            },
            isRecordEmbargoed: {
                template: `<% if((request['embargo_type'] == 'article' && request['is_embargoed'] == true) || (filesOrURLsAttached && request['embargo_type'] == 'file')) {
                      return true;
                    } else {
                      return false; 
                    }
                   %>`
            },
            isRecordEmbargoCleared: {
                template: `<% if(request['embargo_type'] == 'article' && request['is_embargoed'] == false) {
                      return true;
                    } else {
                      return false; 
                    }
                   %>`
            }
        },
        templates: {
            impersonate: {
                impersonate: 0
            },
            customFields: {
                create: {
                    'Open Access': ['No'],
                    'Full Text URL': ['']
                },
                update: {
                    'Supervisor': '',
                    'Open Access': ['No'],
                    'Start Date': '',
                    'Finish Date': '',
                    'Cultural Warning': '',
                    'Language': '',
                    'Additional Rights': '',
                    'Number and size of Dataset': '',
                    'Medium': '',
                    'Author Research Institute': '',
                    'Geolocation': '',
                    'Full Text URL': ['']
                }
            },
            getAuthor: [
                {
                    institution_user_id: 0,
                    template: `<% let userId = field['dc_identifier'][0];
                        return userId;
                      %>`
                }
            ]
        },
        customFields: {
            path: 'custom_fields',
            create: [
                {
                    figName: 'Open Access',
                    rbName: 'metadata.access-rights',
                    template: `<% let val = ['No'];
                       if(_.get(record,field.rbName,'') == 'Open Access') {
                         val = ['Yes'];
                       }
                       return val;
                      %>`
                },
                {
                    figName: 'Full Text URL',
                    rbName: 'metadata.dataLocations',
                    template: `<% let dataLocations = _.get(record,field.rbName,['']);
                       for(let attachmentFile of dataLocations) {
                         if(!_.isUndefined(attachmentFile) && !_.isEmpty(attachmentFile) && attachmentFile.type == 'url') {
                           return [attachmentFile.location];
                         }
                       }
                       return [''];
                     %>`,
                    validations: [
                        {
                            template: `<% let path = 'custom_fields'; 
                          let val = _.get(request,path,{});
                          let fullTextURL = _.get(val,field.figName,'')[0];
                          if(!_.isEmpty(fullTextURL) && !_.startsWith(fullTextURL, 'http://') && !_.startsWith(fullTextURL, 'https://')) {
                            return false;
                          } else {
                            return true;
                          }
                        %>`,
                            message: '@backend-URL-validationMessage'
                        }
                    ]
                }
            ],
            update: [
                {
                    figName: 'Number and size of Dataset',
                    rbName: 'metadata.dataset-size',
                    defaultValue: '',
                    validations: [{ maxLength: 250, message: '@dataRecord-dataset-size' }]
                },
                {
                    figName: 'Cultural Warning',
                    rbName: 'metadata.-atsi-content',
                    template: '<%= _.get(record,field.rbName,"") == "yes" ? field.defaultValue : "" %>',
                    defaultValue: 'This research output may contain the names and images of Aboriginal and Torres Strait Islander people now deceased. We apologize for any distress that may occur.'
                },
                {
                    figName: 'Medium',
                    rbName: 'metadata.dataset-format',
                    defaultValue: '',
                    validations: [{ maxLength: 250, message: '@dmpt-dataset-format' }]
                },
                {
                    figName: 'Open Access',
                    rbName: 'metadata.access-rights',
                    template: `<% let val = ['No'];
                       if(_.get(record,field.rbName,'') == 'Open Access') {
                         val = ['Yes'];
                       }
                       return val;
                      %>`
                },
                {
                    figName: 'Full Text URL',
                    rbName: 'metadata.dataLocations',
                    template: `<% let dataLocations = _.get(record,field.rbName,['']);
                       for(let attachmentFile of dataLocations) {
                         if(!_.isUndefined(attachmentFile) && !_.isEmpty(attachmentFile) && attachmentFile.type == 'url') {
                           return [attachmentFile.location];
                         }
                       }
                       return [''];
                     %>`,
                    validations: [
                        {
                            template: `<% let path = 'custom_fields'; 
                          let val = _.get(request,path,{});
                          let fullTextURL = _.get(val,field.figName,'')[0];
                          if(!_.isEmpty(fullTextURL) && !_.startsWith(fullTextURL,'http://') && !_.startsWith(fullTextURL,'https://')) {
                            return false;
                          } else {
                            return true;
                          }
                        %>`,
                            message: '@backend-URL-validationMessage'
                        }
                    ]
                },
                {
                    figName: 'Supervisor',
                    rbName: 'metadata.contributor_supervisor',
                    template: `<% let supervisorsStringList = '';
                       let supervisors = _.get(record,field.rbName);
                       if(!_.isUndefined(supervisors)) {
                         for(let supervisor of supervisors) {
                           if(!_.isUndefined(supervisor['text_full_name']) && supervisor['text_full_name'] != null && supervisor['text_full_name'] != 'null') {
                             if(_.isEmpty(supervisorsStringList)) {
                               supervisorsStringList = supervisor['text_full_name'];
                             } else {
                               supervisorsStringList = supervisorsStringList + ', ' + supervisor['text_full_name'];
                             }
                           }
                         }
                       }
                       return supervisorsStringList;
                     %>`,
                    validations: [
                        {
                            template: `<% let path = 'custom_fields'; 
                          let customFields = _.get(request,path,{});
                          let val = _.get(customFields,field.figName,undefined);
                          if(_.isUndefined(val)) {
                            return false;
                          } else {
                            return true;
                          }
                        %>`,
                            message: '@dmpt-people-tab-supervisor',
                            addSuffix: true
                        },
                        { maxLength: 250, message: '@dmpt-people-tab-supervisor' }
                    ]
                },
                {
                    figName: 'Start Date',
                    rbName: 'metadata.startDate',
                    template: `<% let val = '';
                       let startDate = _.get(record,field.rbName,'');
                       if(startDate != '' && startDate != 'Invalid date') {
                         val = startDate;
                       }
                       return val;
                     %>`
                },
                {
                    figName: 'Finish Date',
                    rbName: 'metadata.endDate',
                    template: `<% let val = '';
                       let endDate = _.get(record,field.rbName,'');
                       if(endDate != '' && endDate != 'Invalid date') {
                         val = endDate;
                       }
                       return val;
                     %>`
                },
                {
                    figName: 'Language',
                    rbName: 'metadata.languages',
                    template: `<% let val = '';
                       let languages = _.get(record,field.rbName,[]);
                       for(let language of languages) {
                         if(!_.isEmpty(language)){
                           if(_.isEmpty(val)) {
                             val = language;
                           } else {
                             val = val + ', ' + language;
                           }
                         }
                       }
                       return val;
                     %>`,
                    validations: [{ maxLength: 250, message: '@dataRecord-languages' }]
                },
                {
                    figName: 'Geolocation',
                    rbName: 'metadata.geolocations',
                    template: `<% let val = '';
                       let locationNames = _.get(record,field.rbName,[]);
                       for(let location of locationNames) {
                         let loc = _.get(location,'basic_name','');
                         if(!_.isEmpty(loc)){
                           if(_.isEmpty(val)) {
                             val = loc;
                           } else {
                             val = val + ', ' + loc;
                           }
                         }
                       }
                       return val;
                     %>`,
                    validations: [{ maxLength: 250, message: '@dataRecord-geolocation' }]
                },
                {
                    figName: 'Additional Rights',
                    rbName: 'metadata.third-party-licences',
                    template: `<% let val = '';
                       let thirdPartyLicences = _.get(record,field.rbName,[]);
                       for(let thirdParty of thirdPartyLicences) {
                         if(!_.isEmpty(thirdParty)) {
                           val = thirdParty;
                           return val;
                         }
                       }
                       return val;
                     %>`,
                    validations: [{ maxLength: 1000, message: '@dataRecord-third-party-licences' }]
                },
                {
                    figName: 'Author Research Institute',
                    rbName: 'metadata.research-center',
                    template: `<% let val = [];
                       let researchInstitutes = _.get(record,field.rbName,[]);
                       let authorResearchInstitutes = artifacts.authorResearchInstitute;
                       let figshareAuthorRIs = [];
                       if(!_.isUndefined(authorResearchInstitutes) && !_.isEmpty(authorResearchInstitutes) && !_.isEmpty(researchInstitutes)) {
                          for(let aRI of researchInstitutes) {
                            let aRIMappedFigshareName = _.find(authorResearchInstitutes, ['redboxName', aRI]);
                            if(!_.isUndefined(aRIMappedFigshareName)) {
                              figshareAuthorRIs.push(aRIMappedFigshareName['figshareName']);
                            }
                          }
                          if(!_.isEmpty(figshareAuthorRIs)) {
                            return figshareAuthorRIs;
                          } else {
                            return val; 
                          }
                       }
                       return val;
                     %>`
                }
            ]
        },
        targetState: {
            publish: [
                { figName: 'impersonate', rbName: '', unset: true }
            ]
        },
        upload: {
            attachments: [
                { figName: 'impersonate', rbName: '', unset: true }
            ],
            override: {
                template: `<% let accessRights = _.get(record,'metadata.access-rights');
                      if(accessRights == 'citation'){
                        return true;
                      }
                      return false;
                    %>`
            }
        },
        standardFields: {
            create: [
                {
                    figName: 'impersonate',
                    rbName: '',
                    template: `<% if(!_.isUndefined(runtimeArtifacts) && runtimeArtifacts.length > 0) {
                       let authorPI = runtimeArtifacts[0];
                       accountId = authorPI['id'];
                       return accountId;
                     } else {
                       return '';
                     } %>`,
                    runByNameOnly: true,
                    validations: [
                        {
                            template: `<% let val = _.get(request,field.figName,undefined);
                            if(_.isUndefined(val)) {
                              return false;
                            } else {
                              return true;
                            } %>`,
                            message: '@dataPublication-accountIdNotFound-validationMessage'
                        }
                    ]
                },
                { figName: 'title', rbName: 'metadata.title', defaultValue: '' },
                { figName: 'description', rbName: 'metadata.description', defaultValue: '' },
                { figName: 'keywords', rbName: 'metadata.finalKeywords', defaultValue: [] },
                {
                    figName: 'categories',
                    rbName: '',
                    template: `<% let categories = [];
                        if(!_.isUndefined(runtimeArtifacts) && !_.isEmpty(runtimeArtifacts)){
                          categories = runtimeArtifacts;
                        }
                        return categories;
                       %>`,
                    runByNameOnly: true
                },
                {
                    figName: 'license',
                    rbName: 'metadata.license-identifier',
                    template: `<% let licenseValue = 0;
                          if(!_.isUndefined(runtimeArtifacts) && !_.isEmpty(runtimeArtifacts)) {
                            let figArtLicense = _.get(record,'metadata.license_identifier','');
                            let tmpLic = figArtLicense.replace('https://', '');
                            figArtLicense = tmpLic.replace('http://', '');
                            for (let license of runtimeArtifacts) {
                              if(!_.isUndefined(license.url) && !_.isEmpty(license.url) && license.url.includes(figArtLicense)) {
                                licenseValue = license.value;
                                return _.toNumber(licenseValue);
                              }
                            }
                          }
                          return licenseValue;
                        %>`,
                    runByNameOnly: true,
                    validations: [
                        {
                            template: `<% let val = _.get(request,field.figName,undefined);
                            if(_.isUndefined(val)) {
                              return false;
                            } else {
                              return true;
                            }
                          %>`,
                            message: '@dataPublication-license-identifier',
                            addSuffix: true
                        }
                    ]
                }
            ],
            update: [
                { figName: 'impersonate', rbName: '', unset: true },
                {
                    figName: 'authors',
                    rbName: '',
                    template: `<% let authors = [];
                        if(!_.isUndefined(runtimeArtifacts) && !_.isEmpty(runtimeArtifacts)){
                          authors = runtimeArtifacts;
                        }
                        return authors;
                       %>`,
                    runByNameOnly: true
                },
                { figName: 'title', rbName: 'metadata.title', defaultValue: '' },
                { figName: 'description', rbName: 'metadata.description', defaultValue: '' },
                { figName: 'keywords', rbName: 'metadata.finalKeywords', defaultValue: [''] },
                {
                    figName: 'categories',
                    rbName: '',
                    template: `<% let categories = [];
                        if(!_.isUndefined(runtimeArtifacts) && !_.isEmpty(runtimeArtifacts)){
                          categories = runtimeArtifacts;
                        }
                        return categories;
                       %>`,
                    runByNameOnly: true
                },
                { figName: 'funding', rbName: 'metadata.project-funding', defaultValue: '' },
                {
                    figName: 'resource_title',
                    rbName: 'metadata.related_publications',
                    template: `<% let relatedPublication = _.get(record,field.rbName);
                      if(!_.isEmpty(relatedPublication) && _.isArray(relatedPublication)) {
                        for(let relPub of relatedPublication) {
                          let path = 'related_title';
                          let doiUrl = _.get(relPub,path,'');
                          if(!_.isEmpty(doiUrl)) {
                            return doiUrl;
                          }
                        }
                        return '';
                      } else {
                        return '';
                      } %>`
                },
                {
                    figName: 'resource_doi',
                    rbName: 'metadata.related_publications',
                    template: `<% let relatedPublication = _.get(record,field.rbName);
                      if(!_.isEmpty(relatedPublication) && _.isArray(relatedPublication)) {
                        for(let relPub of relatedPublication) {
                          let path = 'related_url';
                          let doiUrl = _.get(relPub,path,'');
                          if(!_.isEmpty(doiUrl)) {
                            return doiUrl;
                          }
                        }
                        return '';
                      } else {
                        return '';
                      } %>`,
                    validations: [
                        {
                            template: `<% let path = 'resource_title';
                          if(!_.isEmpty(_.get(request,field.figName)) && _.isEmpty(_.get(request,path))) {
                            return false;
                          } else {
                            return true;
                          }
                        %>`,
                            message: '@dataPublication-relatedResources-title-empty'
                        },
                        {
                            regexValidation: '^10.\\d{4,9}\/[-._;()\/:A-Z0-9]+$',
                            caseSensitive: false,
                            message: '@dataPublication-relatedResources-validationMessage',
                            addPrefix: true
                        }
                    ]
                },
                {
                    figName: 'license',
                    rbName: 'metadata.license-identifier',
                    template: `<% let licenseValue = 0;
                          if(!_.isUndefined(runtimeArtifacts) && !_.isEmpty(runtimeArtifacts)) {
                            let figArtLicense = _.get(record,'metadata.license_identifier','');
                            let tmpLic = figArtLicense.replace('https://', '');
                            figArtLicense = tmpLic.replace('http://', '');
                            for (let license of runtimeArtifacts) {
                              if(!_.isUndefined(license.url) && !_.isEmpty(license.url) && license.url.includes(figArtLicense)) {
                                licenseValue = license.value;
                                return _.toNumber(licenseValue);
                              }
                            }
                          }
                          return licenseValue;
                        %>`,
                    runByNameOnly: true,
                    validations: [
                        {
                            template: `<% let val = _.get(request,field.figName,undefined);
                            if(_.isUndefined(val)) {
                              return false;
                            } else {
                              return true;
                            }
                          %>`,
                            message: '@dataPublication-license-identifier',
                            addSuffix: true
                        }
                    ]
                }
            ],
            embargo: [
                {
                    figName: 'is_embargoed',
                    rbName: '',
                    checkChangedBeforeUpdate: true,
                    template: `<% let dataPubAccessRights = record['metadata']['access-rights']; 
                        if(_.has(record,'metadata.full-embargo-until') && !_.isEmpty(record['metadata']['full-embargo-until'])) {
                          return true;
                        } else if (dataPubAccessRights == 'mediated' || 
                          (_.has(record,'metadata.file-embargo-until') && !_.isEmpty(record['metadata']['file-embargo-until']) && dataPubAccessRights != 'citation')) {
                            return true;
                        } else {
                          return false;
                        }
                      %>`
                },
                {
                    figName: 'embargo_date',
                    rbName: '',
                    checkChangedBeforeUpdate: true,
                    template: `<% let dataPubAccessRights = record['metadata']['access-rights'];
                        if(_.has(record,'metadata.full-embargo-until') && !_.isEmpty(record['metadata']['full-embargo-until'])) {
                          let figArtFullEmbargoDate = record['metadata']['full-embargo-until'];
                          return figArtFullEmbargoDate;
                        } else if (dataPubAccessRights == 'mediated' || 
                          (_.has(record,'metadata.file-embargo-until') && !_.isEmpty(record['metadata']['file-embargo-until']) && dataPubAccessRights != 'citation')) {
                            if(dataPubAccessRights == 'mediated') {
                              return '0';
                            } else {
                              let figArtFileEmbargoDate = record['metadata']['file-embargo-until'];
                              return figArtFileEmbargoDate;
                            }
                        } else {
                          return '';
                        }
                      %>`,
                    validations: [
                        {
                            template: `<% let dateFormat = 'YYYY-MM-DD';
                            let dataPubAccessRights = record['metadata']['access-rights'];
                            if(!_.isEmpty(request['embargo_date']) && dataPubAccessRights != 'mediated') {
                              let now = moment().utc().format(dateFormat);
                              let compareDate = moment(request['embargo_date'], dateFormat).utc().format(dateFormat);
                              let isAfter = moment(compareDate).isAfter(now);
                              if(!isAfter) {
                                return false;
                              }
                            }
                            return true;
                           %>`,
                            message: '@dataPublication-embargoDate-validationMessage'
                        }
                    ]
                },
                {
                    figName: 'embargo_type',
                    rbName: '',
                    checkDetailsChanged: true,
                    template: `<% let dataPubAccessRights = record['metadata']['access-rights'];
                        if(_.has(record,'metadata.full-embargo-until') && !_.isEmpty(record['metadata']['full-embargo-until'])) {
                          return 'article';
                        } else if (dataPubAccessRights == 'mediated' || 
                          (_.has(record,'metadata.file-embargo-until') && !_.isEmpty(record['metadata']['file-embargo-until']) && dataPubAccessRights != 'citation')) {
                          return 'file';
                        } else {
                          return 'article';
                        }
                      %>`
                },
                {
                    figName: 'embargo_title',
                    rbName: '',
                    template: `<% let dataPubAccessRights = record['metadata']['access-rights'];
                        if(_.has(record,'metadata.full-embargo-until') && !_.isEmpty(record['metadata']['full-embargo-until'])) {
                          return 'full article embargo';
                        } else if (dataPubAccessRights == 'mediated' || 
                          (_.has(record,'metadata.file-embargo-until') && !_.isEmpty(record['metadata']['file-embargo-until']) && dataPubAccessRights != 'citation')) {
                          return 'files only embargo';
                        } else {
                          return '';
                        }
                      %>`
                },
                {
                    figName: 'embargo_reason',
                    rbName: '',
                    template: `<% let dataPubAccessRights = record['metadata']['access-rights'];
                        if(_.has(record,'metadata.full-embargo-until') && !_.isEmpty(record['metadata']['full-embargo-until'])) {
                          let figArtFullEmbargoReason = record['metadata']['embargo-until-reason'];
                          return figArtFullEmbargoReason;
                        } else if (dataPubAccessRights == 'mediated' || 
                          (_.has(record,'metadata.file-embargo-until') && !_.isEmpty(record['metadata']['file-embargo-until']) && dataPubAccessRights != 'citation')) {
                          let figArtFileEmbargoReason = record['metadata']['embargoNote'];
                          return figArtFileEmbargoReason;
                        } else {
                          return '';
                        }
                      %>`
                },
                {
                    figName: 'embargo_options',
                    rbName: '',
                    template: `<% let embargoOptions = {id: artifacts.figshareItemEmbargoAdminGroupId };
                        return [embargoOptions];
                      %>`
                }
            ]
        }
    }
};
module.exports.figshareAPI = figshareAPIConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlnc2hhcmVBUEkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9pbnRlcm5hbC9zYWlscy10cy9jb25maWcvZmlnc2hhcmVBUEkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7OztHQUtHOztBQUlILE1BQU0saUJBQWlCLEdBQXNCO0lBQzNDLFdBQVcsRUFBRSxFQUFFO0lBQ2YsT0FBTyxFQUFFLEVBQUU7SUFDWCxRQUFRLEVBQUUsRUFBRTtJQUNaLGtCQUFrQixFQUFFLGNBQWM7SUFDbEMsMEJBQTBCLEVBQUUsdUJBQXVCO0lBQ25ELGtCQUFrQixFQUFFLFdBQVc7SUFDL0IsUUFBUSxFQUFFLEtBQUs7SUFDZixtQkFBbUIsRUFBRSxLQUFLO0lBQzFCLFNBQVMsRUFBRSxFQUFFO0lBQ2IsWUFBWSxFQUFFLEVBQUU7SUFDaEIsY0FBYyxFQUFFLEVBQUU7SUFDbEIsWUFBWSxFQUFFLEVBQUU7SUFDaEIsT0FBTyxFQUFFO1FBQ1AsbUJBQW1CLEVBQUUsS0FBSztRQUMxQixnQkFBZ0IsRUFBRSxTQUFTO1FBQzNCLG9CQUFvQixFQUFFLFNBQVM7UUFDL0Isc0JBQXNCLEVBQUUsUUFBUTtRQUNoQyxpQ0FBaUMsRUFBRSxRQUFRO1FBQzNDLHFDQUFxQyxFQUFFLEtBQUs7UUFDNUMsbUNBQW1DLEVBQUUsS0FBSztRQUMxQyxnQ0FBZ0MsRUFBRSxLQUFLO1FBQ3ZDLDBDQUEwQyxFQUFFLElBQUk7UUFDaEQsdUNBQXVDLEVBQUUsSUFBSTtRQUM3QyxpRUFBaUUsRUFBRTtZQUNqRSxPQUFPLEVBQUUsS0FBSztZQUNkLFVBQVUsRUFBRSxFQUFFO1lBQ2QsVUFBVSxFQUFFLEVBQUU7WUFDZCxRQUFRLEVBQUUsRUFBRTtZQUNaLHNCQUFzQixFQUFFLEVBQUU7WUFDMUIsd0JBQXdCLEVBQUUsRUFBRTtZQUM1QixRQUFRLEVBQUUsRUFBRTtZQUNaLFFBQVEsRUFBRSxFQUFFO1NBQ2I7UUFDRCxrQkFBa0IsRUFBRSw4QkFBOEI7UUFDbEQsbUJBQW1C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