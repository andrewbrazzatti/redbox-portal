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

import { Effect, Option } from 'effect';
import { FigshareNetworkError, FigshareValidationError } from '../errors';
import { FigshareConfig } from '../config';
import { FigshareClient } from '../client';
import { RecordMetadata } from '../services/records';

/**
 * Author with Figshare ID
 */
export interface FigshareAuthorWithId {
  readonly id: number;
}

/**
 * Author with name only (external/unmatched)
 */
export interface FigshareAuthorWithName {
  readonly name: string;
}

/**
 * Combined author type
 */
export type FigshareAuthor = FigshareAuthorWithId | FigshareAuthorWithName;

/**
 * Contributor from ReDBox record
 */
export interface Contributor {
  readonly [key: string]: any;
}

/**
 * Author search request template
 */
export interface AuthorSearchTemplate {
  readonly template: string;
  readonly email?: string;
  readonly institution_user_id?: string;
  readonly symplectic_user_id?: string;
  readonly prefix?: string;
  readonly override?: string;
  readonly [key: string]: any;
}

/**
 * Extract contributors from a record based on configuration template
 * This is a pure function that can be used without Effect
 */
export const getContributorsFromRecord = (
  record: RecordMetadata,
  template: string,
  templateEngine: (template: string, context: Record<string, any>) => any
): Contributor[] => {
  if (!template || !template.includes('<%')) {
    return [];
  }

  try {
    const context = { record };
    const result = templateEngine(template, context);
    return Array.isArray(result) ? result : [];
  } catch {
    return [];
  }
};

/**
 * Get unique contributors based on uniqueBy field
 */
export const getUniqueContributors = (
  contributors: Contributor[],
  uniqueBy?: string
): Contributor[] => {
  if (!uniqueBy) {
    return contributors;
  }

  const seen = new Set<any>();
  return contributors.filter((contributor) => {
    const key = contributor[uniqueBy];
    if (key === undefined || seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
};

/**
 * Extract value from object using template or path
 */
export const getValueFromObject = <T>(
  obj: Record<string, any>,
  pathOrTemplate: string,
  artifacts: Record<string, any>,
  templateEngine: (template: string, context: Record<string, any>) => any,
  momentLib?: any
): T | undefined => {
  if (pathOrTemplate.includes('<%')) {
    try {
      const context = {
        moment: momentLib,
        field: obj,
        artifacts
      };
      return templateEngine(pathOrTemplate, context) as T;
    } catch {
      return undefined;
    }
  }

  // Simple path resolution
  const parts = pathOrTemplate.split('.');
  let current: any = obj;
  for (const part of parts) {
    if (current === undefined || current === null) {
      return undefined;
    }
    current = current[part];
  }
  return current as T;
};

/**
 * Apply email transformations based on search template config
 */
export const transformEmail = (
  email: string,
  template: AuthorSearchTemplate
): string => {
  if (typeof email !== 'string' || !email.includes('@')) {
    return email;
  }

  const parts = email.split('@');
  if (parts.length !== 2) {
    return email;
  }

  if (template.prefix) {
    return `${parts[0]}@${template.prefix}${parts[1]}`;
  }

  if (template.override) {
    return `${parts[0]}@${template.override}`;
  }

  return email;
};

/**
 * Search for a single author in Figshare
 */
export const searchAuthor = (
  searchBody: Record<string, any>,
  figshareAuthorUserId: string = 'id'
): Effect.Effect<
  Option.Option<FigshareAuthorWithId>,
  FigshareNetworkError,
  FigshareClient
> =>
  Effect.gen(function* () {
    const client = yield* FigshareClient;

    const response = yield* client.post<Array<Record<string, any>>>(
      '/account/institution/accounts/search',
      searchBody,
      { 
        label: 'searchAuthor',
        retry: { retryOnMethods: ['post'] }
      }
    ).pipe(
      Effect.catchAll((error) =>
        Effect.flatMap(
          Effect.logWarning(`Author search failed: ${error.message}`),
          () => Effect.succeed({ status: 200, statusText: 'OK', data: [] })
        )
      )
    );

    const authorData = response.data;
    if (!authorData || authorData.length === 0) {
      return Option.none();
    }

    const userId = authorData[0][figshareAuthorUserId];
    if (userId === undefined || userId === null) {
      return Option.none();
    }

    const id = Number(userId);
    if (!Number.isFinite(id)) {
      return Option.none();
    }

    return Option.some({ id });
  }).pipe(
    Effect.withSpan('figshare.searchAuthor')
  );

/**
 * Get Figshare author IDs for a list of contributors
 */
export const getAuthorUserIDs = (
  contributors: Contributor[],
  searchTemplates: AuthorSearchTemplate[],
  externalNameField: string,
  figshareAuthorUserId: string,
  artifacts: Record<string, any>,
  templateEngine: (template: string, context: Record<string, any>) => any,
  momentLib?: any
): Effect.Effect<FigshareAuthor[], FigshareNetworkError, FigshareClient> =>
  Effect.gen(function* () {
    const matchedAuthors: FigshareAuthor[] = [];
    const unmatchedContributors: Contributor[] = [];

    // Try to match each contributor using the search templates
    for (const contributor of contributors) {
      let matched = false;

      for (const searchTemplate of searchTemplates) {
        // Get the user ID value using the template
        const userId = getValueFromObject<string>(
          contributor,
          searchTemplate.template,
          artifacts,
          templateEngine,
          momentLib
        );

        if (!userId) {
          continue;
        }

        // Determine which search field to use
        const searchBody: Record<string, any> = {};
        const templateCopy = { ...searchTemplate };
        delete (templateCopy as any).template;

        const searchKeys = Object.keys(templateCopy).filter(
          (k) => k !== 'prefix' && k !== 'override'
        );
        
        if (searchKeys.length === 0) {
          continue;
        }

        const searchBy = searchKeys[0];
        let searchValue = userId;

        // Apply email transformations if searching by email
        if (searchBy === 'email') {
          searchValue = transformEmail(userId, searchTemplate);
        }

        searchBody[searchBy] = searchValue;

        // Search for the author
        const result = yield* searchAuthor(searchBody, figshareAuthorUserId);

        if (Option.isSome(result)) {
          matchedAuthors.push(result.value);
          matched = true;
          break;
        }
      }

      if (!matched) {
        unmatchedContributors.push(contributor);
      }
    }

    // Add unmatched contributors by name
    for (const contributor of unmatchedContributors) {
      const name = contributor[externalNameField];
      
      if (typeof name !== 'string' && typeof name !== 'number' && typeof name !== 'boolean') {
        continue;
      }

      const nameStr = String(name).trim();
      if (nameStr) {
        matchedAuthors.push({ name: nameStr });
      }
    }

    return matchedAuthors;
  }).pipe(
    Effect.withSpan('figshare.getAuthorUserIDs', {
      attributes: { contributorCount: contributors.length }
    })
  );

/**
 * Resolve authors for a record
 * This combines getting contributors and looking up their Figshare IDs
 */
export const resolveAuthors = (
  record: RecordMetadata,
  templateEngine: (template: string, context: Record<string, any>) => any,
  momentLib?: any
): Effect.Effect<
  FigshareAuthor[],
  FigshareNetworkError,
  FigshareClient | FigshareConfig
> =>
  Effect.gen(function* () {
    const { config } = yield* FigshareConfig;
    const mapping = config.mapping;

    // Get contributors from record
    const contributorsTemplate = mapping.runtimeArtifacts.getContributorsFromRecord.template;
    const allContributors = getContributorsFromRecord(
      record,
      contributorsTemplate,
      templateEngine
    );

    // Get unique contributors
    const uniqueContributors = getUniqueContributors(
      allContributors,
      mapping.recordAuthorUniqueBy
    );

    // If test users configured, use those instead
    if (config.testUsers && config.testUsers.length > 0) {
      return config.testUsers as FigshareAuthor[];
    }

    // Get author IDs from Figshare
    const authors = yield* getAuthorUserIDs(
      uniqueContributors,
      mapping.templates.getAuthor,
      mapping.recordAuthorExternalName,
      mapping.figshareAuthorUserId,
      mapping.artifacts,
      templateEngine,
      momentLib
    );

    return authors;
  }).pipe(
    Effect.withSpan('figshare.resolveAuthors')
  );

/**
 * Check if an author has an ID (matched in Figshare)
 */
export const hasAuthorId = (author: FigshareAuthor): author is FigshareAuthorWithId => {
  return 'id' in author;
};

/**
 * Check if an author is name-only (external/unmatched)
 */
export const isNameOnlyAuthor = (author: FigshareAuthor): author is FigshareAuthorWithName => {
  return 'name' in author && !('id' in author);
};

/**
 * Get the primary author (first author with ID, or first author)
 */
export const getPrimaryAuthor = (authors: FigshareAuthor[]): Option.Option<FigshareAuthor> => {
  if (authors.length === 0) {
    return Option.none();
  }

  const withId = authors.find(hasAuthorId);
  if (withId) {
    return Option.some(withId);
  }

  return Option.some(authors[0]);
};

/**
 * Get impersonate author ID for requests that need it
 */
export const getImpersonateAuthorId = (
  authors: FigshareAuthor[]
): Option.Option<number> => {
  const primary = getPrimaryAuthor(authors);
  if (Option.isNone(primary)) {
    return Option.none();
  }

  if (hasAuthorId(primary.value)) {
    return Option.some(primary.value.id);
  }

  return Option.none();
};
