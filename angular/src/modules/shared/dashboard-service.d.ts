import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { BaseService } from '../shared/base-service';
import { PlanTable } from './dashboard-models';
import { ConfigService } from './config-service';
import { TranslationService } from './translation-service';
export declare class DashboardService extends BaseService {
    protected configService: ConfigService;
    protected translator: TranslationService;
    constructor(http: Http, configService: ConfigService, translator: TranslationService);
    getAlllDraftPlansCanEdit(): Promise<PlanTable>;
    getActivePlans(pageNumber: number): Promise<PlanTable>;
    getDraftPlans(pageNumber: number): Promise<PlanTable>;
    formatDates(response: object): object;
    setDashboardTitle(planTable: PlanTable, plans?: any[]): void;
    searchRecords(pageNumber: number, basicSearch: string, facets?: any): any;
}
