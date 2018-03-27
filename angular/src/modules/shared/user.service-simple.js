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
var UserSimpleService = (function (_super) {
    __extends(UserSimpleService, _super);
    function UserSimpleService(http, configService) {
        var _this = _super.call(this, http, configService) || this;
        _this.configService = configService;
        return _this;
    }
    UserSimpleService.prototype.getInfo = function () {
        var _this = this;
        return this.http.get(this.baseUrl + "/user/info")
            .toPromise()
            .then(function (res) { return _this.extractData(res, 'user'); });
    };
    UserSimpleService.prototype.loginLocal = function (username, password) {
        console.log("Loggin in locally using brand: " + this.config.branding + ", portal: " + this.config.portal);
        return this.http.post(this.baseUrl + "/user/login_local", { username: username, password: password, branding: this.config.branding, portal: this.config.portal }, this.getOptionsClient())
            .toPromise()
            .then(this.extractData);
    };
    UserSimpleService.prototype.getUsers = function () {
        var _this = this;
        return this.http.get(this.brandingAndPortalUrl + "/admin/users/get", this.options)
            .toPromise()
            .then(function (res) { return _this.extractData(res); });
    };
    UserSimpleService.prototype.updateUserDetails = function (userid, details) {
        var _this = this;
        return this.http.post(this.brandingAndPortalUrl + "/admin/users/update", { userid: userid, details: details }, this.options)
            .toPromise()
            .then(function (res) { return _this.extractData(res); });
    };
    UserSimpleService.prototype.addLocalUser = function (username, details) {
        var _this = this;
        return this.http.post(this.brandingAndPortalUrl + "/admin/users/newUser", { username: username, details: details }, this.options)
            .toPromise()
            .then(function (res) { return _this.extractData(res); });
    };
    UserSimpleService.prototype.genKey = function (userid) {
        var _this = this;
        return this.http.post(this.brandingAndPortalUrl + "/admin/users/genKey", { userid: userid }, this.options)
            .toPromise()
            .then(function (res) { return _this.extractData(res); });
    };
    UserSimpleService.prototype.revokeKey = function (userid) {
        var _this = this;
        return this.http.post(this.brandingAndPortalUrl + "/admin/users/revokeKey", { userid: userid }, this.options)
            .toPromise()
            .then(function (res) { return _this.extractData(res); });
    };
    UserSimpleService.prototype.updateUserProfile = function (details) {
        var _this = this;
        return this.http.post(this.brandingAndPortalUrl + "/user/update", { details: details }, this.options)
            .toPromise()
            .then(function (res) { return _this.extractData(res); });
    };
    UserSimpleService.prototype.genUserKey = function () {
        var _this = this;
        return this.http.post(this.brandingAndPortalUrl + "/user/genKey", {}, this.options)
            .toPromise()
            .then(function (res) { return _this.extractData(res); });
    };
    UserSimpleService.prototype.revokeUserKey = function () {
        var _this = this;
        return this.http.post(this.brandingAndPortalUrl + "/user/revokeKey", {}, this.options)
            .toPromise()
            .then(function (res) { return _this.extractData(res); });
    };
    UserSimpleService = __decorate([
        Injectable(),
        __param(0, Inject(Http)), __param(1, Inject(ConfigService)),
        __metadata("design:paramtypes", [Http, ConfigService])
    ], UserSimpleService);
    return UserSimpleService;
}(BaseService));
export { UserSimpleService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5zZXJ2aWNlLXNpbXBsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInVzZXIuc2VydmljZS1zaW1wbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW1CQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNsRCxPQUFPLEVBQUUsSUFBSSxFQUFxQyxNQUFNLGVBQWUsQ0FBQztBQUN4RSxPQUFPLHVCQUF1QixDQUFDO0FBQy9CLE9BQU8sNkJBQTZCLENBQUM7QUFDckMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFBO0FBRXBELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQVF6RDtJQUF1QyxxQ0FBVztJQUtoRCwyQkFBMkIsSUFBVSxFQUFtQyxhQUE0QjtRQUFwRyxZQUNFLGtCQUFNLElBQUksRUFBRSxhQUFhLENBQUMsU0FDM0I7UUFGdUUsbUJBQWEsR0FBYixhQUFhLENBQWU7O0lBRXBHLENBQUM7SUFFRCxtQ0FBTyxHQUFQO1FBQUEsaUJBSUM7UUFIQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUksSUFBSSxDQUFDLE9BQU8sZUFBWSxDQUFDO2FBQ2hELFNBQVMsRUFBRTthQUNYLElBQUksQ0FBQyxVQUFDLEdBQU8sSUFBSyxPQUFBLEtBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBUyxFQUFyQyxDQUFxQyxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVELHNDQUFVLEdBQVYsVUFBVyxRQUFnQixFQUFFLFFBQWdCO1FBQzNDLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0NBQWtDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxrQkFBYSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQVEsQ0FBQyxDQUFDO1FBQ3JHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FB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