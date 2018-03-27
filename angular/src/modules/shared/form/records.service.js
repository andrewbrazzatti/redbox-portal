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
import { BaseService } from '../base-service';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { FieldControlService } from './field-control.service';
import { Observable } from 'rxjs/Observable';
import * as _ from "lodash-es";
import { ConfigService } from '../config-service';
var RecordsService = (function (_super) {
    __extends(RecordsService, _super);
    function RecordsService(http, fcs, configService) {
        var _this = _super.call(this, http, configService) || this;
        _this.fcs = fcs;
        _this.configService = configService;
        return _this;
    }
    RecordsService.prototype.getForm = function (oid, recordType, editable) {
        var _this = this;
        if (oid === void 0) { oid = null; }
        if (recordType === void 0) { recordType = null; }
        if (editable === void 0) { editable = true; }
        if (_.isEmpty(oid)) {
            oid = null;
        }
        return this.getFormFieldsMeta(recordType, editable, oid).then(function (form) {
            return _this.fcs.getLookupData(form.fieldsMeta).flatMap(function (fields) {
                form.fieldsMata = fields;
                return Observable.of(form);
            });
        });
    };
    RecordsService.prototype.addRenderCompleteElement = function (fieldsMeta) {
        var renderCompleteElement = {
            "class": "Container",
            "compClass": "TextBlockComponent",
            "definition": {
                "value": "",
                "type": "span",
                "cssClasses": "form-render-complete"
            }
        };
        fieldsMeta.push(renderCompleteElement);
    };
    RecordsService.prototype.getFormFields = function (recordType, oid, editable) {
        var _this = this;
        if (oid === void 0) { oid = null; }
        console.log("Oid is: " + oid);
        var url = oid ? this.brandingAndPortalUrl + "/record/form/auto/" + oid + "?edit=" + editable : this.brandingAndPortalUrl + "/record/form/" + recordType + "?edit=" + editable;
        console.log("URL is: " + url);
        return this.http.get(url, this.options)
            .toPromise()
            .then(function (res) { return _this.extractData(res); });
    };
    RecordsService.prototype.getFormFieldsMeta = function (recordType, editable, oid) {
        var _this = this;
        if (oid === void 0) { oid = null; }
        return this.getFormFields(recordType, oid, editable).then(function (form) {
            if (form && form.fields) {
                if (!editable) {
                    _this.addRenderCompleteElement(form.fields);
                }
                form.fieldsMeta = _this.fcs.getFieldsMeta(form.fields);
            }
            else {
                console.error("Error loading form:" + recordType);
                throw form;
            }
            return form;
        });
    };
    RecordsService.prototype.create = function (record, recordType) {
        var _this = this;
        return this.http.post(this.brandingAndPortalUrl + "/recordmeta/" + recordType, record, this.getOptionsClient())
            .map(function (res) { return _this.extractData(res); });
    };
    RecordsService.prototype.update = function (oid, record) {
        var _this = this;
        return this.http.put(this.brandingAndPortalUrl + "/recordmeta/" + oid, record, this.getOptionsClient())
            .map(function (res) { return _this.extractData(res); });
    };
    RecordsService.prototype.stepTo = function (oid, record, targetStep) {
        var _this = this;
        return this.http.post(this.brandingAndPortalUrl + "/record/workflow/step/" + targetStep + "/" + oid, record, this.getOptionsClient())
            .toPromise()
            .then(function (res) { return _this.extractData(res); });
    };
    RecordsService.prototype.getDashboardUrl = function () {
        return this.brandingAndPortalUrl + "/dashboard";
    };
    RecordsService.prototype.modifyEditors = function (records, username, email) {
        var _this = this;
        return this.http.post(this.brandingAndPortalUrl + "/record/editors/modify", { records: records, username: username, email: email }, this.getOptionsClient())
            .toPromise()
            .then(function (res) { return _this.extractData(res); });
    };
    RecordsService.prototype.updateResponsibilities = function (records, role, email, name) {
        var _this = this;
        return this.http.post(this.brandingAndPortalUrl + "/record/responsibility/update", { records: records, role: role, email: email, name: name }, this.getOptionsClient())
            .toPromise()
            .then(function (res) { return _this.extractData(res); });
    };
    RecordsService.prototype.getTransferResponsibility = function (recordType) {
        var _this = this;
        return this.http.get(this.brandingAndPortalUrl + "/transferconfig/" + recordType, this.getOptionsClient())
            .toPromise()
            .then(function (res) { return _this.extractData(res); });
    };
    RecordsService.prototype.search = function (params) {
        var _this = this;
        var refinedSearchStr = '';
        params.filterActiveRefinersWithNoData();
        if (_.size(params.activeRefiners) > 0) {
            var exactSearchNames_1 = '';
            var exactSearchValues_1 = '';
            var facetSearchNames_1 = '';
            var facetSearchValues_1 = '';
            _.forEach(params.activeRefiners, function (refiner) {
                switch (refiner.type) {
                    case "exact":
                        exactSearchNames_1 = "" + (_.isEmpty(exactSearchNames_1) ? "&exactNames=" : exactSearchNames_1 + ",") + refiner.name;
                        exactSearchValues_1 = exactSearchValues_1 + "&exact_" + refiner.name + "=" + refiner.value;
                        break;
                    case "facet":
                        facetSearchNames_1 = "" + (_.isEmpty(facetSearchNames_1) ? "&facetNames=" : facetSearchNames_1 + ",") + refiner.name;
                        if (!_.isEmpty(refiner.activeValue)) {
                            facetSearchValues_1 = facetSearchValues_1 + "&facet_" + refiner.name + "=" + refiner.activeValue;
                        }
                        break;
                }
            });
            refinedSearchStr = "" + exactSearchNames_1 + exactSearchValues_1 + facetSearchNames_1 + facetSearchValues_1;
        }
        return this.http.get(this.brandingAndPortalUrl + "/record/search/" + params.recordType + "/?searchStr=" + params.basicSearch + refinedSearchStr, this.getOptionsClient())
            .toPromise()
            .then(function (res) { return _this.extractData(res); });
    };
    RecordsService.prototype.getType = function (name) {
        var _this = this;
        return this.http.get(this.brandingAndPortalUrl + "/record/type/" + name, this.getOptionsClient())
            .toPromise()
            .then(function (res) { return _this.extractData(res); });
    };
    RecordsService.prototype.getRecordMeta = function (oid) {
        var _this = this;
        if (oid === void 0) { oid = null; }
        return this.http.get(this.brandingAndPortalUrl + "/record/metadata/" + oid, this.options)
            .toPromise()
            .then(function (res) { return _this.extractData(res); });
    };
    RecordsService = __decorate([
        Injectable(),
        __param(0, Inject(Http)), __param(1, Inject(FieldControlService)), __param(2, Inject(ConfigService)),
        __metadata("design:paramtypes", [Http, FieldControlService, ConfigService])
    ], RecordsService);
    return RecordsService;
}(BaseService));
export { RecordsService };
var RecordActionResult = (function () {
    function RecordActionResult() {
    }
    return RecordActionResult;
}());
export { RecordActionResult };
var RecordSearchRefiner = (function () {
    function RecordSearchRefiner(opts) {
        if (opts === void 0) { opts = {}; }
        this.name = opts.name;
        this.title = opts.title;
        this.type = opts.type;
        this.value = opts.value;
        this.typeLabel = opts.typeLabel;
        this.alwaysActive = opts.alwaysActive;
    }
    RecordSearchRefiner.prototype.setCurrentValue = function (value) {
        if (this.type == "facet") {
            this.activeValue = value;
        }
        else {
            this.value = value;
        }
    };
    return RecordSearchRefiner;
}());
export { RecordSearchRefiner };
var RecordSearchParams = (function () {
    function RecordSearchParams(recType) {
        this.recordType = recType;
        this.activeRefiners = [];
        this.clear();
    }
    RecordSearchParams.prototype.clear = function () {
        this.basicSearch = null;
        _.remove(this.activeRefiners, function (refiner) {
            refiner.value = null;
            refiner.activeValue = null;
            return !refiner.alwaysActive;
        });
    };
    RecordSearchParams.prototype.getRefinerConfig = function (name) {
        return _.find(this.refinerConfig, function (config) {
            return config.name == name;
        });
    };
    RecordSearchParams.prototype.setRefinerConfig = function (config) {
        var _this = this;
        this.refinerConfig = config;
        _.forEach(this.refinerConfig, function (refinerConfig) {
            if (refinerConfig.alwaysActive) {
                _this.addActiveRefiner(refinerConfig);
            }
        });
    };
    RecordSearchParams.prototype.getHttpQuery = function (searchUrl) {
        var refinerValues = '';
        _.forEach(this.activeRefiners, function (refiner) {
            if (refiner.type == "facet") {
                refinerValues = refinerValues + "&refiner|" + refiner.name + "=" + (_.isEmpty(refiner.activeValue) ? '' : refiner.activeValue);
            }
            else {
                refinerValues = refinerValues + "&refiner|" + refiner.name + "=" + (_.isEmpty(refiner.value) ? '' : refiner.value);
            }
        });
        return searchUrl + "?q=" + this.basicSearch + "&type=" + this.recordType + refinerValues;
    };
    RecordSearchParams.prototype.getRefinerConfigs = function () {
        return this.refinerConfig;
    };
    RecordSearchParams.prototype.addActiveRefiner = function (refiner) {
        var existingRefiner = _.find(this.activeRefiners, function (activeRefiner) {
            return activeRefiner.name == refiner.name;
        });
        if (existingRefiner) {
            existingRefiner.value = refiner.value;
        }
        else {
            this.activeRefiners.push(refiner);
        }
    };
    RecordSearchParams.prototype.parseQueryStr = function (queryStr) {
        var _this = this;
        queryStr = decodeURI(queryStr);
        var refinerValues = {};
        _.forEach(queryStr.split('&'), function (q) {
            var qObj = q.split('=');
            if (_.startsWith(qObj[0], "q")) {
                _this.basicSearch = qObj[1];
            }
            if (_.startsWith(qObj[0], "refiner|")) {
                var refinerName = qObj[0].split('|')[1];
                refinerValues[refinerName] = qObj[1];
            }
        });
        _.forOwn(refinerValues, function (value, name) {
            var config = _this.getRefinerConfig(name);
            config.setCurrentValue(value);
            _this.addActiveRefiner(config);
        });
    };
    RecordSearchParams.prototype.filterActiveRefinersWithNoData = function () {
        var removed = _.remove(this.activeRefiners, function (refiner) {
            var value = refiner.type == 'exact' ? refiner.value : refiner.activeValue;
            return !refiner.alwaysActive && (_.isEmpty(value) || _.isUndefined(value));
        });
    };
    RecordSearchParams.prototype.hasActiveRefiners = function () {
        var hasActive = false;
        _.forEach(this.activeRefiners, function (refiner) {
            if (!hasActive && (!_.isEmpty(refiner.value))) {
                hasActive = true;
            }
        });
        return hasActive;
    };
    RecordSearchParams.prototype.setFacetValues = function (facets) {
        var _this = this;
        _.forEach(facets, function (facet) {
            var refiner = _.find(_this.activeRefiners, function (refinerConfig) {
                return refinerConfig.name == facet.name;
            });
            if (refiner) {
                refiner.value = facet.values;
            }
        });
    };
    return RecordSearchParams;
}());
export { RecordSearchParams };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjb3Jkcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVjb3Jkcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFtQkEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBWSxlQUFlLENBQUM7QUFHekQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckMsT0FBTyw2QkFBNkIsQ0FBQztBQUNyQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxLQUFLLENBQUMsTUFBTSxZQUFZLENBQUM7QUFDaEMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBU2xEO0lBQW9DLGtDQUFXO0lBRTdDLHdCQUEyQixJQUFVLEVBQXlDLEdBQXdCLEVBQW1DLGFBQTRCO1FBQXJLLFlBQ0Usa0JBQU0sSUFBSSxFQUFFLGFBQWEsQ0FBQyxTQUMzQjtRQUY2RSxTQUFHLEdBQUgsR0FBRyxDQUFxQjtRQUFtQyxtQkFBYSxHQUFiLGFBQWEsQ0FBZTs7SUFFckssQ0FBQztJQUVELGdDQUFPLEdBQVAsVUFBUSxHQUFrQixFQUFFLFVBQXlCLEVBQUUsUUFBd0I7UUFBL0UsaUJBVUM7UUFWTyxvQkFBQSxFQUFBLFVBQWtCO1FBQUUsMkJBQUEsRUFBQSxpQkFBeUI7UUFBRSx5QkFBQSxFQUFBLGVBQXdCO1FBQzdFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25CLEdBQUcsR0FBRyxJQUFJLENBQUM7UUFDYixDQUFDO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLEVBQUUsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLElBQVE7WUFDckUsTUFBTSxDQUFDLEtBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQyxNQUFVO2dCQUNoRSxJQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQztnQkFDekIsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDN0IsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxpREFBd0IsR0FBeEIsVUFBeUIsVUFBVTtRQUNqQyxJQUFJLHFCQUFxQixHQUFHO1lBQ3BCLE9BQU8sRUFBRyxXQUFXO1lBQ3JCLFdBQVcsRUFBRyxvQkFBb0I7WUFDbEMsWUFBWSxFQUFHO2dCQUNYLE9BQU8sRUFBRyxFQUFFO2dCQUNaLE1BQU0sRUFBRyxNQUFNO2dCQUNmLFlBQVksRUFBRyxzQkFBc0I7YUFDeEM7U0FDSixDQUFDO1FBRU4sVUFBVSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0lBRXpDLENBQUM7SUFFRCxzQ0FBYSxHQUFiLFVBQWMsVUFBaUIsRUFBRSxHQUFnQixFQUFFLFFBQWdCO1FBQW5FLGlCQU9DO1FBUGdDLG9CQUFBLEVBQUEsVUFBZ0I7UUFDL0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDOUIsSUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFNLElBQUksQ0FBQyxvQkFBb0IsMEJBQXFCLEdBQUcsY0FBUyxRQUFVLEdBQU0sSUFBSSxDQUFDLG9CQUFvQixxQkFBZ0IsVUFBVSxjQUFTLFFBQVUsQ0FBQztRQUN0SyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUM5QixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUM7YUFDcEMsU0FBUyxFQUFFO2FBQ1gsSUFBSSxDQUFDLFVBQUMsR0FBTyxJQUFLLE9BQUEsS0FBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsRUFBckIsQ0FBcUIsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRCwwQ0FBaUIsR0FBakIsVUFBa0IsVUFBaUIsRUFBRSxRQUFnQixFQUFFLEdBQWU7UUFBdEUsaUJBY0M7UUFkc0Qsb0JBQUEsRUFBQSxVQUFlO1FBQ3BFLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRSxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsSUFBUTtZQUNqRSxFQUFFLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ3hCLEVBQUUsQ0FBQSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUEsQ0FBQztvQkFFWixLQUFJLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUM3QyxDQUFDO2dCQUNELElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3hELENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixPQUFPLENBQUMsS0FBSyxDQUFDLHFCQUFxQixHQUFHLFVBQVUsQ0FBQyxDQUFDO2dCQUNsRCxNQUFNLElBQUksQ0FBQztZQUNiLENBQUM7WUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2QsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsK0JBQU0sR0FBTixVQUFPLE1BQVcsRUFBRSxVQUFrQjtRQUF0QyxpQkFHQztRQUZDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBSSxJQUFJLENBQUMsb0JBQW9CLG9CQUFlLFVBQVksRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7YUFDOUcsR0FBRyxDQUFDLFVBQUMsR0FBTyxJQUFLLE9BQUEsS0FBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQXVCLEVBQTNDLENBQTJDLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBRUQsK0JBQU0sR0FBTixVQUFPLEdBQVcsRUFBRSxNQUFXO1FBQS9CLGlCQUdDO1FBRkMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFJLElBQUksQ0FBQyxvQkFBb0Isb0JBQWUsR0FBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQzthQUN0RyxHQUFHLENBQUMsVUFBQyxHQUFPLElBQUssT0FBQSxLQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUFyQixDQUFxQixDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVELCtCQUFNLEdBQU4sVUFBTyxHQUFXLEVBQUUsTUFBVyxFQUFFLFVBQWtCO1FBQW5ELGlCQUlDO1FBSEMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFJLElBQUksQ0FBQyxvQkFBb0IsOEJBQXlCLFVBQVUsU0FBSSxHQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO2FBQy9ILFNBQVMsRUFBRTthQUNYLElBQUksQ0FBQyxVQUFDLEdBQU8sSUFBSyxPQUFBLEtBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUF1QixFQUEzQyxDQUEyQyxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUVELHdDQUFlLEdBQWY7UUFDRSxNQUFNLENBQUksSUFBSSxDQUFDLG9CQUFvQixlQUFZLENBQUM7SUFDbEQsQ0FBQztJQUdELHNDQUFhLEdBQWIsVUFBYyxPQUFPLEVBQUUsUUFBUSxFQUFFLEtBQUs7UUFBdEMsaUJBSUM7UUFIQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUksSUFBSSxDQUFDLG9CQUFvQiwyQkFBd0IsRUFBRSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUUsUUFBUSxFQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUMsS0FBSyxFQUFDLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7YUFDdEosU0FBUyxFQUFFO2FBQ1gsSUFBSSxDQUFDLFVBQUMsR0FBTyxJQUFLLE9BQUEsS0FBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQXVCLEVBQTNDLENBQTJDLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRUQsK0NBQXNCLEdBQXRCLFVBQXVCLE9BQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUk7UUFBakQsaUJBSUM7UUFIQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUksSUFBSSxDQUFDLG9CQUFvQixrQ0FBK0IsRUFBRSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUUsSUFBSSxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUMsS0FBSyxFQUFFLElBQUksRUFBQyxJQUFJLEVBQUMsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQzthQUNoSyxTQUFTLEVBQUU7YUFDWCxJQUFJLENBQUMsVUFBQyxHQUFPLElBQUssT0FBQSxLQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBdUIsRUFBM0MsQ0FBMkMsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFRCxrREFBeUIsR0FBekIsVUFBMEIsVUFBVTtRQUFwQyxpQkFJQztRQUhDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBSSxJQUFJLENBQUMsb0JBQW9CLHdCQUFtQixVQUFZLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7YUFDekcsU0FBUyxFQUFFO2FBQ1gsSUFBSSxDQUFDLFVBQUMsR0FBTyxJQUFLLE9BQUEsS0FBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQVcsRUFBL0IsQ0FBK0IsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFRCwrQkFBTSxHQUFOLFVBQU8sTUFBMEI7UUFBakMsaUJBMkJDO1FBMUJDLElBQUksZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO1FBQzFCLE1BQU0sQ0FBQyw4QkFBOEIsRUFBRSxDQUFDO1FBQ3hDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEMsSUFBSSxrQkFBZ0IsR0FBRyxFQUFFLENBQUM7WUFDMUIsSUFBSSxtQkFBaUIsR0FBRyxFQUFFLENBQUM7WUFDM0IsSUFBSSxrQkFBZ0IsR0FBRyxFQUFFLENBQUM7WUFDMUIsSUFBSSxtQkFBaUIsR0FBRyxFQUFFLENBQUM7WUFDM0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLFVBQUMsT0FBNEI7Z0JBQzVELE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUNyQixLQUFLLE9BQU87d0JBQ1Ysa0JBQWdCLEdBQUcsTUFBRyxDQUFDLENBQUMsT0FBTyxDQUFDLGtCQUFnQixDQUFDLEdBQUcsY0FBYyxHQUFNLGtCQUFnQixNQUFHLElBQUcsT0FBTyxDQUFDLElBQU0sQ0FBQzt3QkFDN0csbUJBQWlCLEdBQU0sbUJBQWlCLGVBQVUsT0FBTyxDQUFDLElBQUksU0FBSSxPQUFPLENBQUMsS0FBTyxDQUFDO3dCQUNsRixLQUFLLENBQUM7b0JBQ1IsS0FBSyxPQUFPO3dCQUNWLGtCQUFnQixHQUFHLE1BQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxrQkFBZ0IsQ0FBQyxHQUFHLGNBQWMsR0FBTSxrQkFBZ0IsTUFBRyxJQUFHLE9BQU8sQ0FBQyxJQUFNLENBQUM7d0JBQzdHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUNwQyxtQkFBaUIsR0FBTSxtQkFBaUIsZUFBVSxPQUFPLENBQUMsSUFBSSxTQUFJLE9BQU8sQ0FBQyxXQUFhLENBQUM7d0JBQzFGLENBQUM7d0JBQ0QsS0FBSyxDQUFDO2dCQUNWLENBQUM7WUFDSCxDQUFDLENBQUMsQ0FBQztZQUNILGdCQUFnQixHQUFHLEtBQUcsa0JBQWdCLEdBQUcsbUJBQWlCLEdBQUcsa0JBQWdCLEdBQUcsbUJBQW1CLENBQUM7UUFDdEcsQ0FBQztRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBSSxJQUFJLENBQUMsb0JBQW9CLHVCQUFrQixNQUFNLENBQUMsVUFBVSxvQkFBZSxNQUFNLENBQUMsV0FBVyxHQUFHLGdCQUFrQixFQUFFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO2FBQ25LLFNBQVMsRUFBRTthQUNYLElBQUksQ0FBQyxVQUFDLEdBQU8sSUFBSyxPQUFBLEtBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUF1QixFQUEzQyxDQUEyQyxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUVELGdDQUFPLEdBQVAsVUFBUSxJQUFZO1FBQXBCLGlCQUlDO1FBSEMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFJLElBQUksQ0FBQyxvQkFBb0IscUJBQWdCLElBQU0sRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQzthQUNoRyxTQUFTLEVBQUU7YUFDWCxJQUFJLENBQUMsVUFBQyxHQUFPLElBQUssT0FBQSxLQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUFyQixDQUFxQixDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVELHNDQUFhLEdBQWIsVUFBYyxHQUFlO1FBQTdCLGlCQUlDO1FBSmEsb0JBQUEsRUFBQSxVQUFlO1FBQzNCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBSSxJQUFJLENBQUMsb0JBQW9CLHNCQUFtQixHQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDO2FBQ3BGLFNBQVMsRUFBRTthQUNYLElBQUksQ0FBQyxVQUFDLEdBQVEsSUFBSyxPQUFBLEtBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEVBQXJCLENBQXFCLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBeElVLGNBQWM7UUFEMUIsVUFBVSxFQUFFO1FBR0csV0FBQSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUEsRUFBYyxXQUFBLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFBLEVBQXNDLFdBQUEsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFBO3lDQUE3RixJQUFJLEVBQThDLG1CQUFtQixFQUFrRCxhQUFhO09BRjFKLGNBQWMsQ0F5STFCO0lBQUQscUJBQUM7Q0FBQSxBQXpJRCxDQUFvQyxXQUFXLEdBeUk5QztTQXpJWSxjQUFjO0FBMkkzQjtJQUFBO0lBSUEsQ0FBQztJQUFELHlCQUFDO0FBQUQsQ0FBQyxBQUpELElBSUM7O0FBRUQ7SUFTRSw2QkFBWSxJQUFjO1FBQWQscUJBQUEsRUFBQSxTQUFjO1FBQ3hCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDeEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN4QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDaEMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQ3hDLENBQUM7SUFFRCw2Q0FBZSxHQUFmLFVBQWdCLEtBQVU7UUFDeEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQzNCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLENBQUM7SUFDSCxDQUFDO0lBQ0gsMEJBQUM7QUFBRCxDQUFDLEFBekJELElBeUJDOztBQUVEO0lBTUUsNEJBQVksT0FBZTtRQUN6QixJQUFJLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQztRQUMxQixJQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDZixDQUFDO0lBRUQsa0NBQUssR0FBTDtRQUNFLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxVQUFBLE9BQU87WUFDbkMsT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7WUFDckIsT0FBTyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7WUFDM0IsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQztRQUMvQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCw2Q0FBZ0IsR0FBaEIsVUFBaUIsSUFBWTtRQUMzQixNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLFVBQUMsTUFBTTtZQUN2QyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUM7UUFDN0IsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsNkNBQWdCLEdBQWhCLFVBQWlCLE1BQTZCO1FBQTlDLGlCQVFDO1FBUEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUM7UUFFNUIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLFVBQUMsYUFBYTtZQUMxQyxFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztnQkFDL0IsS0FBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ3ZDLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCx5Q0FBWSxHQUFaLFVBQWEsU0FBaUI7UUFDNUIsSUFBSSxhQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxVQUFDLE9BQTJCO1lBQ3pELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDNUIsYUFBYSxHQUFNLGFBQWEsaUJBQVksT0FBTyxDQUFDLElBQUksVUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBRSxDQUFDO1lBQzFILENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixhQUFhLEdBQU0sYUFBYSxpQkFBWSxPQUFPLENBQUMsSUFBSSxVQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFFLENBQUM7WUFDOUcsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFJLFNBQVMsV0FBTSxJQUFJLENBQUMsV0FBVyxjQUFTLElBQUksQ0FBQyxVQUFVLEdBQUcsYUFBZSxDQUFDO0lBQ3RGLENBQUM7SUFFRCw4Q0FBaUIsR0FBakI7UUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztJQUM1QixDQUFDO0lBRUQsNkNBQWdCLEdBQWhCLFVBQWlCLE9BQTRCO1FBQzNDLElBQU0sZUFBZSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxVQUFDLGFBQWlDO1lBQ3BGLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFDNUMsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLGVBQWUsQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUN4QyxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNwQyxDQUFDO0lBQ0gsQ0FBQztJQUVELDBDQUFhLEdBQWIsVUFBYyxRQUFlO1FBQTdCLGlCQWtCQztRQWpCQyxRQUFRLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQy9CLElBQUksYUFBYSxHQUFHLEVBQUUsQ0FBQztRQUN2QixDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsVUFBQyxDQUFDO1lBQy9CLElBQU0sSUFBSSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDMUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMvQixLQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3QixDQUFDO1lBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN0QyxJQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMxQyxhQUFhLENBQUMsV0FBVyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZDLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUNILENBQUMsQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLFVBQUMsS0FBSyxFQUFFLElBQUk7WUFDbEMsSUFBTSxNQUFNLEdBQUcsS0FBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzNDLE1BQU0sQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDOUIsS0FBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2hDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELDJEQUE4QixHQUE5QjtRQUNFLElBQU0sT0FBTyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxVQUFDLE9BQTRCO1lBQ3pFLElBQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxJQUFJLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQztZQUM1RSxNQUFNLENBQUUsQ0FBQyxPQUFPLENBQUMsWUFBWSxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDOUUsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsOENBQWlCLEdBQWpCO1FBQ0UsSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxVQUFDLE9BQTRCO1lBQzFELEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDOUMsU0FBUyxHQUFHLElBQUksQ0FBQztZQUNuQixDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsU0FBUyxDQUFDO0lBQ25CLENBQUM7SUFFRCwyQ0FBYyxHQUFkLFVBQWUsTUFBVztRQUExQixpQkFTQztRQVJDLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLFVBQUMsS0FBVTtZQUMzQixJQUFNLE9BQU8sR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxjQUFjLEVBQUUsVUFBQyxhQUFrQztnQkFDN0UsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQztZQUMxQyxDQUFDLENBQUMsQ0FBQztZQUNILEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ1osT0FBTyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO1lBQy9CLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFSCx5QkFBQztBQUFELENBQUMsQUFoSEQsSUFnSEMifQ==