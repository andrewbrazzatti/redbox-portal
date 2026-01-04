"use strict";
/**
 * Namespace loggers:
 * Change the log level individually per logger.
 * The convention is to use class names.
 *
 * Implementation:
 * Key is the case-sensitive name passed to 'createNamespaceLogger'.
 * Value is the log level, one of the sails.js levels.
 *
 * These can be set in a config file named 'lognamespace.js' using 'module.exports.lognamespace',
 * or set via env var e.g. `'sails_lognamespace__EmailService=info'`
 */
Object.defineProperty(exports, "__esModule", { value: true });
const logNamespaceConfig = {
    // Set TranslationService to only show warn or error messages
    TranslationService: 'warn',
    // Set I18nEntriesService to only show warn or error messages
    I18nEntriesService: 'warn',
    // Set WorkflowStepsService to only show warn or error messages
    WorkflowStepsService: 'warn',
    // Set FormsService to only show warn or error messages
    FormsService: 'warn',
    // Set RenderViewController to only show warn or error messages
    RenderViewController: 'warn',
};
module.exports.lognamespace = logNamespaceConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nbmFtZXNwYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vaW50ZXJuYWwvc2FpbHMtdHMvY29uZmlnL2xvZ25hbWVzcGFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7O0dBV0c7O0FBTUgsTUFBTSxrQkFBa0IsR0FBdUI7SUFDN0MsNkRBQTZEO0lBQzdELGtCQUFrQixFQUFFLE1BQU07SUFDMUIsNkRBQTZEO0lBQzdELGtCQUFrQixFQUFFLE1BQU07SUFDMUIsK0RBQStEO0lBQy9ELG9CQUFvQixFQUFFLE1BQU07SUFDNUIsdURBQXVEO0lBQ3ZELFlBQVksRUFBRSxNQUFNO0lBQ3BCLCtEQUErRDtJQUMvRCxvQkFBb0IsRUFBRSxNQUFNO0NBQzdCLENBQUM7QUFFRixNQUFNLENBQUMsT0FBTyxDQUFDLFlBQVksR0FBRyxrQkFBa0IsQ0FBQyJ9