"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const brandingConfig = {
    /**
     * Keys (without leading $) allowed in BrandingConfig.variables
     */
    variableAllowList: [
        // CSS-property-name variants (using 'color' to match CSS)
        'primary-color',
        'primary-text-color',
        'secondary-color',
        'secondary-text-color',
        'accent-color',
        'accent-text-color',
        'body-text-color',
        'surface-color',
        'heading-text-color',
        'site-branding-area-background-color',
        'panel-branding-color',
        'main-menu-branding-background-colour',
        'header-branding-link-colour',
        'header-branding-background-colour',
        'logo-link-colour-branding',
        'main-menu-active-item-colour',
        'main-menu-active-item-background-colour',
        'main-menu-inactive-item-colour',
        'main-menu-inactive-item-colour-hover',
        'main-menu-inactive-item-background-colour-hover',
        'main-menu-inactive-item-background-colour',
        'main-menu-inactive-dropdown-item-colour',
        'main-menu-inactive-dropdown-item-colour-hover',
        'main-menu-active-dropdown-item-colour',
        'main-menu-active-dropdown-item-colour-hover',
        'main-menu-active-dropdown-item-background-colour-hover',
        'main-menu-selected-item-colour',
        'main-menu-selected-item-background-colour',
        'footer-bottom-area-branding-background-colour',
        'footer-bottom-area-branding-colour',
        'main-content-heading-text-branding-colour',
        // Font families
        'branding-font-family',
        'branding-main-menu-font-family',
        'branding-footer-font-family',
        'branding-main-content-heading-font-family',
        // Bootstrap control sizes (optional exposure)
        'input-btn-font-size',
        'input-btn-padding-y',
        'input-btn-padding-x',
        // Hyperlink colours
        'anchor-colour',
        'anchor-colour-hover',
        'anchor-colour-focus',
        // Extended set to support contrast validation pairs (Task 5 tests)
        'primary-colour',
        'primary-text-colour',
        'secondary-colour',
        'secondary-text-colour',
        'accent-colour',
        'accent-text-colour',
        'surface-colour',
        'body-text-colour',
        'heading-text-colour',
        'header-branding-link-color',
        'header-branding-background-color',
        'header-branding-text-color',
        'body-background-color',
        'footer-bottom-area-branding-background-color',
        'footer-bottom-area-branding-color',
        'panel-branding-background-color',
        'panel-branding-border-color',
        'anchor-color',
        'anchor-color-hover',
        'anchor-color-focus',
        'main-menu-branding-background-color',
        'main-menu-inactive-item-color',
        'main-menu-inactive-item-color-hover',
        'main-menu-inactive-item-background-color-hover',
        'main-menu-inactive-item-background-color',
        'main-menu-active-item-color',
        'main-menu-active-item-color-hover',
        'main-menu-active-item-background-color',
        'main-menu-active-item-background-color-hover',
        'main-menu-inactive-dropdown-item-color',
        'main-menu-inactive-dropdown-item-color-hover',
        'main-menu-inactive-dropdown-item-background-color',
        'main-menu-active-dropdown-item-color',
        'main-menu-active-dropdown-item-color-hover',
        'main-menu-active-dropdown-item-background-color',
        'main-menu-active-dropdown-item-background-color-hover',
        // Bootstrap contextual theme variables
        'primary', 'secondary', 'success', 'info', 'warning', 'danger', 'light', 'dark'
    ],
    /** Maximum logo upload size in bytes */
    logoMaxBytes: 512 * 1024,
    /** In-memory logo cache TTL in milliseconds */
    logoCacheTtlMs: 24 * 60 * 60 * 1000
};
module.exports.branding = brandingConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJhbmRpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9pbnRlcm5hbC9zYWlscy10cy9jb25maWcvYnJhbmRpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFRQSxNQUFNLGNBQWMsR0FBbUI7SUFDckM7O09BRUc7SUFDSCxpQkFBaUIsRUFBRTtRQUNqQiwwREFBMEQ7UUFDMUQsZUFBZTtRQUNmLG9CQUFvQjtRQUNwQixpQkFBaUI7UUFDakIsc0JBQXNCO1FBQ3RCLGNBQWM7UUFDZCxtQkFBbUI7UUFDbkIsaUJBQWlCO1FBQ2pCLGVBQWU7UUFDZixvQkFBb0I7UUFDcEIscUNBQXFDO1FBQ3JDLHNCQUFzQjtRQUN0QixzQ0FBc0M7UUFDdEMsNkJBQTZCO1FBQzdCLG1DQUFtQztRQUNuQywyQkFBMkI7UUFDM0IsOEJBQThCO1FBQzlCLHlDQUF5QztRQUN6QyxnQ0FBZ0M7UUFDaEMsc0NBQXNDO1FBQ3RDLGlEQUFpRDtRQUNqRCwyQ0FBMkM7UUFDM0MseUNBQXlDO1FBQ3pDLCtDQUErQztRQUMvQyx1Q0FBdUM7UUFDdkMsNkNBQTZDO1FBQzdDLHdEQUF3RDtRQUN4RCxnQ0FBZ0M7UUFDaEMsMkNBQTJDO1FBQzNDLCtDQUErQztRQUMvQyxvQ0FBb0M7UUFDcEMsMkNBQTJDO1FBQzNDLGdCQUFnQjtRQUNoQixzQkFBc0I7UUFDdEIsZ0NBQWdDO1FBQ2hDLDZCQUE2QjtRQUM3QiwyQ0FBMkM7UUFDM0MsOENBQThDO1FBQzlDLHFCQUFxQjtRQUNyQixxQkFBcUI7UUFDckIscUJBQXFCO1FBQ3JCLG9CQUFvQjtRQUNwQixlQUFlO1FBQ2YscUJBQXFCO1FBQ3JCLHFCQUFxQjtRQUNyQixtRUFBbUU7UUFDbkUsZ0JBQWdCO1FBQ2hCLHFCQUFxQjtRQUNyQixrQkFBa0I7UUFDbEIsdUJBQXVCO1FBQ3ZCLGVBQWU7UUFDZixvQkFBb0I7UUFDcEIsZ0JBQWdCO1FBQ2hCLGtCQUFrQjtRQUNsQixxQkFBcUI7UUFDckIsNEJBQTRCO1FBQzVCLGtDQUFrQztRQUNsQyw0QkFBNEI7UUFDNUIsdUJBQXVCO1FBQ3ZCLDhDQUE4QztRQUM5QyxtQ0FBbUM7UUFDbkMsaUNBQWlDO1FBQ2pDLDZCQUE2QjtRQUM3QixjQUFjO1FBQ2Qsb0JBQW9CO1FBQ3BCLG9CQUFvQjtRQUNwQixxQ0FBcUM7UUFDckMsK0JBQStCO1FBQy9CLHFDQUFxQztRQUNyQyxnREFBZ0Q7UUFDaEQsMENBQTBDO1FBQzFDLDZCQUE2QjtRQUM3QixtQ0FBbUM7UUFDbkMsd0NBQXdDO1FBQ3hDLDhDQUE4QztRQUM5Qyx3Q0FBd0M7UUFDeEMsOENBQThDO1FBQzlDLG1EQUFtRDtRQUNuRCxzQ0FBc0M7UUFDdEMsNENBQTRDO1FBQzVDLGlEQUFpRDtRQUNqRCx1REFBdUQ7UUFDdkQsdUNBQXVDO1FBQ3ZDLFNBQVMsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxNQUFNO0tBQ2hGO0lBQ0Qsd0NBQXdDO0lBQ3hDLFlBQVksRUFBRSxHQUFHLEdBQUcsSUFBSTtJQUN4QiwrQ0FBK0M7SUFDL0MsY0FBYyxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUk7Q0FDcEMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLGNBQWMsQ0FBQyJ9