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

import { Effect, pipe, Option, Stream, Chunk } from 'effect';
import {
  FigshareNetworkError,
  FigshareValidationError,
  FigshareArticleStateError,
  FigshareError
} from '../errors';
import { FigshareConfig } from '../config';
import { FigshareClient, FigshareResponse } from '../client';
import { FigshareLicenseCache, FigshareLicense } from '../cache';
import { RecordMetadata } from '../services/records';
import { FigshareAuthor } from './authors';

/**
 * Figshare article details from API
 */
export interface FigshareArticleDetails {
  readonly id: number;
  readonly title: string;
  readonly doi: string;
  readonly handle: string;
  readonly url: string;
  readonly url_private_api: string;
  readonly url_public_api: string;
  readonly url_private_html: string;
  readonly url_public_html: string;
  readonly timeline: Record<string, any>;
  readonly resource_title: string;
  readonly resource_doi: string;
  readonly status: string;
  readonly version: number;
  readonly is_public: boolean;
  readonly is_confidential: boolean;
  readonly is_embargoed: boolean;
  readonly is_metadata_record: boolean;
  readonly confidential_reason: string;
  readonly embargo_date: string | null;
  readonly embargo_title: string;
  readonly embargo_reason: string;
  readonly embargo_options: any[];
  readonly license: { value: number; name: string; url: string };
  readonly tags: string[];
  readonly categories: Array<{ id: number; title: string }>;
  readonly references: string[];
  readonly custom_fields: Array<{ name: string; value: any }>;
  readonly authors: Array<{ id?: number; full_name: string; is_active: boolean }>;
  readonly figshare_url: string;
  readonly description: string;
  readonly funding: string;
  readonly funding_list: any[];
  readonly files: any[];
  readonly group_id: number;
  readonly defined_type: number;
  readonly defined_type_name: string;
  readonly size: number;
  readonly has_linked_file: boolean;
  readonly citation: string;
  readonly metadata_reason: string;
  readonly created_date: string;
  readonly modified_date: string;
  readonly published_date: string | null;
  readonly [key: string]: any;
}

/**
 * Figshare file in article
 */
export interface FigshareFile {
  readonly id: number;
  readonly name: string;
  readonly size: number;
  readonly status: 'available' | 'created' | 'deleted';
  readonly viewer_type: string;
  readonly preview_state: string;
  readonly download_url: string;
  readonly supplied_md5: string;
  readonly computed_md5: string;
  readonly is_link_only: boolean;
}

/**
 * Article creation response
 */
export interface ArticleCreatedResponse {
  readonly entity_id: number;
  readonly location: string;
  readonly warnings?: string[];
}

/**
 * Result of article creation
 */
export interface ArticleCreatedResult {
  readonly articleId: number;
  readonly location: string;
  readonly warnings: string[];
}

/**
 * Get article details from Figshare
 */
export const getArticleDetails = (
  articleId: string | number
): Effect.Effect<FigshareArticleDetails, FigshareNetworkError, FigshareClient> =>
  Effect.gen(function* () {
    const client = yield* FigshareClient;
    const response = yield* client.get<FigshareArticleDetails>(
      `/account/articles/${articleId}`,
      { label: 'getArticleDetails', logResponse: true }
    );
    return response.data;
  }).pipe(
    Effect.withSpan('figshare.getArticleDetails', {
      attributes: { articleId: String(articleId) }
    })
  );

/**
 * Check if article is approved and published based on curation status
 */
export const isArticleApprovedAndPublished = (
  articleId: string | number,
  curationStatusField: string,
  targetValue: string = 'public',
  articleDetails?: FigshareArticleDetails
): Effect.Effect<boolean, FigshareNetworkError, FigshareClient> =>
  Effect.gen(function* () {
    const details = articleDetails ?? (yield* getArticleDetails(articleId));
    
    if (curationStatusField && details[curationStatusField] === targetValue) {
      return true;
    }
    
    return false;
  });

/**
 * Get article file list with pagination
 */
export const getArticleFileList = (
  articleId: string | number,
  pageSize: number = 20
): Effect.Effect<FigshareFile[], FigshareNetworkError, FigshareClient> =>
  Effect.gen(function* () {
    const client = yield* FigshareClient;
    const files: FigshareFile[] = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const response = yield* client.get<FigshareFile[]>(
        `/account/articles/${articleId}/files?page_size=${pageSize}&page=${page}`,
        { label: `getArticleFiles-page${page}`, logResponse: true }
      );

      const pageFiles = response.data;
      if (Array.isArray(pageFiles) && pageFiles.length > 0) {
        files.push(...pageFiles);
        hasMore = pageFiles.length >= pageSize;
      } else {
        hasMore = false;
      }
      page++;
    }

    return files;
  }).pipe(
    Effect.withSpan('figshare.getArticleFileList', {
      attributes: { articleId: String(articleId) }
    })
  );

/**
 * Get article files as a stream (for large file lists)
 */
export const getArticleFilesStream = (
  articleId: string | number,
  pageSize: number = 20
): Stream.Stream<FigshareFile, FigshareNetworkError, FigshareClient> =>
  Stream.paginateEffect(1, (page) =>
    Effect.gen(function* () {
      const client = yield* FigshareClient;
      const response = yield* client.get<FigshareFile[]>(
        `/account/articles/${articleId}/files?page_size=${pageSize}&page=${page}`,
        { label: `getArticleFiles-page${page}` }
      );

      const files = response.data;
      const nextPage = files.length >= pageSize ? Option.some(page + 1) : Option.none();
      return [files, nextPage] as const;
    })
  ).pipe(Stream.flattenIterables);

/**
 * Check if any file upload is in progress
 */
export const isFileUploadInProgress = (
  articleId: string | number,
  fileList?: FigshareFile[]
): Effect.Effect<boolean, FigshareNetworkError, FigshareClient> =>
  Effect.gen(function* () {
    const files = fileList ?? (yield* getArticleFileList(articleId));
    return files.some((file) => file.status === 'created');
  });

/**
 * Check if article has files or URLs attached and available
 */
export const checkArticleHasFilesOrURLsAttached = (
  articleId: string | number,
  fileList?: FigshareFile[]
): Effect.Effect<boolean, FigshareNetworkError, FigshareClient> =>
  Effect.gen(function* () {
    const files = fileList ?? (yield* getArticleFileList(articleId));
    
    const uploadInProgress = files.some((f) => f.status === 'created');
    const hasAvailable = files.some((f) => f.status === 'available');
    
    return !uploadInProgress && hasAvailable;
  });

/**
 * Validate that article can be updated
 * Fails if upload is in progress or article is published and updates are disabled
 */
export const validateArticleCanBeUpdated = (
  articleId: string | number,
  disableUpdateWhenPublished: boolean,
  articleDetails?: FigshareArticleDetails,
  fileList?: FigshareFile[]
): Effect.Effect<
  void,
  FigshareArticleStateError | FigshareNetworkError,
  FigshareClient | FigshareConfig
> =>
  Effect.gen(function* () {
    const { config } = yield* FigshareConfig;
    const details = articleDetails ?? (yield* getArticleDetails(articleId));
    const files = fileList ?? (yield* getArticleFileList(articleId));

    // Check for upload in progress
    if (files.some((f) => f.status === 'created')) {
      return yield* Effect.fail(
        FigshareArticleStateError.uploadInProgress(String(articleId))
      );
    }

    // Check if published and updates disabled
    if (disableUpdateWhenPublished) {
      const isPublished = yield* isArticleApprovedAndPublished(
        articleId,
        config.mapping.figshareCurationStatus,
        config.mapping.figshareCurationStatusTargetValue,
        details
      );
      
      if (isPublished) {
        return yield* Effect.fail(
          FigshareArticleStateError.alreadyPublished(String(articleId))
        );
      }
    }
  });

/**
 * Create a new Figshare article
 */
export const createArticle = (
  requestBody: Record<string, any>
): Effect.Effect<ArticleCreatedResult, FigshareNetworkError, FigshareClient> =>
  Effect.gen(function* () {
    const client = yield* FigshareClient;
    const response = yield* client.post<ArticleCreatedResponse>(
      '/account/articles',
      requestBody,
      { label: 'createArticle', logResponse: true }
    );

    return {
      articleId: response.data.entity_id,
      location: response.data.location,
      warnings: response.data.warnings ?? []
    };
  }).pipe(
    Effect.withSpan('figshare.createArticle')
  );

/**
 * Update an existing Figshare article
 */
export const updateArticle = (
  articleId: string | number,
  requestBody: Record<string, any>
): Effect.Effect<FigshareResponse<any>, FigshareNetworkError, FigshareClient> =>
  Effect.gen(function* () {
    const client = yield* FigshareClient;
    return yield* client.put(
      `/account/articles/${articleId}`,
      requestBody,
      { label: 'updateArticle', logResponse: true }
    );
  }).pipe(
    Effect.withSpan('figshare.updateArticle', {
      attributes: { articleId: String(articleId) }
    })
  );

/**
 * Publish an article (make non-draft)
 */
export const publishArticle = (
  articleId: string | number,
  requestBody: Record<string, any> = {}
): Effect.Effect<FigshareResponse<any>, FigshareNetworkError, FigshareClient> =>
  Effect.gen(function* () {
    const client = yield* FigshareClient;
    return yield* client.post(
      `/account/articles/${articleId}/publish`,
      requestBody,
      { label: 'publishArticle', logResponse: true }
    );
  }).pipe(
    Effect.withSpan('figshare.publishArticle', {
      attributes: { articleId: String(articleId) }
    })
  );

/**
 * Set article embargo
 */
export const setArticleEmbargo = (
  articleId: string | number,
  requestBody: Record<string, any>
): Effect.Effect<FigshareResponse<any>, FigshareNetworkError, FigshareClient> =>
  Effect.gen(function* () {
    const client = yield* FigshareClient;
    return yield* client.put(
      `/account/articles/${articleId}/embargo`,
      requestBody,
      { label: 'setEmbargo', logResponse: true }
    );
  }).pipe(
    Effect.withSpan('figshare.setEmbargo', {
      attributes: { articleId: String(articleId) }
    })
  );

/**
 * Clear article embargo
 */
export const clearArticleEmbargo = (
  articleId: string | number
): Effect.Effect<FigshareResponse<any>, FigshareNetworkError, FigshareClient> =>
  Effect.gen(function* () {
    const client = yield* FigshareClient;
    return yield* client.delete(
      `/account/articles/${articleId}/embargo`,
      { label: 'clearEmbargo', logResponse: true }
    );
  }).pipe(
    Effect.withSpan('figshare.clearEmbargo', {
      attributes: { articleId: String(articleId) }
    })
  );

/**
 * Delete a file from an article
 */
export const deleteArticleFile = (
  articleId: string | number,
  fileId: string | number
): Effect.Effect<FigshareResponse<void>, FigshareNetworkError, FigshareClient> =>
  Effect.gen(function* () {
    const client = yield* FigshareClient;
    return yield* client.delete(
      `/account/articles/${articleId}/files/${fileId}`,
      { label: 'deleteFile', logResponse: true }
    );
  }).pipe(
    Effect.withSpan('figshare.deleteFile', {
      attributes: { articleId: String(articleId), fileId: String(fileId) }
    })
  );

/**
 * Get article ID from record
 */
export const getArticleIdFromRecord = (
  record: RecordMetadata,
  path: string
): Option.Option<number> => {
  const parts = path.split('.');
  let current: any = record;
  
  for (const part of parts) {
    if (current === undefined || current === null) {
      return Option.none();
    }
    current = current[part];
  }

  const id = Number(current);
  if (isNaN(id) || id <= 0) {
    return Option.none();
  }

  return Option.some(id);
};

/**
 * Set article ID in record (returns new record)
 */
export const setArticleIdInRecord = (
  record: RecordMetadata,
  path: string,
  articleId: number
): RecordMetadata => {
  const parts = path.split('.');
  const result = { ...record };
  let current: any = result;

  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    if (!(part in current) || typeof current[part] !== 'object') {
      current[part] = {};
    } else {
      current[part] = { ...current[part] };
    }
    current = current[part];
  }

  current[parts[parts.length - 1]] = String(articleId);
  return result;
};

/**
 * Set article URL in record (returns new record)
 */
export const setArticleURLInRecord = (
  record: RecordMetadata,
  paths: string[],
  frontEndURL: string,
  articleId: number
): RecordMetadata => {
  let result = { ...record };
  const url = `${frontEndURL}/${articleId}`;

  for (const path of paths) {
    const parts = path.split('.');
    let current: any = result;

    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i];
      if (!(part in current) || typeof current[part] !== 'object') {
        current[part] = {};
      } else {
        current[part] = { ...current[part] };
      }
      current = current[part];
    }

    current[parts[parts.length - 1]] = url;
  }

  return result;
};
