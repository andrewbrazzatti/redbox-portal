"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const agendaQueueConfig = {
    // options: {
    //  see: https://github.com/agenda/agenda#configuring-an-agenda
    // }
    // e.g. :
    // jobs: [
    //   {
    //     name: 'sampleJob',
    //     fnName: 'agendaqueueservice.sampleFunctionToDemonstrateHowToDefineAJobFunction',
    //     schedule: {
    //       method: 'every',
    //       intervalOrSchedule: '1 minute',
    //       data: 'sample log string'
    //     }
    //   }
    // ]
    jobs: [
        {
            name: 'SolrSearchService-CreateOrUpdateIndex',
            fnName: 'solrsearchservice.solrAddOrUpdate',
            options: {
                lockLifetime: 3 * 1000, // 3 seconds max runtime
                lockLimit: 1,
                concurrency: 1
            }
        },
        {
            name: 'SolrSearchService-DeleteFromIndex',
            fnName: 'solrsearchservice.solrDelete',
            options: {
                lockLifetime: 3 * 1000, // 3 seconds max runtime
                lockLimit: 1,
                concurrency: 1
            }
        },
        {
            name: 'RecordsService-StoreRecordAudit',
            fnName: 'recordsservice.storeRecordAudit',
            options: {
                lockLifetime: 30 * 1000,
                lockLimit: 1,
                concurrency: 1
            }
        },
        {
            name: 'RaidMintRetryJob',
            fnName: 'raidservice.mintRetryJob'
        },
        {
            name: 'MoveCompletedJobsToHistory',
            fnName: 'agendaqueueservice.moveCompletedJobsToHistory',
            schedule: {
                method: 'every',
                intervalOrSchedule: '5 minutes'
            }
        },
        {
            name: 'Figshare-PublishAfterUpload-Service',
            fnName: 'figshareservice.publishAfterUploadFilesJob',
            options: {
                lockLifetime: 120 * 1000, // 120 seconds max runtime
                lockLimit: 1,
                concurrency: 1
            }
        },
        {
            name: 'Figshare-UploadedFilesCleanup-Service',
            fnName: 'figshareservice.deleteFilesFromRedbox',
            options: {
                lockLifetime: 120 * 1000, // 120 seconds max runtime
                lockLimit: 1,
                concurrency: 1
            }
        }
    ]
};
module.exports.agendaQueue = agendaQueueConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWdlbmRhUXVldWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9pbnRlcm5hbC9zYWlscy10cy9jb25maWcvYWdlbmRhUXVldWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxNQUFNLGlCQUFpQixHQUFzQjtJQUMzQyxhQUFhO0lBQ2IsK0RBQStEO0lBQy9ELElBQUk7SUFDSixTQUFTO0lBQ1QsVUFBVTtJQUNWLE1BQU07SUFDTix5QkFBeUI7SUFDekIsdUZBQXVGO0lBQ3ZGLGtCQUFrQjtJQUNsQix5QkFBeUI7SUFDekIsd0NBQXdDO0lBQ3hDLGtDQUFrQztJQUNsQyxRQUFRO0lBQ1IsTUFBTTtJQUNOLElBQUk7SUFDSixJQUFJLEVBQUU7UUFDSjtZQUNFLElBQUksRUFBRSx1Q0FBdUM7WUFDN0MsTUFBTSxFQUFFLG1DQUFtQztZQUMzQyxPQUFPLEVBQUU7Z0JBQ1AsWUFBWSxFQUFFLENBQUMsR0FBRyxJQUFJLEVBQUUsd0JBQXdCO2dCQUNoRCxTQUFTLEVBQUUsQ0FBQztnQkFDWixXQUFXLEVBQUUsQ0FBQzthQUNmO1NBQ0Y7UUFDRDtZQUNFLElBQUksRUFBRSxtQ0FBbUM7WUFDekMsTUFBTSxFQUFFLDhCQUE4QjtZQUN0QyxPQUFPLEVBQUU7Z0JBQ1AsWUFBWSxFQUFFLENBQUMsR0FBRyxJQUFJLEVBQUUsd0JBQXdCO2dCQUNoRCxTQUFTLEVBQUUsQ0FBQztnQkFDWixXQUFXLEVBQUUsQ0FBQzthQUNmO1NBQ0Y7UUFDRDtZQUNFLElBQUksRUFBRSxpQ0FBaUM7WUFDdkMsTUFBTSxFQUFFLGlDQUFpQztZQUN6QyxPQUFPLEVBQUU7Z0JBQ1AsWUFBWSxFQUFFLEVBQUUsR0FBRyxJQUFJO2dCQUN2QixTQUFTLEVBQUUsQ0FBQztnQkFDWixXQUFXLEVBQUUsQ0FBQzthQUNmO1NBQ0Y7UUFDRDtZQUNFLElBQUksRUFBRSxrQkFBa0I7WUFDeEIsTUFBTSxFQUFFLDBCQUEwQjtTQUNuQztRQUNEO1lBQ0UsSUFBSSxFQUFFLDRCQUE0QjtZQUNsQyxNQUFNLEVBQUUsK0NBQStDO1lBQ3ZELFFBQVEsRUFBRTtnQkFDUixNQUFNLEVBQUUsT0FBTztnQkFDZixrQkFBa0IsRUFBRSxXQUFXO2FBQ2hDO1NBQ0Y7UUFDRDtZQUNFLElBQUksRUFBRSxxQ0FBcUM7WUFDM0MsTUFBTSxFQUFFLDRDQUE0QztZQUNwRCxPQUFPLEVBQUU7Z0JBQ1AsWUFBWSxFQUFFLEdBQUcsR0FBRyxJQUFJLEVBQUUsMEJBQTBCO2dCQUNwRCxTQUFTLEVBQUUsQ0FBQztnQkFDWixXQUFXLEVBQUUsQ0FBQzthQUNmO1NBQ0Y7UUFDRDtZQUNFLElBQUksRUFBRSx1Q0FBdUM7WUFDN0MsTUFBTSxFQUFFLHVDQUF1QztZQUMvQyxPQUFPLEVBQUU7Z0JBQ1AsWUFBWSxFQUFFLEdBQUcsR0FBRyxJQUFJLEVBQUUsMEJBQTBCO2dCQUNwRCxTQUFTLEVBQUUsQ0FBQztnQkFDWixXQUFXLEVBQUUsQ0FBQzthQUNmO1NBQ0Y7S0FDRjtDQUNGLENBQUM7QUFFRixNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBRyxpQkFBaUIsQ0FBQyJ9