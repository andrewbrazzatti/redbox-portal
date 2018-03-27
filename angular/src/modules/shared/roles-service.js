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
import { ConfigService } from './config-service';
var RolesService = (function (_super) {
    __extends(RolesService, _super);
    function RolesService(http, configService) {
        var _this = _super.call(this, http, configService) || this;
        _this.configService = configService;
        return _this;
    }
    RolesService.prototype.getBrandRoles = function () {
        var _this = this;
        return this.http.get(this.brandingAndPortalUrl + "/admin/roles/get", this.options)
            .toPromise()
            .then(function (res) { return _this.extractData(res); });
    };
    RolesService.prototype.updateUserRoles = function (userid, roleIds) {
        var _this = this;
        return this.http.post(this.brandingAndPortalUrl + "/admin/roles/user", { userid: userid, roles: roleIds }, this.options)
            .toPromise()
            .then(function (res) { return _this.extractData(res); });
    };
    RolesService = __decorate([
        Injectable(),
        __param(0, Inject(Http)), __param(1, Inject(ConfigService)),
        __metadata("design:paramtypes", [Http, ConfigService])
    ], RolesService);
    return RolesService;
}(BaseService));
export { RolesService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9sZXMtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJvbGVzLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW1CQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNsRCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JDLE9BQU8sdUJBQXVCLENBQUM7QUFDL0IsT0FBTyw2QkFBNkIsQ0FBQztBQUNyQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUE7QUFFcEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBUWpEO0lBQWtDLGdDQUFXO0lBRTNDLHNCQUEyQixJQUFVLEVBQW1DLGFBQTRCO1FBQXBHLFlBQ0Usa0JBQU0sSUFBSSxFQUFFLGFBQWEsQ0FBQyxTQUMzQjtRQUZ1RSxtQkFBYSxHQUFiLGFBQWEsQ0FBZTs7SUFFcEcsQ0FBQztJQUVELG9DQUFhLEdBQWI7UUFBQSxpQkFJQztRQUhDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBSSxJQUFJLENBQUMsb0JBQW9CLHFCQUFrQixFQUFFLElBQUksQ0FBQyxPQUFPLENBQUM7YUFDakYsU0FBUyxFQUFFO2FBQ1gsSUFBSSxDQUFDLFVBQUMsR0FBTyxJQUFLLE9BQUEsS0FBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQVcsRUFBL0IsQ0FBK0IsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFRCxzQ0FBZSxHQUFmLFVBQWdCLE1BQVcsRUFBRSxPQUFZO1FBQXpDLGlCQUlDO1FBSEMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFJLElBQUksQ0FBQyxvQkFBb0Isc0JBQW1CLEVBQUUsRUFBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBQyxPQUFPLEVBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDO2FBQ3BILFNBQVMsRUFBRTthQUNYLElBQUksQ0FBQyxVQUFDLEdBQU8sSUFBSyxPQUFBLEtBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFpQixFQUFyQyxDQUFxQyxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQWhCVSxZQUFZO1FBRHhCLFVBQVUsRUFBRTtRQUdHLFdBQUEsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBLEVBQWMsV0FBQSxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUE7eUNBQTVCLElBQUksRUFBa0QsYUFBYTtPQUZ6RixZQUFZLENBaUJ4QjtJQUFELG1CQUFDO0NBQUEsQUFqQkQsQ0FBa0MsV0FBVyxHQWlCNUM7U0FqQlksWUFBWSJ9