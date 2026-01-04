/**
 * ReDBox Session Configuration
 * (sails.config.redboxSession)
 *
 * Sails session integration leans heavily on the great work already done by
 * Express, but also unifies Socket.io with the Connect session store.
 */

interface RedboxSessionConfig {
  name: string;
  secret: string;
  adapter: string;
  mongoUrl: string;
}

const redboxSessionConfig: RedboxSessionConfig = {
  name: "redbox.sid",
  secret: process.env.sails__redboxSession_secret ? process.env.sails__redboxSession_secret : 'a7f06b2584ca1b8e456874024e95ec73',
  adapter: process.env.sails__redboxSession_adapter ? process.env.sails__redboxSession_adapter : 'mongo',
  mongoUrl: process.env.sails__redboxSession_mongoUrl ? process.env.sails__redboxSession_mongoUrl : 'mongodb://mongodb:27017/sessions',
};

module.exports.redboxSession = redboxSessionConfig;
