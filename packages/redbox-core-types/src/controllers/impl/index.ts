// Controller implementations - import each file but don't re-export the Controllers module
// to avoid naming conflicts since they all use the same module name

// Map of controller names to their implementations for dynamic loading
import { Controllers as ActionControllers } from './ActionController';
import { Controllers as AdminControllers } from './AdminController';
import { Controllers as AppConfigControllers } from './AppConfigController';
import { Controllers as AsynchControllers } from './AsynchController';
import { Controllers as BrandingAppControllers } from './BrandingAppController';
import { Controllers as BrandingControllers } from './BrandingController';
import { Controllers as DynamicAssetControllers } from './DynamicAssetController';
import { Controllers as EmailControllers } from './EmailController';
import { Controllers as ExportControllers } from './ExportController';
import { Controllers as RecordAuditControllers } from './RecordAuditController';
import { Controllers as RecordControllers } from './RecordController';
import { Controllers as RenderViewControllers } from './RenderViewController';
import { Controllers as ReportControllers } from './ReportController';
import { Controllers as ReportsControllers } from './ReportsController';
import { Controllers as TranslationControllers } from './TranslationController';
import { Controllers as UserControllers } from './UserController';
import { Controllers as VocabControllers } from './VocabController';
import { Controllers as WorkspaceAsyncControllers } from './WorkspaceAsyncController';
import { Controllers as WorkspaceTypesControllers } from './WorkspaceTypesController';

export const SailsControllers: Record<string, any> = {
  ActionController: ActionControllers.Action,
  AdminController: AdminControllers.Admin,
  AppConfigController: AppConfigControllers.AppConfig,
  AsynchController: AsynchControllers.Asynch,
  BrandingAppController: BrandingAppControllers.BrandingApp,
  BrandingController: BrandingControllers.Branding,
  DynamicAssetController: DynamicAssetControllers.DynamicAsset,
  EmailController: EmailControllers.Email,
  ExportController: ExportControllers.Export,
  RecordAuditController: RecordAuditControllers.Reports,  // class name is Reports
  RecordController: RecordControllers.Record,
  RenderViewController: RenderViewControllers.RenderView,
  ReportController: ReportControllers.Report,
  ReportsController: ReportsControllers.Reports,
  TranslationController: TranslationControllers.Translation,
  UserController: UserControllers.User,
  VocabController: VocabControllers.Vocab,
  WorkspaceAsyncController: WorkspaceAsyncControllers.WorkspaceAsync,
  WorkspaceTypesController: WorkspaceTypesControllers.WorkspaceTypes,
};
