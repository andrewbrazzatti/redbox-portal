import { MintConfig } from '@researchdatabox/redbox-core-types';

const mintConfig: MintConfig = {
  mintRootUri: 'mint',
  api: {
    search: {
      method: 'get',
      url: '/api/v1/search'
    }
  }
};

module.exports.mint = mintConfig;
