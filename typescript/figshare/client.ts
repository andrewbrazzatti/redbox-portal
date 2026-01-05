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

import { Context, Effect, Layer, Schedule, Duration, pipe } from 'effect';
import { FigshareNetworkError, isRetryableStatus } from './errors';
import { FigshareConfig, FigshareRetryConfig, getConfig } from './config';

/**
 * HTTP method types supported by the Figshare client
 */
export type HttpMethod = 'get' | 'post' | 'put' | 'delete';

/**
 * Request options for Figshare API calls
 */
export interface FigshareRequestOptions {
  readonly label?: string;
  readonly retry?: Partial<FigshareRetryConfig>;
  readonly logResponse?: boolean;
}

/**
 * Axios-like configuration for HTTP requests
 */
export interface AxiosConfig {
  readonly method: HttpMethod;
  readonly url: string;
  readonly headers: Record<string, string>;
  readonly data?: unknown;
}

/**
 * HTTP response from Figshare API
 */
export interface FigshareResponse<T = any> {
  readonly status: number;
  readonly statusText: string;
  readonly data: T;
}

/**
 * Service interface for Figshare HTTP client
 */
export interface FigshareClientService {
  /**
   * Make a GET request
   */
  readonly get: <T>(
    path: string,
    options?: FigshareRequestOptions
  ) => Effect.Effect<FigshareResponse<T>, FigshareNetworkError>;

  /**
   * Make a POST request
   */
  readonly post: <T>(
    path: string,
    body: unknown,
    options?: FigshareRequestOptions
  ) => Effect.Effect<FigshareResponse<T>, FigshareNetworkError>;

  /**
   * Make a PUT request
   */
  readonly put: <T>(
    path: string,
    body: unknown,
    options?: FigshareRequestOptions
  ) => Effect.Effect<FigshareResponse<T>, FigshareNetworkError>;

  /**
   * Make a DELETE request
   */
  readonly delete: (
    path: string,
    options?: FigshareRequestOptions
  ) => Effect.Effect<FigshareResponse<void>, FigshareNetworkError>;

  /**
   * Upload binary data to a URL (for file parts)
   */
  readonly upload: (
    url: string,
    data: Buffer | NodeJS.ReadableStream,
    contentType?: string,
    options?: FigshareRequestOptions
  ) => Effect.Effect<FigshareResponse<void>, FigshareNetworkError>;

  /**
   * Make a raw request with full configuration
   */
  readonly request: <T>(
    config: AxiosConfig,
    options?: FigshareRequestOptions
  ) => Effect.Effect<FigshareResponse<T>, FigshareNetworkError>;
}

/**
 * Context tag for FigshareClientService
 */
export class FigshareClient extends Context.Tag("FigshareClient")<
  FigshareClient,
  FigshareClientService
>() {}

/**
 * Build axios configuration for a Figshare API request
 */
export const buildAxiosConfig = (
  baseURL: string,
  apiToken: string,
  method: HttpMethod,
  path: string,
  body?: unknown
): AxiosConfig => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Authorization': `token ${apiToken}`
  };

  const config: AxiosConfig = {
    method,
    url: `${baseURL}${path}`,
    headers
  };

  if (body !== undefined && (method === 'post' || method === 'put')) {
    return { ...config, data: body };
  }

  return config;
};

/**
 * Redact sensitive information from axios config for logging
 */
export const redactAxiosConfig = (config: AxiosConfig): AxiosConfig => {
  return {
    ...config,
    headers: {
      ...config.headers,
      Authorization: config.headers.Authorization ? 'REDACTED' : ''
    }
  };
};

/**
 * Check if a request method should be retried
 */
export const shouldRetryMethod = (
  method: HttpMethod,
  retryableMethods: readonly string[]
): boolean => {
  return retryableMethods.includes(method.toLowerCase());
};

/**
 * Create a retry schedule based on configuration
 */
export const makeRetrySchedule = (
  retryConfig: FigshareRetryConfig,
  method: HttpMethod
): Schedule.Schedule<number, FigshareNetworkError> => {
  // If method is not retryable, don't retry at all
  if (!shouldRetryMethod(method, retryConfig.retryOnMethods)) {
    return Schedule.recurs(0);
  }

  // Exponential backoff with jitter
  const baseSchedule = pipe(
    Schedule.exponential(Duration.millis(retryConfig.baseDelayMs)),
    Schedule.jittered,
    // Cap the delay at maxDelayMs
    Schedule.map((duration) => {
      const ms = Duration.toMillis(duration);
      return ms > retryConfig.maxDelayMs 
        ? Duration.millis(retryConfig.maxDelayMs)
        : duration;
    })
  );

  // Only retry retryable errors
  return pipe(
    baseSchedule,
    Schedule.whileInput<FigshareNetworkError>((error) => error.retryable),
    // Limit total attempts
    Schedule.compose(Schedule.recurs(retryConfig.maxAttempts - 1))
  );
};

/**
 * Type for the axios function we'll inject
 */
export type AxiosFunction = (config: AxiosConfig) => Promise<FigshareResponse>;

/**
 * Create a live FigshareClient layer using axios
 */
export const makeFigshareClientLive = (
  axios: AxiosFunction
): Layer.Layer<FigshareClient, never, FigshareConfig> => {
  return Layer.effect(
    FigshareClient,
    Effect.gen(function* () {
      const { config } = yield* FigshareConfig;

      const makeRequest = <T>(
        axiosConfig: AxiosConfig,
        options: FigshareRequestOptions = {}
      ): Effect.Effect<FigshareResponse<T>, FigshareNetworkError> => {
        const method = axiosConfig.method;
        const label = options.label ?? `${method.toUpperCase()} ${axiosConfig.url}`;
        
        // Merge retry config with any per-request overrides
        const retryConfig: FigshareRetryConfig = {
          ...config.retry,
          ...options.retry,
          retryOnMethods: options.retry?.retryOnMethods ?? config.retry.retryOnMethods,
          retryOnStatusCodes: options.retry?.retryOnStatusCodes ?? config.retry.retryOnStatusCodes
        };

        // Create the base request effect
        const requestEffect = Effect.tryPromise({
          try: () => axios(axiosConfig) as Promise<FigshareResponse<T>>,
          catch: (error: any) => {
            const status = error?.response?.status;
            const retryable = isRetryableStatus(status, [...retryConfig.retryOnStatusCodes]) &&
              shouldRetryMethod(method, retryConfig.retryOnMethods);
            return FigshareNetworkError.fromAxiosError(error, retryable);
          }
        });

        // Add retry logic
        const retrySchedule = makeRetrySchedule(retryConfig, method);
        
        return pipe(
          requestEffect,
          Effect.retry(retrySchedule),
          Effect.tap((response) => {
            if (options.logResponse) {
              return Effect.logInfo(`${label} - status ${response.status} ${response.statusText}`);
            }
            return Effect.void;
          }),
          Effect.tapError((error) =>
            Effect.logError(`${label} failed: ${error.message}`)
          ),
          Effect.withSpan(`figshare.request.${method}`, {
            attributes: {
              url: axiosConfig.url,
              method: method
            }
          })
        );
      };

      const buildConfig = (method: HttpMethod, path: string, body?: unknown): AxiosConfig => {
        return buildAxiosConfig(config.baseURL, config.apiToken, method, path, body);
      };

      return {
        get: <T>(path: string, options?: FigshareRequestOptions) =>
          makeRequest<T>(buildConfig('get', path), options),

        post: <T>(path: string, body: unknown, options?: FigshareRequestOptions) =>
          makeRequest<T>(buildConfig('post', path, body), options),

        put: <T>(path: string, body: unknown, options?: FigshareRequestOptions) =>
          makeRequest<T>(buildConfig('put', path, body), options),

        delete: (path: string, options?: FigshareRequestOptions) =>
          makeRequest<void>(buildConfig('delete', path), options),

        upload: (
          url: string,
          data: Buffer | NodeJS.ReadableStream,
          contentType: string = 'application/octet-stream',
          options?: FigshareRequestOptions
        ) => {
          const uploadConfig: AxiosConfig = {
            method: 'put',
            url,
            headers: {
              'Content-Type': contentType
            },
            data
          };
          return makeRequest<void>(uploadConfig, { 
            ...options, 
            label: options?.label ?? `UPLOAD ${url}` 
          });
        },

        request: <T>(axiosConfig: AxiosConfig, options?: FigshareRequestOptions) =>
          makeRequest<T>(axiosConfig, options)
      };
    })
  );
};

/**
 * Mock response for testing
 */
export interface MockResponse<T = any> {
  status: number;
  statusText: string;
  data: T;
}

/**
 * Mock error response for testing
 */
export interface MockError {
  __error: {
    response?: {
      status: number;
      statusText: string;
      data?: { message?: string };
    };
    message: string;
  };
}

let recordedCalls: AxiosConfig[] = [];

/**
 * Create a test FigshareClient layer with mock responses
 */
export const makeFigshareClientTest = (
  responses: Array<MockResponse | MockError | Error>
): Layer.Layer<FigshareClient> => {
  let responseIndex = 0;
  // Reset recorded calls
  recordedCalls = [];

  return Layer.succeed(
    FigshareClient,
    {
      get: <T>(path: string, options?: FigshareRequestOptions) => {
        const config: AxiosConfig = {
          method: 'get',
          url: path,
          headers: { 'Content-Type': 'application/json', Authorization: 'REDACTED' }
        };
        recordedCalls.push(config);
        return getNextResponse<T>();
      },

      post: <T>(path: string, body: unknown, options?: FigshareRequestOptions) => {
        const config: AxiosConfig = {
          method: 'post',
          url: path,
          headers: { 'Content-Type': 'application/json', Authorization: 'REDACTED' },
          data: body
        };
        recordedCalls.push(config);
        return getNextResponse<T>();
      },

      put: <T>(path: string, body: unknown, options?: FigshareRequestOptions) => {
        const config: AxiosConfig = {
          method: 'put',
          url: path,
          headers: { 'Content-Type': 'application/json', Authorization: 'REDACTED' },
          data: body
        };
        recordedCalls.push(config);
        return getNextResponse<T>();
      },

      delete: (path: string, options?: FigshareRequestOptions) => {
        const config: AxiosConfig = {
          method: 'delete',
          url: path,
          headers: { 'Content-Type': 'application/json', Authorization: 'REDACTED' }
        };
        recordedCalls.push(config);
        return getNextResponse<void>();
      },

      upload: (
        url: string,
        data: Buffer | NodeJS.ReadableStream,
        contentType?: string,
        options?: FigshareRequestOptions
      ) => {
        const config: AxiosConfig = {
          method: 'put',
          url,
          headers: { 'Content-Type': contentType ?? 'application/octet-stream' }
        };
        recordedCalls.push(config);
        return getNextResponse<void>();
      },

      request: <T>(config: AxiosConfig, options?: FigshareRequestOptions) => {
        recordedCalls.push(config);
        return getNextResponse<T>();
      }
    }
  );

  function getNextResponse<T>(): Effect.Effect<FigshareResponse<T>, FigshareNetworkError> {
    if (responseIndex >= responses.length) {
      return Effect.fail(
        new FigshareNetworkError({
          message: 'No mock response available',
          retryable: false
        })
      );
    }

    const response = responses[responseIndex++];

    if (response instanceof Error) {
      return Effect.fail(FigshareNetworkError.fromAxiosError(response, false));
    }

    if ('__error' in response) {
      return Effect.fail(FigshareNetworkError.fromAxiosError(response.__error, false));
    }

    return Effect.succeed(response as FigshareResponse<T>);
  }
};

/**
 * Helper to get the recorded calls from a test client
 */
export const getTestClientCalls = (): AxiosConfig[] => {
  return recordedCalls;
};
