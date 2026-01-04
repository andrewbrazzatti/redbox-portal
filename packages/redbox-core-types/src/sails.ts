// Adapted from https://git.f3l.de/ttomasini/sails-types/raw/branch/master/sails.d.ts
import { NextFunction, Request as ExpressRequest, Response as ExpressResponse } from "express";
import express = require("express");
import { PassportStatic } from "passport";

// Re-export Express Request and Response as base types
export type Request = ExpressRequest;
export type Response = ExpressResponse;

// Export Sails-extended Request and Response types
export type Req = Sails.Req;
export type Res = Sails.Res;

// Re-export Sails namespace and common types for use in controllers
export type Sails = Sails.Application;
export type Model<T> = Sails.Model<T>;

// Helper type for string-keyed dictionaries (used in global namespace where Record isn't available)
type StringRecord<T> = { [key: string]: T };

// ==========================================
// Config Type Definitions (Exported)
// ==========================================

/** Agenda Queue job definition */
export interface AgendaQueueJob {
    name: string;
    fnName: string;
    options?: {
        lockLifetime?: number;
        lockLimit?: number;
        concurrency?: number;
        [key: string]: any;
    };
    schedule?: {
        method: 'every' | 'schedule';
        intervalOrSchedule: string;
        data?: any;
    };
}

/** Agenda Queue configuration */
export interface AgendaQueueConfig {
    options?: { [key: string]: any };
    jobs?: AgendaQueueJob[];
    collection?: string;
}

/** API method configuration */
export interface ApiMethodConfig {
    method: 'get' | 'post' | 'put' | 'patch' | 'delete';
    url: string;
    readTimeout?: number;
}

/** Record API configuration */
export interface RecordApiConfig {
    create: ApiMethodConfig;
    search: ApiMethodConfig;
    query: ApiMethodConfig;
    getMeta: ApiMethodConfig;
    info: ApiMethodConfig;
    updateMeta: ApiMethodConfig;
    harvest: ApiMethodConfig;
    getDatastream: ApiMethodConfig;
    addDatastream: ApiMethodConfig;
    removeDatastream: ApiMethodConfig;
    addDatastreams: ApiMethodConfig;
    addAndRemoveDatastreams: ApiMethodConfig;
    listDatastreams: ApiMethodConfig;
    getRecordRelationships: ApiMethodConfig;
    delete: ApiMethodConfig;
    [key: string]: ApiMethodConfig;
}

/** Custom field source configuration */
export interface CustomFieldConfig {
    source: 'request' | 'metadata' | 'record';
    type?: 'session' | 'param' | 'user' | 'header';
    field?: string;
    parseUrl?: boolean;
    searchParams?: string;
}

/** Record auditing configuration */
export interface RecordAuditingConfig {
    enabled: boolean | string;
    recordAuditJobName: string;
}

/** Record attachments configuration */
export interface RecordAttachmentsConfig {
    stageDir: string;
    path: string;
}

/** Record search configuration */
export interface RecordSearchConfig {
    returnFields: string[];
    maxRecordsPerPage?: number;
}

/** Record configuration */
export interface RecordConfig {
    auditing: RecordAuditingConfig;
    baseUrl: {
        redbox: string;
        mint: string;
    };
    maxUploadSize?: number;
    mongodbDisk?: string;
    diskSpaceThreshold?: number;
    api: RecordApiConfig;
    customFields?: { [key: string]: CustomFieldConfig };
    export?: {
        maxRecords: number;
    };
    transfer?: {
        maxRecordsPerPage: number;
    };
    search?: RecordSearchConfig;
    attachments: RecordAttachmentsConfig;
    /** @deprecated Use attachments instead */
    attachment?: RecordAttachmentsConfig;
    datastreamService?: string;
    helpEmail?: string;
}

/** DataCite mapping configuration */
export interface DataCiteMappingConfig {
    url: string;
    publicationYear?: string;
    title?: string;
    publisher?: string;
    creatorGivenName?: string;
    creatorFamilyName?: string;
    creatorIdentifier?: string;
    sizes?: string;
    identifiers?: string;
    subjects?: string[];
    dates?: Array<{ dateType: string; template: string; dateInformation?: string }>;
    rightsList?: Array<{ key: string; template: string }>;
    descriptions?: Array<{ descriptionType: string; template: string }>;
    [key: string]: any;
}

/** DataCite configuration */
export interface DataCiteConfig {
    username: string;
    password: string;
    doiPrefix: string;
    baseUrl: string;
    mappings: DataCiteMappingConfig;
    citationUrlProperty?: string;
    citationDoiProperty?: string;
    generatedCitationStringProperty?: string;
    citationStringTemplate?: string;
    creatorsProperty?: string;
}

/** Email notification defaults */
export interface EmailNotificationDefaults {
    from: string;
    subject: string;
    format: string;
    cc?: string;
    bcc?: string;
    otherSendOptions?: { [key: string]: any };
    [key: string]: any;
}

/** Email notification settings */
export interface EmailNotificationSettings {
    enabled: boolean;
    from?: string;
    templateDir?: string;
    serverOptions?: {
        host: string;
        port: number;
        secure?: boolean;
        tls?: {
            rejectUnauthorized: boolean;
        };
        [key: string]: any;
    };
}

/** Email template configuration */
export interface EmailTemplateConfig {
    subject: string;
    template: string;
    [key: string]: any;
}

/** Email notification configuration */
export interface EmailNotificationConfig {
    api?: {
        send: ApiMethodConfig;
    };
    settings: EmailNotificationSettings;
    defaults: EmailNotificationDefaults;
    templates?: { [key: string]: EmailTemplateConfig };
}

/** i18n/i18next detection configuration */
export interface I18nDetectionConfig {
    order?: string[];
    lookupCookie?: string;
    caches?: string[];
    cookieMinutes?: number;
    cookieDomain?: string;
    lookupSession?: string;
    lookupQuerystring?: string;
}

/** i18n/i18next init configuration */
export interface I18nNextInitConfig {
    supportedLngs?: string[];
    preload?: string[];
    debug?: boolean;
    fallbackLng?: string | string[];
    lowerCaseLng?: boolean;
    initImmediate?: boolean;
    skipOnVariables?: boolean;
    returnEmptyString?: boolean;
    ns?: string[];
    detection?: I18nDetectionConfig;
    [key: string]: any;
}

/** i18n configuration */
export interface I18nConfig {
    locales?: string[];
    defaultLocale?: string;
    updateFiles?: boolean;
    localesDirectory?: string;
    next?: {
        init?: I18nNextInitConfig;
        [key: string]: any;
    };
}

/** Vocabulary query configuration */
export interface SailsVocabQueryConfig {
    querySource: 'solr' | 'database';
    searchQuery?: {
        searchCore: string;
        baseQuery: string;
    };
    databaseQuery?: {
        queryName: string;
    };
    queryField?: {
        property: string;
        type: string;
    };
    userQueryFields?: Array<{
        property: string;
        userValueProperty: string;
    }>;
    resultObjectMapping?: { [key: string]: string };
}

/** External vocabulary provider configuration */
export interface VocabExternalProviderConfig {
    method: 'get' | 'post';
    url: string;
    options?: { [key: string]: any };
}

/** Vocabulary collection configuration */
export interface VocabCollectionConfig {
    url?: string;
    getMethod?: string;
    saveMethod?: string;
    searchMethod?: string;
    processingBuffer?: number;
    processingTime?: number;
}

/** Vocabulary configuration */
export interface SailsVocabConfig {
    clientUri?: string;
    collectionUri?: string;
    userRootUri?: string;
    clientCacheExpiry?: number;
    bootStrapVocabs?: string[];
    rootUrl?: string;
    conceptUri?: string;
    cacheExpiry?: number;
    external?: { [key: string]: VocabExternalProviderConfig };
    queries?: { [key: string]: SailsVocabQueryConfig };
    nonAnds?: { [key: string]: { url: string; [k: string]: any } };
    collection?: { [key: string]: VocabCollectionConfig };
}

/** Solr core options configuration */
export interface SailsSolrCoreOptions {
    host: string;
    port: string | number;
    core: string;
    path?: string;
    secure?: boolean;
    https: boolean; // Required to match SolrOptions class
}

/** Solr init schema flag configuration */
export interface SolrInitSchemaFlag {
    name: string;
    type: string;
    stored: boolean;
    required: boolean;
}

/** Solr schema field configuration */
export interface SolrSchemaField {
    name: string;
    type: string;
    indexed: boolean;
    stored: boolean;
    multiValued?: boolean;
}

/** Solr core configuration */
export interface SailsSolrCoreConfig {
    options: SailsSolrCoreOptions;
    schema?: {
        'add-field'?: SolrSchemaField[];
        'add-dynamic-field'?: SolrSchemaField[];
        'add-copy-field'?: Array<{ source: string; dest: string }>;
        [key: string]: any;
    };
    preIndex?: any;
    initSchemaFlag?: SolrInitSchemaFlag;
}

/** Solr configuration */
export interface SailsSolrConfig {
    createOrUpdateJobName?: string;
    deleteJobName?: string;
    maxWaitTries?: number;
    waitTime?: number;
    clientSleepTimeMillis?: number;
    cores: { [key: string]: SailsSolrCoreConfig };
}

/** MongoDB datastore configuration */
export interface MongoDatastoreConfig {
    adapter: any;
    url?: string;
    host?: string;
    port?: string | number | null;
    user?: string;
    password?: string;
    database?: string;
}

/** Datastores configuration */
export interface DatastoresConfig {
    mongodb: MongoDatastoreConfig;
    redboxStorage?: MongoDatastoreConfig;
    [key: string]: MongoDatastoreConfig | undefined;
}

/** Auth role configuration */
export interface AuthRoleConfig {
    name: string;
    [key: string]: any;
}

/** Auth configuration */
export interface AuthConfig {
    loginPath?: string;
    postLogoutRedir?: string;
    hiddenUsers?: string[];
    hiddenRoles?: string[];
    roles?: AuthRoleConfig[];
    defaultBrand?: string;
    defaultPortal?: string;
    [key: string]: any;
}

/** HTTP configuration */
export interface HttpConfig {
    rootContext?: string;
    middleware?: { [key: string]: any };
    [key: string]: any;
}

/** Static assets configuration */
export interface StaticAssetsConfig {
    logoName: string;
    imageType: string;
}

/** Custom cache configuration */
export interface CustomCacheConfig {
    cacheExpiry: number;
    checkPeriod?: number;
}

/** JSON-LD configuration */
export interface JsonLdConfig {
    addJsonLdContext?: boolean;
    contexts?: { [key: string]: { [k: string]: string } };
}

/** ORCID configuration */
export interface OrcidConfig {
    url: string;
}

/** Mint API configuration */
export interface MintConfig {
    mintRootUri?: string;
    apiKey?: string;
    api?: {
        search: ApiMethodConfig;
        [key: string]: ApiMethodConfig;
    };
}

/** Named query parameter configuration */
export interface NamedQueryParamConfig {
    type: string;
    path: string;
    queryType?: string;
    whenUndefined?: string;
    defaultValue?: any;
    format?: string;
}

/** Named query configuration (single) */
export interface NamedQueryConfig {
    collectionName: string;
    brandIdFieldPath?: string;
    resultObjectMapping?: { [key: string]: string };
    mongoQuery?: { [key: string]: any };
    sort?: Array<{ [key: string]: 'ASC' | 'DESC' }>;
    queryParams?: { [key: string]: NamedQueryParamConfig };
}

/** Named queries configuration (map) */
export interface NamedQueriesConfig {
    [key: string]: NamedQueryConfig;
}

/** Workflow stage configuration */
export interface WorkflowStageConfig {
    config: {
        workflow: {
            stage: string;
            stageLabel: string;
        };
        authorization?: {
            viewRoles?: string[];
            editRoles?: string[];
        };
        form?: string;
        displayIndex?: number;
        [key: string]: any;
    };
    starting?: boolean;
    consolidated?: boolean;
}

/** Workflow configuration (per record type) */
export interface RecordWorkflowConfig {
    [stageName: string]: WorkflowStageConfig;
}

/** Workflows configuration (map of record types) */
export interface WorkflowConfig {
    [recordType: string]: RecordWorkflowConfig;
}

/** Form configuration */
export interface FormConfig {
    defaultForm?: string;
    forms?: { [key: string]: any };
}

/** Record type hook function configuration */
export interface RecordTypeHookFunctionConfig {
    function: string;
    options?: { [key: string]: any };
}

/** Record type hook lifecycle configuration */
export interface RecordTypeHookLifecycleConfig {
    pre?: RecordTypeHookFunctionConfig[];
    post?: RecordTypeHookFunctionConfig[];
    postSync?: RecordTypeHookFunctionConfig[];
}

/** Record type hooks configuration */
export interface RecordTypeHooksConfig {
    onCreate?: RecordTypeHookLifecycleConfig;
    onUpdate?: RecordTypeHookLifecycleConfig;
    onDelete?: RecordTypeHookLifecycleConfig;
}

/** Record type configuration (single) */
export interface RecordTypeConfig {
    packageType: string;
    searchFilters?: any[];
    hooks?: RecordTypeHooksConfig;
    [key: string]: any;
}

/** Record types configuration (map) */
export interface RecordTypesConfig {
    [key: string]: RecordTypeConfig;
}

/** Action configuration */
export interface ActionConfig {
    service?: string;
    method?: string;
    [key: string]: any;
}

/** App mode configuration */
export interface AppModeConfig {
    bootstrapAlways?: boolean;
    hidePlaceholderPages?: boolean;
}

/** Branding configuration */
export interface BrandingConfig {
    variableAllowList?: string[];
    logoMaxBytes?: number;
    logoCacheTtlMs?: number;
}

/** API rate limit configuration */
export interface ApiConfig {
    max_requests: number | string;
}

/** Search configuration */
export interface SearchConfig {
    serviceName: string;
}

/** Storage configuration */
export interface StorageConfig {
    serviceName: string;
}

/** Queue configuration */
export interface QueueConfig {
    serviceName: string;
}

/** Validators configuration */
export interface ValidatorsConfig {
    definitions: { [key: string]: any };
}

/** Dynamic asset configuration */
export interface DynamicAssetConfig {
    [key: string]: any;
}

/** Dashboard type configuration */
export interface DashboardTypeConfig {
    [key: string]: any;
}

/** NG2/Angular apps configuration */
export interface Ng2Config {
    apps?: { [key: string]: any };
    [key: string]: any;
}

/** Reusable form definitions configuration */
export interface ReusableFormDefinitionsConfig {
    [key: string]: any;
}

/** People search function type */
export type PeopleSearchFn = (givenNames: string, surname: string, page?: number) => any;

/** ReDBox configuration */
export interface RedboxConfig {
    apiKey?: string;
    [key: string]: any;
}

/** Branding Configuration Defaults */
export interface BrandingConfigurationDefaultsConfig {
    auth?: AuthConfig;
    menu?: any;
    homePanels?: any;
    adminSidebar?: any;
    [key: string]: any;
}

/** DOMPurify Configuration */
export interface DOMPurifyConfig {
    profiles: {
        [key: string]: any;
    };
    hooks?: {
        afterSanitizeAttributes?: (node: any) => void;
    };
    defaultProfile?: string;
    globalSettings?: { [key: string]: any };
}

/** Figshare API Configuration */
export interface FigshareAPIConfig {
    frontEndURL: string;
    baseURL: string;
    APIToken: string;
    [key: string]: any;
}

/** Policies Configuration */
export interface PoliciesConfig {
    [key: string]: any;
}

/** RAiD Configuration */
export interface RaidConfig {
    serviceEndpoint?: string;
    apiKey?: string;
    [key: string]: any;
}

/** Report Configuration */
export interface SailsReportConfig {
    [key: string]: any;
}
// Alias for plural usage if needed
export type ReportsConfig = SailsReportConfig;

/** Routes Configuration */
export interface RoutesConfig {
    [route: string]: string | {
        controller?: string;
        action?: string;
        view?: string;
        [key: string]: any;
    };
}

/** Webpack Configuration */
export interface WebpackConfig {
    config: any[];
    watch?: boolean;
    watchOptions?: any;
}

/** Main ConfigObject with all typed properties */
export interface ConfigObject {
    // Core Sails configs
    appPath: string;
    appUrl: string;
    environment: string;
    startupMinute: number;
    angularDev?: string | boolean;
    enableNewForm?: boolean;

    // Custom module configs
    action: { [key: string]: ActionConfig };
    agendaQueue: AgendaQueueConfig;
    api: ApiConfig;
    appmode: AppModeConfig;
    auth: AuthConfig;
    branding: BrandingConfig;
    brandingAware?: (branding: any) => { [key: string]: any };
    brandingConfigurationDefaults?: BrandingConfigurationDefaultsConfig;
    custom_cache: CustomCacheConfig;
    dashboardtype: { [key: string]: DashboardTypeConfig };
    datacite: DataCiteConfig;
    datastores: DatastoresConfig;
    dynamicasset: { [key: string]: DynamicAssetConfig };
    emailnotification: EmailNotificationConfig;
    figshareAPI?: FigshareAPIConfig;
    form: FormConfig;
    http: HttpConfig;
    i18n: I18nConfig;
    jsonld: JsonLdConfig;
    mint: MintConfig;
    namedQuery: NamedQueriesConfig;
    ng2: Ng2Config;
    orcid: OrcidConfig;
    passport: PassportStatic;
    peopleSearch: { [key: string]: PeopleSearchFn };
    policies?: PoliciesConfig;
    queue: QueueConfig;
    raid?: RaidConfig;
    record: RecordConfig;
    recordtype: RecordTypesConfig;
    redbox: RedboxConfig;
    report?: SailsReportConfig;
    reusableFormDefinitions: ReusableFormDefinitionsConfig;
    routes?: RoutesConfig;
    search: SearchConfig;
    solr: SailsSolrConfig;
    static_assets: StaticAssetsConfig;
    storage: StorageConfig;
    validators: ValidatorsConfig;
    vocab: SailsVocabConfig;
    webpack?: WebpackConfig;
    workflow: WorkflowConfig;

    // Allow additional custom config keys
    [key: string]: any;
}

declare global {
    namespace Sails {
        // Re-export types into Sails namespace for backward compatibility
        export type AgendaQueueJob = import('./sails').AgendaQueueJob;
        export type AgendaQueueConfig = import('./sails').AgendaQueueConfig;
        export type ApiMethodConfig = import('./sails').ApiMethodConfig;
        export type RecordApiConfig = import('./sails').RecordApiConfig;
        export type CustomFieldConfig = import('./sails').CustomFieldConfig;
        export type RecordAuditingConfig = import('./sails').RecordAuditingConfig;
        export type RecordAttachmentsConfig = import('./sails').RecordAttachmentsConfig;
        export type RecordSearchConfig = import('./sails').RecordSearchConfig;
        export type RecordConfig = import('./sails').RecordConfig;
        export type DataCiteMappingConfig = import('./sails').DataCiteMappingConfig;
        export type DataCiteConfig = import('./sails').DataCiteConfig;
        export type EmailNotificationDefaults = import('./sails').EmailNotificationDefaults;
        export type EmailNotificationSettings = import('./sails').EmailNotificationSettings;
        export type EmailTemplateConfig = import('./sails').EmailTemplateConfig;
        export type EmailNotificationConfig = import('./sails').EmailNotificationConfig;
        export type I18nDetectionConfig = import('./sails').I18nDetectionConfig;
        export type I18nNextInitConfig = import('./sails').I18nNextInitConfig;
        export type I18nConfig = import('./sails').I18nConfig;
        export type VocabQueryConfig = import('./sails').SailsVocabQueryConfig;
        export type VocabExternalProviderConfig = import('./sails').VocabExternalProviderConfig;
        export type VocabCollectionConfig = import('./sails').VocabCollectionConfig;
        export type VocabConfig = import('./sails').SailsVocabConfig;
        export type SolrCoreOptions = import('./sails').SailsSolrCoreOptions;
        export type SolrInitSchemaFlag = import('./sails').SolrInitSchemaFlag;
        export type SolrSchemaField = import('./sails').SolrSchemaField;
        export type SolrCoreConfig = import('./sails').SailsSolrCoreConfig;
        export type SolrConfig = import('./sails').SailsSolrConfig;
        export type MongoDatastoreConfig = import('./sails').MongoDatastoreConfig;
        export type DatastoresConfig = import('./sails').DatastoresConfig;
        export type AuthRoleConfig = import('./sails').AuthRoleConfig;
        export type AuthConfig = import('./sails').AuthConfig;
        export type HttpConfig = import('./sails').HttpConfig;
        export type StaticAssetsConfig = import('./sails').StaticAssetsConfig;
        export type CustomCacheConfig = import('./sails').CustomCacheConfig;
        export type JsonLdConfig = import('./sails').JsonLdConfig;
        export type OrcidConfig = import('./sails').OrcidConfig;
        export type MintConfig = import('./sails').MintConfig;
        export type NamedQueryParamConfig = import('./sails').NamedQueryParamConfig;
        export type NamedQueryConfig = import('./sails').NamedQueryConfig;
        export type WorkflowStageConfig = import('./sails').WorkflowStageConfig;
        export type WorkflowConfig = import('./sails').WorkflowConfig;
        export type FormConfig = import('./sails').FormConfig;
        export type RecordTypeHookFunctionConfig = import('./sails').RecordTypeHookFunctionConfig;
        export type RecordTypeHooksConfig = import('./sails').RecordTypeHooksConfig;
        export type RecordTypeConfig = import('./sails').RecordTypeConfig;
        export type ActionConfig = import('./sails').ActionConfig;
        export type AppModeConfig = import('./sails').AppModeConfig;
        export type BrandingConfig = import('./sails').BrandingConfig;
        export type ApiConfig = import('./sails').ApiConfig;
        export type SearchConfig = import('./sails').SearchConfig;
        export type StorageConfig = import('./sails').StorageConfig;
        export type QueueConfig = import('./sails').QueueConfig;
        export type ValidatorsConfig = import('./sails').ValidatorsConfig;
        export type DynamicAssetConfig = import('./sails').DynamicAssetConfig;
        export type DashboardTypeConfig = import('./sails').DashboardTypeConfig;
        export type Ng2Config = import('./sails').Ng2Config;
        export type ReusableFormDefinitionsConfig = import('./sails').ReusableFormDefinitionsConfig;
        export type PeopleSearchFn = import('./sails').PeopleSearchFn;
        export type RedboxConfig = import('./sails').RedboxConfig;
        export type ConfigObject = import('./sails').ConfigObject;

        // Log interface based on https://github.com/balderdashy/captains-log
        export interface Log {
            crit: (message: string, ...args: any[]) => void;
            error: (message: string, ...args: any[]) => void;
            warn: (message: string, ...args: any[]) => void;
            debug: (message: string, ...args: any[]) => void;
            info: (message: string, ...args: any[]) => void;
            verbose: (message: string, ...args: any[]) => void;
            silly: (message: string, ...args: any[]) => void;
            blank: (message: string, ...args: any[]) => void;
        }

        export interface Application {
            config: ConfigObject;
            log: Log;
            services: {
                [key: string]: any;
            };
            models: {
                [key: string]: any;
            };
            after(events: string | string[], cb: () => void): void;
            on(event: string, cb: (...args: any[]) => void): void;
        }

        export interface Hook {
            initialize: (cb: () => void) => void;
            routes: {
                before: { [key: string]: any };
                after: { [key: string]: any };
            };
            configure?: () => void;
            defaults?: { [key: string]: any };
        }

        export interface Model<T> {
            attributes: Object;

            create(params: Object): WaterlinePromise<QueryResult>;
            create(params: Array<Object>): WaterlinePromise<QueryResult>;
            create(params: Object, cb: (err: Error, created: QueryResult) => void): void;
            create(params: Array<Object>, cb: (err: Error, created: Array<QueryResult>) => void): void;

            find(): QueryBuilder;
            find(params: Object): QueryBuilder;
            find(params: Object): WaterlinePromise<Array<QueryResult>>;

            findOne(criteria: Object): WaterlinePromise<T>;
            findOne(criteria: Object, cb: (err: Error, found: T) => void): void;

            findOrCreate(criteria: Object, values: Object): WaterlinePromise<T>;
            findOrCreate(criteria: Object, values: Object, cb: (err: Error, found: T) => void): void;

            count(): WaterlinePromise<number>;
            count(criteria: Object): WaterlinePromise<number>;
            count(criteria: Array<Object>): WaterlinePromise<number>;
            count(criteria: string): WaterlinePromise<number>;
            count(criteria: number): WaterlinePromise<number>;

            count(criteria: Object, cb: (err: Error, found: number) => void);
            count(criteria: Array<Object>, cb: (err: Error, found: number) => void);
            count(criteria: string, cb: (err: Error, found: number) => void);
            count(criteria: number, cb: (err: Error, found: number) => void);

            destroy(criteria: Object): WaterlinePromise<Array<Record>>;
            destroy(criteria: Array<Object>): WaterlinePromise<Array<Record>>;
            destroy(criteria: string): WaterlinePromise<Array<Record>>;
            destroy(criteria: number): WaterlinePromise<Array<Record>>;

            destroy(criteria: Object, cb: (err: Error, deleted: Array<Record>) => void): void;
            destroy(criteria: Array<Object>, cb: (err: Error, deleted: Array<Record>) => void): void;
            destroy(criteria: string, cb: (err: Error, deleted: Array<Record>) => void): void;
            destroy(criteria: number, cb: (err: Error, deleted: Array<Record>) => void): void;

            destroyOne(criteria: Object): WaterlinePromise<T>;
            destroyOne(criteria: string): WaterlinePromise<T>;
            destroyOne(criteria: number): WaterlinePromise<T>;

            update(criteria: Object, changes: Object): WaterlinePromise<Array<QueryResult>>;
            update(criteria: Array<Object>, changes: Object): WaterlinePromise<Array<QueryResult>>;
            update(criteria: string, changes: Object): WaterlinePromise<Array<QueryResult>>;
            update(criteria: number, changes: Object): WaterlinePromise<Array<QueryResult>>;

            update(criteria: Object, changes: Array<Object>): WaterlinePromise<Array<QueryResult>>;
            update(criteria: Array<Object>, changes: Array<Object>): WaterlinePromise<Array<QueryResult>>;
            update(criteria: string, changes: Array<Object>): WaterlinePromise<Array<QueryResult>>;
            update(criteria: number, changes: Array<Object>): WaterlinePromise<Array<QueryResult>>;

            update(criteria: Object, changes: Array<Object>, cb: (err: Error, updated: Array<QueryResult>) => void): void;
            update(criteria: Array<Object>, changes: Array<Object>, cb: (err: Error, updated: Array<QueryResult>) => void): void;
            update(criteria: string, changes: Array<Object>, cb: (err: Error, updated: Array<QueryResult>) => void): void;
            update(criteria: number, changes: Array<Object>, cb: (err: Error, updated: Array<QueryResult>) => void): void;

            // Overload for update without changes (chainable with .set())
            update(criteria: Object): WaterlinePromise<Array<QueryResult>>;

            updateOne(criteria: Object, changes: Object): WaterlinePromise<T>;
            updateOne(criteria: Object): WaterlinePromise<T>;
            updateOne(criteria: string, changes: Object): WaterlinePromise<T>;
            updateOne(criteria: string): WaterlinePromise<T>;
            updateOne(criteria: number, changes: Object): WaterlinePromise<T>;
            updateOne(criteria: number): WaterlinePromise<T>;

            query(sqlQuery: string, cb: (err: Error, results: Array<Record>) => void);
            native(cb: (err: Error, collection: Model<T>) => void);

            stream(criteria: Object, writeEnd: Object): NodeJS.WritableStream;
            stream(criteria: Array<Object>, writeEnd: Object): NodeJS.WritableStream;
            stream(criteria: string, writeEnd: Object): NodeJS.WritableStream;
            stream(criteria: number, writeEnd: Object): NodeJS.WritableStream;

            stream(criteria: Object, writeEnd: Object): Error;
            stream(criteria: Array<Object>, writeEnd: Object): Error;
            stream(criteria: string, writeEnd: Object): Error;
            stream(criteria: number, writeEnd: Object): Error;

            addToCollection(id: string | number, association: string): { members: (ids: (string | number)[]) => WaterlinePromise<any> };
            replaceCollection(id: string | number, association: string): { members: (ids: (string | number)[]) => WaterlinePromise<any> };
            removeFromCollection(id: string | number, association: string): { members: (ids: (string | number)[]) => WaterlinePromise<any> };
        }

        export interface WaterlineAttributes {
            id: string;
        }

        export interface NextFunction extends express.NextFunction { }

        export interface Req extends express.Request {
            options?: any;
            [key: string]: any;
        }

        export interface Res extends express.Response {
            attachement(filename: string);

            ok();
            ok(data: any);
            ok(data: any, pathToView: string);

            badRequest();
            badRequest(data: any);
            badRequest(data: any, pathToView: string);

            serverError();
            serverError(data: any);
            serverError(data: any, pathToView: string);

            view(route: string);
        }

        export type Policy = (req: Req, res: Res, next: NextFunction) => Promise<void> | void;

        export class WaterlinePromise<T> extends Promise<T> {
            exec(cb: (err: Error, results: Array<QueryResult>) => void): any;
            exec(cb: (err: Error, result: QueryResult) => void): any;

            populate(association: string): WaterlinePromise<T>;
            populate(association: string, filter: Object): WaterlinePromise<T>;
            set(values: Object): WaterlinePromise<T>;
            meta(options: Object): WaterlinePromise<T>;
        }

        export class Record {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            [key: string]: any;
        }

        export class QueryResult extends Record {
            destroy(): Promise<Array<Sails.QueryResult>>;

            toJSON(): Object;
        }

        export class QueryBuilder extends Promise<any> {
            exec(cb: (error: any, results: Array<QueryResult>) => void);

            where(condition: Object): QueryBuilder;

            meta(options: {
                fetch?: boolean;
                cascade?: boolean;
                skipAllLifecycleCallbacks?: boolean;
                skipRecordVerification?: boolean;
                skipExpandingDefaultSelectClause?: boolean;
                decrypt?: boolean;
                encryptWith?: string;
                makeLikeModifierCaseInsensitive?: boolean;
                enableExperimentalDeepTargets?: boolean;
                [key: string]: any;
            }): QueryBuilder;

            limit(lim: number): QueryBuilder;

            skip(num: number): QueryBuilder;

            sort(criteria: string): QueryBuilder;

            populate(association: string): QueryBuilder;
            populate(association: string, filter: Object): QueryBuilder;
        }

        export interface Controller { }
    }
}

export { };
