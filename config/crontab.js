"use strict";
/**
 * Crontab configuration for async checker
 */
Object.defineProperty(exports, "__esModule", { value: true });
const crontabConfig = {
    enabled: false, //enable this to register async checker at bootstrap
    crons: function () {
        return [
            { interval: '1 * * * * * ', service: 'workspaceasyncservice', method: 'loop' }
        ];
    }
};
module.exports.crontab = crontabConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JvbnRhYi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2ludGVybmFsL3NhaWxzLXRzL2NvbmZpZy9jcm9udGFiLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7R0FFRzs7QUFhSCxNQUFNLGFBQWEsR0FBa0I7SUFDbkMsT0FBTyxFQUFFLEtBQUssRUFBRSxvREFBb0Q7SUFDcEUsS0FBSyxFQUFFO1FBQ0wsT0FBTztZQUNMLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRTtTQUMvRSxDQUFDO0lBQ0osQ0FBQztDQUNGLENBQUM7QUFFRixNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyxhQUFhLENBQUMifQ==