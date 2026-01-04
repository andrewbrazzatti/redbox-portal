// TypeScript compilation configuration
// Controls whether TypeScript compilation is active

interface TypescriptConfig {
  active: boolean;
}

const typescriptConfig: TypescriptConfig = {
  active: false
};

module.exports.typescript = typescriptConfig;
