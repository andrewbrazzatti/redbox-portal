var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { TranslateI18Next } from 'ngx-i18next';
import { Subject } from 'rxjs/Subject';
import { ConfigService } from './config-service';
var TranslationService = (function () {
    function TranslationService(translateI18Next, configService) {
        this.translateI18Next = translateI18Next;
        this.configService = configService;
        this.subjects = {};
        this.initTranslator();
    }
    TranslationService.prototype.initTranslator = function () {
        var _this = this;
        this.subjects['init'] = new Subject();
        this.configService.getConfig(function (config) {
            _this.config = config;
            _this.translateI18Next.init({
                debug: true,
                returnNull: false,
                returnEmptyString: true,
                lng: 'en',
                fallbackLng: 'en',
                backend: { loadPath: "/locales/{{lng}}/{{ns}}.json?v=" + config.translationVersion }
            }).then(function () {
                console.log("Translator loaded...");
                _this.translatorReady = true;
                _this.translatorLoaded();
            });
        });
    };
    TranslationService.prototype.translatorLoaded = function () {
        if (this.translatorReady) {
            this.subjects['init'].next(this);
        }
    };
    TranslationService.prototype.isReady = function (handler) {
        var subs = this.subjects['init'].subscribe(handler);
        this.translatorLoaded();
        return subs;
    };
    TranslationService.prototype.t = function (key) {
        return this.translateI18Next.translate(key);
    };
    TranslationService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [TranslateI18Next, ConfigService])
    ], TranslationService);
    return TranslationService;
}());
export { TranslationService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRpb24tc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRyYW5zbGF0aW9uLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBbUJBLE9BQU8sRUFBRSxVQUFVLEVBQVMsTUFBTSxlQUFlLENBQUM7QUFDbEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQy9DLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDdkMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBUWpEO0lBS0UsNEJBQXVCLGdCQUFrQyxFQUFZLGFBQTRCO1FBQTFFLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFBWSxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUMvRixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVELDJDQUFjLEdBQWQ7UUFBQSxpQkF3QkM7UUF2QkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLFVBQUMsTUFBVTtZQUN0QyxLQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztZQUNyQixLQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDO2dCQUN2QixLQUFLLEVBQUUsSUFBSTtnQkFDWCxVQUFVLEVBQUUsS0FBSztnQkFDakIsaUJBQWlCLEVBQUUsSUFBSTtnQkFRdkIsR0FBRyxFQUFFLElBQUk7Z0JBQ1QsV0FBVyxFQUFFLElBQUk7Z0JBQ2pCLE9BQU8sRUFBRSxFQUFFLFFBQVEsRUFBRSxvQ0FBa0MsTUFBTSxDQUFDLGtCQUFvQixFQUFFO2FBQ3ZGLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQ04sT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO2dCQUNwQyxLQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztnQkFDNUIsS0FBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDMUIsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCw2Q0FBZ0IsR0FBaEI7UUFDRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztZQUN6QixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuQyxDQUFDO0lBQ0gsQ0FBQztJQUVELG9DQUFPLEdBQVAsVUFBUSxPQUFZO1FBQ2xCLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3hCLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsOEJBQUMsR0FBRCxVQUFFLEdBQVc7UUFDWCxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBbERVLGtCQUFrQjtRQUQ5QixVQUFVLEVBQUU7eUNBTThCLGdCQUFnQixFQUEyQixhQUFhO09BTHRGLGtCQUFrQixDQW1EOUI7SUFBRCx5QkFBQztDQUFBLEFBbkRELElBbURDO1NBbkRZLGtCQUFrQiJ9