// Service implementations - import each file but don't re-export the Services module
// to avoid naming conflicts since they all use the same module name

// Map of service class names to their implementations for dynamic loading
import { Services as AgendaQueueServices } from './AgendaQueueService';
import { Services as AppConfigServices } from './AppConfigService';
import { Services as AsynchsServices } from './AsynchsService';
import { Services as BrandingLogoServices } from './BrandingLogoService';
import { Services as BrandingServices } from './BrandingService';
import { Services as CacheServices } from './CacheService';
import { Services as ConfigServices } from './ConfigService';
import { Services as ContrastServices } from './ContrastService';
import { Services as DashboardTypesServices } from './DashboardTypesService';
import { Services as DoiServices } from './DoiService';
import { Services as EmailServices } from './EmailService';
import { Services as FigshareServices } from './FigshareService';
import { Services as FormRecordConsistencyServices } from './FormRecordConsistencyService';
import { Services as FormsServices } from './FormsService';
import { Services as I18nEntriesServices } from './I18nEntriesService';
import { Services as NamedQueryServices } from './NamedQueryService';
import { Services as NavigationServices } from './NavigationService';
import { Services as OniServices } from './OniService';
import { Services as OrcidServices } from './OrcidService';
import { Services as PathRulesServices } from './PathRulesService';
import { Services as RaidServices } from './RaidService';
import { Services as RDMPServices } from './RDMPService';
import { Services as RecordsServices } from './RecordsService';
import { Services as RecordTypesServices } from './RecordTypesService';
import { Services as ReportsServices } from './ReportsService';
import { Services as RolesServices } from './RolesService';
import { Services as SassCompilerServices } from './SassCompilerService';
import { Services as SolrSearchServices } from './SolrSearchService';
import { Services as SvgSanitizerServices } from './SvgSanitizerService';
import { Services as TemplateServices } from './TemplateService';
import { Services as TranslationServices } from './TranslationService';
import { Services as TriggerServices } from './TriggerService';
import { Services as UsersServices } from './UsersService';
import { Services as ViewUtilsServices } from './ViewUtils';
import { Services as VocabServices } from './VocabService';
import { Services as WorkflowStepsServices } from './WorkflowStepsService';
import { Services as WorkspaceAsyncServices } from './WorkspaceAsyncService';
import { Services as WorkspaceServices } from './WorkspaceService';
import { Services as WorkspaceTypesServices } from './WorkspaceTypesService';

export const SailsServices: Record<string, any> = {
  AgendaQueueService: AgendaQueueServices.AgendaQueue,
  AppConfigService: AppConfigServices.AppConfigService,  // class name is AppConfigService
  AsynchsService: AsynchsServices.Asynchs,
  BrandingLogoService: BrandingLogoServices.BrandingLogo,
  BrandingService: BrandingServices.Branding,
  CacheService: CacheServices.Cache,
  ConfigService: ConfigServices.Config,
  ContrastService: ContrastServices.Contrast,
  DashboardTypesService: DashboardTypesServices.DashboardTypes,
  DoiService: DoiServices.Doi,
  EmailService: EmailServices.Email,
  FigshareService: FigshareServices.FigshareService,  // class name is FigshareService
  FormRecordConsistencyService: FormRecordConsistencyServices.FormRecordConsistency,
  FormsService: FormsServices.Forms,
  I18nEntriesService: I18nEntriesServices.I18nEntries,
  NamedQueryService: NamedQueryServices.NamedQueryService,  // class name is NamedQueryService
  NavigationService: NavigationServices.Navigation,
  OniService: OniServices.OniService,  // class name is OniService
  OrcidService: OrcidServices.Orcids,  // class name is Orcids
  PathRulesService: PathRulesServices.PathRules,
  RaidService: RaidServices.Raid,
  RDMPService: RDMPServices.RDMPS,  // class name is RDMPS
  RecordsService: RecordsServices.Records,
  RecordTypesService: RecordTypesServices.RecordTypes,
  ReportsService: ReportsServices.Reports,
  RolesService: RolesServices.Roles,
  SassCompilerService: SassCompilerServices.SassCompiler,
  SolrSearchService: SolrSearchServices.SolrSearchService,  // class name is SolrSearchService
  SvgSanitizerService: SvgSanitizerServices.SvgSanitizer,
  TemplateService: TemplateServices.Template,
  TranslationService: TranslationServices.Translation,
  TriggerService: TriggerServices.Trigger,
  UsersService: UsersServices.Users,
  ViewUtils: ViewUtilsServices.ViewUtils,
  VocabService: VocabServices.Vocab,
  WorkflowStepsService: WorkflowStepsServices.WorkflowSteps,
  WorkspaceAsyncService: WorkspaceAsyncServices.WorkspaceAsyncService,  // class name is WorkspaceAsyncService
  WorkspaceService: WorkspaceServices.WorkspaceService,  // class name is WorkspaceService
  WorkspaceTypesService: WorkspaceTypesServices.WorkspaceTypes,
};
