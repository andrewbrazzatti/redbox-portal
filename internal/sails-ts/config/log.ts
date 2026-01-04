/**
 * Built-in Log Configuration
 * (sails.config.log)
 *
 * Configure the log level for your app, as well as the transport.
 * Using pino for namespace logging and different formats to different transports.
 */

const _ = require("lodash");
const pino = require('pino');

declare var sails: any;

/**
 * Create a pino logger, using an optional log level and an optional destination.
 * @param level The log level (a sails.js log level).
 * @param destination An additional pino destination
 * @returns The pino logger
 */
function createPinoLogger(level?: string, destination?: any) {
  const options: any = {
    formatters: {
      level: (label: string) => {
        return { level: label };
      }
    },
    customLevels: {
      silly: 5,
      verbose: 9,
      log: 29,
      crit: 59,
    },
    level: level ?? 'verbose',
    hooks: {
      logMethod(inputArgs: any[], method: Function, level: number) {
        if (inputArgs.length === 1) {
          return method.apply(this, inputArgs);
        } else if (inputArgs.length >= 2 && _.isString(inputArgs[0]) && !_.isString(inputArgs[1])) {
          const arg1 = inputArgs.shift();
          const arg2 = inputArgs.shift();
          return method.apply(this, [arg2, arg1, ...inputArgs]);
        } else if (inputArgs.length > 1 && _.isString(inputArgs[0])) {
          const arg1 = inputArgs.shift();
          const arg2 = inputArgs.shift();
          return method.apply(this, [arg2, arg1, ...inputArgs]);
        } else {
          return method.apply(this, inputArgs);
        }
      }
    }
  };

  if (destination) {
    return pino(options, destination);
  } else {
    options.transport = {
      target: "pino-logfmt",
      options: {
        formatTime: true,
        flattenNestedObjects: true,
        convertToSnakeCase: true,
      }
    };
    return pino(options);
  }
}

/**
 * Create a namespaced logger using the pino 'childlogger' feature.
 * @param name The name for the namespace.
 * @param parentLogger The existing logger to use. Will use the default sails logger if not provided.
 * @param prefix A prefix to apply to every log created by this namespaced logger.
 * @param level The log level for the new namespaced logger.
 * @returns The new namespaced logger.
 */
function createNamespaceLogger(name: string, parentLogger: any, prefix?: string, level?: string) {
  if (!name) {
    throw new Error(`Must provide a logger name.`);
  }

  let calcLevel: string | null = level ?? null;
  if (!calcLevel && typeof sails !== undefined) {
    calcLevel = sails.config.lognamespace[name] ?? calcLevel;
  }

  const bindings = { name: name };
  const options: any = {};

  if (calcLevel !== null) {
    options['level'] = calcLevel;
  }
  if (prefix) {
    options['msgPrefix'] = prefix;
  }

  const newLogger = parentLogger.child(bindings, options);
  return newLogger;
}

const customLogger = createPinoLogger();

interface LogConfig {
  custom: {
    silly: (...args: any[]) => void;
    verbose: (...args: any[]) => void;
    trace: (...args: any[]) => void;
    debug: (...args: any[]) => void;
    log: (...args: any[]) => void;
    info: (...args: any[]) => void;
    warn: (...args: any[]) => void;
    error: (...args: any[]) => void;
    crit: (...args: any[]) => void;
    fatal: (...args: any[]) => void;
    silent: (...args: any[]) => void;
    blank: (...args: any[]) => void;
  };
  inspect: boolean;
  level: string;
  customLogger: any;
  createNamespaceLogger: typeof createNamespaceLogger;
  createPinoLogger: typeof createPinoLogger;
}

const logConfig: LogConfig = {
  custom: {
    silly: function silly() { customLogger.silly(...arguments) },
    verbose: function verbose() { customLogger.verbose(...arguments) },
    trace: function trace() { customLogger.trace(...arguments) },
    debug: function debug() { customLogger.debug(...arguments) },
    log: function log() { customLogger.log(...arguments) },
    info: function info() { customLogger.info(...arguments) },
    warn: function warn() { customLogger.warn(...arguments) },
    error: function error() { customLogger.error(...arguments) },
    crit: function crit() { customLogger.crit(...arguments) },
    fatal: function fatal() { customLogger.fatal(...arguments) },
    silent: function silent() { customLogger.silent(...arguments) },
    blank: function blank() { customLogger.silent(...arguments) },
  },
  inspect: false,
  level: 'verbose',
  customLogger: customLogger,
  createNamespaceLogger: createNamespaceLogger,
  createPinoLogger: createPinoLogger,
};

module.exports.log = logConfig;
