/**
 * Workspace Type Definitions
 */

interface WorkspaceTypeDefinition {
  name: string;
  label: string;
  subtitle: string;
  description: string;
  logo: string;
}

interface WorkspaceTypeConfig {
  [key: string]: WorkspaceTypeDefinition;
}

const workspaceTypeConfig: WorkspaceTypeConfig = {
  'existing-locations': {
    name: 'existing-locations', // the record type name that maps to this workspace
    label: '@existing-locations-label',
    subtitle: '@existing-locations-label',
    description: '@existing-locations-description',
    logo: '/images/blank.png'
  }
};

module.exports.workspacetype = workspaceTypeConfig;
