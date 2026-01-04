/**
 * ORM configuration
 * Controls ORM hook timeout
 */
interface OrmConfig {
  _hookTimeout: number;
}

const ormConfig: OrmConfig = {
  _hookTimeout: 120000 // I used 60 seconds as my new timeout
};

module.exports.orm = ormConfig;
