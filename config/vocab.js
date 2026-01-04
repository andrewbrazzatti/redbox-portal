"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const baseUrl = "https://geonames.redboxresearchdata.com.au/select";
const geonamesDefault = new URLSearchParams();
geonamesDefault.set("timeAllowed", "1000");
geonamesDefault.set("rows", "7");
// A - country, state, region; H - stream, lake; P - city, village; T - mountain, rock
geonamesDefault.set("fq", "((feature_class:P AND -population:0) OR feature_class:H OR feature_class:T OR feature_class:A)");
// prioritise the country, region, city names
geonamesDefault.set("defType", "edismax");
geonamesDefault.set("bq", "feature_code:COUNTRY^1.5 feature_class:A^2.0 feature_class:P^2.0");
const geonamesCountry = new URLSearchParams();
geonamesCountry.set("timeAllowed", "1000");
geonamesCountry.set("rows", "7");
geonamesCountry.set("fq", "feature_class:A AND feature_code:COUNTRY");
// Note: VocabConfig type is in Sails namespace, not exported directly due to conflict with model class
const vocabConfig = {
    clientUri: 'vocab',
    collectionUri: 'collection',
    userRootUri: 'user/find',
    clientCacheExpiry: 86400, // 1 day in seconds
    // bootStrapVocabs: ['anzsrc-for', 'anzsrc-seo'],
    bootStrapVocabs: [], // disable vocab pre-load as we're now hitting ANDs API endpoints directly from the for form
    rootUrl: 'http://vocabs.ardc.edu.au/repository/api/lda/',
    conceptUri: 'concept.json?_view=all',
    cacheExpiry: 31536000, // one year in seconds
    external: {
        geonames: {
            // 'geonames' provides a search for all places in the world
            method: "get",
            url: `${baseUrl}?q=basic_name%3A\${query}*&${geonamesDefault.toString()}`,
            options: {},
        },
        geonamesCountries: {
            // 'geonamesCountries' provides a search for all country names
            method: "get",
            url: `${baseUrl}?q=basic_name%3A\${query}*&${geonamesCountry.toString()}`,
            options: {},
        },
    },
    queries: {
        party: {
            querySource: 'solr',
            searchQuery: {
                searchCore: 'default',
                baseQuery: 'metaMetadata_type:rdmp'
            },
            queryField: {
                property: 'title',
                type: 'text'
            },
            resultObjectMapping: {
                fullName: '<%= _.get(record,"contributor_ci.text_full_name","") %>',
                email: '<%= _.get(record,"contributor_ci.email","") %>',
                orcid: '<%= _.get(record,"contributor_ci.orcid","") %>'
            }
        },
        rdmp: {
            querySource: 'database',
            databaseQuery: {
                queryName: 'listRDMPRecords',
            },
            queryField: {
                property: 'title',
                type: 'text'
            }
        }
    }
};
module.exports.vocab = vocabConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidm9jYWIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9pbnRlcm5hbC9zYWlscy10cy9jb25maWcvdm9jYWIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxNQUFNLE9BQU8sR0FBRyxtREFBbUQsQ0FBQztBQUVwRSxNQUFNLGVBQWUsR0FBRyxJQUFJLGVBQWUsRUFBRSxDQUFDO0FBQzlDLGVBQWUsQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQzNDLGVBQWUsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQ2pDLHNGQUFzRjtBQUN0RixlQUFlLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxnR0FBZ0csQ0FBQyxDQUFDO0FBQzVILDZDQUE2QztBQUM3QyxlQUFlLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztBQUMxQyxlQUFlLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxrRUFBa0UsQ0FBQyxDQUFDO0FBRTlGLE1BQU0sZUFBZSxHQUFHLElBQUksZUFBZSxFQUFFLENBQUM7QUFDOUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDM0MsZUFBZSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDakMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsMENBQTBDLENBQUMsQ0FBQztBQUV0RSx1R0FBdUc7QUFDdkcsTUFBTSxXQUFXLEdBQXNCO0lBQ3JDLFNBQVMsRUFBRSxPQUFPO0lBQ2xCLGFBQWEsRUFBRSxZQUFZO0lBQzNCLFdBQVcsRUFBRSxXQUFXO0lBQ3hCLGlCQUFpQixFQUFFLEtBQUssRUFBRSxtQkFBbUI7SUFDN0MsaURBQWlEO0lBQ2pELGVBQWUsRUFBRSxFQUFFLEVBQUUsNEZBQTRGO0lBQ2pILE9BQU8sRUFBRSwrQ0FBK0M7SUFDeEQsVUFBVSxFQUFFLHdCQUF3QjtJQUNwQyxXQUFXLEVBQUUsUUFBUSxFQUFFLHNCQUFzQjtJQUM3QyxRQUFRLEVBQUU7UUFDUixRQUFRLEVBQUU7WUFDUiwyREFBMkQ7WUFDM0QsTUFBTSxFQUFFLEtBQUs7WUFDYixHQUFHLEVBQUUsR0FBRyxPQUFPLDhCQUE4QixlQUFlLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDekUsT0FBTyxFQUFFLEVBQUU7U0FDWjtRQUNELGlCQUFpQixFQUFFO1lBQ2pCLDhEQUE4RDtZQUM5RCxNQUFNLEVBQUUsS0FBSztZQUNiLEdBQUcsRUFBRSxHQUFHLE9BQU8sOEJBQThCLGVBQWUsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUN6RSxPQUFPLEVBQUUsRUFBRTtTQUNaO0tBQ0Y7SUFDRCxPQUFPLEVBQUU7UUFDUCxLQUFLLEVBQUU7WUFDTCxXQUFXLEVBQUUsTUFBTTtZQUNuQixXQUFXLEVBQUU7Z0JBQ1gsVUFBVSxFQUFFLFNBQVM7Z0JBQ3JCLFNBQVMsRUFBRSx3QkFBd0I7YUFDcEM7WUFDRCxVQUFVLEVBQUU7Z0JBQ1YsUUFBUSxFQUFFLE9BQU87Z0JBQ2pCLElBQUksRUFBRSxNQUFNO2FBQ2I7WUFDRCxtQkFBbUIsRUFBRTtnQkFDbkIsUUFBUSxFQUFFLHlEQUF5RDtnQkFDbkUsS0FBSyxFQUFFLGdEQUFnRDtnQkFDdkQsS0FBSyxFQUFFLGdEQUFnRDthQUN4RDtTQUNGO1FBQ0QsSUFBSSxFQUFFO1lBQ0osV0FBVyxFQUFFLFVBQVU7WUFDdkIsYUFBYSxFQUFFO2dCQUNiLFNBQVMsRUFBRSxpQkFBaUI7YUFDN0I7WUFDRCxVQUFVLEVBQUU7Z0JBQ1YsUUFBUSxFQUFFLE9BQU87Z0JBQ2pCLElBQUksRUFBRSxNQUFNO2FBQ2I7U0FDRjtLQUNGO0NBQ0YsQ0FBQztBQUVGLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQyJ9