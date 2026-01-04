"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const recordConfig = {
    auditing: {
        enabled: true,
        recordAuditJobName: 'RecordsService-StoreRecordAudit'
    },
    baseUrl: {
        redbox: "http://localhost:9000/redbox",
        mint: "https://demo.redboxresearchdata.com.au/mint"
    },
    maxUploadSize: 1073741824,
    mongodbDisk: '/attachments', //volume name as seen from within the docker container /attachments == /mnt/data
    diskSpaceThreshold: 10737418240, //set diskSpaceThreshold to a reasonable amount of space on disk that will be left free as a safety buffer
    api: {
        create: { method: 'post', url: "/api/v1/object/$packageType" },
        search: { method: 'get', url: "/api/v1/search" },
        query: { method: 'post', url: "/api/v2/query" },
        getMeta: { method: 'get', url: "/api/v1/recordmetadata/$oid" },
        info: { method: 'get', url: "/api/v1/info" },
        updateMeta: { method: 'post', url: "/api/v1/recordmetadata/$oid" },
        harvest: { method: 'post', url: "/api/v1.1/harvest/$packageType" },
        getDatastream: { method: 'get', url: "/api/v1/datastream/$oid", readTimeout: 120000 },
        addDatastream: { method: 'post', url: "/api/v1/datastream/$oid" },
        removeDatastream: { method: 'delete', url: "/api/v1/datastream/$oid" },
        addDatastreams: { method: 'put', url: "/api/v1/datastream/$oid" },
        addAndRemoveDatastreams: { method: 'patch', url: "/api/v1/datastream/$oid" },
        listDatastreams: { method: 'get', url: "/api/v2/datastream/$oid/list" },
        getRecordRelationships: { method: 'post', url: "/api/v2/recordmetadata/$oid/relationships" },
        delete: { method: 'delete', url: "/api/v1/object/$oid/delete" }
    },
    customFields: {
        '@branding': {
            source: 'request',
            type: 'session',
            field: 'branding'
        },
        '@portal': {
            source: 'request',
            type: 'session',
            field: 'portal'
        },
        '@oid': {
            source: 'request',
            type: 'param',
            field: 'oid'
        },
        '@user_name': {
            source: 'request',
            type: 'user',
            field: 'name'
        },
        '@user_email': {
            source: 'request',
            type: 'user',
            field: 'email'
        },
        '@user_username': {
            source: 'request',
            type: 'user',
            field: 'username'
        },
        '@referrer_rdmp': {
            source: 'request',
            type: 'header',
            field: 'referrer',
            parseUrl: true,
            searchParams: 'rdmp'
        },
        '@metadata': {
            source: 'metadata'
        },
        '@record': {
            source: 'record'
        }
    },
    export: {
        maxRecords: 20
    },
    transfer: {
        maxRecordsPerPage: 1000000
    },
    search: {
        returnFields: ['title', 'description', 'storage_id'],
        maxRecordsPerPage: 1000000
    },
    attachments: {
        stageDir: '/attachments/staging',
        path: '/attach'
    },
    // Set Datastream output source by specifing service, defaults to Mongo GridFS
    // datastreamService: 'datastreamservice'
    helpEmail: 'support@redboxresearchdata.com.au'
};
module.exports.record = recordConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjb3JkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vaW50ZXJuYWwvc2FpbHMtdHMvY29uZmlnL3JlY29yZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLE1BQU0sWUFBWSxHQUFpQjtJQUNqQyxRQUFRLEVBQUU7UUFDUixPQUFPLEVBQUUsSUFBSTtRQUNiLGtCQUFrQixFQUFFLGlDQUFpQztLQUN0RDtJQUNELE9BQU8sRUFBRTtRQUNQLE1BQU0sRUFBRSw4QkFBOEI7UUFDdEMsSUFBSSxFQUFFLDZDQUE2QztLQUNwRDtJQUNELGFBQWEsRUFBRSxVQUFVO0lBQ3pCLFdBQVcsRUFBRSxjQUFjLEVBQUUsZ0ZBQWdGO0lBQzdHLGtCQUFrQixFQUFFLFdBQVcsRUFBRSwwR0FBMEc7SUFDM0ksR0FBRyxFQUFFO1FBQ0gsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsNkJBQTZCLEVBQUU7UUFDOUQsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsZ0JBQWdCLEVBQUU7UUFDaEQsS0FBSyxFQUFFLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsZUFBZSxFQUFFO1FBQy9DLE9BQU8sRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLDZCQUE2QixFQUFFO1FBQzlELElBQUksRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLGNBQWMsRUFBRTtRQUM1QyxVQUFVLEVBQUUsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSw2QkFBNkIsRUFBRTtRQUNsRSxPQUFPLEVBQUUsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxnQ0FBZ0MsRUFBRTtRQUNsRSxhQUFhLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSx5QkFBeUIsRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFF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