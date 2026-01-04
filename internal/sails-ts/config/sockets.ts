/**
 * WebSocket Server Settings
 * (sails.config.sockets)
 *
 * These settings provide transparent access to the options for Sails'
 * encapsulated WebSocket server, as well as some additional Sails-specific
 * configuration layered on top.
 */

interface SocketsConfig {
  adapter: string;
  // adapter: 'socket.io-redis';
  // host?: string;
  // port?: number;
  // db?: number;
  // pass?: string;
}

const socketsConfig: SocketsConfig = {
  adapter: 'memory',
};

module.exports.sockets = socketsConfig;
