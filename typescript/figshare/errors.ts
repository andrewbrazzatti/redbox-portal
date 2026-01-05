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

import { Data } from 'effect';

/**
 * Base fields common to all Figshare errors
 */
interface FigshareErrorBase {
  readonly message: string;
  readonly articleId?: string;
  readonly oid?: string;
  readonly cause?: unknown;
}

/**
 * Network/HTTP errors from Figshare API
 * Used for connection failures, timeouts, and HTTP error responses
 */
export class FigshareNetworkError extends Data.TaggedError("FigshareNetworkError")<
  FigshareErrorBase & {
    readonly status?: number;
    readonly statusText?: string;
    readonly retryable: boolean;
  }
> {
  /**
   * Create a network error from an axios error
   */
  static fromAxiosError(error: any, retryable: boolean = true): FigshareNetworkError {
    const status = error?.response?.status;
    const statusText = error?.response?.statusText;
    const responseMessage = error?.response?.data?.message;
    const message = [status, statusText, responseMessage, error?.message]
      .filter(Boolean)
      .join(' - ') || 'Unknown network error';
    
    return new FigshareNetworkError({
      message,
      status,
      statusText,
      retryable,
      cause: error
    });
  }
}

/**
 * Validation errors for request body validation
 * Used when required fields are missing or have invalid values
 */
export class FigshareValidationError extends Data.TaggedError("FigshareValidationError")<
  FigshareErrorBase & {
    readonly field?: string;
    readonly constraint?: string;
    readonly displayCode?: string;
  }
> {
  /**
   * Create a validation error for a required field
   */
  static requiredField(field: string, oid?: string): FigshareValidationError {
    return new FigshareValidationError({
      message: `Required field '${field}' is missing or empty`,
      field,
      constraint: 'required',
      oid
    });
  }

  /**
   * Create a validation error for an invalid field value
   */
  static invalidField(field: string, constraint: string, oid?: string): FigshareValidationError {
    return new FigshareValidationError({
      message: `Field '${field}' failed validation: ${constraint}`,
      field,
      constraint,
      oid
    });
  }
}

/**
 * Article state errors when the article is in an unexpected state
 * Used for curation status issues, upload in progress, etc.
 */
export class FigshareArticleStateError extends Data.TaggedError("FigshareArticleStateError")<
  FigshareErrorBase & {
    readonly currentState: string;
    readonly expectedState?: string;
  }
> {
  /**
   * Create an error for when file upload is in progress
   */
  static uploadInProgress(articleId: string, oid?: string): FigshareArticleStateError {
    return new FigshareArticleStateError({
      message: `File upload is in progress for article ${articleId}`,
      articleId,
      oid,
      currentState: 'upload_in_progress',
      expectedState: 'ready'
    });
  }

  /**
   * Create an error for when article is already published
   */
  static alreadyPublished(articleId: string, oid?: string): FigshareArticleStateError {
    return new FigshareArticleStateError({
      message: `Article ${articleId} is already published and cannot be modified`,
      articleId,
      oid,
      currentState: 'public',
      expectedState: 'draft'
    });
  }
}

/**
 * File upload errors for the file upload pipeline
 * Used for download failures, part upload failures, etc.
 */
export class FigshareUploadError extends Data.TaggedError("FigshareUploadError")<
  FigshareErrorBase & {
    readonly fileName?: string;
    readonly partNo?: number;
    readonly totalParts?: number;
    readonly uploadId?: string;
  }
> {
  /**
   * Create an error for a failed part upload
   */
  static partUploadFailed(
    fileName: string,
    partNo: number,
    totalParts: number,
    cause?: unknown
  ): FigshareUploadError {
    return new FigshareUploadError({
      message: `Failed to upload part ${partNo}/${totalParts} of file '${fileName}'`,
      fileName,
      partNo,
      totalParts,
      cause
    });
  }

  /**
   * Create an error for when download from datastream fails
   */
  static downloadFailed(fileName: string, oid?: string, cause?: unknown): FigshareUploadError {
    return new FigshareUploadError({
      message: `Failed to download file '${fileName}' from datastream`,
      fileName,
      oid,
      cause
    });
  }

  /**
   * Create an error for when upload initiation fails
   */
  static initiationFailed(fileName: string, articleId?: string, cause?: unknown): FigshareUploadError {
    return new FigshareUploadError({
      message: `Failed to initiate upload for file '${fileName}'`,
      fileName,
      articleId,
      cause
    });
  }
}

/**
 * Configuration errors for missing or invalid configuration
 */
export class FigshareConfigError extends Data.TaggedError("FigshareConfigError")<
  FigshareErrorBase & {
    readonly configKey?: string;
  }
> {
  /**
   * Create an error for a missing configuration key
   */
  static missingKey(configKey: string): FigshareConfigError {
    return new FigshareConfigError({
      message: `Required configuration key '${configKey}' is missing`,
      configKey
    });
  }

  /**
   * Create an error for an invalid configuration value
   */
  static invalidValue(configKey: string, message: string): FigshareConfigError {
    return new FigshareConfigError({
      message: `Invalid configuration for '${configKey}': ${message}`,
      configKey
    });
  }

  /**
   * Create an error for when Figshare API is disabled
   */
  static apiDisabled(): FigshareConfigError {
    return new FigshareConfigError({
      message: 'Figshare API is disabled. Missing apiToken, baseURL, or frontEndURL configuration.'
    });
  }
}

/**
 * Union of all Figshare error types
 */
export type FigshareError =
  | FigshareNetworkError
  | FigshareValidationError
  | FigshareArticleStateError
  | FigshareUploadError
  | FigshareConfigError;

/**
 * Type guard to check if an error is a FigshareError
 */
export const isFigshareError = (error: unknown): error is FigshareError => {
  if (error === null || typeof error !== 'object') {
    return false;
  }
  const tag = (error as any)._tag;
  return (
    tag === 'FigshareNetworkError' ||
    tag === 'FigshareValidationError' ||
    tag === 'FigshareArticleStateError' ||
    tag === 'FigshareUploadError' ||
    tag === 'FigshareConfigError'
  );
};

/**
 * Check if an error is retryable
 */
export const isRetryable = (error: FigshareError): boolean => {
  switch (error._tag) {
    case 'FigshareNetworkError':
      return error.retryable;
    case 'FigshareValidationError':
    case 'FigshareArticleStateError':
    case 'FigshareConfigError':
      return false;
    case 'FigshareUploadError':
      // Upload errors may be retryable depending on the cause
      return true;
    default:
      return false;
  }
};

/**
 * Default retry status codes for network errors
 */
export const DEFAULT_RETRY_STATUS_CODES = [408, 429, 500, 502, 503, 504];

/**
 * Check if an HTTP status code should trigger a retry
 */
export const isRetryableStatus = (
  status: number | undefined,
  retryableCodes: number[] = DEFAULT_RETRY_STATUS_CODES
): boolean => {
  if (status === undefined) {
    // No response (connection error) - should retry
    return true;
  }
  return retryableCodes.includes(status);
};
