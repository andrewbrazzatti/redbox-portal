"use strict";
/**
 * View Engine Configuration
 * (sails.config.views)
 *
 * Server-sent views are a classic and effective way to get your app up
 * and running. Views are normally served from controllers.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const viewsConfig = {
    engine: 'ejs',
    layout: 'default/default/layout',
    partials: false,
    // Set no cache headers for certain view paths
    noCache: [
        "/default/rdmp/researcher/home",
        "/default/rdmp/home",
        "/"
    ]
};
module.exports.views = viewsConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9pbnRlcm5hbC9zYWlscy10cy9jb25maWcvdmlld3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7R0FNRzs7QUFTSCxNQUFNLFdBQVcsR0FBZ0I7SUFDL0IsTUFBTSxFQUFFLEtBQUs7SUFDYixNQUFNLEVBQUUsd0JBQXdCO0lBQ2hDLFFBQVEsRUFBRSxLQUFLO0lBQ2YsOENBQThDO0lBQzlDLE9BQU8sRUFBRTtRQUNQLCtCQUErQjtRQUMvQixvQkFBb0I7UUFDcEIsR0FBRztLQUNKO0NBQ0YsQ0FBQztBQUVGLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQyJ9