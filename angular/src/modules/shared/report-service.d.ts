import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { BaseService } from '../shared/base-service';
import { Report, ReportResults } from './report-models';
import { ConfigService } from './config-service';
import { TranslationService } from './translation-service';
export declare class ReportService extends BaseService {
    protected configService: ConfigService;
    protected translator: TranslationService;
    constructor(http: Http, configService: ConfigService, translator: TranslationService);
    getReport(name: string): Promise<Report>;
    getReportResults(name: string, pageNumber: number, params: object): Promise<ReportResults>;
    formatDates(response: object): object;
}
