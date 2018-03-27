import { Component, Injectable, Inject, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { FormArray, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserSimpleService } from '../../modules/shared/user.service-simple';
import { ReportService } from '../../modules/shared/report-service';
import { Report, ReportResults } from '../../modules/shared/report-models';
import * as _ from "lodash-es";
import { LoadableComponent } from '../../modules/shared/loadable.component';
import { OnInit } from '@angular/core';
import { PaginationModule, TooltipModule } from 'ngx-bootstrap';
import { TranslationService } from '../../modules/shared/translation-service';
import moment from 'moment-es6';


declare var pageData: any;
declare var jQuery: any;

@Component({
  moduleId: module.id,
  selector: 'report',
  templateUrl: './Report.html'
})
// TODO: find a way to remove jQuery dependency
@Injectable()
export class ReportComponent extends LoadableComponent {
  branding: string;
  portal: string;
  name: string;
  report: Report;
  reportResults: ReportResults;
  saveMsgType = "info";
  initSubs: any;
  initTracker: any = { reportLoaded: false, resultsReturned: false };
  resultCountParam: object;
  filterParams: object;


  constructor( @Inject(ReportService) protected reportService: ReportService, @Inject(DOCUMENT) protected document: any, elementRef: ElementRef, translationService: TranslationService) {
    super();
    this.initTranslator(translationService);
    this.report = new Report();
    this.reportResults = new ReportResults();
    this.branding = elementRef.nativeElement.getAttribute('branding');
    this.portal = elementRef.nativeElement.getAttribute('portal');
    this.name = elementRef.nativeElement.getAttribute('name');
    this.filterParams = {};
    this.initSubs = reportService.waitForInit((initStat: boolean) => {
      this.initSubs.unsubscribe();
      reportService.getReport(this.name).then((report: Report) => {
        this.setReport(report);
        this.initTracker.reportLoaded = true;
        this.getReportResults(1, {});
        this.checkIfHasLoaded();
      });
    });
  }


  public hasLoaded() {
    return this.initTracker.reportLoaded
  }

  public getReportResults(page: number, params:object) {
    this.reportService.getReportResults(this.name, page, params).then((results: ReportResults) => { this.reportResults = results; this.initTracker.resultsReturned = true; this.resultCountParam = { count: this.reportResults.totalItems }; });

  }
  public reportResultsPageChanged(event: any): void {
    this.getReportResults(event.page, {});
  }

  public setReport(report) {
    this.report = report;
  }

  public filter(event: any): void {
    this.initTracker.resultsReturned = false;
    this.reportResults = new ReportResults();
    this.getReportResults(1, this.getParams());
  }

  private getParams() {
    var params = {};
    if (this.report["filter"]["type"] == 'date-range') {

      var fromDate = (this.filterParams["fromDate"] != null ? moment(this.filterParams["fromDate"]) : null);
      var toDate = (this.filterParams["toDate"] != null ? moment(this.filterParams["toDate"]) : null);

      if (fromDate != null) {
        params["fromDate"] = fromDate.utc().format();
      }
      if (toDate != null) {
        params["toDate"] = toDate.utc().format();
      }
    }
    return params;
  }
}
