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

import { Context, Effect, Layer, Cache, Duration, Option } from 'effect';
import { FigshareNetworkError } from './errors';
import { FigshareClient } from './client';
import { FigshareConfig } from './config';

/**
 * Figshare license object from API
 */
export interface FigshareLicense {
  readonly value: number;
  readonly name: string;
  readonly url: string;
}

/**
 * Service interface for Figshare license cache
 */
export interface FigshareLicenseCacheService {
  /**
   * Get all available licenses (cached)
   */
  readonly getLicenses: Effect.Effect<readonly FigshareLicense[], FigshareNetworkError>;

  /**
   * Get a license by its value/ID
   */
  readonly getLicenseByValue: (
    value: number
  ) => Effect.Effect<Option.Option<FigshareLicense>, FigshareNetworkError>;

  /**
   * Get a license by its name
   */
  readonly getLicenseByName: (
    name: string
  ) => Effect.Effect<Option.Option<FigshareLicense>, FigshareNetworkError>;

  /**
   * Invalidate the cache (force refresh on next call)
   */
  readonly invalidate: Effect.Effect<void>;
}

/**
 * Context tag for FigshareLicenseCacheService
 */
export class FigshareLicenseCache extends Context.Tag("FigshareLicenseCache")<
  FigshareLicenseCache,
  FigshareLicenseCacheService
>() {}

/**
 * Default cache TTL (30 minutes)
 */
export const DEFAULT_CACHE_TTL = Duration.minutes(30);

/**
 * Create a live FigshareLicenseCache layer
 */
export const FigshareLicenseCacheLive: Layer.Layer<
  FigshareLicenseCache,
  never,
  FigshareClient | FigshareConfig
> = Layer.effect(
  FigshareLicenseCache,
  Effect.gen(function* () {
    const client = yield* FigshareClient;
    const { config } = yield* FigshareConfig;

    // Create the cache with a lookup function that fetches from the API
    const cache = yield* Cache.make({
      // The lookup function is called when cache misses
      lookup: (_key: string) =>
        Effect.gen(function* () {
          const response = yield* client.get<FigshareLicense[]>(
            '/account/licenses',
            { label: 'getLicenses', logResponse: true }
          );
          return response.data;
        }).pipe(
          // If fetch fails and we have test licenses configured, use those
          Effect.catchAll((error) => {
            if (config.testLicenses && config.testLicenses.length > 0) {
              return Effect.succeed(config.testLicenses as FigshareLicense[]);
            }
            return Effect.fail(error);
          })
        ),
      // Only one key needed for this cache
      capacity: 1,
      // Time to live - how long before the cache entry is considered stale
      timeToLive: DEFAULT_CACHE_TTL
    });

    // Key used for the single cache entry
    const CACHE_KEY = 'licenses';

    return {
      getLicenses: cache.get(CACHE_KEY),

      getLicenseByValue: (value: number) =>
        Effect.gen(function* () {
          const licenses = yield* cache.get(CACHE_KEY);
          const found = licenses.find((license) => license.value === value);
          return found ? Option.some(found) : Option.none();
        }),

      getLicenseByName: (name: string) =>
        Effect.gen(function* () {
          const licenses = yield* cache.get(CACHE_KEY);
          const found = licenses.find(
            (license) => license.name.toLowerCase() === name.toLowerCase()
          );
          return found ? Option.some(found) : Option.none();
        }),

      invalidate: cache.invalidate(CACHE_KEY)
    };
  })
);

/**
 * Create a test FigshareLicenseCache layer with preset licenses
 */
export const makeFigshareLicenseCacheTest = (
  licenses: FigshareLicense[] = []
): Layer.Layer<FigshareLicenseCache> => {
  return Layer.succeed(
    FigshareLicenseCache,
    {
      getLicenses: Effect.succeed(licenses),

      getLicenseByValue: (value: number) =>
        Effect.succeed(
          Option.fromNullable(licenses.find((l) => l.value === value))
        ),

      getLicenseByName: (name: string) =>
        Effect.succeed(
          Option.fromNullable(
            licenses.find((l) => l.name.toLowerCase() === name.toLowerCase())
          )
        ),

      invalidate: Effect.void
    }
  );
};

/**
 * Common test licenses for testing
 */
export const TEST_LICENSES: FigshareLicense[] = [
  { value: 1, name: 'CC BY 4.0', url: 'https://creativecommons.org/licenses/by/4.0/' },
  { value: 2, name: 'CC BY-SA 4.0', url: 'https://creativecommons.org/licenses/by-sa/4.0/' },
  { value: 3, name: 'CC BY-NC 4.0', url: 'https://creativecommons.org/licenses/by-nc/4.0/' },
  { value: 4, name: 'CC BY-NC-SA 4.0', url: 'https://creativecommons.org/licenses/by-nc-sa/4.0/' },
  { value: 5, name: 'CC BY-ND 4.0', url: 'https://creativecommons.org/licenses/by-nd/4.0/' },
  { value: 6, name: 'CC BY-NC-ND 4.0', url: 'https://creativecommons.org/licenses/by-nc-nd/4.0/' },
  { value: 7, name: 'CC0', url: 'https://creativecommons.org/publicdomain/zero/1.0/' },
  { value: 8, name: 'MIT', url: 'https://opensource.org/licenses/MIT' },
  { value: 9, name: 'Apache 2.0', url: 'https://www.apache.org/licenses/LICENSE-2.0' },
  { value: 10, name: 'GPL 3.0', url: 'https://www.gnu.org/licenses/gpl-3.0.en.html' }
];

/**
 * Helper effect to get licenses
 */
export const getLicenses = Effect.gen(function* () {
  const cache = yield* FigshareLicenseCache;
  return yield* cache.getLicenses;
});

/**
 * Helper effect to find a license by value
 */
export const findLicenseByValue = (value: number) =>
  Effect.gen(function* () {
    const cache = yield* FigshareLicenseCache;
    return yield* cache.getLicenseByValue(value);
  });

/**
 * Helper effect to find a license by name
 */
export const findLicenseByName = (name: string) =>
  Effect.gen(function* () {
    const cache = yield* FigshareLicenseCache;
    return yield* cache.getLicenseByName(name);
  });
