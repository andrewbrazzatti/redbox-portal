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

import { PoliciesConfig } from '@researchdatabox/redbox-core-types';

const defaultPolicies: string[] = [
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

const noCachePlusDefaultPolicies: string[] = ['noCache', ...defaultPolicies];

const publicTranslationPolicies: string[] = [
  'noCache',
  'brandingAndPortal',
  'checkBrandingValid',
  'setLang',
  'prepWs'
];

const noCachePlusCspNoncePolicy: string[] = ['noCache', 'contentSecurityPolicy'];

const policiesConfig: PoliciesConfig = {
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
