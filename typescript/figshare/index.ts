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

/**
 * FigshareService Effect Refactoring
 * 
 * This module provides an idiomatic Effect-TS implementation of the Figshare service,
 * featuring:
 * - Tagged error types for type-safe error handling
 * - Effect's Cache module for license caching
 * - Effect's Schedule for retry logic
 * - Dependency injection via Layer and Context
 * - Composable operations for article management
 * - Resource-safe file upload pipeline with Scope
 */

// Error types
export {
  FigshareNetworkError,
  FigshareValidationError,
  FigshareArticleStateError,
  FigshareUploadError,
  FigshareConfigError,
  FigshareError,
  isFigshareError,
  isRetryable,
  DEFAULT_RETRY_STATUS_CODES,
  isRetryableStatus
} from './errors';

// Configuration
export {
  FigshareRetryConfig,
  FigshareMappingConfig,
  FigshareRuntimeConfig,
  FigshareConfigService,
  FigshareConfig,
  defaultRetryConfig,
  defaultMappingConfig,
  parseRetryConfig,
  parseMappingConfig,
  parseRuntimeConfig,
  isApiEnabled,
  makeFigshareConfigLive,
  makeFigshareConfigTest,
  getConfig,
  getConfigUnchecked
} from './config';

// HTTP Client
export {
  HttpMethod,
  FigshareRequestOptions,
  AxiosConfig,
  FigshareResponse,
  FigshareClientService,
  FigshareClient,
  buildAxiosConfig,
  redactAxiosConfig,
  shouldRetryMethod,
  makeRetrySchedule,
  AxiosFunction,
  makeFigshareClientLive,
  MockResponse,
  MockError,
  makeFigshareClientTest
} from './client';

// License Cache
export {
  FigshareLicense,
  FigshareLicenseCacheService,
  FigshareLicenseCache,
  DEFAULT_CACHE_TTL,
  FigshareLicenseCacheLive,
  makeFigshareLicenseCacheTest,
  TEST_LICENSES,
  getLicenses,
  findLicenseByValue,
  findLicenseByName
} from './cache';

// Service Abstractions
export {
  RecordMetadata,
  RecordsServiceDep,
  RecordsService,
  makeRecordsServiceLive,
  makeRecordsServiceTest,
  getRecordMeta,
  updateRecordMeta
} from './services/records';

export {
  AttachmentInfo,
  DatastreamServiceDep,
  DatastreamService,
  makeDatastreamServiceLive,
  makeDatastreamServiceTest,
  getDatastream,
  getDatastreamBuffer,
  listAttachments,
  streamDatastream
} from './services/datastream';

export {
  QueueJobData,
  QueueJob,
  QueueServiceDep,
  QueueService,
  makeQueueServiceLive,
  TestJobRecord,
  makeQueueServiceTest,
  queueNow,
  queueSchedule,
  queueScheduleAt
} from './services/queue';

// Validation
export {
  FieldValidationConfig,
  ValidationResult,
  isEmpty,
  isNotEmpty,
  validateField,
  validateFields,
  validateCreateRequestBody,
  validateUpdateRequestBody,
  validateEmbargoRequestBody,
  validateFieldInRequestBody,
  validateAllFieldsInRequestBody,
  validateCreate,
  validateUpdate,
  validateEmbargo,
  ValidationErrorCodes
} from './validation';

// Mapping
export {
  TemplateEngine,
  StandardFieldConfig,
  CustomFieldConfig,
  getValueFromRecord,
  setStandardFieldInRequestBody,
  setCustomFieldInRequestBody,
  setFieldByName,
  buildCreateRequestBody,
  buildUpdateRequestBody,
  buildEmbargoRequestBody,
  buildPublishRequestBody,
  isRecordEmbargoed,
  isClearEmbargoNeeded,
  checkEmbargoDetailsChanged,
  setFieldInRecord,
  buildCreateRequestBodyEffect,
  buildUpdateRequestBodyEffect,
  buildEmbargoRequestBodyEffect
} from './mapping';

// Operations - Authors
export {
  FigshareAuthorWithId,
  FigshareAuthorWithName,
  FigshareAuthor,
  Contributor,
  AuthorSearchTemplate,
  getContributorsFromRecord,
  getUniqueContributors,
  getValueFromObject,
  transformEmail,
  searchAuthor,
  getAuthorUserIDs,
  resolveAuthors,
  hasAuthorId,
  isNameOnlyAuthor,
  getPrimaryAuthor,
  getImpersonateAuthorId
} from './operations/authors';

// Operations - Categories
export {
  FORCodeMapping,
  findCategoryIDs,
  resolveCategories,
  validateCategories,
  mapFORCodeToCategory,
  mapFORCodesToCategories,
  TEST_CATEGORIES,
  TEST_FOR_MAPPING
} from './operations/categories';

// Operations - Article
export {
  FigshareArticleDetails,
  FigshareFile,
  ArticleCreatedResponse,
  ArticleCreatedResult,
  getArticleDetails,
  isArticleApprovedAndPublished,
  getArticleFileList,
  getArticleFilesStream,
  isFileUploadInProgress,
  checkArticleHasFilesOrURLsAttached,
  validateArticleCanBeUpdated,
  createArticle,
  updateArticle,
  publishArticle,
  setArticleEmbargo,
  clearArticleEmbargo,
  deleteArticleFile,
  getArticleIdFromRecord,
  setArticleIdInRecord,
  setArticleURLInRecord
} from './operations/article';

// Operations - Files
export {
  FileUploadInitRequest,
  FileUploadInitResponse,
  UploadInfoResponse,
  UploadPart,
  TempFileResource,
  withTempFile,
  downloadToTempFile,
  initiateUpload,
  getUploadInfo,
  uploadPart,
  completeUpload,
  uploadAllParts,
  uploadFileToFigshare,
  uploadLinkToFigshare,
  deleteFile,
  deleteFiles,
  hasPendingUploads,
  getCompletedFiles,
  getPendingFiles
} from './operations/files';

// Runtime
export {
  FigshareDeps,
  FigshareLiveOptions,
  makeFigshareLive,
  FigshareTestOptions,
  makeFigshareTest,
  toRBValidationError,
  runFigshareEffect,
  runFigshareTestEffect,
  runFigshareTestEffectExit,
  createFigshareScope,
  FigshareLogger,
  makeSailsLogger,
  makeSilentLogger,
  makeConsoleLogger
} from './runtime';
