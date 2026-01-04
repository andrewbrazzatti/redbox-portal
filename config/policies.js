"use strict";
/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your controllers.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/authenticated.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "authenticated")
 *
 * For more information on how policies work, see:
 * http://sailsjs.org/#!/documentation/concepts/Policies
 *
 * For more information on configuring policies, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.policies.html
 */
Object.defineProperty(exports, "__esModule", { value: true });
const defaultPolicies = [
    'brandingAndPortal',
    'checkBrandingValid',
    'setLang',
    'prepWs',
    'i18nLanguages',
    'menuResolver',
    'isWebServiceAuthenticated',
    'checkAuth',
    'contentSecurityPolicy',
];
const noCachePlusDefaultPolicies = ['noCache', ...defaultPolicies];
const publicTranslationPolicies = [
    'noCache',
    'brandingAndPortal',
    'checkBrandingValid',
    'setLang',
    'prepWs'
];
const noCachePlusCspNoncePolicy = ['noCache', 'contentSecurityPolicy'];
const policiesConfig = {
    UserController: {
        '*': noCachePlusDefaultPolicies,
        'localLogin': noCachePlusCspNoncePolicy,
        'aafLogin': noCachePlusCspNoncePolicy,
        'openidConnectLogin': noCachePlusCspNoncePolicy,
        'beginOidc': noCachePlusCspNoncePolicy,
        'info': ['noCache', 'isAuthenticated', 'contentSecurityPolicy'],
    },
    RenderViewController: {
        'render': noCachePlusDefaultPolicies
    },
    'webservice/RecordController': {
        '*': noCachePlusDefaultPolicies
    },
    'webservice/BrandingController': {
        '*': noCachePlusDefaultPolicies
    },
    'DynamicAssetController': {
        '*': noCachePlusDefaultPolicies
    },
    // Ensure checkAuth runs on translation endpoints that modify data
    // Keep read-only translation endpoints public for frontend access
    'TranslationController': {
        '*': noCachePlusDefaultPolicies,
        'getNamespace': publicTranslationPolicies
    },
    '*': defaultPolicies
};
module.exports.policies = policiesConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWNpZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9pbnRlcm5hbC9zYWlscy10cy9jb25maWcvcG9saWNpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHOztBQUlILE1BQU0sZUFBZSxHQUFhO0lBQ2hDLG1CQUFtQjtJQUNuQixvQkFBb0I7SUFDcEIsU0FBUztJQUNULFFBQVE7SUFDUixlQUFlO0lBQ2YsY0FBYztJQUNkLDJCQUEyQjtJQUMzQixXQUFXO0lBQ1gsdUJBQXVCO0NBQ3hCLENBQUM7QUFFRixNQUFNLDBCQUEwQixHQUFhLENBQUMsU0FBUyxFQUFFLEdBQUcsZUFBZSxDQUFDLENBQUM7QUFFN0UsTUFBTSx5QkFBeUIsR0FBYTtJQUMxQyxTQUFTO0lBQ1QsbUJBQW1CO0lBQ25CLG9CQUFvQjtJQUNwQixTQUFTO0lBQ1QsUUFBUTtDQUNULENBQUM7QUFFRixNQUFNLHlCQUF5QixHQUFhLENBQUMsU0FBUyxFQUFFLHVCQUF1QixDQUFDLENBQUM7QUFFakYsTUFBTSxjQUFjLEdBQW1CO0lBQ3JDLGNBQWMsRUFBRTtRQUNkLEdBQUcsRUFBRSwwQkFBMEI7UUFDL0IsWUFBWSxFQUFFLHlCQUF5QjtRQUN2QyxVQUFVLEVBQUUseUJBQXlCO1FBQ3JDLG9CQUFvQixFQUFFLHlCQUF5QjtRQUMvQyxXQUFXLEVBQUUseUJBQXlCO1FBQ3RDLE1BQU0sRUFBRSxDQUFDLFNBQVMsRUFBRSxpQkFBaUIsRUFBRSx1QkFBdUIsQ0FBQztLQUNoRTtJQUNELG9CQUFvQixFQUFFO1FBQ3BCLFFBQVEsRUFBRSwwQkFBMEI7S0FDckM7SUFDRCw2QkFBNkIsRUFBRTtRQUM3QixHQUFHLEVBQUUsMEJBQTBCO0tBQ2hDO0lBQ0QsK0JBQStCLEVBQUU7UUFDL0IsR0FBRyxFQUFFLDBCQUEwQjtLQUNoQztJQUNELHdCQUF3QixFQUFFO1FBQ3hCLEdBQUcsRUFBRSwwQkFBMEI7S0FDaEM7SUFDRCxrRUFBa0U7SUFDbEUsa0VBQWtFO0lBQ2xFLHVCQUF1QixFQUFFO1FBQ3ZCLEdBQUcsRUFBRSwwQkFBMEI7UUFDL0IsY0FBYyxFQUFFLHlCQUF5QjtLQUMxQztJQUNELEdBQUcsRUFBRSxlQUFlO0NBQ3JCLENBQUM7QUFFRixNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBRyxjQUFjLENBQUMifQ==