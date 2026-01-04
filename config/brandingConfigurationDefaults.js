"use strict";
/**
 * Branding Configuration Defaults
 *
 * Authentication and authorization configuration with menu, home panels, and admin sidebar defaults.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Default brand authentication configuration
 */
const defaultBrandAuthConfig = {
    defaultRole: 'Guest', // default when unauthenticated
    // will be shown in the login page choices
    active: [],
    local: {
        usernameField: 'username',
        passwordField: 'password',
        default: {
            adminUser: 'admin',
            adminPw: 'rbadmin',
            email: 'admin@redboxresearchdata.com.au'
        },
        templatePath: 'local.ejs',
        postLoginRedir: 'researcher/home',
        hooks: {
            onCreate: {
                pre: [],
                post: []
            },
            onUpdate: {
                pre: [],
                post: []
            }
        }
    },
    aaf: {
        defaultRole: 'Researcher',
        attributesField: 'https://aaf.edu.au/attributes',
        usernameField: 'sub',
        postLoginRedir: 'researcher/home',
        opts: {
            jsonWebTokenOptions: {
                issuer: 'https://rapid.aaf.edu.au',
                ignoreNotBefore: true,
                clockTolerance: 120,
            },
            passReqToCallback: true
        },
        templatePath: 'aaf.ejs'
    },
    oidc: {
        debugMode: false,
        discoverAttemptsMax: 5,
        discoverFailureSleep: 5000,
        defaultRole: 'Researcher',
        postLoginRedir: 'researcher/home',
        claimMappings: {
            username: 'sub',
            name: 'name',
            email: 'email',
            givenname: 'given_name',
            surname: 'family_name',
            cn: 'name',
            displayName: 'name'
        },
        opts: {
            issuer: '',
            client: {
                client_id: '',
                client_secret: '',
                redirect_uris: [''],
                post_logout_redirect_uris: ['']
            },
            params: {
                scope: 'openid email profile'
            }
        },
        templatePath: 'openidconnect.ejs'
    }
};
/**
 * Default menu configuration that mirrors the current static menu structure.
 * This can be overridden per-brand via the admin UI or environment config.
 */
const defaultMenuConfig = {
    items: [
        {
            id: 'home-auth',
            labelKey: 'menu-home',
            href: '/researcher/home',
            requiresAuth: true
        },
        {
            id: 'plan',
            labelKey: 'menu-plan-nav',
            href: '#',
            requiresAuth: true,
            children: [
                { id: 'plan-create', labelKey: 'create-rdmp', href: '/record/rdmp/edit' },
                { id: 'plan-dashboard', labelKey: 'edit-dashboard-rdmp', href: '/dashboard/rdmp' },
                {
                    id: 'plan-advice',
                    labelKey: 'get-advice',
                    href: '/getAdvice',
                    visibleWhenTranslationExists: true
                }
            ]
        },
        {
            id: 'org',
            labelKey: 'menu-organisation-nav',
            href: '#',
            requiresAuth: true,
            children: [
                { id: 'org-workspaces', labelKey: 'workspaces-dashboard', href: '/workspaces/list' },
                {
                    id: 'org-services',
                    labelKey: 'workspace-services-list',
                    href: '/availableServicesList',
                    visibleWhenTranslationExists: true
                }
            ]
        },
        {
            id: 'manage',
            labelKey: 'menu-manage-nav',
            href: '#',
            requiresAuth: true,
            children: [
                { id: 'manage-create', labelKey: 'create-datarecord', href: '/record/dataRecord/edit' },
                { id: 'manage-dashboard', labelKey: 'edit-dashboard-datarecord', href: '/dashboard/dataRecord' }
            ]
        },
        {
            id: 'publish',
            labelKey: 'menu-publish-nav',
            href: '#',
            requiresAuth: true,
            children: [
                { id: 'publish-create', labelKey: 'create-data-publication', href: '/record/dataPublication/edit' },
                { id: 'publish-dashboard', labelKey: 'edit-dashboard-publication', href: '/dashboard/dataPublication' }
            ]
        },
        {
            id: 'admin',
            labelKey: 'menu-admin',
            href: '/admin',
            requiresAuth: true,
            requiredRoles: ['Admin', 'Librarians']
        },
        {
            id: 'home-anon',
            labelKey: 'menu-home',
            href: '/home',
            requiresAuth: false,
            hideWhenAuth: true
        }
    ],
    showSearch: true
};
/**
 * Default home panel configuration that mirrors the current static researcher home page.
 * This can be overridden per-brand via the admin UI or environment config.
 */
const defaultHomePanelsConfig = {
    panels: [
        {
            id: 'plan',
            titleKey: 'menu-plan',
            iconClass: 'icon-checklist icon-3x',
            columnClass: 'col-md-3 homepanel',
            items: [
                { id: 'plan-create', labelKey: 'create-rdmp', href: '/record/rdmp/edit' },
                { id: 'plan-dashboard', labelKey: 'edit-dashboard-rdmp', href: '/dashboard/rdmp' },
                {
                    id: 'plan-advice',
                    labelKey: 'get-advice',
                    href: '/getAdvice'
                }
            ]
        },
        {
            id: 'organise',
            titleKey: 'menu-organise-worspace',
            iconClass: 'fa fa-sitemap fa-3x',
            columnClass: 'col-md-3 homepanel',
            items: [
                { id: 'org-workspaces', labelKey: 'workspaces-dashboard', href: '/workspaces/list' },
                {
                    id: 'org-services',
                    labelKey: 'workspace-services-list',
                    href: '/availableServicesList'
                }
            ]
        },
        {
            id: 'manage',
            titleKey: 'menu-manage',
            iconClass: 'fa fa-laptop fa-3x',
            columnClass: 'col-md-3 homepanel',
            items: [
                { id: 'manage-create', labelKey: 'create-datarecord', href: '/record/dataRecord/edit' },
                { id: 'manage-dashboard', labelKey: 'edit-dashboard-datarecord', href: '/dashboard/dataRecord' }
            ]
        },
        {
            id: 'publish',
            titleKey: 'menu-publish',
            iconClass: 'fa fa-rocket fa-3x',
            columnClass: 'col-md-3 homepanel',
            items: [
                { id: 'publish-create', labelKey: 'create-data-publication', href: '/record/dataPublication/edit' },
                { id: 'publish-dashboard', labelKey: 'edit-dashboard-publication', href: '/dashboard/dataPublication' }
            ]
        }
    ]
};
/**
 * Default admin sidebar configuration that mirrors the current static admin sidebar structure.
 * This can be overridden per-brand via the admin UI or environment config.
 */
const defaultAdminSidebarConfig = {
    header: {
        titleKey: 'menu-admin',
        iconClass: 'fa fa-cog'
    },
    sections: [
        {
            id: 'analyze',
            titleKey: 'menu-analyze',
            defaultExpanded: true,
            items: [
                { id: 'reports', labelKey: 'reports-heading', href: '/admin/reports' },
                { id: 'export', labelKey: 'menu-export', href: '/admin/export' },
                { id: 'deleted', labelKey: 'deleted-records-heading', href: '/admin/deletedRecords' }
            ]
        },
        {
            id: 'system',
            titleKey: 'menu-syssettings',
            defaultExpanded: true,
            requiredRoles: ['Admin'],
            items: [
                { id: 'roles', labelKey: 'menu-rolemgmt', href: '/admin/roles' },
                { id: 'users', labelKey: 'menu-usermgmt', href: '/admin/users' },
                { id: 'support', labelKey: 'menu-supportagreement', href: '/admin/supportAgreement' },
                { id: 'system-msg', labelKey: 'menu-systemmessages', href: '/admin/appconfig/edit/systemMessage' },
                { id: 'domains', labelKey: 'menu-authorizeddomainsemails', href: '/admin/appconfig/edit/authorizedDomainsEmails' }
            ]
        },
        {
            id: 'navigation',
            titleKey: 'menu-navigation',
            defaultExpanded: true,
            requiredRoles: ['Admin'],
            items: [
                { id: 'menu', labelKey: 'menu-menuconfiguration', href: '/admin/appconfig/edit/menu' },
                { id: 'homepanels', labelKey: 'menu-homepanelsconfiguration', href: '/admin/appconfig/edit/homePanels' },
                { id: 'adminsidebar', labelKey: 'menu-adminsidebarconfiguration', href: '/admin/appconfig/edit/adminSidebar' }
            ]
        },
        {
            id: 'lookup',
            titleKey: 'system-lookup-records',
            defaultExpanded: true,
            requiredRoles: ['Admin'],
            items: [
                { id: 'party', labelKey: 'system-lookup-record-item1', href: '/dashboard/party' }
            ]
        }
    ],
    footerLinks: [
        { id: 'branding', labelKey: 'admin-configure-branding', href: '/admin/branding' },
        { id: 'translation', labelKey: 'admin-configure-translation', href: '/admin/translation' }
    ]
};
const authConfig = {
    // Bootstrap BEGIN
    // only used one-time for bootstrapping, not intended for long-term maintenance
    roles: [
        { name: 'Admin' },
        { name: 'Librarians' },
        { name: 'Researcher' },
        { name: 'Guest' }
    ],
    // default rules for the default brand...
    rules: [
        { path: '/:branding/:portal/workspaces(/*)', role: 'Admin', can_update: true },
        { path: '/:branding/:portal/workspaces(/*)', role: 'Librarians', can_update: true },
        { path: '/:branding/:portal/workspaces(/*)', role: 'Researcher', can_update: true },
        { path: '/:branding/:portal/record/delete(/*)', role: 'Admin', can_update: true },
        { path: '/:branding/:portal/record/destroy(/*)', role: 'Admin', can_update: true },
        { path: '/:branding/:portal/listDeletedRecords(/*)', role: 'Admin', can_update: true },
        { path: '/:branding/:portal/admin', role: 'Librarians', can_update: true },
        { path: '/:branding/:portal/admin', role: 'Librarians', can_update: true },
        { path: '/:branding/:portal/admin/translation', role: 'Librarians', can_update: true },
        { path: '/:branding/:portal/app/i18n(/*)', role: 'Librarians', can_update: true },
        { path: '/:branding/:portal/admin/reports', role: 'Librarians', can_update: true },
        { path: '/:branding/:portal/admin/getReport', role: 'Librarians', can_update: true },
        { path: '/:branding/:portal/admin/getReportResults', role: 'Librarians', can_update: true },
        { path: '/:branding/:portal/admin/downloadReportCSV', role: 'Librarians', can_update: true },
        { path: '/:branding/:portal/admin/report(/*)', role: 'Librarians', can_update: true },
        { path: '/:branding/:portal/admin/export', role: 'Librarians', can_update: true },
        { path: '/:branding/:portal/admin(/*)', role: 'Admin', can_update: true },
        { path: '/:branding/:portal/record(/*)', role: 'Researcher', can_update: true },
        { path: '/:branding/:portal/record(/*)', role: 'Librarians', can_update: true },
        { path: '/:branding/:portal/recordmeta(/*)', role: 'Researcher', can_update: true },
        { path: '/:branding/:portal/vocab(/*)', role: 'Researcher', can_read: true },
        { path: '/:branding/:portal/external(/*)', role: 'Researcher', can_update: true },
        { path: '/:branding/:portal/collection(/*)', role: 'Researcher', can_read: true },
        { path: '/:branding/:portal/mint(/*)', role: 'Researcher', can_read: true },
        { path: '/:branding/:portal/user/find(/*)', role: 'Researcher', can_read: true },
        { path: '/:branding/:portal/user/profile', role: 'Researcher', can_read: true },
        { path: '/:branding/:portal/dashboard(/*)', role: 'Researcher', can_update: true },
        { path: '/:branding/:portal/researcher/home', role: 'Researcher', can_update: true },
        { path: '/:branding/:portal/researcher/home', role: 'Librarians', can_update: true },
        { path: '/:branding/:portal/export(/*)', role: 'Librarians', can_update: true },
        { path: '/:branding/:portal/export(/*)', role: 'Admin', can_update: true },
        { path: '/:branding/:portal/appconfig(/*)', role: 'Admin', can_update: true },
        { path: '/:branding/:portal/asynch(/*)', role: 'Researcher', can_update: true },
        { path: '/:branding/:portal/asynch(/*)', role: 'Librarians', can_update: true },
        { path: '/:branding/:portal/api(/*)', role: 'Admin', can_update: true },
        { path: '/:branding/:portal/home', role: 'Guest', can_read: true },
        // Task 9: App branding admin-only endpoints (now policy enforced, controller no longer checks directly)
        { path: '/:branding/:portal/app/branding(/*)', role: 'Admin', can_update: true }
    ],
    // Bootstrap END
    defaultBrand: 'default',
    defaultPortal: 'rdmp',
    loginPath: 'user/login',
    hiddenRoles: [],
    hiddenUsers: [],
    postLogoutRedir: '/default/rdmp/home'
};
const brandingConfigurationDefaultsConfig = {
    auth: defaultBrandAuthConfig,
    menu: defaultMenuConfig,
    homePanels: defaultHomePanelsConfig,
    adminSidebar: defaultAdminSidebarConfig
};
module.exports.auth = authConfig;
module.exports.brandingConfigurationDefaults = brandingConfigurationDefaultsConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJhbmRpbmdDb25maWd1cmF0aW9uRGVmYXVsdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9pbnRlcm5hbC9zYWlscy10cy9jb25maWcvYnJhbmRpbmdDb25maWd1cmF0aW9uRGVmYXVsdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7O0FBSUg7O0dBRUc7QUFDSCxNQUFNLHNCQUFzQixHQUFHO0lBQzdCLFdBQVcsRUFBRSxPQUFPLEVBQUUsK0JBQStCO0lBQ3JELDBDQUEwQztJQUMxQyxNQUFNLEVBQUUsRUFBYztJQUN0QixLQUFLLEVBQUU7UUFDTCxhQUFhLEVBQUUsVUFBVTtRQUN6QixhQUFhLEVBQUUsVUFBVTtRQUN6QixPQUFPLEVBQUU7WUFDUCxTQUFTLEVBQUUsT0FBTztZQUNsQixPQUFPLEVBQUUsU0FBUztZQUNsQixLQUFLLEVBQUUsaUNBQWlDO1NBQ3pDO1FBQ0QsWUFBWSxFQUFFLFdBQVc7UUFDekIsY0FBYyxFQUFFLGlCQUFpQjtRQUNqQyxLQUFLLEVBQUU7WUFDTCxRQUFRLEVBQUU7Z0JBQ1IsR0FBRyxFQUFFLEVBQVc7Z0JBQ2hCLElBQUksRUFBRSxFQUFXO2FBQ2xCO1lBQ0QsUUFBUSxFQUFFO2dCQUNSLEdBQUcsRUFBRSxFQUFXO2dCQUNoQixJQUFJLEVBQUUsRUFBVzthQUNsQjtTQUNGO0tBQ0Y7SUFDRCxHQUFHLEVBQUU7UUFDSCxXQUFXLEVBQUUsWUFBWTtRQUN6QixlQUFlLEVBQUUsK0JBQStCO1FBQ2hELGFBQWEsRUFBRSxLQUFLO1FBQ3BCLGNBQWMsRUFBRSxpQkFBaUI7UUFDakMsSUFBSSxFQUFFO1lBQ0osbUJBQW1CLEVBQUU7Z0JBQ25CLE1BQU0sRUFBRSwwQkFBMEI7Z0JBQ2xDLGVBQWUsRUFBRSxJQUFJO2dCQUNyQixjQUFjLEVBQUUsR0FBRzthQUNwQjtZQUNELGlCQUFpQixFQUFFLElBQUk7U0FDeEI7UUFDRCxZQUFZLEVBQUUsU0FBUztLQUN4QjtJQUNELElBQUksRUFB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