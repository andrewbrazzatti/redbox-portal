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

import { Context, Effect, Layer, Duration } from 'effect';

/**
 * Job data for queue operations
 */
export interface QueueJobData {
  readonly [key: string]: any;
}

/**
 * Job result from queue operations
 */
export interface QueueJob {
  readonly id: string;
  readonly name: string;
  readonly data: QueueJobData;
}

/**
 * Service interface for Queue operations (abstraction over Sails QueueService)
 */
export interface QueueServiceDep {
  /**
   * Execute a job immediately
   */
  readonly now: (jobName: string, data: QueueJobData) => Effect.Effect<QueueJob, Error>;

  /**
   * Schedule a job for later execution
   */
  readonly schedule: (
    jobName: string,
    data: QueueJobData,
    delay: Duration.Duration
  ) => Effect.Effect<QueueJob, Error>;

  /**
   * Schedule a job for a specific time
   */
  readonly scheduleAt: (
    jobName: string,
    data: QueueJobData,
    when: Date
  ) => Effect.Effect<QueueJob, Error>;

  /**
   * Cancel a scheduled job
   */
  readonly cancel: (jobId: string) => Effect.Effect<void, Error>;
}

/**
 * Context tag for QueueServiceDep
 */
export class QueueService extends Context.Tag("QueueService")<
  QueueService,
  QueueServiceDep
>() {}

/**
 * Create a live QueueService layer that wraps Sails QueueService
 */
export const makeQueueServiceLive = (
  sailsQueueService: any
): Layer.Layer<QueueService> => {
  return Layer.succeed(QueueService, {
    now: (jobName: string, data: QueueJobData) =>
      Effect.tryPromise({
        try: async () => {
          const result = await sailsQueueService.now(jobName, data);
          return {
            id: result?.id ?? `job-${Date.now()}`,
            name: jobName,
            data
          } as QueueJob;
        },
        catch: (error) =>
          new Error(`Failed to queue job ${jobName}: ${error}`)
      }),

    schedule: (jobName: string, data: QueueJobData, delay: Duration.Duration) =>
      Effect.tryPromise({
        try: async () => {
          const delayMs = Duration.toMillis(delay);
          // The actual sails service might use different method names
          const result = await (sailsQueueService.schedule?.(jobName, data, delayMs) ??
            sailsQueueService.later?.(delayMs, jobName, data));
          return {
            id: result?.id ?? `job-${Date.now()}`,
            name: jobName,
            data
          } as QueueJob;
        },
        catch: (error) =>
          new Error(`Failed to schedule job ${jobName}: ${error}`)
      }),

    scheduleAt: (jobName: string, data: QueueJobData, when: Date) =>
      Effect.tryPromise({
        try: async () => {
          const result = await (sailsQueueService.scheduleAt?.(jobName, data, when) ??
            sailsQueueService.schedule?.(jobName, data, when.getTime() - Date.now()));
          return {
            id: result?.id ?? `job-${Date.now()}`,
            name: jobName,
            data
          } as QueueJob;
        },
        catch: (error) =>
          new Error(`Failed to schedule job ${jobName}: ${error}`)
      }),

    cancel: (jobId: string) =>
      Effect.tryPromise({
        try: () => sailsQueueService.cancel?.(jobId) ?? Promise.resolve(),
        catch: (error) =>
          new Error(`Failed to cancel job ${jobId}: ${error}`)
      })
  });
};

/**
 * Job record for test tracking
 */
export interface TestJobRecord {
  readonly id: string;
  readonly name: string;
  readonly data: QueueJobData;
  readonly scheduledAt?: Date;
  readonly executeAt?: Date;
}

/**
 * Create a test QueueService layer that tracks jobs in memory
 */
export const makeQueueServiceTest = (): {
  layer: Layer.Layer<QueueService>;
  getJobs: () => TestJobRecord[];
  clearJobs: () => void;
} => {
  const jobs: TestJobRecord[] = [];
  let jobCounter = 0;

  const layer = Layer.succeed(QueueService, {
    now: (jobName: string, data: QueueJobData) => {
      const job: TestJobRecord = {
        id: `test-job-${++jobCounter}`,
        name: jobName,
        data,
        scheduledAt: new Date(),
        executeAt: new Date()
      };
      jobs.push(job);
      return Effect.succeed({
        id: job.id,
        name: job.name,
        data: job.data
      });
    },

    schedule: (jobName: string, data: QueueJobData, delay: Duration.Duration) => {
      const now = new Date();
      const executeAt = new Date(now.getTime() + Duration.toMillis(delay));
      const job: TestJobRecord = {
        id: `test-job-${++jobCounter}`,
        name: jobName,
        data,
        scheduledAt: now,
        executeAt
      };
      jobs.push(job);
      return Effect.succeed({
        id: job.id,
        name: job.name,
        data: job.data
      });
    },

    scheduleAt: (jobName: string, data: QueueJobData, when: Date) => {
      const job: TestJobRecord = {
        id: `test-job-${++jobCounter}`,
        name: jobName,
        data,
        scheduledAt: new Date(),
        executeAt: when
      };
      jobs.push(job);
      return Effect.succeed({
        id: job.id,
        name: job.name,
        data: job.data
      });
    },

    cancel: (jobId: string) => {
      const index = jobs.findIndex((j) => j.id === jobId);
      if (index >= 0) {
        jobs.splice(index, 1);
      }
      return Effect.void;
    }
  });

  return {
    layer,
    getJobs: () => [...jobs],
    clearJobs: () => {
      jobs.length = 0;
    }
  };
};

/**
 * Helper effect to queue a job immediately
 */
export const queueNow = (jobName: string, data: QueueJobData) =>
  Effect.gen(function* () {
    const service = yield* QueueService;
    return yield* service.now(jobName, data);
  });

/**
 * Helper effect to schedule a job
 */
export const queueSchedule = (
  jobName: string,
  data: QueueJobData,
  delay: Duration.Duration
) =>
  Effect.gen(function* () {
    const service = yield* QueueService;
    return yield* service.schedule(jobName, data, delay);
  });

/**
 * Helper effect to schedule a job at a specific time
 */
export const queueScheduleAt = (
  jobName: string,
  data: QueueJobData,
  when: Date
) =>
  Effect.gen(function* () {
    const service = yield* QueueService;
    return yield* service.scheduleAt(jobName, data, when);
  });
