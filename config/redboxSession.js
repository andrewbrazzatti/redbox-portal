"use strict";
/**
 * ReDBox Session Configuration
 * (sails.config.redboxSession)
 *
 * Sails session integration leans heavily on the great work already done by
 * Express, but also unifies Socket.io with the Connect session store.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const redboxSessionConfig = {
    name: "redbox.sid",
    secret: process.env.sails__redboxSession_secret ? process.env.sails__redboxSession_secret : 'a7f06b2584ca1b8e456874024e95ec73',
    adapter: process.env.sails__redboxSession_adapter ? process.env.sails__redboxSession_adapter : 'mongo',
    mongoUrl: process.env.sails__redboxSession_mongoUrl ? process.env.sails__redboxSession_mongoUrl : 'mongodb://mongodb:27017/sessions',
};
module.exports.redboxSession = redboxSessionConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkYm94U2Vzc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2ludGVybmFsL3NhaWxzLXRzL2NvbmZpZy9yZWRib3hTZXNzaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7O0dBTUc7O0FBU0gsTUFBTSxtQkFBbUIsR0FBd0I7SUFDL0MsSUFBSSxFQUFFLFlBQVk7SUFDbEIsTUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUMsQ0FBQyxDQUFDLGtDQUFrQztJQUM5SCxPQUFPLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLENBQUMsT0FBTztJQUN0RyxRQUFRLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDLENBQUMsa0NBQWtDO0NBQ3JJLENBQUM7QUFFRixNQUFNLENBQUMsT0FBTyxDQUFDLGFBQWEsR0FBRyxtQkFBbUIsQ0FBQyJ9