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
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
var ConfigService = (function () {
    function ConfigService(http) {
        this.http = http;
        this.subjects = {};
        this.subjects['get'] = new Subject();
        this.initConfig();
    }
    ConfigService.prototype.getConfig = function (handler) {
        var subs = this.subjects['get'].subscribe(handler);
        this.emitConfig();
        return subs;
    };
    ConfigService.prototype.emitConfig = function () {
        if (this.config) {
            this.subjects['get'].next(this.config);
        }
    };
    ConfigService.prototype.initConfig = function () {
        var _this = this;
        this.http.get("/dynamic/apiClientConfig.json?v=" + new Date().getTime()).subscribe(function (res) {
            _this.config = _this.extractData(res);
            console.log("ConfigService, initialized. ");
            _this.emitConfig();
        });
    };
    ConfigService.prototype.extractData = function (res, parentField) {
        if (parentField === void 0) { parentField = null; }
        var body = res.json();
        if (parentField) {
            return body[parentField] || {};
        }
        else {
            return body || {};
        }
    };
    ConfigService = __decorate([
        Injectable(),
        __param(0, Inject(Http)),
        __metadata("design:paramtypes", [Object])
    ], ConfigService);
    return ConfigService;
}());
export { ConfigService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb25maWctc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFtQkEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDbEQsT0FBTyxFQUFFLElBQUksRUFBcUMsTUFBTSxlQUFlLENBQUM7QUFFeEUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN2QyxPQUFPLDhCQUE4QixDQUFDO0FBQ3RDLE9BQU8sd0JBQXdCLENBQUM7QUFDaEMsT0FBTyw0QkFBNEIsQ0FBQztBQVNwQztJQUlFLHVCQUFxQyxJQUFTO1FBQVQsU0FBSSxHQUFKLElBQUksQ0FBSztRQUM1QyxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7UUFDckMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFRCxpQ0FBUyxHQUFULFVBQVUsT0FBWTtRQUNwQixJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbEIsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxrQ0FBVSxHQUFWO1FBQ0UsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDaEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3pDLENBQUM7SUFDSCxDQUFDO0lBRUQsa0NBQVUsR0FBVjtRQUFBLGlCQU1DO1FBTEMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMscUNBQW1DLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQyxHQUFPO1lBQ3pGLEtBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNwQyxPQUFPLENBQUMsR0FBRyxDQUFDLDhCQUE4QixDQUFDLENBQUM7WUFDNUMsS0FBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVTLG1DQUFXLEdBQXJCLFVBQXNCLEdBQWEsRUFBRSxXQUF1QjtRQUF2Qiw0QkFBQSxFQUFBLGtCQUF1QjtRQUMxRCxJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdEIsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNkLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ25DLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLE1BQU0sQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ3RCLENBQUM7SUFDSCxDQUFDO0lBckNVLGFBQWE7UUFEekIsVUFBVSxFQUFFO1FBS0csV0FBQSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7O09BSmYsYUFBYSxDQXNDekI7SUFBRCxvQkFBQztDQUFBLEFBdENELElBc0NDO1NBdENZLGFBQWEifQ==