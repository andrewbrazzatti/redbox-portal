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

import { Effect, Scope, Stream, Chunk, pipe } from 'effect';
import * as TSemaphore from 'effect/TSemaphore';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { FigshareNetworkError, FigshareUploadError } from '../errors';
import { FigshareConfig } from '../config';
import { FigshareClient, FigshareResponse } from '../client';
import { DatastreamService, getDatastream, getDatastreamBuffer } from '../services/datastream';
import { FigshareFile } from './article';

/**
 * File upload initiation request
 */
export interface FileUploadInitRequest {
  readonly name: string;
  readonly size: number;
  readonly md5?: string;
}

/**
 * File upload initiation response
 */
export interface FileUploadInitResponse {
  readonly location: string;
}

/**
 * Upload info response
 */
export interface UploadInfoResponse {
  readonly token: string;
  readonly md5: string;
  readonly size: number;
  readonly name: string;
  readonly status: string;
  readonly parts: UploadPart[];
}

/**
 * Upload part information
 */
export interface UploadPart {
  readonly partNo: number;
  readonly startOffset: number;
  readonly endOffset: number;
  readonly status: string;
  readonly locked: boolean;
}

/**
 * Temp file resource for scoped cleanup
 */
export interface TempFileResource {
  readonly path: string;
  readonly cleanup: () => void;
}

/**
 * Create a temp directory for file uploads
 */
const getTempDir = (): string => {
  const tempDir = path.join(os.tmpdir(), 'figshare-uploads');
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }
  return tempDir;
};

/**
 * Create a scoped temp file that will be cleaned up when the scope closes
 */
export const withTempFile = (
  fileName: string
): Effect.Effect<TempFileResource, Error, Scope.Scope> =>
  Effect.acquireRelease(
    Effect.sync(() => {
      const tempPath = path.join(getTempDir(), `${Date.now()}-${fileName}`);
      return {
        path: tempPath,
        cleanup: () => {
          try {
            if (fs.existsSync(tempPath)) {
              fs.unlinkSync(tempPath);
            }
          } catch {
            // Ignore cleanup errors
          }
        }
      };
    }),
    (resource) =>
      Effect.sync(() => {
        resource.cleanup();
      })
  );

/**
 * Download a file from datastream to a temp file
 */
export const downloadToTempFile = (
  oid: string,
  attachId: string,
  tempPath: string
): Effect.Effect<number, Error, DatastreamService> =>
  Effect.gen(function* () {
    const service = yield* DatastreamService;
    const readable = yield* service.getDatastream(oid, attachId);

    return yield* Effect.async<number, Error>((resume) => {
      const writeStream = fs.createWriteStream(tempPath);
      let bytesWritten = 0;

      readable.on('data', (chunk) => {
        bytesWritten += chunk.length;
      });

      readable.on('error', (error) => {
        writeStream.destroy();
        resume(Effect.fail(new Error(`Download failed: ${error.message}`)));
      });

      writeStream.on('error', (error) => {
        readable.destroy();
        resume(Effect.fail(new Error(`Write failed: ${error.message}`)));
      });

      writeStream.on('finish', () => {
        resume(Effect.succeed(bytesWritten));
      });

      readable.pipe(writeStream);
    });
  });

/**
 * Initiate a file upload to Figshare
 */
export const initiateUpload = (
  articleId: string | number,
  request: FileUploadInitRequest
): Effect.Effect<string, FigshareNetworkError, FigshareClient> =>
  Effect.gen(function* () {
    const client = yield* FigshareClient;
    const response = yield* client.post<FileUploadInitResponse>(
      `/account/articles/${articleId}/files`,
      request,
      { label: 'initiateUpload' }
    );
    return response.data.location;
  }).pipe(
    Effect.withSpan('figshare.initiateUpload', {
      attributes: { articleId: String(articleId), fileName: request.name }
    })
  );

/**
 * Get upload info (parts list)
 */
export const getUploadInfo = (
  uploadLocation: string
): Effect.Effect<UploadInfoResponse, FigshareNetworkError, FigshareClient> =>
  Effect.gen(function* () {
    const client = yield* FigshareClient;
    
    // The upload location is a full URL, we need to extract just the path
    const url = yield* Effect.try({
      try: () => new URL(uploadLocation),
      catch: (error) => new FigshareNetworkError({
        message: `Invalid upload location URL: ${uploadLocation}`,
        cause: error,
        retryable: false
      })
    });
    const response = yield* client.get<UploadInfoResponse>(
      url.pathname,
      { label: 'getUploadInfo' }
    );
    return response.data;
  });

/**
 * Upload a single part to Figshare
 */
export const uploadPart = (
  uploadUrl: string,
  partNo: number,
  data: Buffer
): Effect.Effect<void, FigshareNetworkError, FigshareClient> =>
  Effect.gen(function* () {
    const client = yield* FigshareClient;
    yield* client.upload(
      `${uploadUrl}/${partNo}`,
      data,
      'application/octet-stream',
      { label: `uploadPart-${partNo}` }
    );
  }).pipe(
    Effect.withSpan('figshare.uploadPart', {
      attributes: { partNo }
    })
  );

/**
 * Complete a file upload
 */
export const completeUpload = (
  articleId: string | number,
  fileId: string | number
): Effect.Effect<void, FigshareNetworkError, FigshareClient> =>
  Effect.gen(function* () {
    const client = yield* FigshareClient;
    yield* client.post(
      `/account/articles/${articleId}/files/${fileId}`,
      {},
      { label: 'completeUpload' }
    );
  }).pipe(
    Effect.withSpan('figshare.completeUpload', {
      attributes: { articleId: String(articleId), fileId: String(fileId) }
    })
  );

/**
 * Read a part of a file from disk
 */
const readFilePart = (
  filePath: string,
  startOffset: number,
  endOffset: number
): Effect.Effect<Buffer, Error> =>
  Effect.async<Buffer, Error>((resume) => {
    const size = endOffset - startOffset + 1;
    const buffer = Buffer.alloc(size);
    
    fs.open(filePath, 'r', (openErr, fd) => {
      if (openErr) {
        resume(Effect.fail(new Error(`Failed to open file: ${openErr.message}`)));
        return;
      }

      fs.read(fd, buffer, 0, size, startOffset, (readErr, bytesRead) => {
        fs.close(fd, () => {
          if (readErr) {
            resume(Effect.fail(new Error(`Failed to read file: ${readErr.message}`)));
          } else {
            resume(Effect.succeed(buffer.slice(0, bytesRead)));
          }
        });
      });
    });
  });

/**
 * Upload all parts of a file with concurrency control
 */
export const uploadAllParts = (
  uploadUrl: string,
  filePath: string,
  parts: UploadPart[],
  maxConcurrency: number = 3
): Effect.Effect<void, FigshareNetworkError | Error, FigshareClient> =>
  Effect.gen(function* () {
    const semaphore = yield* TSemaphore.make(maxConcurrency);

    yield* Effect.forEach(
      parts,
      (part) =>
        TSemaphore.withPermit(semaphore)(
          Effect.gen(function* () {
            const data = yield* readFilePart(
              filePath,
              part.startOffset,
              part.endOffset
            );
            yield* uploadPart(uploadUrl, part.partNo, data);
          })
        ),
      { concurrency: 'unbounded' }
    );
  }).pipe(
    Effect.withSpan('figshare.uploadAllParts', {
      attributes: { partsCount: parts.length, maxConcurrency }
    })
  );

/**
 * Full file upload pipeline - download from datastream and upload to Figshare
 */
export const uploadFileToFigshare = (
  oid: string,
  attachId: string,
  articleId: string | number,
  fileName: string,
  fileSize: number
): Effect.Effect<
  void,
  FigshareNetworkError | FigshareUploadError | Error,
  FigshareClient | DatastreamService | Scope.Scope
> =>
  Effect.gen(function* () {
    // Create temp file with automatic cleanup
    const tempFile = yield* withTempFile(fileName);

    // Download from datastream to temp file
    const bytesDownloaded = yield* downloadToTempFile(oid, attachId, tempFile.path).pipe(
      Effect.mapError((error) =>
        FigshareUploadError.downloadFailed(fileName, oid, error)
      )
    );

    // Initiate upload
    const uploadLocation = yield* initiateUpload(articleId, {
      name: fileName,
      size: bytesDownloaded
    }).pipe(
      Effect.mapError((error) =>
        FigshareUploadError.initiationFailed(fileName, String(articleId), error)
      )
    );

    // Get upload parts info
    const uploadInfo = yield* getUploadInfo(uploadLocation);

    // Extract file ID from upload location
    const locationParts = uploadLocation.split('/');
    const fileId = locationParts[locationParts.length - 1];

    // Upload all parts
    yield* uploadAllParts(
      uploadInfo.token, // The upload URL with token
      tempFile.path,
      uploadInfo.parts
    );

    // Complete upload
    yield* completeUpload(articleId, fileId);
  }).pipe(
    Effect.withSpan('figshare.uploadFileToFigshare', {
      attributes: { oid, attachId, articleId: String(articleId), fileName }
    })
  );

/**
 * Upload a URL-only file (link) to Figshare
 */
export const uploadLinkToFigshare = (
  articleId: string | number,
  linkUrl: string,
  name?: string
): Effect.Effect<void, FigshareNetworkError, FigshareClient> =>
  Effect.gen(function* () {
    const client = yield* FigshareClient;
    yield* client.post(
      `/account/articles/${articleId}/files`,
      {
        link: linkUrl,
        name: name ?? linkUrl
      },
      { label: 'uploadLink' }
    );
  }).pipe(
    Effect.withSpan('figshare.uploadLink', {
      attributes: { articleId: String(articleId), linkUrl }
    })
  );

/**
 * Delete a file from Figshare article
 */
export const deleteFile = (
  articleId: string | number,
  fileId: string | number
): Effect.Effect<void, FigshareNetworkError, FigshareClient> =>
  Effect.gen(function* () {
    const client = yield* FigshareClient;
    yield* client.delete(
      `/account/articles/${articleId}/files/${fileId}`,
      { label: 'deleteFile' }
    );
  }).pipe(
    Effect.withSpan('figshare.deleteFile', {
      attributes: { articleId: String(articleId), fileId: String(fileId) }
    })
  );

/**
 * Delete multiple files from Figshare article
 */
export const deleteFiles = (
  articleId: string | number,
  fileIds: Array<string | number>
): Effect.Effect<void, FigshareNetworkError, FigshareClient> =>
  Effect.forEach(
    fileIds,
    (fileId) => deleteFile(articleId, fileId),
    { concurrency: 3 }
  ).pipe(Effect.asVoid);

/**
 * Check if article has any pending file uploads
 */
export const hasPendingUploads = (
  files: FigshareFile[]
): boolean =>
  files.some((file) => file.status === 'created');

/**
 * Get list of completed (available) files
 */
export const getCompletedFiles = (
  files: FigshareFile[]
): FigshareFile[] =>
  files.filter((file) => file.status === 'available');

/**
 * Get list of pending (in-progress) files
 */
export const getPendingFiles = (
  files: FigshareFile[]
): FigshareFile[] =>
  files.filter((file) => file.status === 'created');
