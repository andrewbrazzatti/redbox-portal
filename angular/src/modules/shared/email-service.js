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
import { BaseService } from '../shared/base-service';
import { ConfigService } from '../shared/config-service';
var EmailNotificationService = (function (_super) {
    __extends(EmailNotificationService, _super);
    function EmailNotificationService(http, configService) {
        var _this = _super.call(this, http, configService) || this;
        _this.configService = configService;
        return _this;
    }
    EmailNotificationService.prototype.sendNotification = function (to, template, data, subject, from) {
        if (data === void 0) { data = {}; }
        if (subject === void 0) { subject = null; }
        if (from === void 0) { from = null; }
        var payload = { to: to, template: template, data: data };
        if (subject) {
            payload['subject'] = subject;
        }
        if (from) {
            payload['from'] = from;
        }
        return this.http.post(this.brandingAndPortalUrl + "/api/sendNotification", payload, this.getOptionsClient())
            .toPromise()
            .then(this.extractData);
    };
    EmailNotificationService = __decorate([
        Injectable(),
        __param(0, Inject(Http)), __param(1, Inject(ConfigService)),
        __metadata("design:paramtypes", [Http, ConfigService])
    ], EmailNotificationService);
    return EmailNotificationService;
}(BaseService));
export { EmailNotificationService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1haWwtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImVtYWlsLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW1CQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNsRCxPQUFPLEVBQUUsSUFBSSxFQUFxQyxNQUFNLGVBQWUsQ0FBQztBQUN4RSxPQUFPLHVCQUF1QixDQUFDO0FBQy9CLE9BQU8sNkJBQTZCLENBQUM7QUFDckMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFBO0FBQ3BELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQVF6RDtJQUE4Qyw0Q0FBVztJQUt2RCxrQ0FBMkIsSUFBVSxFQUFtQyxhQUE0QjtRQUFwRyxZQUNFLGtCQUFNLElBQUksRUFBRSxhQUFhLENBQUMsU0FDM0I7UUFGdUUsbUJBQWEsR0FBYixhQUFhLENBQWU7O0lBRXBHLENBQUM7SUFFRCxtREFBZ0IsR0FBaEIsVUFBaUIsRUFBVSxFQUFFLFFBQWdCLEVBQUUsSUFBYyxFQUFFLE9BQXNCLEVBQUUsSUFBbUI7UUFBM0QscUJBQUEsRUFBQSxTQUFjO1FBQUUsd0JBQUEsRUFBQSxjQUFzQjtRQUFFLHFCQUFBLEVBQUEsV0FBbUI7UUFDeEcsSUFBSSxPQUFPLEdBQUcsRUFBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBQyxDQUFDO1FBQ3ZELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDWixPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsT0FBTyxDQUFDO1FBQy9CLENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ1QsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQztRQUN6QixDQUFDO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFJLElBQUksQ0FBQyxvQkFBb0IsMEJBQXVCLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO2FBQzNHLFNBQVMsRUFBRTthQUNYLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQXBCVSx3QkFBd0I7UUFEcEMsVUFBVSxFQUFFO1FBTUcsV0FBQSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUEsRUFBYyxXQUFBLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQTt5Q0FBNUIsSUFBSSxFQUFrRCxhQUFhO09BTHpGLHdCQUF3QixDQXNCcEM7SUFBRCwrQkFBQztDQUFBLEFBdEJELENBQThDLFdBQVcsR0FzQnhEO1NBdEJZLHdCQUF3QiJ9