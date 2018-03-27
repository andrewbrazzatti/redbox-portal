var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import * as _ from "lodash-es";
var UtilityService = (function () {
    function UtilityService() {
    }
    UtilityService.prototype.concatenate = function (data, config) {
        var result = '';
        _.each(config.fields, function (f) {
            if (_.isArray(data)) {
                result = [];
                var itemResult_1 = '';
                _.each(data, function (d) {
                    var fldData = _.get(d, f);
                    if (fldData) {
                        itemResult_1 = "" + itemResult_1 + (_.isEmpty(itemResult_1) ? '' : config.delim) + fldData;
                    }
                });
                result.push(itemResult_1);
            }
            else {
                var fldData = _.get(data, f);
                if (fldData) {
                    result = "" + result + (_.isEmpty(result) ? '' : config.delim) + fldData;
                }
            }
        });
        return result;
    };
    UtilityService = __decorate([
        Injectable()
    ], UtilityService);
    return UtilityService;
}());
export { UtilityService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidXRpbC1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQW1CQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sS0FBSyxDQUFDLE1BQU0sWUFBWSxDQUFDO0FBUWhDO0lBQUE7SUFnQ0EsQ0FBQztJQXZCUSxvQ0FBVyxHQUFsQixVQUFtQixJQUFTLEVBQUUsTUFBVztRQUN2QyxJQUFJLE1BQU0sR0FBTyxFQUFFLENBQUM7UUFDcEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLFVBQUMsQ0FBSztZQUMxQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDcEIsTUFBTSxHQUFHLEVBQUUsQ0FBQztnQkFDWixJQUFJLFlBQVUsR0FBRyxFQUFFLENBQUM7Z0JBQ3BCLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFVBQUMsQ0FBSztvQkFDakIsSUFBTSxPQUFPLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBRTVCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7d0JBQ1osWUFBVSxHQUFHLEtBQUcsWUFBVSxJQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsWUFBVSxDQUFDLEdBQUcsRUFBRSxHQUFHLE1BQU0sQ0FBQyxLQUFLLElBQUcsT0FBUyxDQUFDO29CQUNyRixDQUFDO2dCQUNILENBQUMsQ0FBQyxDQUFDO2dCQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBVSxDQUFDLENBQUM7WUFDMUIsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLElBQU0sT0FBTyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUMvQixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUNaLE1BQU0sR0FBRyxLQUFHLE1BQU0sSUFBRyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxNQUFNLENBQUMsS0FBSyxJQUFHLE9BQVMsQ0FBQztnQkFDekUsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQS9CVSxjQUFjO1FBRDFCLFVBQVUsRUFBRTtPQUNBLGNBQWMsQ0FnQzFCO0lBQUQscUJBQUM7Q0FBQSxBQWhDRCxJQWdDQztTQWhDWSxjQUFjIn0=