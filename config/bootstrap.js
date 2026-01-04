"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */
const { lastValueFrom } = require('rxjs');
const schedule = require('node-schedule');
const actualBootstrap = async function () {
    let defaultBrand = await lastValueFrom(sails.services.brandingservice.bootstrap());
    sails.log.verbose("Branding service, bootstrapped.");
    let rolesBootstrapResult = await lastValueFrom(sails.services.rolesservice.bootstrap(defaultBrand));
    sails.log.verbose("Roles service, bootstrapped.");
    let reportsBootstrapResult = await lastValueFrom(sails.services.reportsservice.bootstrap(sails.services.brandingservice.getDefault()));
    sails.log.verbose("Reports service, bootstrapped.");
    let namedQueriesBootstrapResult = await sails.services.namedqueryservice.bootstrap(sails.services.brandingservice.getDefault());
    sails.log.verbose("Named Query service, bootstrapped.");
    // sails doesn't support 'populating' of nested associations
    // intentionally queried again because of nested 'users' population, couldn't be bothered with looping thru the results
    let defRoles = await lastValueFrom(sails.services.rolesservice.getRolesWithBrand(sails.services.brandingservice.getDefault()));
    sails.log.verbose("Roles service, bootstrapped.");
    sails.log.verbose(defRoles);
    let defUserAndDefRoles = await lastValueFrom(sails.services.usersservice.bootstrap(defRoles));
    sails.log.verbose("Pathrules service, bootstrapped.");
    let pathRulesBootstrapResult = await lastValueFrom(sails.services.pathrulesservice.bootstrap(defUserAndDefRoles.defUser, defUserAndDefRoles.defRoles));
    sails.log.verbose("Record types service, bootstrapped.");
    let recordsTypes = await sails.services.recordtypesservice.bootstrap(sails.services.brandingservice.getDefault());
    sails.log.verbose("Workflowsteps service, bootstrapped.");
    let dashboardTypes = await sails.services.dashboardtypesservice.bootstrap(sails.services.brandingservice.getDefault());
    sails.log.verbose("DashboardTypes service, bootstrapped.");
    let workflowSteps = await sails.services.workflowstepsservice.bootstrap(recordsTypes);
    sails.log.verbose("Workflowsteps service, bootstrapped.");
    if (_.isArray(workflowSteps)) {
        for (let workflowStep of workflowSteps) {
            await sails.services.formsservice.bootstrap(workflowStep);
        }
    }
    else {
        await sails.services.formsservice.bootstrap(workflowSteps);
    }
    sails.log.verbose("Forms service, bootstrapped.");
    await lastValueFrom(sails.services.vocabservice.bootstrap());
    sails.log.verbose("Vocab service, bootstrapped.");
    // Schedule cronjobs
    if (sails.config.crontab.enabled) {
        sails.config.crontab.crons().forEach(item => {
            schedule.scheduleJob(item.interval, () => {
                //At the moment no arguments are needed.
                sails.services[item.service][item.method]();
            });
        });
        sails.log.debug('cronjobs scheduled...');
    }
    // Seed default i18n data into DB if missing
    await sails.services.i18nentriesservice.bootstrap();
    sails.log.verbose("I18n entries service, seeded defaults.");
    await sails.services.translationservice.bootstrap();
    sails.log.verbose("Translation service, bootstrapped.");
    // Initialise the applicationConfig for all the brands
    await sails.services.appconfigservice.bootstrap();
    // bind convenience function to sails.config so that configuration access syntax is consistent
    sails.config.brandingAware = AppConfigService.getAppConfigurationForBrand;
    sails.log.verbose("Cron service, bootstrapped.");
    // After last, because it was being triggered twice
    await lastValueFrom(sails.services.workspacetypesservice.bootstrap(sails.services.brandingservice.getDefault()));
    sails.log.verbose("WorkspaceTypes service, bootstrapped.");
    await sails.services.cacheservice.bootstrap();
    sails.log.verbose("Cache service, bootstrapped.");
    sails.log.ship = function () {
        sails.log.info(".----------------. .----------------. .----------------. ");
        sails.log.info("| .--------------. | .--------------. | .--------------. |");
        sails.log.info("| |  _______     | | |  _________   | | |  ________    | |");
        sails.log.info("| | |_   __ \\    | | | |_   ___  |  | | | |_   ___ `.  | |");
        sails.log.info("| |   | |__) |   | | |   | |_  \\_|  | | |   | |   `. \\ | |");
        sails.log.info("| |   |  __ /    | | |   |  _|  _   | | |   | |    | | | |");
        sails.log.info("| |  _| |  \\ \\_  | | |  _| |___/ |  | | |  _| |___.' / | |");
        sails.log.info("| | |____| |___| | | | |_________|  | | | |________.'  | |");
        sails.log.info("| |              | | |              | | |              | |");
        sails.log.info("| '--------------' | '--------------' | '--------------' |");
        sails.log.info("'----------------' '----------------' '----------------' ");
        sails.log.info(".----------------. .----------------. .----------------. ");
        sails.log.info("| .--------------. | .--------------. | .--------------. |");
        sails.log.info("| |   ______     | | |     ____     | | |  ____  ____  | |");
        sails.log.info("| |  |_   _ \\    | | |   .'    `.   | | | |_  _||_  _| | |");
        sails.log.info("| |    | |_) |   | | |  /  .--.  \\  | | |   \\ \\  / /   | |");
        sails.log.info("| |    |  __'.   | | |  | |    | |  | | |    > `' <    | |");
        sails.log.info("| |   _| |__) |  | | |  \\  `--'  /  | | |  _/ /'`\\ \\_  | |");
        sails.log.info("| |  |_______/   | | |   `.____.'   | | | |____||____| | |");
        sails.log.info("| |              | | |              | | |              | |");
        sails.log.info("| '--------------' | '--------------' | '--------------' |");
        sails.log.info("'----------------' '----------------' '----------------' ");
    };
    sails.log.verbose("Waiting for ReDBox Storage to start...");
    let response = await sails.services.recordsservice.checkRedboxRunning();
    if (response == true) {
        sails.log.verbose("Bootstrap complete!");
    }
    else {
        throw new Error('ReDBox Storage failed to start');
    }
};
module.exports.bootstrap = function (cb) {
    if (sails.config.security.csrf === "false") {
        sails.config.security.csrf = false;
    }
    // sails.config.peopleSearch.orcid = sails.services.orcidservice.searchOrcid;
    sails.config.startupMinute = Math.floor(Date.now() / 60000);
    if (sails.config.environment == "production" || sails.config.ng2.force_bundle) {
        sails.config.ng2.use_bundled = true;
        console.log("Using NG2 Bundled files.......");
    }
    // Update the pino log level to the sails.log.level.
    sails.config.log.customLogger.level = sails.config.log.level;
    // actual bootstrap...
    sails.log.debug("Starting boostrap process with boostrapAlways set to: " + sails.config.appmode.bootstrapAlways);
    actualBootstrap().then(response => {
        // It's very important to trigger this callback method when you are finished
        // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
        cb();
        return true;
    }).catch(error => {
        sails.log.verbose("Bootstrap failed!!!");
        sails.log.error(error);
        return false;
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vdHN0cmFwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vaW50ZXJuYWwvc2FpbHMtdHMvY29uZmlnL2Jvb3RzdHJhcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7Ozs7R0FTRztBQUNGLE1BQU0sRUFBRSxhQUFhLEVBQUUsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDMUMsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBTTFDLE1BQU0sZUFBZSxHQUFHLEtBQUs7SUFFM0IsSUFBSSxZQUFZLEdBQUcsTUFBTSxhQUFhLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQTtJQUNsRixLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO0lBQ3JELElBQUksb0JBQW9CLEdBQUcsTUFBTSxhQUFhLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7SUFDcEcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsOEJBQThCLENBQUMsQ0FBQztJQUNsRCxJQUFJLHNCQUFzQixHQUFHLE1BQU0sYUFBYSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDdkksS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztJQUNwRCxJQUFJLDJCQUEyQixHQUFHLE1BQU0sS0FBSyxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztJQUNoSSxLQUFLLENBQUMsR0FBRyxDQUFDLE9B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