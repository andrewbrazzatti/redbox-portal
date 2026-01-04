// Webservice Controller implementations - import each file but don't re-export the Controllers module
// to avoid naming conflicts since they all use the same module name

// Map of webservice controller names to their implementations for dynamic loading
import { Controllers as AdminControllers } from './AdminController';
import { Controllers as AppConfigControllers } from './AppConfigController';
import { Controllers as BrandingControllers } from './BrandingController';
import { Controllers as ExportControllers } from './ExportController';
import { Controllers as FormManagementControllers } from './FormManagementController';
import { Controllers as RecordControllers } from './RecordController';
import { Controllers as RecordTypeControllers } from './RecordTypeController';
import { Controllers as ReportControllers } from './ReportController';
import { Controllers as SearchControllers } from './SearchController';
import { Controllers as TranslationControllers } from './TranslationController';
import { Controllers as UserManagementControllers } from './UserManagementController';

export const WebserviceControllers: Record<string, any> = {
  AdminController: AdminControllers.Admin,
  AppConfigController: AppConfigControllers.AppConfig,
  BrandingController: BrandingControllers.Branding,
  ExportController: ExportControllers.Export,
  FormManagementController: FormManagementControllers.FormManagement,
  RecordController: RecordControllers.RecordWeb,
  RecordTypeController: RecordTypeControllers.RecordType,
  ReportController: ReportControllers.Report,
  SearchController: SearchControllers.Search,
  TranslationController: TranslationControllers.Translation,
  UserManagementController: UserManagementControllers.UserManagement,
};
