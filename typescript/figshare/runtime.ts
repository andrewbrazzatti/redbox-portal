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

import { Effect, Layer, Runtime, Scope, Exit, Cause } from 'effect';
import { RBValidationError } from '@researchdatabox/redbox-core-types';
import {
  FigshareError,
  FigshareNetworkError,
  FigshareValidationError,
  FigshareArticleStateError,
  FigshareUploadError,
  FigshareConfigError
} from './errors';
import {
  FigshareConfig,
  FigshareRuntimeConfig,
  makeFigshareConfigLive,
  makeFigshareConfigTest
} from './config';
import {
  FigshareClient,
  makeFigshareClientLive,
  makeFigshareClientTest,
  MockResponse,
  MockError,
  AxiosFunction
} from './client';
import {
  FigshareLicenseCache,
  FigshareLicenseCacheLive,
  makeFigshareLicenseCacheTest,
  FigshareLicense,
  TEST_LICENSES
} from './cache';
import {
  RecordsService,
  makeRecordsServiceLive,
  makeRecordsServiceTest,
  RecordMetadata
} from './services/records';
import {
  DatastreamService,
  makeDatastreamServiceLive,
  makeDatastreamServiceTest,
  AttachmentInfo
} from './services/datastream';
import {
  QueueService,
  makeQueueServiceLive,
  makeQueueServiceTest
} from './services/queue';

/**
 * All Figshare dependencies combined
 */
export type FigshareDeps =
  | FigshareConfig
  | FigshareClient
  | FigshareLicenseCache
  | RecordsService
  | DatastreamService
  | QueueService;

/**
 * Options for creating the live layer
 */
export interface FigshareLiveOptions {
  readonly sailsConfig: any;
  readonly axios: AxiosFunction;
  readonly sailsRecordsService: any;
  readonly sailsDatastreamService: any;
  readonly sailsQueueService: any;
}

/**
 * Create the complete live layer for Figshare operations
 */
export const makeFigshareLive = (
  options: FigshareLiveOptions
) => {
  // Config layer (no dependencies)
  const configLayer = makeFigshareConfigLive(options.sailsConfig);

  // Client layer (depends on config)
  const clientLayer = makeFigshareClientLive(options.axios);

  // Cache layer (depends on client and config)
  const cacheLayer = FigshareLicenseCacheLive;

  // Sails service layers (no dependencies)
  const recordsLayer = makeRecordsServiceLive(options.sailsRecordsService);
  const datastreamLayer = makeDatastreamServiceLive(options.sailsDatastreamService);
  const queueLayer = makeQueueServiceLive(options.sailsQueueService);

  // Compose all layers
  return Layer.mergeAll(
    configLayer,
    recordsLayer,
    datastreamLayer,
    queueLayer
  ).pipe(
    Layer.provideMerge(clientLayer),
    Layer.provideMerge(cacheLayer)
  );
};

/**
 * Options for creating the test layer
 */
export interface FigshareTestOptions {
  readonly configOverrides?: Partial<FigshareRuntimeConfig>;
  readonly mockResponses?: Array<MockResponse | MockError | Error>;
  readonly mockLicenses?: FigshareLicense[];
  readonly mockRecords?: Record<string, RecordMetadata>;
  readonly mockDatastreams?: Map<string, Buffer>;
  readonly mockAttachments?: Map<string, AttachmentInfo[]>;
}

/**
 * Create the complete test layer for Figshare operations
 */
export const makeFigshareTest = (
  options: FigshareTestOptions = {}
): Layer.Layer<FigshareDeps> => {
  const configLayer = makeFigshareConfigTest(options.configOverrides);
  const clientLayer = makeFigshareClientTest(options.mockResponses ?? []);
  const cacheLayer = makeFigshareLicenseCacheTest(
    options.mockLicenses ?? TEST_LICENSES
  );
  const recordsLayer = makeRecordsServiceTest(options.mockRecords);
  const datastreamLayer = makeDatastreamServiceTest(
    options.mockDatastreams,
    options.mockAttachments
  );
  const { layer: queueLayer } = makeQueueServiceTest();

  return Layer.mergeAll(
    configLayer,
    clientLayer,
    cacheLayer,
    recordsLayer,
    datastreamLayer,
    queueLayer
  );
};

/**
 * Convert a FigshareError to RBValidationError for Sails compatibility
 */
export const toRBValidationError = (error: FigshareError): RBValidationError => {
  switch (error._tag) {
    case 'FigshareNetworkError':
      return new RBValidationError({
        message: error.message,
        options: { cause: error.cause },
        displayErrors: [
          {
            title: 'Failed to communicate with Figshare',
            meta: {
              status: error.status,
              statusText: error.statusText,
              oid: error.oid,
              articleId: error.articleId
            }
          }
        ]
      });

    case 'FigshareValidationError':
      return new RBValidationError({
        message: error.message,
        displayErrors: [
          {
            code: error.displayCode,
            detail: `Field ${error.field}: ${error.constraint}`,
            meta: { field: error.field, oid: error.oid }
          }
        ]
      });

    case 'FigshareArticleStateError':
      const code =
        error.currentState === 'upload_in_progress'
          ? '@backend-Upload-In-Progress-validationMessage'
          : undefined;
      return new RBValidationError({
        message: error.message,
        displayErrors: [
          {
            code,
            title: error.message,
            meta: {
              articleId: error.articleId,
              oid: error.oid,
              currentState: error.currentState,
              expectedState: error.expectedState
            }
          }
        ]
      });

    case 'FigshareUploadError':
      return new RBValidationError({
        message: error.message,
        options: { cause: error.cause },
        displayErrors: [
          {
            title: 'File upload failed',
            meta: {
              fileName: error.fileName,
              partNo: error.partNo,
              totalParts: error.totalParts,
              oid: error.oid
            }
          }
        ]
      });

    case 'FigshareConfigError':
      return new RBValidationError({
        message: error.message,
        displayErrors: [
          {
            title: 'Figshare configuration error',
            meta: { configKey: error.configKey }
          }
        ]
      });

    default:
      return new RBValidationError({
        message: 'Unknown Figshare error',
        displayErrors: [{ title: 'Unknown error' }]
      });
  }
};

/**
 * Run a Figshare effect with the live layer, returning a Promise
 * This is the main entry point for running Figshare operations from Sails
 */
export const runFigshareEffect = <A, E extends FigshareError>(
  effect: Effect.Effect<A, E, FigshareDeps>,
  options: FigshareLiveOptions
): Promise<A> => {
  const layer = makeFigshareLive(options);

  const program = effect.pipe(
    Effect.provide(layer as any),
    Effect.catchAll((error: FigshareError) => {
      throw toRBValidationError(error);
    })
  );

  return Effect.runPromise(program as any) as Promise<A>;
};

/**
 * Run a Figshare effect with the test layer, returning a Promise
 */
export const runFigshareTestEffect = <A>(
  effect: Effect.Effect<A, FigshareError, FigshareDeps>,
  options: FigshareTestOptions = {}
): Promise<A> => {
  const layer = makeFigshareTest(options);

  return Effect.runPromise(
    effect.pipe(Effect.provide(layer))
  );
};

/**
 * Run a Figshare effect and return Exit for testing
 */
export const runFigshareTestEffectExit = <A>(
  effect: Effect.Effect<A, FigshareError, FigshareDeps>,
  options: FigshareTestOptions = {}
): Promise<Exit.Exit<A, FigshareError>> => {
  const layer = makeFigshareTest(options);

  return Effect.runPromiseExit(
    effect.pipe(Effect.provide(layer))
  );
};

/**
 * Create a scoped Figshare runtime for use within a request lifecycle
 */
export const createFigshareScope = (): Effect.Effect<Scope.CloseableScope, never, Scope.Scope> =>
  Effect.acquireRelease(
    Scope.make(),
    (scope) => Scope.close(scope, Exit.void)
  );

/**
 * Logger service for Figshare operations
 */
export interface FigshareLogger {
  readonly verbose: (...args: any[]) => void;
  readonly info: (...args: any[]) => void;
  readonly warn: (...args: any[]) => void;
  readonly error: (...args: any[]) => void;
}

/**
 * Create a logger that uses sails.log
 */
export const makeSailsLogger = (sailsLog: any, logLevel: string): FigshareLogger => {
  return {
    verbose: (...args) => {
      if (logLevel === 'verbose' || logLevel === 'debug') {
        sailsLog.verbose?.(...args) ?? sailsLog.info?.(...args);
      }
    },
    info: (...args) => sailsLog.info?.(...args),
    warn: (...args) => sailsLog.warn?.(...args),
    error: (...args) => sailsLog.error?.(...args)
  };
};

/**
 * Create a silent logger for testing
 */
export const makeSilentLogger = (): FigshareLogger => ({
  verbose: () => {},
  info: () => {},
  warn: () => {},
  error: () => {}
});

/**
 * Create a console logger for debugging
 */
export const makeConsoleLogger = (): FigshareLogger => ({
  verbose: console.log,
  info: console.info,
  warn: console.warn,
  error: console.error
});
