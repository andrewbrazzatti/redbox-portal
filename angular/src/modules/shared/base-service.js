import { RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import { Subject } from 'rxjs/Subject';
var BaseService = (function () {
    function BaseService(http, configService) {
        var _this = this;
        this.http = http;
        this.configService = configService;
        this.initSubject = new Subject();
        this.configService.getConfig(function (config) {
            _this.config = config;
            _this.baseUrl = _this.config.baseUrl;
            _this.brandingAndPortalUrl = _this.baseUrl + "/" + _this.config.branding + "/" + _this.config.portal;
            _this.options = _this.getOptionsClient();
            _this.emitInit();
        });
    }
    Object.defineProperty(BaseService.prototype, "getBrandingAndPortalUrl", {
        get: function () {
            return this.brandingAndPortalUrl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseService.prototype, "getBaseUrl", {
        get: function () {
            return this.baseUrl;
        },
        enumerable: true,
        configurable: true
    });
    BaseService.prototype.waitForInit = function (handler) {
        var subs = this.initSubject.subscribe(handler);
        this.emitInit();
        return subs;
    };
    BaseService.prototype.emitInit = function () {
        if (this.config) {
            this.initSubject.next('');
        }
    };
    BaseService.prototype.getConfig = function () {
        return this.config;
    };
    BaseService.prototype.extractData = function (res, parentField) {
        if (parentField === void 0) { parentField = null; }
        var body = res.json();
        if (parentField) {
            return body[parentField] || {};
        }
        else {
            return body || {};
        }
    };
    BaseService.prototype.getOptions = function (headersObj) {
        var headers = new Headers(headersObj);
        return new RequestOptions({ headers: headers });
    };
    BaseService.prototype.getOptionsClient = function (headersObj) {
        if (headersObj === void 0) { headersObj = {}; }
        headersObj['X-Source'] = 'jsclient';
        headersObj['Content-Type'] = 'application/json;charset=utf-8';
        return this.getOptions(headersObj);
    };
    return BaseService;
}());
export { BaseService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYmFzZS1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQW1CQSxPQUFPLEVBQWtCLGNBQWMsRUFBRSxPQUFPLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFeEUsT0FBTyw4QkFBOEIsQ0FBQztBQUN0QyxPQUFPLHdCQUF3QixDQUFDO0FBQ2hDLE9BQU8sNEJBQTRCLENBQUM7QUFFcEMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQU92QztJQVVFLHFCQUFhLElBQVMsRUFBRyxhQUFrQjtRQUEzQyxpQkFXQztRQVZDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBQ25DLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUNqQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxVQUFDLE1BQVU7WUFDdEMsS0FBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7WUFDckIsS0FBSSxDQUFDLE9BQU8sR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztZQUNuQyxLQUFJLENBQUMsb0JBQW9CLEdBQU0sS0FBSSxDQUFDLE9BQU8sU0FBSSxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsU0FBSSxLQUFJLENBQUMsTUFBTSxDQUFDLE1BQVEsQ0FBQztZQUM1RixLQUFJLENBQUMsT0FBTyxHQUFHLEtBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQ3ZDLEtBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNsQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxzQkFBVyxnREFBdUI7YUFBbEM7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDO1FBQ25DLENBQUM7OztPQUFBO0lBRUQsc0JBQVcsbUNBQVU7YUFBckI7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN0QixDQUFDOzs7T0FBQTtJQUVNLGlDQUFXLEdBQWxCLFVBQW1CLE9BQVk7UUFDN0IsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hCLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRVMsOEJBQVEsR0FBbEI7UUFDRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNoQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM1QixDQUFDO0lBQ0gsQ0FBQztJQUVELCtCQUFTLEdBQVQ7UUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDO0lBRVMsaUNBQVcsR0FBckIsVUFBc0IsR0FBYSxFQUFFLFdBQXVCO1FBQXZCLDRCQUFBLEVBQUEsa0JBQXVCO1FBQzFELElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN0QixFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ2QsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDbkMsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osTUFBTSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUM7UUFDdEIsQ0FBQztJQUNILENBQUM7SUFFUyxnQ0FBVSxHQUFwQixVQUFxQixVQUFlO1FBQ2xDLElBQUksT0FBTyxHQUFHLElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3RDLE1BQU0sQ0FBQyxJQUFJLGNBQWMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFUyxzQ0FBZ0IsR0FBMUIsVUFBMkIsVUFBb0I7UUFBcEIsMkJBQUEsRUFBQSxlQUFvQjtRQUM3QyxVQUFVLENBQUMsVUFBVSxDQUFDLEdBQUcsVUFBVSxDQUFDO1FBQ3BDLFVBQVUsQ0FBQyxjQUFjLENBQUMsR0FBRyxnQ0FBZ0MsQ0FBQztRQUM5RCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBQ0gsa0JBQUM7QUFBRCxDQUFDLEFBbEVELElBa0VDIn0=