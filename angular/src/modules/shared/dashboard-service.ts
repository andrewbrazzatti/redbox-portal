import { Injectable, Inject} from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import moment from 'moment-es6';
import { BaseService } from '../shared/base-service'
import { PlanTable, Plan } from './dashboard-models'
import { ConfigService } from './config-service';
import { TranslationService } from './translation-service';
import * as _ from "lodash-es";

@Injectable()
export class DashboardService extends BaseService {

  constructor(
    @Inject(Http) http: Http,
    @Inject(ConfigService) protected configService: ConfigService,
    @Inject(TranslationService) protected translator:TranslationService) {
    super(http, configService);
  }

  getAlllDraftPlansCanEdit(): Promise<PlanTable> {
    const rows = this.config.maxTransferRowsPerPage;
    const start = 0;
    return this.http.get(`${this.brandingAndPortalUrl}/listPlans?state=draft&editOnly=true&start=`+start+`&rows=`+rows, this.options)
      .toPromise()
      .then((res: any) => this.formatDates(this.extractData(res))as PlanTable);
  }

  getActivePlans(pageNumber:number): Promise<PlanTable> {
    var rows = 10;
    var start = (pageNumber-1) * rows;
    return this.http.get(`${this.brandingAndPortalUrl}/listPlans?state=active&start=`+start+`&rows=`+rows, this.options)
      .toPromise()
      .then((res: any) => this.formatDates(this.extractData(res))as PlanTable);
  }

  getDraftPlans(pageNumber:number): Promise<PlanTable> {
    var rows = 10;
    var start = (pageNumber-1) * rows;
    return this.http.get(`${this.brandingAndPortalUrl}/listPlans?state=draft&start=`+start+`&rows=`+rows, this.options)
      .toPromise()
      .then((res: any) => this.formatDates(this.extractData(res)) as PlanTable);
  }

  formatDates(response:object){
    var items = response["items"];
    for (var i=0;i<items.length;i++){
      items[i]["dateCreated"] = moment(items[i]["dateCreated"]).local().format('LLL')
      items[i]["dateModified"] = moment(items[i]["dateModified"]).local().format('LLL')
    }
    return response;
  }

  public setDashboardTitle(planTable: PlanTable, plans: any[]=null) {
    _.forEach(planTable ? planTable.items : plans, (plan: Plan) => {
      plan.dashboardTitle = (_.isUndefined(plan.title) || _.isEmpty(plan.title) || _.isEmpty(plan.title[0])) ? this.translator.t('plan-with-no-title'): plan.title;
    });
  }

  public searchRecords(pageNumber:number, basicSearch: string, facets: any = null) {
    const rows = this.config.maxSearchRowsPerPage;
    const start = (pageNumber-1) * rows;
    return this.http.get(`${this.brandingAndPortalUrl}/searchPlans??start=${start}&rows=${rows}&query=${basicSearch}&facets=${facets}`, this.options)
      .toPromise()
      .then((res:any) => this.formatDates(this.extractData(res))as PlanTable);
  }

}
