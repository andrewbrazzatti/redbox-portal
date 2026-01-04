"use strict";
/**
 * RAiD Configuration
 * (sails.config.raid)
 *
 * Configuration for RAiD (Research Activity Identifier) integration.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const raidConfig = {
    basePath: 'https://api.stage.raid.org.au',
    token: '',
    saveBodyInMeta: true,
    retryJobName: 'RaidMintRetryJob',
    retryJobSchedule: 'in 5 minutes',
    retryJobMaxAttempts: 5,
    orcidBaseUrl: "https://orcid.org/",
    raidFieldName: 'raidUrl',
    types: {
        title: {
            'Primary': {
                id: "https://vocabulary.raid.org/title.type.schema/5",
                schemaUri: "https://vocabulary.raid.org/title.type.schema/376"
            },
            'Alternative': {
                id: "https://vocabulary.raid.org/title.type.schema/4",
                schemaUri: "https://vocabulary.raid.org/title.type.schema/376"
            },
        },
        description: {
            'Primary': {
                "id": "https://vocabulary.raid.org/description.type.schema/318",
                "schemaUri": "https://vocabulary.raid.org/description.type.schema/320"
            },
            'Alternative': {
                "id": "https://vocabulary.raid.org/description.type.schema/319",
                "schemaUri": "https://vocabulary.raid.org/description.type.schema/320"
            }
        },
        language: {
            'eng': {
                "id": "eng",
                "schemaUri": "https://www.iso.org/standard/74575.html"
            }
        },
        access: {
            'open': {
                "id": "https://vocabularies.coar-repositories.org/access_rights/c_abf2/",
                "schemaUri": "https://vocabularies.coar-repositories.org/access_rights/"
            },
            'closed': {
                "id": "https://vocabularies.coar-repositories.org/access_rights/c_16ec/",
                "schemaUri": "https://vocabularies.coar-repositories.org/access_rights/"
            },
            'embargoed': {
                "id": "https://vocabularies.coar-repositories.org/access_rights/c_f1cf/",
                "schemaUri": "https://vocabularies.coar-repositories.org/access_rights/"
            }
        },
        contributor: {
            position: {
                'PrincipalInvestigator': {
                    "schemaUri": "https://vocabulary.raid.org/contributor.position.schema/305",
                    "id": "https://vocabulary.raid.org/contributor.position.schema/307"
                },
                'CoInvestigator': {
                    "schemaUri": "https://vocabulary.raid.org/contributor.position.schema/305",
                    "id": "https://vocabulary.raid.org/contributor.position.schema/308"
                },
                'PartnerInvestigator': {
                    "schemaUri": "https://vocabulary.raid.org/contributor.position.schema/305",
                    "id": "https://vocabulary.raid.org/contributor.position.schema/309"
                },
                'Consultant': {
                    "schemaUri": "https://vocabulary.raid.org/contributor.position.schema/305",
                    "id": "https://vocabulary.raid.org/contributor.position.schema/310"
                },
                'OtherParticipant': {
                    "schemaUri": "https://vocabulary.raid.org/contributor.position.schema/305",
                    "id": "https://vocabulary.raid.org/contributor.position.schema/311"
                },
                'OtherParticipantDataManager': {
                    "schemaUri": "https://vocabulary.raid.org/contributor.position.schema/305",
                    "id": "https://vocabulary.raid.org/contributor.position.schema/311"
                }
            },
            flags: {
                leader: ['PrincipalInvestigator'],
                contact: ['OtherParticipantDataManager']
            },
            hiearchy: {
                position: ['PrincipalInvestigator', 'CoInvestigator', 'PartnerInvestigator', 'Consultant', 'OtherParticipant']
            },
            roles: {
                schemaUri: "https://credit.niso.org/",
                types: {
                    "Conceptualization": "conceptualization",
                    "DataCuration": "data-curation",
                    "FormalAnalysis": "formal-analysis",
                    "FundingAcquisition": "funding-acquisition",
                    "Investigation": "investigation",
                    "Methodology": "methodology",
                    "ProjectAdministration": "project-administration",
                    "Resources": "resources",
                    "Software": "software",
                    "Supervision": "supervision",
                    "Validation": "validation",
                    "Visualization": "visualization",
                    "WritingOriginalDraft": "writing-original-draft",
                    "WritingReviewEditing": "writing-review-editing"
                }
            }
        },
        organisation: {
            role: {
                'Lead': {
                    "schemaUri": "https://vocabulary.raid.org/organisation.role.schema/359",
                    "id": "https://vocabulary.raid.org/organisation.role.schema/182"
                }
            }
        },
        subject: {
            for: {
                "id": "https://linked.data.gov.au/def/anzsrc-for/2020/",
                "schemaUri": "https://vocabs.ardc.edu.au/viewById/316"
            },
            seo: {
                "id": "https://vocabs.ardc.edu.au/repository/api/lda/anzsrc-2020-seo/resource?https://linked.data.gov.au/def/anzsrc-seo/2020/",
                "schemaUri": "https://vocabs.ardc.edu.au/viewById/316"
            }
        }
    },
    mapping: {
        dmp: {
            title_text: {
                dest: 'title[0].text',
                src: 'metadata.title',
            },
            title_type: {
                dest: 'title[0].type',
                src: '<%= JSON.stringify(types.title.Primary)  %>',
                parseJson: true
            },
            title_lang: {
                dest: 'title[0].language',
                src: '<%= JSON.stringify(types.language.eng)  %>',
                parseJson: true
            },
            title_startDate: {
                dest: 'title[0].startDate',
                src: 'metadata.dc:coverage_vivo:DateTimeInterval_vivo:start',
            },
            title_endDate: {
                dest: 'title[0].endDate',
                src: 'metadata.dc:coverage_vivo:DateTimeInterval_vivo:end'
            },
            date_start: {
                dest: 'date.startDate',
                src: 'metadata.dc:coverage_vivo:DateTimeInterval_vivo:start'
            },
            date_end: {
                dest: 'date.endDate',
                src: 'metadata.dc:coverage_vivo:DateTimeInterval_vivo:end',
            },
            description_main: {
                dest: 'description[0].text',
                src: 'metadata.description',
            },
            description_type: {
                dest: 'description[0].type',
                src: '<%= JSON.stringify(types.description.Primary) %>',
                parseJson: true
            },
            description_lang: {
                dest: 'description[0].language',
                src: '<%= JSON.stringify(types.language.eng)  %>',
                parseJson: true
            },
            access_type: {
                dest: 'access.type',
                src: '<%= JSON.stringify(types.access.open) %>',
                parseJson: true
            },
            access_statement_text: {
                dest: 'access.accessStatement.text',
                src: '<%= record.metadata["dc:accessRights"] %>'
            },
            access_statement_lang: {
                dest: 'access.accessStatement.language',
                src: '<%= JSON.stringify(types.language.eng) %>',
                parseJson: true,
            },
            contributors: {
                dest: 'contributor',
                src: '<%= JSON.stringify(that.getContributors(record, options, fieldConfig, mappedData)) %>',
                parseJson: true,
                contributorMap: {
                    contributor_ci: {
                        fieldMap: { id: 'orcid' },
                        position: 'PrincipalInvestigator',
                        role: 'ProjectAdministration',
                        requireOrcid: true
                    },
                    contributor_data_manager: {
                        fieldMap: { id: 'orcid' },
                        position: 'OtherParticipantDataManager',
                        role: 'ProjectAdministration'
                    },
                    contributors: {
                        fieldMap: { id: 'orcid' },
                        position: 'CoInvestigator',
                        role: 'Investigation'
                    },
                    contributor_supervisor: {
                        fieldMap: { id: 'orcid' },
                        position: 'PartnerInvestigator',
                        role: 'Supervision'
                    }
                }
            },
            organisations_id: {
                dest: 'organisation[0].id',
                src: "<%= 'https://ror.org/03sd43014' %>",
            },
            organisations_identifierSchemaUri: {
                src: "<%= 'https://ror.org/' %>",
                dest: 'organisation[0].schemaUri'
            },
            organisations_roles: {
                dest: 'organisation[0].role',
                src: "<% const roles = [{ schemaUri: types.organisation.role.Lead.schemaUri, id:types.organisation.role.Lead.id, startDate:  mappedData?.date?.startDate, endDate: mappedData?.date?.endDate }]; print(JSON.stringify(roles)) %>",
                parseJson: true,
            },
            subject_for: {
                dest: 'subject',
                src: '<%= JSON.stringify(that.getSubject(record, options, fieldConfig, _.get(mappedData, "subject", []), "for", record.metadata["dc:subject_anzsrc:for"])) %>',
                parseJson: true
            },
        }
    }
};
module.exports.raid = raidConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFpZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2ludGVybmFsL3NhaWxzLXRzL2NvbmZpZy9yYWlkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7R0FLRzs7QUFJSCxNQUFNLFVBQVUsR0FBZTtJQUM3QixRQUFRLEVBQUUsK0JBQStCO0lBQ3pDLEtBQUssRUFBRSxFQUFFO0lBQ1QsY0FBYyxFQUFFLElBQUk7SUFDcEIsWUFBWSxFQUFFLGtCQUFrQjtJQUNoQyxnQkFBZ0IsRUFBRSxjQUFjO0lBQ2hDLG1CQUFtQixFQUFFLENBQUM7SUFDdEIsWUFBWSxFQUFFLG9CQUFvQjtJQUNsQyxhQUFhLEVBQUUsU0FBUztJQUN4QixLQUFLLEVBQUU7UUFDTCxLQUFLLEVBQUU7WUFDTCxTQUFTLEVBQUU7Z0JBQ1QsRUFBRSxFQUFFLGlEQUFpRDtnQkFDckQsU0FBUyxFQUFFLG1EQUFtRDthQUMvRDtZQUNELGFBQWEsRUFBRTtnQkFDYixFQUFFLEVBQUUsaURBQWlEO2dCQUNyRCxTQUFTLEVBQUUsbURBQW1EO2FBQy9EO1NBQ0Y7UUFDRCxXQUFXLEVBQUU7WUFDWCxTQUFTLEVBQUU7Z0JBQ1QsSUFBSSxFQUFFLHlEQUF5RDtnQkFDL0QsV0FBVyxFQUFFLHlEQUF5RDthQUN2RTtZQUNELGFBQWEsRUFBRTtnQkFDYixJQUFJLEVBQUUseURBQXlEO2dCQUMvRCxXQUFXLEVBQUUseURBQXlEO2FBQ3ZFO1NBQ0Y7UUFDRCxRQUFRLEVBQUU7WUFDUixLQUFLLEVBQUU7Z0JBQ0wsSUFBSSxFQUFFLEtBQUs7Z0JBQ1gsV0FBVyxFQUFFLHlDQUF5QzthQUN2RDtTQUNGO1FBQ0QsTUFBTSxFQUFFO1lBQ04sTUFBTSxFQUFFO2dCQUNOLElBQUksRUFBRSxrRUFBa0U7Z0JBQ3hFLFdBQVcsRUFBRSwyREFBMkQ7YUFDekU7WUFDRCxRQUFRLEVBQUU7Z0JBQ1IsSUFBSSxFQUFFLGtFQUFrRTtnQkFDeEUsV0FBVyxFQUFFLDJEQUEyRDthQUN6RTtZQUNE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