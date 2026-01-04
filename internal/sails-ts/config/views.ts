/**
 * View Engine Configuration
 * (sails.config.views)
 *
 * Server-sent views are a classic and effective way to get your app up
 * and running. Views are normally served from controllers.
 */

interface ViewsConfig {
  engine: string;
  layout: string;
  partials: boolean;
  noCache: string[];
}

const viewsConfig: ViewsConfig = {
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
