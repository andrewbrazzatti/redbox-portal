"use strict";
/**
 * Data Publications configuration
 */
Object.defineProperty(exports, "__esModule", { value: true });
const dataPubsConfig = {
    "rootCollection": {
        targetRepoNamespace: "uts_public_data_repo",
        rootCollectionId: "arcp://name,data_repo/root_collection",
        targetRepoColId: "root_collection",
        targetRepoColName: "",
        targetRepoColDescription: "This is a sample data portal. For any questions, please get in touch with us at info@redboxresearchdata.com.au",
        dsType: ["Dataset", "RepositoryCollection"],
        enableDatasetToUseDefaultLicense: true,
        defaultLicense: {
            "@id": "http://creativecommons.org/licenses/by/4.0",
            "@type": "OrganizationReuseLicense",
            "name": "Attribution 4.0 International (CC BY 4.0)",
            "description": "You are free to share (copy and redistribute the material in any medium or format) and adapt (remix, transform and build upon the material for any purpose, even commercially)."
        },
    },
    "sites": {
        "staging": {
            "useCleanUrl": false,
            "dir": "/opt/oni/staged/ocfl",
            "tempDir": "/opt/oni/staged/temp",
            "url": "http://localhost:11000"
        },
        "public": {
            "useCleanUrl": false,
            "dir": "/opt/oni/public/ocfl",
            "url": "http://localhost:11000/publication"
        }
    },
    "metadata": {
        "html_filename": "ro-crate-preview.html",
        "jsonld_filename": "ro-crate-metadata.jsonld",
        "datapub_json": "datapub.json",
        "identifier_namespace": "public_ocfl",
        "render_script": "",
        "organization": {
            "@id": "https://www.redboxresearchdata.com.au",
            "@type": "Organization",
            "identifier": "https://www.redboxresearchdata.com.au",
            "name": "ReDBox Research Data"
        },
        related_works: [
            { field: 'publications', type: 'ScholarlyArticle' },
            { field: 'websites', type: 'WebSite' },
            { field: 'metadata', type: 'CreativeWork' },
            { field: 'data', type: 'Dataset' },
            { field: 'services', type: 'CreativeWork' }
        ],
        funders: [
            'foaf:fundedBy_foaf:Agent',
            'foaf:fundedBy_vivo:Grant'
        ],
        subjects: [
            'dc:subject_anzsrc:for',
            'dc:subject_anzsrc:seo'
        ],
        DEFAULT_IRI_PREFS: {
            'about': {
                'dc:subject_anzsrc:for': '_:FOR/',
                'dc:subject_anzsrc:seo': '_:SEO/'
            },
            'spatialCoverage': '_:spatial/',
            'funder': '_:funder/',
            'license': '_:license/',
            'citation': '_:citation/',
            'contact': '_:contact/',
            'location': '_:location/'
        }
    }
};
module.exports.datapubs = dataPubsConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXB1YnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9pbnRlcm5hbC9zYWlscy10cy9jb25maWcvZGF0YXB1YnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOztHQUVHOztBQStDSCxNQUFNLGNBQWMsR0FBbUI7SUFDckMsZ0JBQWdCLEVBQUU7UUFDaEIsbUJBQW1CLEVBQUUsc0JBQXNCO1FBQzNDLGdCQUFnQixFQUFFLHVDQUF1QztRQUN6RCxlQUFlLEVBQUUsaUJBQWlCO1FBQ2xDLGlCQUFpQixFQUFFLEVBQUU7UUFDckIsd0JBQXdCLEVBQUUsZ0hBQWdIO1FBQzFJLE1BQU0sRUFBRSxDQUFDLFNBQVMsRUFBRSxzQkFBc0IsQ0FBQztRQUMzQyxnQ0FBZ0MsRUFBRSxJQUFJO1FBQ3RDLGNBQWMsRUFBRTtZQUNkLEtBQUssRUFBRSw0Q0FBNEM7WUFDbkQsT0FBTyxFQUFFLDBCQUEwQjtZQUNuQyxNQUFNLEVBQUUsMkNBQTJDO1lBQ25ELGFBQWEsRUFBRSxpTEFBaUw7U0FDak07S0FDRjtJQUNELE9BQU8sRUFBRTtRQUNQLFNBQVMsRUFBRTtZQUNULGFBQWEsRUFBRSxLQUFLO1lBQ3BCLEtBQUssRUFBRSxzQkFBc0I7WUFDN0IsU0FBUyxFQUFFLHNCQUFzQjtZQUNqQyxLQUFLLEVBQUUsd0JBQXdCO1NBQ2hDO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsYUFBYSxFQUFFLEtBQUs7WUFDcEIsS0FBSyxFQUFFLHNCQUFzQjtZQUM3QixLQUFLLEVBQUUsb0NBQW9DO1NBQzVDO0tBQ0Y7SUFDRCxVQUFVLEVBQUU7UUFDVixlQUFlLEVBQUUsdUJBQXVCO1FBQ3hDLGlCQUFpQixFQUFFLDBCQUEwQjtRQUM3QyxjQUFjLEVBQUUsY0FBYztRQUM5QixzQkFBc0IsRUFBRSxhQUFhO1FBQ3JDLGVBQWUsRUFBRSxFQUFFO1FBQ25CLGNBQWMsRUFBRTtZQUNkLEtBQUssRUFBRSx1Q0FBdUM7WUFDOUMsT0FBTyxFQUFFLGNBQWM7WUFDdkIsWUFBWSxFQUFFLHVDQUF1QztZQUNyRCxNQUFNLEVBQUUsc0JBQXNCO1NBQy9CO1FBQ0QsYUFBYSxFQUFFO1lBQ2IsRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBRSxrQkFBa0IsRUFBRTtZQUNuRCxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRTtZQUN0QyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRTtZQUMzQyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRTtZQUNsQyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRTtTQUM1QztRQUNELE9BQU8sRUFBRTtZQUNQLDBCQUEwQjtZQUMxQiwwQkFBMEI7U0FDM0I7UUFDRCxRQUFRLEVBQUU7WUFDUix1QkFBdUI7WUFDdkIsdUJBQXVCO1NBQ3hCO1FBQ0QsaUJBQWlCLEVBQUU7WUFDakIsT0FBTyxFQUFFO2dCQUNQLHVCQUF1QixFQUFFLFFBQVE7Z0JBQ2pDLHVCQUF1QixFQUFFLFFBQVE7YUFDbEM7WUFDRCxpQkFBaUIsRUFBRSxZQUFZO1lBQy9CLFFBQVEsRUFBRSxXQUFXO1lBQ3JCLFNBQVMsRUFBRSxZQUFZO1lBQ3ZCLFVBQVUsRUFBRSxhQUFhO1lBQ3pCLFNBQVMsRUFBRSxZQUFZO1lBQ3ZCLFVBQVUsRUFBRSxhQUFhO1NBQzFCO0tBQ0Y7Q0FDRixDQUFDO0FBRUYsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsY0FBYyxDQUFDIn0=