"use strict";
/**
 * Built-in Log Configuration
 * (sails.config.log)
 *
 * Configure the log level for your app, as well as the transport.
 * Using pino for namespace logging and different formats to different transports.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const pino = require('pino');
/**
 * Create a pino logger, using an optional log level and an optional destination.
 * @param level The log level (a sails.js log level).
 * @param destination An additional pino destination
 * @returns The pino logger
 */
function createPinoLogger(level, destination) {
    const options = {
        formatters: {
            level: (label) => {
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
            logMethod(inputArgs, method, level) {
                if (inputArgs.length === 1) {
                    return method.apply(this, inputArgs);
                }
                else if (inputArgs.length >= 2 && _.isString(inputArgs[0]) && !_.isString(inputArgs[1])) {
                    const arg1 = inputArgs.shift();
                    const arg2 = inputArgs.shift();
                    return method.apply(this, [arg2, arg1, ...inputArgs]);
                }
                else if (inputArgs.length > 1 && _.isString(inputArgs[0])) {
                    const arg1 = inputArgs.shift();
                    const arg2 = inputArgs.shift();
                    return method.apply(this, [arg2, arg1, ...inputArgs]);
                }
                else {
                    return method.apply(this, inputArgs);
                }
            }
        }
    };
    if (destination) {
        return pino(options, destination);
    }
    else {
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
function createNamespaceLogger(name, parentLogger, prefix, level) {
    if (!name) {
        throw new Error(`Must provide a logger name.`);
    }
    let calcLevel = level ?? null;
    if (!calcLevel && typeof sails !== undefined) {
        calcLevel = sails.config.lognamespace[name] ?? calcLevel;
    }
    const bindings = { name: name };
    const options = {};
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
const logConfig = {
    custom: {
        silly: function silly() { customLogger.silly(...arguments); },
        verbose: function verbose() { customLogger.verbose(...arguments); },
        trace: function trace() { customLogger.trace(...arguments); },
        debug: function debug() { customLogger.debug(...arguments); },
        log: function log() { customLogger.log(...arguments); },
        info: function info() { customLogger.info(...arguments); },
        warn: function warn() { customLogger.warn(...arguments); },
        error: function error() { customLogger.error(...arguments); },
        crit: function crit() { customLogger.crit(...arguments); },
        fatal: function fatal() { customLogger.fatal(...arguments); },
        silent: function silent() { customLogger.silent(...arguments); },
        blank: function blank() { customLogger.silent(...arguments); },
    },
    inspect: false,
    level: 'verbose',
    customLogger: customLogger,
    createNamespaceLogger: createNamespaceLogger,
    createPinoLogger: createPinoLogger,
};
module.exports.log = logConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vaW50ZXJuYWwvc2FpbHMtdHMvY29uZmlnL2xvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HOztBQUVILE1BQU0sQ0FBQyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUM1QixNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFJN0I7Ozs7O0dBS0c7QUFDSCxTQUFTLGdCQUFnQixDQUFDLEtBQWMsRUFBRSxXQUFpQjtJQUN6RCxNQUFNLE9BQU8sR0FBUTtRQUNuQixVQUFVLEVBQUU7WUFDVixLQUFLLEVBQUUsQ0FBQyxLQUFhLEVBQUUsRUFBRTtnQkFDdkIsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQztZQUMxQixDQUFDO1NBQ0Y7UUFDRCxZQUFZLEVBQUU7WUFDWixLQUFLLEVBQUUsQ0FBQztZQUNSLE9BQU8sRUFBRSxDQUFDO1lBQ1YsR0FBRyxFQUFFLEVBQUU7WUFDUCxJQUFJLEVBQUUsRUFBRTtTQUNUO1FBQ0QsS0FBSyxFQUFFLEtBQUssSUFBSSxTQUFTO1FBQ3pCLEtBQUssRUFBRTtZQUNMLFNBQVMsQ0FBQyxTQUFnQixFQUFFLE1BQWdCLEVBQUUsS0FBYTtnQkFDekQsSUFBSSxTQUFTLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRSxDQUFDO29CQUMzQixPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO2dCQUN2QyxDQUFDO3FCQUFNLElBQUksU0FBUyxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztvQkFDMUYsTUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDLEtBQUss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