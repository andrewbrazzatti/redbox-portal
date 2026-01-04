"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const emailNotificationConfig = {
    api: {
        send: { method: 'post', url: "/api/v1/messaging/emailnotification" }
    },
    settings: {
        enabled: true,
        from: "noreply@redbox",
        templateDir: "views/emailTemplates/",
        serverOptions: {
            host: 'integration-testing-email-1',
            port: 1025,
            secure: false,
            tls: {
                rejectUnauthorized: false
            }
        }
    },
    defaults: {
        from: "redbox@dev",
        subject: "ReDBox Notification",
        format: "html"
    },
    templates: {
        transferOwnerTo: { subject: 'Ownership of DMP record/s has been transferred to you', template: 'transferOwnerTo' },
        test: { subject: 'Test Email Message', template: 'test' }
    }
};
module.exports.emailnotification = emailNotificationConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1haWxub3RpZmljYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9pbnRlcm5hbC9zYWlscy10cy9jb25maWcvZW1haWxub3RpZmljYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxNQUFNLHVCQUF1QixHQUE0QjtJQUN2RCxHQUFHLEVBQUU7UUFDSCxJQUFJLEVBQUUsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxxQ0FBcUMsRUFBRTtLQUNyRTtJQUNELFFBQVEsRUFBRTtRQUNSLE9BQU8sRUFBRSxJQUFJO1FBQ2IsSUFBSSxFQUFFLGdCQUFnQjtRQUN0QixXQUFXLEVBQUUsdUJBQXVCO1FBQ3BDLGFBQWEsRUFBRTtZQUNiLElBQUksRUFBRSw2QkFBNkI7WUFDbkMsSUFBSSxFQUFFLElBQUk7WUFDVixNQUFNLEVBQUUsS0FBSztZQUNiLEdBQUcsRUFBRTtnQkFDSCxrQkFBa0IsRUFBRSxLQUFLO2FBQzFCO1NBQ0Y7S0FDRjtJQUNELFFBQVEsRUFBRTtRQUNSLElBQUksRUFBRSxZQUFZO1FBQ2xCLE9BQU8sRUFBRSxxQkFBcUI7UUFDOUIsTUFBTSxFQUFFLE1BQU07S0FDZjtJQUNELFNBQVMsRUFBRTtRQUNULGVBQWUsRUFBRSxFQUFFLE9BQU8sRUFBRSx1REFBdUQsRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUU7UUFDbEgsSUFBSSxFQUFFLEVBQUUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUU7S0FDMUQ7Q0FDRixDQUFDO0FBRUYsTUFBTSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsR0FBRyx1QkFBdUIsQ0FBQyJ9