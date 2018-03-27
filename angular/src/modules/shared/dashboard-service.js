var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import moment from 'moment-es6';
import { BaseService } from '../shared/base-service';
import { ConfigService } from './config-service';
import { TranslationService } from './translation-service';
import * as _ from "lodash-es";
var DashboardService = (function (_super) {
    __extends(DashboardService, _super);
    function DashboardService(http, configService, translator) {
        var _this = _super.call(this, http, configService) || this;
        _this.configService = configService;
        _this.translator = translator;
        return _this;
    }
    DashboardService.prototype.getAlllDraftPlansCanEdit = function () {
        var _this = this;
        var rows = this.config.maxTransferRowsPerPage;
        var start = 0;
        return this.http.get(this.brandingAndPortalUrl + "/listPlans?state=draft&editOnly=true&start=" + start + "&rows=" + rows, this.options)
            .toPromise()
            .then(function (res) { return _this.formatDates(_this.extractData(res)); });
    };
    DashboardService.prototype.getActivePlans = function (pageNumber) {
        var _this = this;
        var rows = 10;
        var start = (pageNumber - 1) * rows;
        return this.http.get(this.brandingAndPortalUrl + "/listPlans?state=active&start=" + start + "&rows=" + rows, this.options)
            .toPromise()
            .then(function (res) { return _this.formatDates(_this.extractData(res)); });
    };
    DashboardService.prototype.getDraftPlans = function (pageNumber) {
        var _this = this;
        var rows = 10;
        var start = (pageNumber - 1) * rows;
        return this.http.get(this.brandingAndPortalUrl + "/listPlans?state=draft&start=" + start + "&rows=" + rows, this.options)
            .toPromise()
            .then(function (res) { return _this.formatDates(_this.extractData(res)); });
    };
    DashboardService.prototype.formatDates = function (response) {
        var items = response["items"];
        for (var i = 0; i < items.length; i++) {
            items[i]["dateCreated"] = moment(items[i]["dateCreated"]).local().format('LLL');
            items[i]["dateModified"] = moment(items[i]["dateModified"]).local().format('LLL');
        }
        return response;
    };
    DashboardService.prototype.setDashboardTitle = function (planTable, plans) {
        var _this = this;
        if (plans === void 0) { plans = null; }
        _.forEach(planTable ? planTable.items : plans, function (plan) {
            plan.dashboardTitle = (_.isUndefined(plan.title) || _.isEmpty(plan.title) || _.isEmpty(plan.title[0])) ? _this.translator.t('plan-with-no-title') : plan.title;
        });
    };
    DashboardService.prototype.searchRecords = function (pageNumber, basicSearch, facets) {
        var _this = this;
        if (facets === void 0) { facets = null; }
        var rows = this.config.maxSearchRowsPerPage;
        var start = (pageNumber - 1) * rows;
        return this.http.get(this.brandingAndPortalUrl + "/searchPlans??start=" + start + "&rows=" + rows + "&query=" + basicSearch + "&facets=" + facets, this.options)
            .toPromise()
            .then(function (res) { return _this.formatDates(_this.extractData(res)); });
    };
    DashboardService = __decorate([
        Injectable(),
        __param(0, Inject(Http)),
        __param(1, Inject(ConfigService)),
        __param(2, Inject(TranslationService)),
        __metadata("design:paramtypes", [Http,
            ConfigService,
            TranslationService])
    ], DashboardService);
    return DashboardService;
}(BaseService));
export { DashboardService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaGJvYXJkLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkYXNoYm9hcmQtc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDbEQsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyQyxPQUFPLHVCQUF1QixDQUFDO0FBQy9CLE9BQU8sNkJBQTZCLENBQUM7QUFDckMsT0FBTyxNQUFNLE1BQU0sWUFBWSxDQUFDO0FBQ2hDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQTtBQUVwRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDM0QsT0FBTyxLQUFLLENBQUMsTUFBTSxZQUFZLENBQUM7QUFHaEM7SUFBc0Msb0NBQVc7SUFFL0MsMEJBQ2dCLElBQVUsRUFDUyxhQUE0QixFQUN2QixVQUE2QjtRQUhyRSxZQUlFLGtCQUFNLElBQUksRUFBRSxhQUFhLENBQUMsU0FDM0I7UUFIa0MsbUJBQWEsR0FBYixhQUFhLENBQWU7UUFDdkIsZ0JBQVUsR0FBVixVQUFVLENBQW1COztJQUVyRSxDQUFDO0lBRUQsbURBQXdCLEdBQXhCO1FBQUEsaUJBTUM7UUFMQyxJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLHNCQUFzQixDQUFDO1FBQ2hELElBQU0sS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNoQixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUksSUFBSSxDQUFDLG9CQUFvQixnREFBNkMsR0FBQyxLQUFLLEdBQUMsUUFBUSxHQUFDLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDO2FBQzlILFNBQVMsRUFBRTthQUNY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