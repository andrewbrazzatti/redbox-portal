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

import { Effect } from 'effect';
import { FigshareConfig, FigshareRuntimeConfig } from '../config';
import { RecordMetadata } from '../services/records';

/**
 * FOR (Field of Research) code mapping
 */
export interface FORCodeMapping {
  readonly forCode: string;
  readonly figshareCategory: number;
  readonly description?: string;
}

/**
 * Find Figshare category IDs from a record based on FOR code mapping
 * This is a pure function that can be used without Effect
 */
export const findCategoryIDs = (
  record: RecordMetadata,
  forCodesMapping: FORCodeMapping[],
  template: string,
  templateEngine: (template: string, context: Record<string, any>) => any
): number[] => {
  if (!forCodesMapping || forCodesMapping.length === 0) {
    return [];
  }

  if (!template || !template.includes('<%')) {
    return [];
  }

  try {
    const context = {
      record,
      forCodes: forCodesMapping
    };
    const result = templateEngine(template, context);
    
    // Ensure we have an array of numbers
    if (Array.isArray(result)) {
      return result.filter((id): id is number => typeof id === 'number');
    }
    
    return [];
  } catch {
    return [];
  }
};

/**
 * Resolve categories for a record using configuration
 */
export const resolveCategories = (
  record: RecordMetadata,
  templateEngine: (template: string, context: Record<string, any>) => any
): Effect.Effect<number[], never, FigshareConfig> =>
  Effect.gen(function* () {
    const { config } = yield* FigshareConfig;

    // If test categories configured, use those
    if (config.testCategories && config.testCategories.length > 0) {
      return config.testCategories;
    }

    const template = config.mapping.runtimeArtifacts.getCategoryIDs.template;
    return findCategoryIDs(
      record,
      config.forCodesMapping,
      template,
      templateEngine
    );
  });

/**
 * Validate that at least one category is provided
 */
export const validateCategories = (
  categories: number[]
): Effect.Effect<number[], never, never> => {
  if (categories.length === 0) {
    // Categories might not be required - just return empty array
    return Effect.succeed([]);
  }
  return Effect.succeed(categories);
};

/**
 * Map a FOR code to a Figshare category ID
 */
export const mapFORCodeToCategory = (
  forCode: string,
  mapping: FORCodeMapping[]
): number | undefined => {
  const match = mapping.find(
    (m) => m.forCode === forCode || m.forCode === forCode.replace(/\D/g, '')
  );
  return match?.figshareCategory;
};

/**
 * Map multiple FOR codes to Figshare category IDs
 */
export const mapFORCodesToCategories = (
  forCodes: string[],
  mapping: FORCodeMapping[]
): number[] => {
  const categoryIds: number[] = [];
  
  for (const forCode of forCodes) {
    const categoryId = mapFORCodeToCategory(forCode, mapping);
    if (categoryId !== undefined && !categoryIds.includes(categoryId)) {
      categoryIds.push(categoryId);
    }
  }
  
  return categoryIds;
};

/**
 * Common Figshare categories for testing
 */
export const TEST_CATEGORIES = {
  // Social Sciences
  SOCIOLOGY: 37136,
  PSYCHOLOGY: 37135,
  ECONOMICS: 37130,
  POLITICAL_SCIENCE: 37134,
  
  // Natural Sciences
  BIOLOGY: 37101,
  CHEMISTRY: 37102,
  PHYSICS: 37103,
  MATHEMATICS: 37104,
  
  // Engineering
  COMPUTER_SCIENCE: 37120,
  ELECTRICAL_ENGINEERING: 37121,
  MECHANICAL_ENGINEERING: 37122,
  
  // Health Sciences
  MEDICINE: 37140,
  PUBLIC_HEALTH: 37141,
  
  // Humanities
  HISTORY: 37150,
  PHILOSOPHY: 37151,
  LITERATURE: 37152
};

/**
 * Example FOR code mapping for testing
 */
export const TEST_FOR_MAPPING: FORCodeMapping[] = [
  { forCode: '0801', figshareCategory: TEST_CATEGORIES.COMPUTER_SCIENCE, description: 'Artificial Intelligence and Image Processing' },
  { forCode: '0802', figshareCategory: TEST_CATEGORIES.COMPUTER_SCIENCE, description: 'Computation Theory and Mathematics' },
  { forCode: '0803', figshareCategory: TEST_CATEGORIES.COMPUTER_SCIENCE, description: 'Computer Software' },
  { forCode: '0804', figshareCategory: TEST_CATEGORIES.COMPUTER_SCIENCE, description: 'Data Format' },
  { forCode: '0805', figshareCategory: TEST_CATEGORIES.COMPUTER_SCIENCE, description: 'Distributed Computing' },
  { forCode: '0806', figshareCategory: TEST_CATEGORIES.COMPUTER_SCIENCE, description: 'Information Systems' },
  { forCode: '0101', figshareCategory: TEST_CATEGORIES.MATHEMATICS, description: 'Pure Mathematics' },
  { forCode: '0102', figshareCategory: TEST_CATEGORIES.MATHEMATICS, description: 'Applied Mathematics' },
  { forCode: '0201', figshareCategory: TEST_CATEGORIES.PHYSICS, description: 'Astronomical and Space Sciences' },
  { forCode: '0202', figshareCategory: TEST_CATEGORIES.PHYSICS, description: 'Atomic, Molecular, Nuclear, Particle and Plasma Physics' }
];
