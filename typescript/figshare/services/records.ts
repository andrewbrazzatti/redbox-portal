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
import { cloneDeep, get, set } from 'lodash';

/**
 * Record metadata object
 */
export interface RecordMetadata {
  readonly redboxOid: string;
  readonly [key: string]: any;
}

/**
 * Helper to get value from path using lodash get
 */
const getPathImpl = <T>(record: RecordMetadata, path: string): T | undefined => {
  return get(record, path);
};

/**
 * Helper to set value at path using structural sharing (immutable update)
 */
const setPathImpl = <T>(record: RecordMetadata, path: string, value: T): RecordMetadata => {
  // We use cloneDeep to ensure we don't mutate the original record (immutability).
      // Note: cloneDeep is expensive and could be a performance bottleneck if this code
      // is subject to high concurrency. In that case, consider switching to structural sharing
      // or an immutable library.
      const newRecord = cloneDeep(record);
      return set(newRecord, path, value);
};

/**
 * Service interface for Records operations (abstraction over Sails RecordsService)
 */
export interface RecordsServiceDep {
  /**
   * Get record metadata by OID
   */
  readonly getMeta: (oid: string) => Effect.Effect<RecordMetadata, Error>;

  /**
   * Update record metadata
   */
  readonly updateMeta: (
    brand: any,
    oid: string,
    record: RecordMetadata,
    user?: any
  ) => Effect.Effect<RecordMetadata, Error>;

  /**
   * Get value from record at path
   */
  readonly getPath: <T>(record: RecordMetadata, path: string) => T | undefined;

  /**
   * Set value in record at path
   */
  readonly setPath: <T>(
    record: RecordMetadata,
    path: string,
    value: T
  ) => RecordMetadata;
}

/**
 * Context tag for RecordsServiceDep
 */
export class RecordsService extends Context.Tag("RecordsService")<
  RecordsService,
  RecordsServiceDep
>() {}

/**
 * Create a live RecordsService layer that wraps Sails RecordsService
 */
export const makeRecordsServiceLive = (
  sailsRecordsService: any
): Layer.Layer<RecordsService> => {
  return Layer.succeed(RecordsService, {
    getMeta: (oid: string) =>
      Effect.tryPromise({
        try: () => sailsRecordsService.getMeta(oid),
        catch: (error) =>
          new Error(`Failed to get record metadata for ${oid}: ${error}`)
      }),

    updateMeta: (brand: any, oid: string, record: RecordMetadata, user?: any) =>
      Effect.tryPromise({
        try: () => sailsRecordsService.updateMeta(brand, oid, record, user),
        catch: (error) =>
          new Error(`Failed to update record metadata for ${oid}: ${error}`)
      }),

    getPath: <T>(record: RecordMetadata, path: string): T | undefined => getPathImpl(record, path),

    setPath: <T>(
      record: RecordMetadata,
      path: string,
      value: T
    ): RecordMetadata => setPathImpl(record, path, value)
  });
};

/**
 * Create a test RecordsService layer with in-memory storage
 */
export const makeRecordsServiceTest = (
  initialRecords: Record<string, RecordMetadata> = {}
): Layer.Layer<RecordsService> => {
  const records = new Map<string, RecordMetadata>(Object.entries(initialRecords));

  return Layer.succeed(RecordsService, {
    getMeta: (oid: string) => {
      const record = records.get(oid);
      if (!record) {
        return Effect.fail(new Error(`Record not found: ${oid}`));
      }
      return Effect.succeed(record);
    },

    updateMeta: (brand: any, oid: string, record: RecordMetadata, user?: any) => {
      records.set(oid, record);
      return Effect.succeed(record);
    },

    getPath: <T>(record: RecordMetadata, path: string): T | undefined => getPathImpl(record, path),

    setPath: <T>(
      record: RecordMetadata,
      path: string,
      value: T
    ): RecordMetadata => setPathImpl(record, path, value)

  });
};

/**
 * Helper effect to get record metadata
 */
export const getRecordMeta = (oid: string) =>
  Effect.gen(function* () {
    const service = yield* RecordsService;
    return yield* service.getMeta(oid);
  });

/**
 * Helper effect to update record metadata
 */
export const updateRecordMeta = (
  brand: any,
  oid: string,
  record: RecordMetadata,
  user?: any
) =>
  Effect.gen(function* () {
    const service = yield* RecordsService;
    return yield* service.updateMeta(brand, oid, record, user);
  });
