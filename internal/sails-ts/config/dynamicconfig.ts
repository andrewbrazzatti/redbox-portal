// Dynamic config configuration
// Specifies which config modules should be dynamically loaded

interface DynamicConfigConfig {
  active: string[];
}

const dynamicConfigConfig: DynamicConfigConfig = {
  active: ['auth']
};

module.exports.dynamicconfig = dynamicConfigConfig;
