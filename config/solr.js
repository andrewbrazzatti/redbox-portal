"use strict";
/**
 * Solr Search Configuration
 * Note: SolrConfig type is in Sails namespace, not exported directly due to conflict with model class
 */
Object.defineProperty(exports, "__esModule", { value: true });
const solrConfig = {
    createOrUpdateJobName: 'SolrSearchService-CreateOrUpdateIndex',
    deleteJobName: 'SolrSearchService-DeleteFromIndex',
    maxWaitTries: 12,
    waitTime: 5000,
    cores: {
        default: {
            options: {
                host: 'solr',
                port: '8983',
                core: 'redbox',
                https: false
            },
            schema: {
                'add-field': [
                    { name: "full_text", type: "text_general", indexed: true, stored: false, multiValued: true },
                    { name: "title", type: "text_general", indexed: true, stored: true, multiValued: false },
                    { name: "description", type: "text_general", indexed: true, stored: true, multiValued: false },
                    { name: "grant_number_name", type: "text_general", indexed: true, stored: true, multiValued: true },
                    { name: "finalKeywords", type: "text_general", indexed: true, stored: true, multiValued: true },
                    { name: "text_title", type: "text_general", indexed: true, stored: true, multiValued: true },
                    { name: "text_description", type: "text_general", indexed: true, stored: true, multiValued: true },
                    { name: "authorization_view", type: "text_general", indexed: true, stored: true, multiValued: true },
                    { name: "authorization_edit", type: "text_general", indexed: true, stored: true, multiValued: true },
                    { name: "authorization_viewPending", type: "text_general", indexed: true, stored: true, multiValued: true },
                    { name: "authorization_editPending", type: "text_general", indexed: true, stored: true, multiValued: true },
                    { name: "redboxOid", type: "text_general", indexed: true, stored: true, multiValued: false },
                    { name: "authorization_viewRoles", type: "text_general", indexed: true, stored: true, multiValued: true },
                    { name: "authorization_editRoles", type: "text_general", indexed: true, stored: true, multiValued: true },
                    { name: "metaMetadata_brandId", type: "text_general", indexed: true, stored: true, multiValued: false },
                    { name: "metaMetadata_type", type: "text_general", indexed: true, stored: true, multiValued: false },
                    { name: "workflow_stageLabel", type: "text_general", indexed: true, stored: true, multiValued: false },
                    { name: "workflow_step", type: "text_general", indexed: true, stored: true, multiValued: false }
                ],
                'add-dynamic-field': [
                    { name: "date_*", type: "pdate", indexed: true, stored: true }
                ],
                'add-copy-field': [
                    { source: "*", dest: "full_text" },
                    { source: 'title', dest: 'text_title' },
                    { source: 'description', dest: 'text_description' }
                ]
            },
            preIndex: {
                move: [
                    { source: 'metadata', dest: '' }
                ],
                copy: [
                    { source: 'metaMetadata.createdOn', dest: 'date_object_created' },
                    { source: 'lastSaveDate', dest: 'date_object_modified' }
                ],
                flatten: {
                    special: [
                        { source: 'workflow', options: { safe: false, delimiter: '_' } },
                        { source: 'authorization', options: { safe: true, delimiter: '_' } },
                        { source: 'metaMetadata', options: { safe: false, delimiter: '_' } },
                        { source: 'metadata.finalKeywords', dest: 'finalKeywords', options: { safe: true } }
                    ]
                }
            },
            initSchemaFlag: {
                name: 'schema_initialised',
                type: 'text_general',
                stored: false,
                required: false
            }
        }
    }
};
module.exports.solr = solrConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29sci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2ludGVybmFsL3NhaWxzLXRzL2NvbmZpZy9zb2xyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7O0dBR0c7O0FBRUgsTUFBTSxVQUFVLEdBQXFCO0lBQ25DLHFCQUFxQixFQUFFLHVDQUF1QztJQUM5RCxhQUFhLEVBQUUsbUNBQW1DO0lBQ2xELFlBQVksRUFBRSxFQUFFO0lBQ2hCLFFBQVEsRUFBRSxJQUFJO0lBQ2QsS0FBSyxFQUFFO1FBQ0wsT0FBTyxFQUFFO1lBQ1AsT0FBTyxFQUFFO2dCQUNQLElBQUksRUFBRSxNQUFNO2dCQUNaLElBQUksRUFBRSxNQUFNO2dCQUNaLElBQUksRUFBRSxRQUFRO2dCQUNkLEtBQUssRUFBRSxLQUFLO2FBQ2I7WUFDRCxNQUFNLEVBQUU7Z0JBQ04sV0FBVyxFQUFFO29CQUNYLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFO29CQUM1RixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRTtvQkFDeEYsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUU7b0JBQzlGLEVBQUUsSUFBSSxFQUFFLG1CQUFtQixFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUU7b0JBQ25HLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFO29CQUMvRixFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRTtvQkFDNUYsRUFBRSxJQUFJLEVBQUUsa0JBQWtCLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRTtvQkFDbEcsRUFBRSxJQUFJLEVBQUUsb0JBQW9CLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRTtvQkFDcEcsRUFBRSxJQUFJLEVBQUUsb0JBQW9CLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRTtvQkFDcEcsRUFBRSxJQUFJLEVBQUUsMkJBQTJCLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRTtvQkFDM0csRUFBRSxJQUFJLEVBQUUsMkJBQTJCLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRTtvQkFDM0csRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUU7b0JBQzVGLEVBQUUsSUFBSSxFQUFFLHlCQUF5QixFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUU7b0JBQ3pHLEVBQUUsSUFBSSxFQUFFLHlCQUF5QixFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUU7b0JBQ3pHLEVBQUUsSUFBSSxFQUFFLHNCQUFzQixFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUU7b0JBQ3ZHLEVBQUUsSUFBSSxFQUFFLG1CQUFtQixFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUU7b0JBQ3BHLEVBQUUsSUFBSSxFQUFFLHFCQUFxQixFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUU7b0JBQ3RHLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFO2lCQUNqRztnQkFDRCxtQkFBbUIsRUFBRTtvQkFDbkIsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO2lCQUMvRDtnQkFDRCxnQkFBZ0IsRUFBRTtvQkFDaEIsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUU7b0JBQ2xDLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFO29CQUN2QyxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLGtCQUFrQixFQUFFO2lCQUNwRDthQUNGO1lBQ0QsUUFBUSxFQUFFO2dCQUNSLElBQUksRUFBRTtvQkFDSixFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtpQkFDakM7Z0JBQ0QsSUFBSSxFQUFFO29CQUNKLEVBQUUsTUFBTSxFQUFFLHdCQUF3QixFQUFFLElBQUksRUFBRSxxQkFBcUIsRUFBRTtvQkFDakUsRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBRSxzQkFBc0IsRUFBRTtpQkFDekQ7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLE9BQU8sRUFBRTt3QkFDUCxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLEVBQUU7d0JBQ2hFLEVBQUUsTUFBTSxFQUFFLGVBQWUsRUFBRSxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsRUFBRTt3QkFDcEUsRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFFLE9BQU8sRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxFQUFFO3dCQUNwRSxFQUFFLE1BQU0sRUFBRSx3QkFBd0IsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLE9BQU8sRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRTtxQkFDckY7aUJBQ0Y7YUFDRjtZQUNELGNBQWMsRUFBRTtnQkFDZCxJQUFJLEVBQUUsb0JBQW9CO2dCQUMxQixJQUFJLEVBQUUsY0FBYztnQkFDcEIsTUFBTSxFQUFFLEtBQUs7Z0JBQ2IsUUFBUSxFQUFFLEtBQUs7YUFDaEI7U0FDRjtLQUNGO0NBQ0YsQ0FBQztBQUVGLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyJ9