"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dashboardTypeConfig = {
    'standard': {
        formatRules: {
            filterBy: {},
            filterWorkflowStepsBy: [],
            queryFilters: {
                party: [
                    {
                        filterType: 'text',
                        filterFields: [
                            { name: 'Title', path: 'metadata.title' },
                            { name: 'Contributor', path: 'metadata.contributor_ci.text_full_name' }
                        ]
                    }
                ],
                rdmp: [
                    {
                        filterType: 'text',
                        filterFields: [
                            { name: 'Title', path: 'metadata.title' },
                            { name: 'Contributor', path: 'metadata.contributor_ci.text_full_name' }
                        ]
                    }
                ],
                dataRecord: [
                    {
                        filterType: 'text',
                        filterFields: [
                            { name: 'Title', path: 'metadata.title' },
                            { name: 'Contributor', path: 'metadata.contributor_ci.text_full_name' }
                        ]
                    }
                ],
                dataPublication: [
                    {
                        filterType: 'text',
                        filterFields: [
                            { name: 'Title', path: 'metadata.title' },
                            { name: 'Contributor', path: 'metadata.contributor_ci.text_full_name' }
                        ]
                    }
                ]
            },
            groupBy: '',
            sortGroupBy: [],
            hideWorkflowStepTitleForRecordType: ['party']
        }
    },
    'workspace': {
        formatRules: {
            filterBy: {},
            recordTypeFilterBy: 'existing-locations',
            filterWorkflowStepsBy: ['existing-locations-draft'],
            queryFilters: {
                'workspace': [
                    {
                        filterType: 'text',
                        filterFields: [
                            { name: 'Title', path: 'metadata.title' }
                        ]
                    }
                ]
            },
            groupBy: '',
            sortGroupBy: [],
            hideWorkflowStepTitleForRecordType: []
        }
    },
    'consolidated': {
        formatRules: {
            filterBy: { filterBase: 'record', filterBaseFieldOrValue: 'rdmp', filterField: 'metaMetadata.type', filterMode: 'equal' },
            filterWorkflowStepsBy: ['consolidated'],
            sortBy: '',
            groupBy: 'groupedByRelationships',
            sortGroupBy: [
                { rowLevel: 0, compareFieldValue: 'rdmp', compareField: 'metadata.metaMetadata.type', relatedTo: '' },
                { rowLevel: 1, compareFieldValue: 'dataRecord', compareField: 'metadata.metaMetadata.type', relatedTo: 'metadata.metadata.rdmp.oid' },
                { rowLevel: 2, compareFieldValue: 'dataPublication', compareField: 'metadata.metaMetadata.type', relatedTo: 'metadata.metadata.dataRecord.oid' }
            ],
            hideWorkflowStepTitleForRecordType: []
        }
    }
};
module.exports.dashboardtype = dashboardTypeConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaGJvYXJkdHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2ludGVybmFsL3NhaWxzLXRzL2NvbmZpZy9kYXNoYm9hcmR0eXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBS0EsTUFBTSxtQkFBbUIsR0FBd0I7SUFDL0MsVUFBVSxFQUFFO1FBQ1YsV0FBVyxFQUFFO1lBQ1gsUUFBUSxFQUFFLEVBQUU7WUFDWixxQkFBcUIsRUFBRSxFQUFFO1lBQ3pCLFlBQVksRUFBRTtnQkFDWixLQUFLLEVBQUU7b0JBQ0w7d0JBQ0UsVUFBVSxFQUFFLE1BQU07d0JBQ2xCLFlBQVksRUFBRTs0QkFDWixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFOzRCQUN6QyxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLHdDQUF3QyxFQUFFO3lCQUN4RTtxQkFDRjtpQkFDRjtnQkFDRCxJQUFJLEVBQUU7b0JBQ0o7d0JBQ0UsVUFBVSxFQUFFLE1BQU07d0JBQ2xCLFlBQVksRUFBRTs0QkFDWixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFOzRCQUN6QyxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLHdDQUF3QyxFQUFFO3lCQUN4RTtxQkFDRjtpQkFDRjtnQkFDRCxVQUFVLEVBQUU7b0JBQ1Y7d0JBQ0UsVUFBVSxFQUFFLE1BQU07d0JBQ2xCLFlBQVksRUFBRTs0QkFDWixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFOzRCQUN6QyxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLHdDQUF3QyxFQUFFO3lCQUN4RTtxQkFDRjtpQkFDRjtnQkFDRCxlQUFlLEVBQUU7b0JBQ2Y7d0JBQ0UsVUFBVSxFQUFFLE1BQU07d0JBQ2xCLFlBQVksRUFBRTs0QkFDWixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFOzRCQUN6QyxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLHdDQUF3QyxFQUFFO3lCQUN4RTtxQkFDRjtpQkFDRjthQUNGO1lBQ0QsT0FBTyxFQUFFLEVBQUU7WUFDWCxXQUFXLEVBQUUsRUFBRTtZQUNmLGtDQUFrQyxFQUFFLENBQUMsT0FBTyxDQUFDO1NBQzlDO0tBQ0Y7SUFDRCxXQUFXLEVBQUU7UUFDWCxXQUFXLEVBQUU7WUFDWCxRQUFRLEVBQUUsRUFBRTtZQUNaLGtCQUFrQixFQUFFLG9CQUFvQjtZQUN4QyxxQkFBcUIsRUFBRSxDQUFDLDBCQUEwQixDQUFDO1lBQ25ELFlBQVksRUFBRTtnQkFDWixXQUFXLEVBQUU7b0JBQ1g7d0JBQ0UsVUFBVSxFQUFFLE1BQU07d0JBQ2xCLFlBQVksRUFBRTs0QkFDWixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFO3lCQUMxQztxQkFDRjtpQkFDRjthQUNGO1lBQ0QsT0FBTyxFQUFFLEVBQUU7WUFDWCxXQUFXLEVBQUUsRUFBRTtZQUNmLGtDQUFrQyxFQUFFLEVBQUU7U0FDdkM7S0FDRjtJQUNELGNBQWMsRUFBRTtRQUNkLFdBQVcsRUFBRTtZQUNYLFFBQVEsRUFBRSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFO1lBQ3pILHFCQUFxQixFQUFFLENBQUMsY0FBYyxDQUFDO1lBQ3ZDLE1BQU0sRUFBRSxFQUFFO1lBQ1YsT0FBTyxFQUFFLHdCQUF3QjtZQUNqQyxXQUFXLEVBQUU7Z0JBQ1gsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsNEJBQTRCLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRTtnQkFDckcsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLGlCQUFpQixFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsNEJBQTRCLEVBQUUsU0FBUyxFQUFFLDRCQUE0QixFQUFFO2dCQUNySSxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsaUJBQWlCLEVBQUUsaUJBQWlCLEVBQUUsWUFBWSxFQUFFLDRCQUE0QixFQUFFLFNBQVMsRUFBRSxrQ0FBa0MsRUFBRTthQUNqSjtZQUNELGtDQUFrQyxFQUFFLEVBQUU7U0FDdkM7S0FDRjtDQUNGLENBQUM7QUFFRixNQUFNLENBQUMsT0FBTyxDQUFDLGFBQWEsR0FBRyxtQkFBbUIsQ0FBQyJ9