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

import { Effect, Option } from 'effect';
import {
  FigshareArticleCreate,
  FigshareArticleUpdate,
  FigshareArticleEmbargo
} from '@researchdatabox/redbox-core-types';
import { FigshareConfig, FigshareMappingConfig, FigshareRuntimeConfig } from './config';
import { FigshareLicenseCache, FigshareLicense } from './cache';
import { FigshareNetworkError } from './errors';
import { RecordMetadata } from './services/records';
import { FigshareAuthor, hasAuthorId, getImpersonateAuthorId } from './operations/authors';

/**
 * Template engine function type
 */
export type TemplateEngine = (template: string, context: Record<string, any>) => any;

/**
 * Standard field configuration
 */
export interface StandardFieldConfig {
  readonly figName: string;
  readonly rbName?: string;
  readonly template?: string;
  readonly defaultValue?: any;
  readonly runByNameOnly?: boolean;
  readonly unset?: boolean;
  readonly unsetBeforeSet?: boolean;
  readonly checkChangedBeforeUpdate?: boolean;
}

/**
 * Custom field configuration
 */
export interface CustomFieldConfig {
  readonly figName: string;
  readonly rbName?: string;
  readonly template?: string;
  readonly defaultValue?: any;
}

/**
 * Get value from record using path or template
 */
export const getValueFromRecord = <T>(
  record: RecordMetadata,
  pathOrTemplate: string,
  artifacts: Record<string, any>,
  templateEngine: TemplateEngine,
  momentLib?: any
): T | undefined => {
  if (pathOrTemplate.includes('<%')) {
    try {
      const context = {
        moment: momentLib,
        record,
        artifacts
      };
      return templateEngine(pathOrTemplate, context) as T;
    } catch {
      return undefined;
    }
  }

  // Simple path resolution
  return getNestedValue(record, pathOrTemplate) as T;
};

/**
 * Set a standard field in request body
 */
export const setStandardFieldInRequestBody = (
  record: RecordMetadata,
  requestBody: Record<string, any>,
  fieldConfig: StandardFieldConfig,
  artifacts: Record<string, any>,
  templateEngine: TemplateEngine,
  momentLib?: any
): Record<string, any> => {
  if (fieldConfig.unset) {
    return deleteNestedValue(requestBody, fieldConfig.figName);
  }

  if (fieldConfig.runByNameOnly) {
    return requestBody;
  }

  let value: any;

  if (fieldConfig.template && fieldConfig.template.includes('<%')) {
    try {
      const context = {
        record,
        moment: momentLib,
        field: fieldConfig,
        artifacts
      };
      value = templateEngine(fieldConfig.template, context);
    } catch {
      value = fieldConfig.defaultValue;
    }
  } else if (fieldConfig.rbName) {
    value = getNestedValue(record, fieldConfig.rbName) ?? fieldConfig.defaultValue;
  } else {
    value = fieldConfig.defaultValue;
  }

  if (fieldConfig.unsetBeforeSet) {
    requestBody = deleteNestedValue(requestBody, fieldConfig.figName);
  }

  return setNestedValue(requestBody, fieldConfig.figName, value);
};

/**
 * Set a custom field in request body
 */
export const setCustomFieldInRequestBody = (
  record: RecordMetadata,
  customFieldsTemplate: Record<string, any>,
  keyName: string,
  customFieldsMappings: CustomFieldConfig[],
  artifacts: Record<string, any>,
  templateEngine: TemplateEngine,
  momentLib?: any
): Record<string, any> => {
  const fieldConfig = customFieldsMappings.find((f) => f.figName === keyName);
  
  if (!fieldConfig) {
    return customFieldsTemplate;
  }

  let value: any;

  if (fieldConfig.template && fieldConfig.template.includes('<%')) {
    try {
      const context = {
        record,
        moment: momentLib,
        field: fieldConfig,
        artifacts
      };
      value = templateEngine(fieldConfig.template, context);
    } catch {
      value = fieldConfig.defaultValue;
    }
  } else if (fieldConfig.rbName) {
    value = getNestedValue(record, fieldConfig.rbName) ?? fieldConfig.defaultValue;
  } else {
    value = fieldConfig.defaultValue;
  }

  return setNestedValue(customFieldsTemplate, keyName, value);
};

/**
 * Set a field by name with runtime artifacts support
 */
export const setFieldByName = (
  record: RecordMetadata,
  requestBody: Record<string, any>,
  fieldConfigs: StandardFieldConfig[],
  fieldName: string,
  runtimeArtifacts: Record<string, any>,
  artifacts: Record<string, any>,
  templateEngine: TemplateEngine,
  momentLib?: any
): Record<string, any> => {
  const fieldConfig = fieldConfigs.find((f) => f.figName === fieldName);
  
  if (!fieldConfig) {
    return requestBody;
  }

  if (fieldConfig.unset) {
    return deleteNestedValue(requestBody, fieldConfig.figName);
  }

  let value: any;

  if (fieldConfig.template && fieldConfig.template.includes('<%')) {
    try {
      const context = {
        record,
        moment: momentLib,
        field: fieldConfig,
        artifacts,
        runtimeArtifacts
      };
      value = templateEngine(fieldConfig.template, context);
    } catch {
      value = fieldConfig.defaultValue;
    }
  } else if (fieldConfig.rbName) {
    value = getNestedValue(record, fieldConfig.rbName) ?? fieldConfig.defaultValue;
  } else {
    value = fieldConfig.defaultValue;
  }

  if (fieldConfig.unsetBeforeSet) {
    requestBody = deleteNestedValue(requestBody, fieldConfig.figName);
  }

  return setNestedValue(requestBody, fieldConfig.figName, value);
};

/**
 * Build the create request body
 */
export const buildCreateRequestBody = (
  record: RecordMetadata,
  authors: FigshareAuthor[],
  categoryIds: number[],
  licenses: readonly FigshareLicense[],
  mapping: FigshareMappingConfig,
  templateEngine: TemplateEngine,
  momentLib?: any
): Record<string, any> => {
  // Start with base create body
  let requestBody: Record<string, any> = {
    ...new (FigshareArticleCreate as any)()
  };

  // Set categories
  const runtimeArtifacts: Record<string, any> = { categories: categoryIds };
  requestBody = setFieldByName(
    record, requestBody, mapping.standardFields.create,
    'categories', runtimeArtifacts, mapping.artifacts, templateEngine, momentLib
  );

  // Set license
  requestBody = setFieldByName(
    record, requestBody, mapping.standardFields.create,
    'license', { licenses }, mapping.artifacts, templateEngine, momentLib
  );

  // Set impersonate (if we have an author with ID)
  const impersonateId = getImpersonateAuthorId(authors);
  if (Option.isSome(impersonateId)) {
    requestBody = setFieldByName(
      record, requestBody, mapping.standardFields.create,
      'impersonate', { impersonate: impersonateId.value }, mapping.artifacts, templateEngine, momentLib
    );
  }

  // Set standard fields
  for (const fieldConfig of mapping.standardFields.create) {
    requestBody = setStandardFieldInRequestBody(
      record, requestBody, fieldConfig, mapping.artifacts, templateEngine, momentLib
    );
  }

  // Set custom fields
  let customFields = { ...mapping.templates.customFields.create };
  const customFieldKeys = Object.keys(customFields);
  for (const key of customFieldKeys) {
    customFields = setCustomFieldInRequestBody(
      record, customFields, key, mapping.customFields.create as any,
      mapping.artifacts, templateEngine, momentLib
    );
  }

  requestBody = setNestedValue(requestBody, mapping.customFields.path, customFields);

  return requestBody;
};

/**
 * Build the update request body
 */
export const buildUpdateRequestBody = (
  record: RecordMetadata,
  authors: FigshareAuthor[],
  categoryIds: number[],
  licenses: readonly FigshareLicense[],
  mapping: FigshareMappingConfig,
  templateEngine: TemplateEngine,
  momentLib?: any
): Record<string, any> => {
  // Start with base update body
  let requestBody: Record<string, any> = {
    ...new (FigshareArticleUpdate as any)(
      mapping.figshareItemGroupId,
      mapping.figshareItemType
    )
  };

  const runtimeArtifacts: Record<string, any> = {
    authors,
    categories: categoryIds,
    licenses
  };

  // Set authors
  requestBody = setFieldByName(
    record, requestBody, mapping.standardFields.update,
    'authors', runtimeArtifacts, mapping.artifacts, templateEngine, momentLib
  );

  // Set license
  requestBody = setFieldByName(
    record, requestBody, mapping.standardFields.update,
    'license', runtimeArtifacts, mapping.artifacts, templateEngine, momentLib
  );

  // Set categories
  requestBody = setFieldByName(
    record, requestBody, mapping.standardFields.update,
    'categories', runtimeArtifacts, mapping.artifacts, templateEngine, momentLib
  );

  // Set impersonate
  const impersonateId = getImpersonateAuthorId(authors);
  if (Option.isSome(impersonateId)) {
    requestBody = setFieldByName(
      record, requestBody, mapping.standardFields.update,
      'impersonate', { impersonate: impersonateId.value }, mapping.artifacts, templateEngine, momentLib
    );
  }

  // Set standard fields
  for (const fieldConfig of mapping.standardFields.update) {
    requestBody = setStandardFieldInRequestBody(
      record, requestBody, fieldConfig, mapping.artifacts, templateEngine, momentLib
    );
  }

  // Set custom fields
  let customFields = { ...mapping.templates.customFields.update };
  const customFieldKeys = Object.keys(customFields);
  for (const key of customFieldKeys) {
    customFields = setCustomFieldInRequestBody(
      record, customFields, key, mapping.customFields.update as any,
      mapping.artifacts, templateEngine, momentLib
    );
  }

  requestBody = setNestedValue(requestBody, mapping.customFields.path, customFields);

  return requestBody;
};

/**
 * Build the embargo request body
 */
export const buildEmbargoRequestBody = (
  record: RecordMetadata,
  authors: FigshareAuthor[],
  mapping: FigshareMappingConfig,
  templateEngine: TemplateEngine,
  momentLib?: any
): Record<string, any> => {
  if (!mapping.standardFields.embargo || mapping.standardFields.embargo.length === 0) {
    return {};
  }

  // Start with base embargo body
  let requestBody: Record<string, any> = {
    ...new (FigshareArticleEmbargo as any)(0, false, '', '', '', '', [])
  };

  // Set impersonate
  const impersonateId = getImpersonateAuthorId(authors);
  if (Option.isSome(impersonateId)) {
    requestBody = setFieldByName(
      record, requestBody, mapping.standardFields.embargo,
      'impersonate', { impersonate: impersonateId.value }, mapping.artifacts, templateEngine, momentLib
    );
  }

  // Set standard fields
  for (const fieldConfig of mapping.standardFields.embargo) {
    requestBody = setStandardFieldInRequestBody(
      record, requestBody, fieldConfig, mapping.artifacts, templateEngine, momentLib
    );
  }

  return requestBody;
};

/**
 * Build the publish request body
 */
export const buildPublishRequestBody = (
  authors: FigshareAuthor[],
  mapping: FigshareMappingConfig,
  templateEngine: TemplateEngine
): Record<string, any> => {
  let requestBody: Record<string, any> = { ...mapping.templates.impersonate };

  const impersonateId = getImpersonateAuthorId(authors);
  if (Option.isSome(impersonateId) && mapping.targetState.publish) {
    requestBody = setFieldByName(
      {} as RecordMetadata, requestBody, [mapping.targetState.publish],
      'impersonate', { impersonate: impersonateId.value }, mapping.artifacts, templateEngine
    );
  }

  return requestBody;
};

/**
 * Check if record is embargoed based on template
 */
export const isRecordEmbargoed = (
  requestEmbargoBody: Record<string, any>,
  filesOrURLsAttached: boolean,
  template: string,
  templateEngine: TemplateEngine
): boolean => {
  if (!template || !template.includes('<%')) {
    return false;
  }

  try {
    const context = {
      request: requestEmbargoBody,
      filesOrURLsAttached
    };
    const result = templateEngine(template, context);
    return result === true || result === 'true';
  } catch {
    return false;
  }
};

/**
 * Check if embargo should be cleared
 */
export const isClearEmbargoNeeded = (
  requestEmbargoBody: Record<string, any>,
  isCurrentlyEmbargoed: boolean,
  template: string,
  templateEngine: TemplateEngine
): boolean => {
  if (!isCurrentlyEmbargoed) {
    return false;
  }

  if (!template || !template.includes('<%')) {
    return false;
  }

  try {
    const context = {
      request: requestEmbargoBody
    };
    const result = templateEngine(template, context);
    return result === true || result === 'true';
  } catch {
    return false;
  }
};

/**
 * Check if embargo details have changed
 */
export const checkEmbargoDetailsChanged = (
  requestEmbargoBody: Record<string, any>,
  articleDetails: Record<string, any>,
  standardFields: StandardFieldConfig[],
  forceUpdate: boolean = false
): boolean => {
  if (forceUpdate) {
    return true;
  }

  for (const fieldConfig of standardFields) {
    if (!fieldConfig.checkChangedBeforeUpdate) {
      continue;
    }

    const requestValue = getNestedValue(requestEmbargoBody, fieldConfig.figName);
    const articleValue = getNestedValue(articleDetails, fieldConfig.figName);

    // Use JSON serialization for deep comparison (works for primitives and simple objects)
    if (JSON.stringify(requestValue) !== JSON.stringify(articleValue)) {
      return true;
    }
  }

  return false;
};

/**
 * Set field in record from article details
 */
export const setFieldInRecord = (
  record: RecordMetadata,
  articleDetails: Record<string, any>,
  fieldConfig: StandardFieldConfig,
  artifacts: Record<string, any>,
  templateEngine: TemplateEngine,
  momentLib?: any
): RecordMetadata => {
  if (fieldConfig.unset) {
    return deleteNestedValue(record, fieldConfig.figName) as RecordMetadata;
  }

  if (fieldConfig.runByNameOnly) {
    return record;
  }

  let value: any;

  if (fieldConfig.template && fieldConfig.template.includes('<%')) {
    try {
      const context = {
        record,
        article: articleDetails,
        moment: momentLib,
        field: fieldConfig,
        artifacts
      };
      value = templateEngine(fieldConfig.template, context);
    } catch {
      return record;
    }
  } else if (fieldConfig.rbName && fieldConfig.figName) {
    const originalValue = getNestedValue(record, fieldConfig.rbName);
    value = getNestedValue(articleDetails, fieldConfig.figName) ?? originalValue;
  } else {
    return record;
  }

  if (fieldConfig.unsetBeforeSet && fieldConfig.rbName) {
    record = deleteNestedValue(record, fieldConfig.rbName) as RecordMetadata;
  }

  if (fieldConfig.rbName) {
    return setNestedValue(record, fieldConfig.rbName, value) as RecordMetadata;
  }

  return record;
};

// Helper functions

function getNestedValue(obj: Record<string, any>, path: string): any {
  if (!path) return undefined;
  const parts = path.split('.');
  let current = obj;
  
  for (const part of parts) {
    if (current === null || current === undefined) {
      return undefined;
    }
    current = current[part];
  }
  
  return current;
}

function setNestedValue(obj: Record<string, any>, path: string, value: any): Record<string, any> {
  if (!path) return obj;
  
  const parts = path.split('.');
  const result = { ...obj };
  let current: any = result;

  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    if (!(part in current) || typeof current[part] !== 'object' || current[part] === null) {
      current[part] = {};
    } else {
      current[part] = { ...current[part] };
    }
    current = current[part];
  }

  current[parts[parts.length - 1]] = value;
  return result;
}

function deleteNestedValue(obj: Record<string, any>, path: string): Record<string, any> {
  if (!path) return obj;
  
  const parts = path.split('.');
  const result = { ...obj };
  let current: any = result;

  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    if (!(part in current) || typeof current[part] !== 'object') {
      return result; // Path doesn't exist
    }
    current[part] = { ...current[part] };
    current = current[part];
  }

  delete current[parts[parts.length - 1]];
  return result;
}

/**
 * Effect-based request body builder for create
 */
export const buildCreateRequestBodyEffect = (
  record: RecordMetadata,
  authors: FigshareAuthor[],
  categoryIds: number[],
  templateEngine: TemplateEngine,
  momentLib?: any
): Effect.Effect<Record<string, any>, FigshareNetworkError, FigshareConfig | FigshareLicenseCache> =>
  Effect.gen(function* () {
    const { config } = yield* FigshareConfig;
    const licenses = yield* (yield* FigshareLicenseCache).getLicenses;

    return buildCreateRequestBody(
      record,
      authors,
      categoryIds,
      licenses,
      config.mapping,
      templateEngine,
      momentLib
    );
  });

/**
 * Effect-based request body builder for update
 */
export const buildUpdateRequestBodyEffect = (
  record: RecordMetadata,
  authors: FigshareAuthor[],
  categoryIds: number[],
  templateEngine: TemplateEngine,
  momentLib?: any
): Effect.Effect<Record<string, any>, FigshareNetworkError, FigshareConfig | FigshareLicenseCache> =>
  Effect.gen(function* () {
    const { config } = yield* FigshareConfig;
    const licenses = yield* (yield* FigshareLicenseCache).getLicenses;

    return buildUpdateRequestBody(
      record,
      authors,
      categoryIds,
      licenses,
      config.mapping,
      templateEngine,
      momentLib
    );
  });

/**
 * Effect-based request body builder for embargo
 */
export const buildEmbargoRequestBodyEffect = (
  record: RecordMetadata,
  authors: FigshareAuthor[],
  templateEngine: TemplateEngine,
  momentLib?: any
): Effect.Effect<Record<string, any>, never, FigshareConfig> =>
  Effect.gen(function* () {
    const { config } = yield* FigshareConfig;

    return buildEmbargoRequestBody(
      record,
      authors,
      config.mapping,
      templateEngine,
      momentLib
    );
  });
