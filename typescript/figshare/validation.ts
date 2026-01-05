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

import { Effect, pipe } from 'effect';
import { FigshareValidationError } from './errors';
import { FigshareConfig } from './config';
import { RecordMetadata } from './services/records';

/**
 * Field validation configuration
 */
export interface FieldValidationConfig {
  readonly figName: string;
  readonly rbName?: string;
  readonly required?: boolean;
  readonly validateFn?: string;
  readonly minLength?: number;
  readonly maxLength?: number;
  readonly pattern?: string;
  readonly errorCode?: string;
}

/**
 * Validation result
 */
export interface ValidationResult {
  readonly valid: boolean;
  readonly errors: FigshareValidationError[];
}

/**
 * Check if a value is empty (null, undefined, empty string, empty array)
 */
export const isEmpty = (value: unknown): boolean => {
  if (value === null || value === undefined) {
    return true;
  }
  if (typeof value === 'string') {
    return value.trim() === '';
  }
  if (Array.isArray(value)) {
    return value.length === 0;
  }
  if (typeof value === 'object') {
    return Object.keys(value).length === 0;
  }
  return false;
};

/**
 * Check if a value is not empty
 */
export const isNotEmpty = (value: unknown): boolean => !isEmpty(value);

/**
 * Validate a single field in a request body
 */
export const validateField = (
  requestBody: Record<string, any>,
  fieldConfig: FieldValidationConfig,
  oid?: string
): Effect.Effect<void, FigshareValidationError, never> => {
  const value = getNestedValue(requestBody, fieldConfig.figName);

  // Check required
  if (fieldConfig.required && isEmpty(value)) {
    return Effect.fail(
      FigshareValidationError.requiredField(fieldConfig.figName, oid)
    );
  }

  // If value is empty and not required, skip other validations
  if (isEmpty(value)) {
    return Effect.void;
  }

  // Check min length
  if (fieldConfig.minLength !== undefined) {
    const length = typeof value === 'string' ? value.length : 
                   Array.isArray(value) ? value.length : 0;
    if (length < fieldConfig.minLength) {
      return Effect.fail(
        FigshareValidationError.invalidField(
          fieldConfig.figName,
          `minimum length is ${fieldConfig.minLength}`,
          oid
        )
      );
    }
  }

  // Check max length
  if (fieldConfig.maxLength !== undefined) {
    const length = typeof value === 'string' ? value.length :
                   Array.isArray(value) ? value.length : 0;
    if (length > fieldConfig.maxLength) {
      return Effect.fail(
        FigshareValidationError.invalidField(
          fieldConfig.figName,
          `maximum length is ${fieldConfig.maxLength}`,
          oid
        )
      );
    }
  }

  // Check pattern
  if (fieldConfig.pattern && typeof value === 'string') {
    const regex = new RegExp(fieldConfig.pattern);
    if (!regex.test(value)) {
      return Effect.fail(
        FigshareValidationError.invalidField(
          fieldConfig.figName,
          `does not match required pattern`,
          oid
        )
      );
    }
  }

  return Effect.void;
};

/**
 * Validate multiple fields
 */
export const validateFields = (
  requestBody: Record<string, any>,
  fieldConfigs: FieldValidationConfig[],
  oid?: string
): Effect.Effect<void, FigshareValidationError, never> =>
  Effect.forEach(
    fieldConfigs,
    (config) => validateField(requestBody, config, oid),
    { concurrency: 1, discard: true }
  );

/**
 * Validate create request body
 */
export const validateCreateRequestBody = (
  requestBody: Record<string, any>,
  requiredFields: string[] = ['title'],
  oid?: string
): Effect.Effect<void, FigshareValidationError, never> => {
  const fieldConfigs: FieldValidationConfig[] = requiredFields.map((field) => ({
    figName: field,
    required: true
  }));

  return validateFields(requestBody, fieldConfigs, oid);
};

/**
 * Validate update request body
 */
export const validateUpdateRequestBody = (
  requestBody: Record<string, any>,
  requiredFields: string[] = [],
  oid?: string
): Effect.Effect<void, FigshareValidationError, never> => {
  // For updates, we might have different validation rules
  const fieldConfigs: FieldValidationConfig[] = requiredFields.map((field) => ({
    figName: field,
    required: true
  }));

  return validateFields(requestBody, fieldConfigs, oid);
};

/**
 * Validate embargo request body
 */
export const validateEmbargoRequestBody = (
  requestBody: Record<string, any>,
  record: RecordMetadata,
  requiredFields: string[] = [],
  oid?: string
): Effect.Effect<void, FigshareValidationError, never> => {
  // Embargo validation - check for required embargo fields
  const fieldConfigs: FieldValidationConfig[] = requiredFields.map((field) => ({
    figName: field,
    required: true
  }));

  return validateFields(requestBody, fieldConfigs, oid);
};

/**
 * Validate a field in request body using configuration-based validation
 */
export const validateFieldInRequestBody = (
  requestBody: Record<string, any>,
  fieldName: string,
  standardFields: any[],
  oid?: string
): Effect.Effect<void, FigshareValidationError, never> => {
  const fieldConfig = standardFields.find((f) => f.figName === fieldName);
  
  if (!fieldConfig) {
    return Effect.void;
  }

  const validateFn = fieldConfig.validateFn;
  if (!validateFn) {
    return Effect.void;
  }

  const value = getNestedValue(requestBody, fieldName);
  
  // Handle different validation function names
  switch (validateFn) {
    case 'required':
      if (isEmpty(value)) {
        return Effect.fail(
          FigshareValidationError.requiredField(fieldName, oid)
        );
      }
      break;
    case 'requiredAndNotZero':
      if (isEmpty(value) || value === 0) {
        return Effect.fail(
          FigshareValidationError.invalidField(
            fieldName,
            'must be provided and not zero',
            oid
          )
        );
      }
      break;
    case 'requiredAndPositive':
      if (isEmpty(value) || typeof value !== 'number' || value <= 0) {
        return Effect.fail(
          FigshareValidationError.invalidField(
            fieldName,
            'must be a positive number',
            oid
          )
        );
      }
      break;
    case 'requiredArray':
      if (!Array.isArray(value) || value.length === 0) {
        return Effect.fail(
          FigshareValidationError.invalidField(
            fieldName,
            'must be a non-empty array',
            oid
          )
        );
      }
      break;
    case 'validDate':
      if (value && !isValidDate(value)) {
        return Effect.fail(
          FigshareValidationError.invalidField(
            fieldName,
            'must be a valid date',
            oid
          )
        );
      }
      break;
    case 'validURL':
      if (value && !isValidURL(value)) {
        return Effect.fail(
          FigshareValidationError.invalidField(
            fieldName,
            'must be a valid URL',
            oid
          )
        );
      }
      break;
  }

  return Effect.void;
};

/**
 * Validate all fields in request body based on configuration
 */
export const validateAllFieldsInRequestBody = (
  requestBody: Record<string, any>,
  standardFields: any[],
  oid?: string
): Effect.Effect<void, FigshareValidationError, never> =>
  Effect.forEach(
    standardFields,
    (field) => validateFieldInRequestBody(requestBody, field.figName, standardFields, oid),
    { concurrency: 1, discard: true }
  );

/**
 * Effect-based validation for create request
 */
export const validateCreate = (
  requestBody: Record<string, any>,
  oid?: string
): Effect.Effect<void, FigshareValidationError, FigshareConfig> =>
  Effect.gen(function* () {
    const { config } = yield* FigshareConfig;
    
    // Validate standard fields for create
    yield* validateAllFieldsInRequestBody(
      requestBody,
      config.mapping.standardFields.create,
      oid
    );

    // Ensure title is present
    if (isEmpty(requestBody.title)) {
      return yield* Effect.fail(
        FigshareValidationError.requiredField('title', oid)
      );
    }
  });

/**
 * Effect-based validation for update request
 */
export const validateUpdate = (
  requestBody: Record<string, any>,
  oid?: string
): Effect.Effect<void, FigshareValidationError, FigshareConfig> =>
  Effect.gen(function* () {
    const { config } = yield* FigshareConfig;
    
    yield* validateAllFieldsInRequestBody(
      requestBody,
      config.mapping.standardFields.update,
      oid
    );
  });

/**
 * Effect-based validation for embargo request
 */
export const validateEmbargo = (
  requestBody: Record<string, any>,
  record: RecordMetadata
): Effect.Effect<void, FigshareValidationError, FigshareConfig> =>
  Effect.gen(function* () {
    const { config } = yield* FigshareConfig;
    
    yield* validateAllFieldsInRequestBody(
      requestBody,
      config.mapping.standardFields.embargo,
      record.redboxOid
    );

    // Additional embargo-specific validation
    if (requestBody.is_embargoed === true) {
      if (isEmpty(requestBody.embargo_date)) {
        return yield* Effect.fail(
          FigshareValidationError.requiredField('embargo_date', record.redboxOid)
        );
      }
    }
  });

// Helper functions

/**
 * Get nested value from object using dot notation
 */
function getNestedValue(obj: Record<string, any>, path: string): any {
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

/**
 * Check if value is a valid date string
 */
function isValidDate(value: string): boolean {
  const date = new Date(value);
  return !isNaN(date.getTime());
}

/**
 * Check if value is a valid URL
 */
function isValidURL(value: string): boolean {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validation error codes for display
 */
export const ValidationErrorCodes = {
  TITLE_REQUIRED: '@backend-Title-Required-validationMessage',
  DESCRIPTION_REQUIRED: '@backend-Description-Required-validationMessage',
  LICENSE_REQUIRED: '@backend-License-Required-validationMessage',
  AUTHORS_REQUIRED: '@backend-Authors-Required-validationMessage',
  EMBARGO_DATE_REQUIRED: '@backend-Embargo-Date-Required-validationMessage',
  INVALID_DATE_FORMAT: '@backend-Invalid-Date-Format-validationMessage',
  UPLOAD_IN_PROGRESS: '@backend-Upload-In-Progress-validationMessage'
};
