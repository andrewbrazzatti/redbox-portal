// Copyright (c) 2017 Queensland Cyber Infrastructure Foundation (http://www.qcif.edu.au/)
//
// GNU GENERAL PUBLIC LICENSE
//    Version 2, June 1991
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 2 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License along
// with this program; if not, write to the Free Software Foundation, Inc.,
// 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.

import { Context, Effect, Layer } from 'effect';
import { FigshareConfigError, DEFAULT_RETRY_STATUS_CODES } from './errors';

/**
 * Retry configuration for Figshare API requests
 */
export interface FigshareRetryConfig {
  readonly maxAttempts: number;
  readonly baseDelayMs: number;
  readonly maxDelayMs: number;
  readonly retryOnStatusCodes: readonly number[];
  readonly retryOnMethods: readonly string[];
}

/**
 * Mapping configuration for field transformations
 */
export interface FigshareMappingConfig {
  readonly artifacts: Record<string, any>;
  readonly recordFigArticleId: string;
  readonly recordFigArticleURL: string | string[];
  readonly recordDataLocations: string;
  readonly figshareAuthorUserId: string;
  readonly figshareItemGroupId: any;
  readonly figshareItemType: any;
  readonly figshareCurationStatus: string;
  readonly figshareCurationStatusTargetValue: string;
  readonly figshareDisableUpdateByCurationStatus: boolean;
  readonly figshareNeedsPublishAfterFileUpload: boolean;
  readonly figshareForceEmbargoUpdateAlways: boolean;
  readonly figshareOnlyPublishSelectedAttachmentFiles: boolean;
  readonly recordAllFilesUploaded: boolean;
  readonly recordAuthorExternalName: string;
  readonly recordAuthorUniqueBy: string;
  readonly response: {
    readonly entityId: string;
    readonly location: string;
    readonly article: any[];
  };
  readonly standardFields: {
    readonly create: any[];
    readonly update: any[];
    readonly embargo: any[];
  };
  readonly customFields: {
    readonly path: string;
    readonly create: any[];
    readonly update: any[];
  };
  readonly templates: {
    readonly customFields: {
      readonly create: Record<string, any>;
      readonly update: Record<string, any>;
    };
    readonly impersonate: any;
    readonly getAuthor: any[];
  };
  readonly runtimeArtifacts: {
    readonly getContributorsFromRecord: { template: string };
    readonly isRecordEmbargoed: { template: string };
    readonly isRecordEmbargoCleared: { template: string };
    readonly getCategoryIDs: { template: string };
  };
  readonly targetState: {
    readonly draft?: any;
    readonly publish?: any;
  };
  readonly upload: {
    readonly fileListPageSize: number;
    readonly override: Record<string, any>;
  };
}

/**
 * Complete runtime configuration for Figshare service
 */
export interface FigshareRuntimeConfig {
  readonly apiToken: string;
  readonly baseURL: string;
  readonly frontEndURL: string;
  readonly logLevel: string;
  readonly extraVerboseLogging: boolean;
  readonly testMode: boolean;
  readonly testUsers: any[];
  readonly testCategories: any[];
  readonly testLicenses: any[];
  readonly testResponse: any;
  readonly diskSpaceThreshold: number;
  readonly mapping: FigshareMappingConfig;
  readonly forCodesMapping: any[];
  readonly retry: FigshareRetryConfig;
  
  // Flattened properties for backward compatibility with existing service code
  readonly mappingArtifacts: any;
  readonly figArticleIdPathInRecord: string;
  readonly figArticleURLPathInRecordList: string[];
  readonly dataLocationsPathInRecord: string;
  readonly entityIdFAR: string;
  readonly locationFAR: string;
  readonly curationStatusFA: string;
  readonly curationStatusTargetValueFA: string;
  readonly disableUpdateByCurationStatusFA: boolean;
  readonly figNeedsPublishAfterFileUpload: boolean;
  readonly recordAuthorExternalName: string;
  readonly recordAuthorUniqueBy: string;
  readonly figshareItemGroupId: any;
  readonly figshareItemType: any;
}

/**
 * Service interface for Figshare configuration
 */
export interface FigshareConfigService {
  readonly config: FigshareRuntimeConfig;
  readonly isEnabled: boolean;
}

/**
 * Context tag for FigshareConfigService
 */
export class FigshareConfig extends Context.Tag("FigshareConfig")<
  FigshareConfig,
  FigshareConfigService
>() {}

/**
 * Default retry configuration
 */
export const defaultRetryConfig: FigshareRetryConfig = {
  maxAttempts: 3,
  baseDelayMs: 500,
  maxDelayMs: 4000,
  retryOnStatusCodes: DEFAULT_RETRY_STATUS_CODES,
  retryOnMethods: ['get', 'put', 'delete']
};

/**
 * Default mapping configuration
 */
export const defaultMappingConfig: FigshareMappingConfig = {
  artifacts: {},
  recordFigArticleId: '',
  recordFigArticleURL: [],
  recordDataLocations: '',
  figshareAuthorUserId: 'id',
  figshareItemGroupId: null,
  figshareItemType: null,
  figshareCurationStatus: '',
  figshareCurationStatusTargetValue: 'public',
  figshareDisableUpdateByCurationStatus: false,
  figshareNeedsPublishAfterFileUpload: false,
  figshareForceEmbargoUpdateAlways: false,
  figshareOnlyPublishSelectedAttachmentFiles: false,
  recordAllFilesUploaded: false,
  recordAuthorExternalName: '',
  recordAuthorUniqueBy: '',
  response: {
    entityId: 'entity_id',
    location: 'location',
    article: []
  },
  standardFields: {
    create: [],
    update: [],
    embargo: []
  },
  customFields: {
    path: 'custom_fields',
    create: [],
    update: []
  },
  templates: {
    customFields: {
      create: {},
      update: {}
    },
    impersonate: {},
    getAuthor: []
  },
  runtimeArtifacts: {
    getContributorsFromRecord: { template: '' },
    isRecordEmbargoed: { template: '' },
    isRecordEmbargoCleared: { template: '' },
    getCategoryIDs: { template: '' }
  },
  targetState: {},
  upload: {
    fileListPageSize: 20,
    override: {}
  }
};

/**
 * Parse retry configuration from raw config object
 */
export const parseRetryConfig = (rawConfig: any = {}): FigshareRetryConfig => {
  const maxAttempts = Math.max(1, Number(rawConfig.maxAttempts) || defaultRetryConfig.maxAttempts);
  const baseDelayMs = Math.max(0, Number(rawConfig.baseDelayMs) || defaultRetryConfig.baseDelayMs);
  const maxDelayMs = Math.max(baseDelayMs, Number(rawConfig.maxDelayMs) || defaultRetryConfig.maxDelayMs);
  const retryOnStatusCodes = Array.isArray(rawConfig.retryOnStatusCodes)
    ? rawConfig.retryOnStatusCodes
    : defaultRetryConfig.retryOnStatusCodes;
  const retryOnMethods = Array.isArray(rawConfig.retryOnMethods)
    ? rawConfig.retryOnMethods.map((m: string) => m.toLowerCase())
    : defaultRetryConfig.retryOnMethods;

  return {
    maxAttempts,
    baseDelayMs,
    maxDelayMs,
    retryOnStatusCodes,
    retryOnMethods
  };
};

/**
 * Parse mapping configuration from raw config objects
 */
export const parseMappingConfig = (
  baseMapping: any = {},
  overrideMapping: any = {},
  overrideArtifacts: any = {}
): FigshareMappingConfig => {
  // Merge with override taking precedence, but arrays are replaced not merged
  const mergeCustomizer = (objValue: any, srcValue: any) => {
    if (Array.isArray(srcValue)) {
      return srcValue;
    }
    return undefined;
  };

  const merged = mergeDeep({}, baseMapping, overrideMapping, mergeCustomizer);
  const artifacts = overrideMapping?.artifacts ?? baseMapping?.artifacts ?? {};

  // Normalize recordFigArticleURL to always be an array
  const recordFigArticleURL = normalizeToArray(merged.recordFigArticleURL);

  return {
    artifacts,
    recordFigArticleId: merged.recordFigArticleId ?? '',
    recordFigArticleURL,
    recordDataLocations: merged.recordDataLocations ?? '',
    figshareAuthorUserId: merged.figshareAuthorUserId ?? 'id',
    figshareItemGroupId: overrideArtifacts?.mapping?.figshareItemGroupId ?? merged.figshareItemGroupId ?? null,
    figshareItemType: overrideArtifacts?.mapping?.figshareItemType ?? merged.figshareItemType ?? null,
    figshareCurationStatus: merged.figshareCurationStatus ?? '',
    figshareCurationStatusTargetValue: merged.figshareCurationStatusTargetValue ?? 'public',
    figshareDisableUpdateByCurationStatus: !!merged.figshareDisableUpdateByCurationStatus,
    figshareNeedsPublishAfterFileUpload: !!merged.figshareNeedsPublishAfterFileUpload,
    figshareForceEmbargoUpdateAlways: !!merged.figshareForceEmbargoUpdateAlways,
    figshareOnlyPublishSelectedAttachmentFiles: !!merged.figshareOnlyPublishSelectedAttachmentFiles,
    recordAllFilesUploaded: !!merged.recordAllFilesUploaded,
    recordAuthorExternalName: merged.recordAuthorExternalName ?? '',
    recordAuthorUniqueBy: merged.recordAuthorUniqueBy ?? '',
    response: {
      entityId: merged.response?.entityId ?? 'entity_id',
      location: merged.response?.location ?? 'location',
      article: merged.response?.article ?? []
    },
    standardFields: {
      create: merged.standardFields?.create ?? [],
      update: merged.standardFields?.update ?? [],
      embargo: merged.standardFields?.embargo ?? []
    },
    customFields: {
      path: merged.customFields?.path ?? 'custom_fields',
      create: merged.customFields?.create ?? [],
      update: merged.customFields?.update ?? []
    },
    templates: {
      customFields: {
        create: merged.templates?.customFields?.create ?? {},
        update: merged.templates?.customFields?.update ?? {}
      },
      impersonate: merged.templates?.impersonate ?? {},
      getAuthor: merged.templates?.getAuthor ?? []
    },
    runtimeArtifacts: {
      getContributorsFromRecord: merged.runtimeArtifacts?.getContributorsFromRecord ?? { template: '' },
      isRecordEmbargoed: merged.runtimeArtifacts?.isRecordEmbargoed ?? { template: '' },
      isRecordEmbargoCleared: merged.runtimeArtifacts?.isRecordEmbargoCleared ?? { template: '' },
      getCategoryIDs: merged.runtimeArtifacts?.getCategoryIDs ?? { template: '' }
    },
    targetState: merged.targetState ?? {},
    upload: {
      fileListPageSize: Number(merged.upload?.fileListPageSize) || 20,
      override: merged.upload?.override ?? {}
    }
  };
};

/**
 * Parse complete runtime configuration from sails config
 */
export const parseRuntimeConfig = (sailsConfig: any): FigshareRuntimeConfig => {
  const figshareConfig = sailsConfig?.figshareAPI ?? {};
  const overrideArtifacts = sailsConfig?.figshareAPIEnv?.overrideArtifacts ?? {};
  const baseMapping = figshareConfig.mapping ?? {};
  const overrideMapping = overrideArtifacts.mapping ?? {};
  const mappingConfig = parseMappingConfig(baseMapping, overrideMapping, overrideArtifacts);

  return {
    apiToken: overrideArtifacts.APIToken ?? figshareConfig.APIToken ?? '',
    baseURL: overrideArtifacts.baseURL ?? figshareConfig.baseURL ?? '',
    frontEndURL: overrideArtifacts.frontEndURL ?? figshareConfig.frontEndURL ?? '',
    logLevel: sailsConfig?.record?.createUpdateFigshareArticleLogLevel ?? 'verbose',
    extraVerboseLogging: !!figshareConfig.extraVerboseLogging,
    testMode: !!figshareConfig.testMode,
    testUsers: figshareConfig.testUsers ?? [],
    testCategories: figshareConfig.testCategories ?? [],
    testLicenses: figshareConfig.testLicenses ?? [],
    testResponse: figshareConfig.testResponse ?? {},
    diskSpaceThreshold: Number(figshareConfig.diskSpaceThreshold) || 0,
    mapping: mappingConfig,
    forCodesMapping: sailsConfig?.figshareReDBoxFORMapping?.FORMapping ?? [],
    retry: parseRetryConfig(figshareConfig.retry),
    
    // Flattened properties for backward compatibility
    mappingArtifacts: mappingConfig.artifacts ?? {},
    figArticleIdPathInRecord: mappingConfig.recordFigArticleId ?? '',
    figArticleURLPathInRecordList: normalizeToArray(mappingConfig.recordFigArticleURL),
    dataLocationsPathInRecord: mappingConfig.recordDataLocations ?? '',
    entityIdFAR: mappingConfig.response?.entityId ?? 'entity_id',
    locationFAR: mappingConfig.response?.location ?? 'location',
    curationStatusFA: mappingConfig.figshareCurationStatus ?? '',
    curationStatusTargetValueFA: mappingConfig.figshareCurationStatusTargetValue ?? 'public',
    disableUpdateByCurationStatusFA: !!mappingConfig.figshareDisableUpdateByCurationStatus,
    figNeedsPublishAfterFileUpload: !!mappingConfig.figshareNeedsPublishAfterFileUpload,
    recordAuthorExternalName: mappingConfig.recordAuthorExternalName ?? '',
    recordAuthorUniqueBy: mappingConfig.recordAuthorUniqueBy ?? '',
    figshareItemGroupId: overrideArtifacts?.mapping?.figshareItemGroupId ?? mappingConfig.figshareItemGroupId ?? null,
    figshareItemType: overrideArtifacts?.mapping?.figshareItemType ?? mappingConfig.figshareItemType ?? null
  };
};

/**
 * Check if Figshare API is enabled based on configuration
 */
export const isApiEnabled = (config: FigshareRuntimeConfig): boolean => {
  return !!(config.apiToken && config.baseURL && config.frontEndURL);
};

/**
 * Create FigshareConfigLive Layer that reads from sails.config
 */
export const makeFigshareConfigLive = (sailsConfig: any): Layer.Layer<FigshareConfig> => {
  return Layer.succeed(
    FigshareConfig,
    {
      config: parseRuntimeConfig(sailsConfig),
      isEnabled: isApiEnabled(parseRuntimeConfig(sailsConfig))
    }
  );
};

/**
 * Create FigshareConfigTest Layer with static test configuration
 */
export const makeFigshareConfigTest = (
  overrides: Partial<FigshareRuntimeConfig> = {}
): Layer.Layer<FigshareConfig> => {
  const defaultTestConfig: FigshareRuntimeConfig = {
    apiToken: 'test-token',
    baseURL: 'https://api.figshare.test.localhost',
    frontEndURL: 'https://figshare.test.localhost',
    logLevel: 'verbose',
    extraVerboseLogging: false,
    testMode: true,
    testUsers: [],
    testCategories: [],
    testLicenses: [],
    testResponse: {},
    diskSpaceThreshold: 0,
    mapping: defaultMappingConfig,
    forCodesMapping: [],
    retry: defaultRetryConfig,
    // Flattened properties defaults
    mappingArtifacts: {},
    figArticleIdPathInRecord: '',
    figArticleURLPathInRecordList: [],
    dataLocationsPathInRecord: '',
    entityIdFAR: 'entity_id',
    locationFAR: 'location',
    curationStatusFA: '',
    curationStatusTargetValueFA: 'public',
    disableUpdateByCurationStatusFA: false,
    figNeedsPublishAfterFileUpload: false,
    recordAuthorExternalName: '',
    recordAuthorUniqueBy: '',
    figshareItemGroupId: null,
    figshareItemType: null
  };

  const config = { ...defaultTestConfig, ...overrides };

  return Layer.succeed(
    FigshareConfig,
    {
      config,
      isEnabled: isApiEnabled(config)
    }
  );
};

/**
 * Effect to get configuration, failing if API is disabled
 */
export const getConfig = Effect.gen(function* () {
  const { config, isEnabled } = yield* FigshareConfig;
  if (!isEnabled) {
    return yield* Effect.fail(FigshareConfigError.apiDisabled());
  }
  return config;
});

/**
 * Effect to get configuration without checking if API is enabled
 */
export const getConfigUnchecked = Effect.gen(function* () {
  const { config } = yield* FigshareConfig;
  return config;
});

// Helper functions

function normalizeToArray<T>(value: T | T[] | undefined | null): T[] {
  if (value === undefined || value === null) {
    return [];
  }
  if (Array.isArray(value)) {
    return value;
  }
  return [value];
}

function mergeDeep(
  target: any,
  ...args: any[]
): any {
  const sources = [...args];
  let customizer: any;

  if (typeof sources[sources.length - 1] === 'function') {
    customizer = sources.pop();
  }

  const validSources = sources.filter((s) => s !== undefined && s !== null);
  if (!validSources.length) return target;

  const source = validSources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key], customizer);
      } else {
        const customResult = customizer?.(target[key], source[key], key);
        if (customResult !== undefined) {
          Object.assign(target, { [key]: customResult });
        } else {
          Object.assign(target, { [key]: source[key] });
        }
      }
    }
  }
  
  if (customizer) {
    return mergeDeep(target, ...validSources, customizer);
  }
  return mergeDeep(target, ...validSources);
}

function isObject(item: any): item is Record<string, any> {
  return item && typeof item === 'object' && !Array.isArray(item);
}
