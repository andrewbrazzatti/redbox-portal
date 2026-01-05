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

import { Context, Effect, Layer, Stream } from 'effect';
import { Readable } from 'stream';

/**
 * Attachment/file metadata
 */
export interface AttachmentInfo {
  readonly fileId: string;
  readonly name: string;
  readonly mimeType: string;
  readonly size: number;
  readonly metadata?: Record<string, any>;
}

/**
 * Service interface for Datastream operations (abstraction over Sails DatastreamService)
 */
export interface DatastreamServiceDep {
  /**
   * Get a readable stream for an attachment
   */
  readonly getDatastream: (
    oid: string,
    attachId: string
  ) => Effect.Effect<Readable, Error>;

  /**
   * Get attachment info/metadata
   */
  readonly getAttachmentInfo: (
    oid: string,
    attachId: string
  ) => Effect.Effect<AttachmentInfo, Error>;

  /**
   * List all attachments for a record
   */
  readonly listAttachments: (
    oid: string
  ) => Effect.Effect<readonly AttachmentInfo[], Error>;

  /**
   * Get datastream as Buffer
   */
  readonly getDatastreamBuffer: (
    oid: string,
    attachId: string
  ) => Effect.Effect<Buffer, Error>;
}

/**
 * Context tag for DatastreamServiceDep
 */
export class DatastreamService extends Context.Tag("DatastreamService")<
  DatastreamService,
  DatastreamServiceDep
>() {}

/**
 * Create a live DatastreamService layer that wraps Sails DatastreamService
 */
export const makeDatastreamServiceLive = (
  sailsDatastreamService: any
): Layer.Layer<DatastreamService> => {
  return Layer.succeed(DatastreamService, {
    getDatastream: (oid: string, attachId: string) =>
      Effect.tryPromise({
        try: () => sailsDatastreamService.getDatastream(oid, attachId),
        catch: (error) =>
          new Error(
            `Failed to get datastream for ${oid}/${attachId}: ${error}`
          )
      }),

    getAttachmentInfo: (oid: string, attachId: string) =>
      Effect.tryPromise({
        try: async () => {
          // The actual implementation might vary based on the sails service
          const info = await sailsDatastreamService.getAttachmentInfo?.(oid, attachId);
          if (!info) {
            throw new Error(`Attachment not found: ${oid}/${attachId}`);
          }
          return info as AttachmentInfo;
        },
        catch: (error) =>
          new Error(
            `Failed to get attachment info for ${oid}/${attachId}: ${error}`
          )
      }),

    listAttachments: (oid: string) =>
      Effect.tryPromise({
        try: async () => {
          const attachments = await sailsDatastreamService.listAttachments?.(oid);
          return (attachments ?? []) as AttachmentInfo[];
        },
        catch: (error) =>
          new Error(`Failed to list attachments for ${oid}: ${error}`)
      }),

    getDatastreamBuffer: (oid: string, attachId: string) =>
      Effect.tryPromise({
        try: async () => {
          const stream: Readable = await sailsDatastreamService.getDatastream(
            oid,
            attachId
          );
          const chunks: Buffer[] = [];
          for await (const chunk of stream) {
            chunks.push(Buffer.from(chunk));
          }
          return Buffer.concat(chunks);
        },
        catch: (error) =>
          new Error(
            `Failed to get datastream buffer for ${oid}/${attachId}: ${error}`
          )
      })
  });
};

/**
 * Create a test DatastreamService layer with mock data
 */
export const makeDatastreamServiceTest = (
  mockData: Map<string, Buffer> = new Map(),
  mockAttachments: Map<string, AttachmentInfo[]> = new Map()
): Layer.Layer<DatastreamService> => {
  return Layer.succeed(DatastreamService, {
    getDatastream: (oid: string, attachId: string) => {
      const key = `${oid}/${attachId}`;
      const data = mockData.get(key);
      if (!data) {
        return Effect.fail(new Error(`Mock datastream not found: ${key}`));
      }
      const readable = Readable.from(data);
      return Effect.succeed(readable);
    },

    getAttachmentInfo: (oid: string, attachId: string) => {
      const attachments = mockAttachments.get(oid) ?? [];
      const info = attachments.find((a) => a.fileId === attachId);
      if (!info) {
        return Effect.fail(
          new Error(`Mock attachment not found: ${oid}/${attachId}`)
        );
      }
      return Effect.succeed(info);
    },

    listAttachments: (oid: string) => {
      const attachments = mockAttachments.get(oid) ?? [];
      return Effect.succeed(attachments);
    },

    getDatastreamBuffer: (oid: string, attachId: string) => {
      const key = `${oid}/${attachId}`;
      const data = mockData.get(key);
      if (!data) {
        return Effect.fail(new Error(`Mock datastream not found: ${key}`));
      }
      return Effect.succeed(data);
    }
  });
};

/**
 * Helper effect to get datastream
 */
export const getDatastream = (oid: string, attachId: string) =>
  Effect.gen(function* () {
    const service = yield* DatastreamService;
    return yield* service.getDatastream(oid, attachId);
  });

/**
 * Helper effect to get datastream as Buffer
 */
export const getDatastreamBuffer = (oid: string, attachId: string) =>
  Effect.gen(function* () {
    const service = yield* DatastreamService;
    return yield* service.getDatastreamBuffer(oid, attachId);
  });

/**
 * Helper effect to list attachments
 */
export const listAttachments = (oid: string) =>
  Effect.gen(function* () {
    const service = yield* DatastreamService;
    return yield* service.listAttachments(oid);
  });

/**
 * Stream datastream content in chunks
 */
export const streamDatastream = (
  oid: string,
  attachId: string,
  chunkSize: number = 64 * 1024
): Stream.Stream<Buffer, Error, DatastreamService> =>
  Stream.unwrap(
    Effect.gen(function* () {
      const service = yield* DatastreamService;
      const readable = yield* service.getDatastream(oid, attachId);

      return Stream.fromAsyncIterable(readable, (error) =>
        new Error(`Error reading datastream: ${error}`)
      ).pipe(
        Stream.map((chunk) => Buffer.from(chunk))
      );
    })
  );
