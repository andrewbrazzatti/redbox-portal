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
var ReportService = (function (_super) {
    __extends(ReportService, _super);
    function ReportService(http, configService, translator) {
        var _this = _super.call(this, http, configService) || this;
        _this.configService = configService;
        _this.translator = translator;
        return _this;
    }
    ReportService.prototype.getReport = function (name) {
        var _this = this;
        return this.http.get(this.brandingAndPortalUrl + "/admin/getReport?name=" + name, this.options)
            .toPromise()
            .then(function (res) { return _this.extractData(res); });
    };
    ReportService.prototype.getReportResults = function (name, pageNumber, params) {
        var _this = this;
        var rows = 10;
        var start = (pageNumber - 1) * rows;
        var url = this.brandingAndPortalUrl + "/admin/getReportResults?name=" + name + "&start=" + start + "&rows=" + rows;
        for (var key in params) {
            url = url + '&' + key + "=" + params[key];
        }
        return this.http.get(url, this.options)
            .toPromise()
            .then(function (res) { return _this.extractData(res); });
    };
    ReportService.prototype.formatDates = function (response) {
        var items = response["items"];
        for (var i = 0; i < items.length; i++) {
            items[i]["dateCreated"] = moment(items[i]["dateCreated"]).local().format('LLL');
            items[i]["dateModified"] = moment(items[i]["dateModified"]).local().format('LLL');
        }
        return response;
    };
    ReportService = __decorate([
        Injectable(),
        __param(0, Inject(Http)),
        __param(1, Inject(ConfigService)),
        __param(2, Inject(TranslationService)),
        __metadata("design:paramtypes", [Http,
            ConfigService,
            TranslationService])
    ], ReportService);
    return ReportService;
}(BaseService));
export { ReportService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0LXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZXBvcnQtc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDbEQsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyQyxPQUFPLHVCQUF1QixDQUFDO0FBQy9CLE9BQU8sNkJBQTZCLENBQUM7QUFDckMsT0FBTyxNQUFNLE1BQU0sWUFBWSxDQUFDO0FBQ2hDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQTtBQUVwRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFJM0Q7SUFBbUMsaUNBQVc7SUFFNUMsdUJBQ2dCLElBQVUsRUFDUyxhQUE0QixFQUN2QixVQUE2QjtRQUhyRSxZQUlFLGtCQUFNLElBQUksRUFBRSxhQUFhLENBQUMsU0FDM0I7UUFIa0MsbUJBQWEsR0FBYixhQUFhLENBQWU7UUFDdkIsZ0JBQVUsR0FBVixVQUFVLENBQW1COztJQUVyRSxDQUFDO0lBRUQsaUNBQVMsR0FBVCxVQUFVLElBQVc7UUFBckIsaUJBSUM7UUFIQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUksSUFBSSxDQUFDLG9CQUFvQiwyQkFBd0IsR0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQzthQUMxRixTQUFTLEVBQUU7YUFDWCxJQUFJLENBQUMsVUFBQyxHQUFRLElBQUssT0FBQSxLQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBVyxFQUEvQixDQUErQixDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVELHdDQUFnQixHQUFoQixVQUFpQixJQUFXLEVBQUUsVUFBaUIsRUFBRSxNQUFhO1FBQTlELGlCQVVDO1FBVEMsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ2QsSUFBSSxLQUFLLEdBQUcsQ0FBQyxVQUFVLEdBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ2xDLElBQUksR0FBRyxHQUFNLElBQUksQ0FBQyxvQkFBb0Isa0NBQStCLEdBQUMsSUFBSSxHQUFDLFNBQVMsR0FBQyxLQUFLLEdBQUMsUUFBUSxHQUFDLElBQUksQ0FBQztRQUN6RyxHQUFHLENBQUEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLEdBQUcsR0FBQyxHQUFHLEdBQUMsR0FBRyxHQUFDLEdBQUcsR0FBQyxHQUFHLEdBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2xDLENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUM7YUFDcEMsU0FBUyxFQUFFO2FBQ1gsSUFBSSxDQUFDLFVBQUMsR0FBUSxJQUFLLE9BQUEsS0FBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQWtCLEVBQXRDLENBQXNDLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRUQsbUNBQVcsR0FBWCxVQUFZLFFBQWU7UUFDekIsSUFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzlCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsS0FBSyxDQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUUsRUFBQyxDQUFDO1lBQy9CLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFBO1lBQy9FLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ25GLENBQUM7UUFDRCxNQUFNLENBQUMsUUFBUSxDQUFDO0lBQ2xCLENBQUM7SUFsQ1UsYUFBYTtRQUR6QixVQUFVLEVBQUU7UUFJUixXQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUNaLFdBQUEsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFBO1FBQ3JCLFdBQUEsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUE7eUNBRlAsSUFBSTtZQUN3QixhQUFhO1lBQ1osa0JBQWtCO09BTDFELGFBQWEsQ0FxQ3pCO0lBQUQsb0JBQUM7Q0FBQSxBQXJDRCxDQUFtQyxXQUFXLEdBcUM3QztTQXJDWSxhQUFhIn0=