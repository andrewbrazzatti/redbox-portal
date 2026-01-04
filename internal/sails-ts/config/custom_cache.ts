import { CustomCacheConfig } from '@researchdatabox/redbox-core-types';

const customCacheConfig: CustomCacheConfig = {
  cacheExpiry: 31536000 // one year in seconds
};

module.exports.custom_cache = customCacheConfig;
