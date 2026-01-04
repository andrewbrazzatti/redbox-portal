"use strict";
/**
 * Content Security Policy (CSP) configuration for the custom CSP policy in api/policies/contentSecurityPolicy.js
 *
 * You can override any of these in environment-specific files (e.g., config/env/production.js)
 * by setting module.exports.csp to a compatible object.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const cspConfig = {
    // Enable/disable emitting a CSP header entirely
    enabled: true,
    // If true, emit the Content-Security-Policy-Report-Only header instead of enforcing CSP
    reportOnly: false,
    // Which directive names should receive a per-request nonce. Commonly: ['script-src', 'style-src']
    addNonceTo: ['script-src', 'style-src'],
    // Directives map. Keys must be valid CSP directive names; values are arrays of sources/tokens.
    // If you define a key here, it REPLACES the default for that key.
    directives: {
        // == fetch directives ==
        'default-src': ["'self'"],
        'script-src': ["'self'"],
        'worker-src': ["'self'"],
        'img-src': ["'self'"],
        'connect-src': ["'self'"],
        'media-src': ["'self'"],
        'frame-src': ["'self'"],
        // elements controlled by object-src are legacy, so set this to none
        'object-src': ["'none'"],
        'manifest-src': ["'self'"],
        // allow Google Fonts by default
        'style-src': ["'self'", 'https://fonts.googleapis.com', 'https://fonts.gstatic.com'],
        'font-src': ["'self'", 'https://fonts.googleapis.com', 'https://fonts.gstatic.com'],
        // == navigation directives ==
        'frame-ancestors': ["'none'"],
        'form-action': ["'self'"],
        // == document directives ==
        'base-uri': ["'self'"],
    },
    // Raw, valueless directives appended as-is (e.g., 'upgrade-insecure-requests')
    extras: ['upgrade-insecure-requests'],
};
module.exports.csp = cspConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudFNlY3VyaXR5UG9saWN5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vaW50ZXJuYWwvc2FpbHMtdHMvY29uZmlnL2NvbnRlbnRTZWN1cml0eVBvbGljeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7O0dBS0c7O0FBVUgsTUFBTSxTQUFTLEdBQWM7SUFDM0IsZ0RBQWdEO0lBQ2hELE9BQU8sRUFBRSxJQUFJO0lBRWIsd0ZBQXdGO0lBQ3hGLFVBQVUsRUFBRSxLQUFLO0lBRWpCLGtHQUFrRztJQUNsRyxVQUFVLEVBQUUsQ0FBQyxZQUFZLEVBQUUsV0FBVyxDQUFDO0lBRXZDLCtGQUErRjtJQUMvRixrRUFBa0U7SUFDbEUsVUFBVSxFQUFFO1FBQ1YseUJBQXlCO1FBQ3pCLGFBQWEsRUFBRSxDQUFDLFFBQVEsQ0FBQztRQUN6QixZQUFZLEVBQUUsQ0FBQyxRQUFRLENBQUM7UUFDeEIsWUFBWSxFQUFFLENBQUMsUUFBUSxDQUFDO1FBQ3hCLFNBQVMsRUFBRSxDQUFDLFFBQVEsQ0FBQztRQUNyQixhQUFhLEVBQUUsQ0FBQyxRQUFRLENBQUM7UUFDekIsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDO1FBQ3ZCLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQztRQUN2QixvRUFBb0U7UUFDcEUsWUFBWSxFQUFFLENBQUMsUUFBUSxDQUFDO1FBQ3hCLGNBQWMsRUFBRSxDQUFDLFFBQVEsQ0FBQztRQUMxQixnQ0FBZ0M7UUFDaEMsV0FBVyxFQUFFLENBQUMsUUFBUSxFQUFFLDhCQUE4QixFQUFFLDJCQUEyQixDQUFDO1FBQ3BGLFVBQVUsRUFBRSxDQUFDLFFBQVEsRUFBRSw4QkFBOEIsRUFBRSwyQkFBMkIsQ0FBQztRQUNuRiw4QkFBOEI7UUFDOUIsaUJBQWlCLEVBQUUsQ0FBQyxRQUFRLENBQUM7UUFDN0IsYUFBYSxFQUFFLENBQUMsUUFBUSxDQUFDO1FBQ3pCLDRCQUE0QjtRQUM1QixVQUFVLEVBQUUsQ0FBQyxRQUFRLENBQUM7S0FDdkI7SUFFRCwrRUFBK0U7SUFDL0UsTUFBTSxFQUFFLENBQUMsMkJBQTJCLENBQUM7Q0FDdEMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLFNBQVMsQ0FBQyJ9