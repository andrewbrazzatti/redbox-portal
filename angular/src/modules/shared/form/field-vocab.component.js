"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var field_simple_component_1 = require("./field-simple.component");
var field_base_1 = require("./field-base");
var forms_1 = require("@angular/forms");
var _ = require("lodash-es");
var rxjs_1 = require("rxjs");
var Subject_1 = require("rxjs/Subject");
require("rxjs/add/operator/toPromise");
require("rxjs/add/observable/of");
require("rxjs/add/operator/map");
var http_1 = require("@angular/http");
var base_service_1 = require("../base-service");
var config_service_1 = require("../config-service");
var luceneEscapeQuery = require("lucene-escape-query");
var VocabField = (function (_super) {
    __extends(VocabField, _super);
    function VocabField(options, injector) {
        var _this = _super.call(this, options, injector) || this;
        _this.hasLookup = true;
        _this.vocabId = options['vocabId'] || '';
        _this.controlType = 'textbox';
        _this.titleFieldName = options['titleFieldName'] || 'title';
        _this.titleFieldArr = options['titleFieldArr'] || [];
        _this.searchFields = options['searchFields'] || '';
        _this.titleFieldDelim = options['titleFieldDelim'] || ' - ';
        _this.fieldNames = options['fieldNames'] || [];
        _this.sourceType = options['sourceType'] || 'vocab';
        _this.placeHolder = options['placeHolder'] || 'Select a valid value';
        _this.disableEditAfterSelect = options['disableEditAfterSelect'] == undefined ? true : options['disableEditAfterSelect'];
        _this.stringLabelToField = options['stringLabelToField'] ? options['stringLabelToField'] : 'dc_title';
        return _this;
    }
    VocabField.prototype.createFormModel = function (valueElem, createFormGroup) {
        var _this = this;
        if (valueElem === void 0) { valueElem = undefined; }
        if (createFormGroup === void 0) { createFormGroup = false; }
        if (valueElem) {
            this.value = valueElem;
        }
        if (createFormGroup) {
            var flds_1 = {};
            _.forEach(this.fieldNames, function (fld) {
                _.forOwn(fld, function (srcFld, targetFld) {
                    flds_1[targetFld] = new forms_1.FormControl(_this.value[targetFld] || '');
                });
            });
            this.formModel = new forms_1.FormGroup(flds_1);
        }
        else {
            this.formModel = new forms_1.FormControl(this.value || '');
        }
        if (this.value) {
            var init = _.cloneDeep(this.value);
            init.title = this.getTitle(this.value);
            this.initialValue = init;
        }
        if (this.required) {
            this.formModel.setValidators([forms_1.Validators.required]);
        }
        return this.formModel;
    };
    VocabField.prototype.postInit = function (value) {
        if (value) {
            this.value = value;
        }
        else {
            this.setEmptyValue();
        }
        this.initLookupData();
    };
    VocabField.prototype.setEmptyValue = function () {
        this.value = null;
        return this.value;
    };
    VocabField.prototype.setLookupServices = function (completerService, lookupService) {
        this.completerService = completerService;
        this.lookupService = lookupService;
    };
    VocabField.prototype.initLookupData = function () {
        var _this = this;
        if (this.sourceType == "vocab") {
            _.forEach(this.sourceData, function (data) {
                data.title = _this.getTitle(data);
            });
            this.dataService = this.completerService.local(this.sourceData, this.searchFields, 'title');
        }
        else if (this.sourceType == "collection" || this.sourceType == "user") {
            var url = this.lookupService.getCollectionRootUrl(this.vocabId);
            if (this.sourceType == "user") {
                url = this.lookupService.getUserLookupUrl();
            }
            console.log("Using: " + url);
            var title = this.titleFieldArr.length == 1 ? this.titleFieldArr[0] : 'title';
            console.log("Using title: " + title);
            this.dataService = this.completerService.remote(url, this.searchFields, title);
        }
        else if (this.sourceType == "mint") {
            var url = this.lookupService.getMintRootUrl(this.vocabId);
            console.log("Using: " + url);
            this.dataService = new MintLookupDataService(url, this.lookupService.http, this.fieldNames, this.titleFieldName, this.titleFieldArr, this.titleFieldDelim, this.searchFields);
        }
    };
    VocabField.prototype.getTitle = function (data) {
        var _this = this;
        var title = '';
        if (data) {
            if (_.isString(this.titleFieldDelim)) {
                _.forEach(this.titleFieldArr, function (titleFld) {
                    var titleVal = data[titleFld];
                    if (titleVal) {
                        title = "" + title + (_.isEmpty(title) ? '' : _this.titleFieldDelim) + titleVal;
                    }
                });
            }
            else {
                _.forEach(this.titleFieldArr, function (titleFld, idx) {
                    var delimPair = _this.titleFieldDelim[idx];
                    var titleVal = data[titleFld];
                    if (titleVal) {
                        title = "" + title + (_.isEmpty(title) ? '' : delimPair.prefix) + titleVal + (_.isEmpty(title) ? '' : delimPair.suffix);
                    }
                });
            }
        }
        return title;
    };
    VocabField.prototype.getValue = function (data) {
        var _this = this;
        var valObj = {};
        if (_.isString(data)) {
            console.log("Data is string...");
            valObj[this.stringLabelToField] = data;
            return valObj;
        }
        _.forEach(this.fieldNames, function (fldName) {
            if (data.originalObject) {
                _this.getFieldValuePair(fldName, data.originalObject, valObj);
            }
            else {
                _this.getFieldValuePair(fldName, data, valObj);
            }
        });
        return valObj;
    };
    VocabField.prototype.getFieldValuePair = function (fldName, data, valObj) {
        if (_.isString(fldName)) {
            valObj[fldName] = _.get(data, fldName);
        }
        else {
            _.forOwn(fldName, function (srcFld, targetFld) {
                if (_.get(data, srcFld)) {
                    valObj[targetFld] = _.get(data, srcFld);
                }
                else {
                    valObj[targetFld] = _.get(data, targetFld);
                }
            });
        }
    };
    return VocabField;
}(field_base_1.FieldBase));
exports.VocabField = VocabField;
var MintLookupDataService = (function (_super) {
    __extends(MintLookupDataService, _super);
    function MintLookupDataService(url, http, fields, compositeTitleName, titleFieldArr, titleFieldDelim, searchFieldStr) {
        var _this = _super.call(this) || this;
        _this.url = url;
        _this.http = http;
        _this.fields = fields;
        _this.compositeTitleName = compositeTitleName;
        _this.titleFieldArr = titleFieldArr;
        _this.titleFieldDelim = titleFieldDelim;
        _this.searchFields = searchFieldStr.split(',');
        return _this;
    }
    MintLookupDataService.prototype.search = function (term) {
        term = _.trim(luceneEscapeQuery.escape(term));
        var searchString = '';
        if (!_.isEmpty(term)) {
            term = _.toLower(term);
            _.forEach(this.searchFields, function (searchFld) {
                searchString = "" + searchString + (_.isEmpty(searchString) ? '' : ' OR ') + searchFld + ":" + term + "*";
            });
        }
        var searchUrl = "" + this.url + searchString;
    };
    MintLookupDataService.prototype.cancel = function () {
    };
    MintLookupDataService.prototype.convertToItem = function (data) {
        if (!data) {
            return null;
        }
        var item = {};
        _.forEach(this.fields, function (fieldName) {
            if (_.isString(fieldName)) {
                item[fieldName] = data[fieldName];
            }
            else {
                _.forOwn(fieldName, function (srcFld, targetFld) {
                    if (_.get(data, srcFld)) {
                        item[srcFld] = _.get(data, srcFld);
                    }
                    else {
                        item[targetFld] = _.get(data, targetFld);
                    }
                });
            }
        });
        item[this.compositeTitleName] = this.getTitle(data);
        return item;
    };
    MintLookupDataService.prototype.getTitle = function (data) {
        var _this = this;
        var title = '';
        if (data) {
            if (_.isString(this.titleFieldDelim)) {
                _.forEach(this.titleFieldArr, function (titleFld) {
                    var titleVal = data[titleFld];
                    if (titleVal) {
                        title = "" + title + (_.isEmpty(title) ? '' : _this.titleFieldDelim) + data[titleFld];
                    }
                });
            }
            else {
                _.forEach(this.titleFieldArr, function (titleFld, idx) {
                    var delimPair = _this.titleFieldDelim[idx];
                    var titleVal = data[titleFld];
                    if (titleVal) {
                        title = "" + title + delimPair.prefix + titleVal + delimPair.suffix;
                    }
                });
            }
        }
        return title;
    };
    return MintLookupDataService;
}(Subject_1.Subject));
var VocabFieldLookupService = (function (_super) {
    __extends(VocabFieldLookupService, _super);
    function VocabFieldLookupService(http, configService) {
        var _this = _super.call(this, http, configService) || this;
        _this.configService = configService;
        return _this;
    }
    VocabFieldLookupService.prototype.getLookupData = function (field) {
        var _this = this;
        var vocabId = field.vocabId;
        if (field.sourceType == "vocab") {
            var url = this.brandingAndPortalUrl + "/" + this.config.vocabRootUrl + "/" + vocabId;
            return this.http.get(url, this.options)
                .flatMap(function (res) {
                var data = _this.extractData(res);
                field.sourceData = data;
                field.postInit(field.value);
                return rxjs_1.Observable.of(field);
            });
        }
        field.postInit(field.value);
        return rxjs_1.Observable.of(field);
    };
    VocabFieldLookupService.prototype.getCollectionRootUrl = function (collectionId) {
        return this.brandingAndPortalUrl + "/" + this.config.collectionRootUri + "/" + collectionId + "/?search=";
    };
    VocabFieldLookupService.prototype.getUserLookupUrl = function (searchSource) {
        if (searchSource === void 0) { searchSource = ''; }
        return this.brandingAndPortalUrl + "/" + this.config.userRootUri + "/?source=" + searchSource + "&name=";
    };
    VocabFieldLookupService.prototype.findLookupData = function (field, search) {
    };
    VocabFieldLookupService.prototype.getMintRootUrl = function (source) {
        return this.brandingAndPortalUrl + "/" + this.config.mintRootUri + "/" + source + "/?search=";
    };
    VocabFieldLookupService = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(http_1.Http)), __param(1, core_1.Inject(config_service_1.ConfigService)),
        __metadata("design:paramtypes", [http_1.Http, config_service_1.ConfigService])
    ], VocabFieldLookupService);
    return VocabFieldLookupService;
}(base_service_1.BaseService));
exports.VocabFieldLookupService = VocabFieldLookupService;
var VocabFieldComponent = (function (_super) {
    __extends(VocabFieldComponent, _super);
    function VocabFieldComponent() {
        var _this = _super.call(this) || this;
        _this.isEmbedded = false;
        _this.canRemove = false;
        _this.removeBtnText = null;
        _this.removeBtnClass = 'fa fa-minus-circle btn text-20 pull-right btn-danger';
        _this.disableEditAfterSelect = true;
        _this.onRemoveBtnClick = new core_1.EventEmitter();
        return _this;
    }
    VocabFieldComponent.prototype.getGroupClass = function (fldName) {
        if (fldName === void 0) { fldName = null; }
        return "col-xs-12 form-group " + (this.hasRequiredError() ? 'has-error' : '');
    };
    VocabFieldComponent.prototype.onSelect = function (selected) {
        var disableEditAfterSelect = this.disableEditAfterSelect && this.field.disableEditAfterSelect;
        if (selected) {
            this.field.formModel.setValue(this.field.getValue(selected));
            if (disableEditAfterSelect)
                this.disableInput = true;
        }
        else {
            if (disableEditAfterSelect) {
                this.field.formModel.setValue(null);
            }
            else {
                this.field.formModel.setValue(this.field.getValue(this.searchStr));
            }
        }
    };
    VocabFieldComponent.prototype.onKeyup = function (value) {
        var disableEditAfterSelect = this.disableEditAfterSelect && this.field.disableEditAfterSelect;
        if (!disableEditAfterSelect) {
            this.field.formModel.setValue(this.field.getValue(this.searchStr));
        }
    };
    VocabFieldComponent.prototype.onRemove = function (event) {
        this.onRemoveBtnClick.emit([event, this.index]);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", VocabField)
    ], VocabFieldComponent.prototype, "field", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], VocabFieldComponent.prototype, "isEmbedded", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], VocabFieldComponent.prototype, "canRemove", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], VocabFieldComponent.prototype, "removeBtnText", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], VocabFieldComponent.prototype, "removeBtnClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], VocabFieldComponent.prototype, "index", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], VocabFieldComponent.prototype, "disableEditAfterSelect", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], VocabFieldComponent.prototype, "onRemoveBtnClick", void 0);
    VocabFieldComponent = __decorate([
        core_1.Component({
            selector: 'rb-vocab',
            template: "\n  <div *ngIf=\"field.editMode && !isEmbedded\" [formGroup]='form' [ngClass]=\"getGroupClass()\">\n    <label>\n      {{field.label}} {{getRequiredLabelStr()}}\n      <button type=\"button\" class=\"btn btn-default\" *ngIf=\"field.help\" (click)=\"toggleHelp()\"><span class=\"glyphicon glyphicon-question-sign\" aria-hidden=\"true\"></span></button>\n    </label>\n    <span id=\"{{ 'helpBlock_' + field.name }}\" class=\"help-block\" *ngIf=\"this.helpShow\" >{{field.help}}</span>\n    <ng2-completer [(ngModel)]=\"searchStr\" [ngModelOptions]=\"{standalone: true}\" [disableInput]=\"disableInput\" [placeholder]=\"field.placeHolder\" [clearUnselected]=\"disableEditAfterSelect && field.disableEditAfterSelect\" (keyup)=\"onKeyup($event)\" (selected)=\"onSelect($event)\" [datasource]=\"field.dataService\" [minSearchLength]=\"0\" [inputClass]=\"'form-control'\" [initialValue]=\"field.initialValue\"></ng2-completer>\n    <div class=\"text-danger\" *ngIf=\"hasRequiredError()\">{{field.validationMessages.required}}</div>\n  </div>\n  <div *ngIf=\"field.editMode && isEmbedded\" [formGroup]='form' [ngClass]=\"getGroupClass()\">\n    <div class=\"row\">\n      <span id=\"{{ 'helpBlock_' + field.name }}\" class=\"help-block\" *ngIf=\"this.helpShow\" >{{field.help}}</span>\n      <div class=\"col-xs-11 padding-remove\">\n        <ng2-completer [(ngModel)]=\"searchStr\" [ngModelOptions]=\"{standalone: true}\" [disableInput]=\"disableInput\" [placeholder]=\"field.placeHolder\" [clearUnselected]=\"disableEditAfterSelect && field.disableEditAfterSelect\" (keyup)=\"onKeyup($event)\" (selected)=\"onSelect($event)\" [datasource]=\"field.dataService\" [minSearchLength]=\"0\" [inputClass]=\"'form-control'\" [initialValue]=\"field.initialValue\"></ng2-completer>\n      </div>\n      <div class=\"col-xs-1 padding-remove\">\n        <button type='button' *ngIf=\"removeBtnText\" [disabled]=\"!canRemove\" (click)=\"onRemove($event)\" [ngClass]=\"removeBtnClass\" >{{removeBtnText}}</button>\n        <button [disabled]=\"!canRemove\" type='button' [ngClass]=\"removeBtnClass\" (click)=\"onRemove($event)\"></button>\n      </div>\n    </div>\n    <div class=\"row\">\n      <div class=\"col-xs-12 text-danger\" *ngIf=\"hasRequiredError()\">{{field.validationMessages.required}}</div>\n    </div>\n  </div>\n\n  <li *ngIf=\"!field.editMode\" class=\"key-value-pair\">\n    <span *ngIf=\"field.label\" class=\"key\">{{field.label}}</span>\n    <span class=\"value\">{{field.getTitle(field.value)}}</span>\n  </li>\n  ",
        }),
        __metadata("design:paramtypes", [])
    ], VocabFieldComponent);
    return VocabFieldComponent;
}(field_simple_component_1.SimpleComponent));
exports.VocabFieldComponent = VocabFieldComponent;
