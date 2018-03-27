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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var field_simple_component_1 = require("./field-simple.component");
var field_base_1 = require("./field-base");
var forms_1 = require("@angular/forms");
var _ = require("lodash-es");
var records_service_1 = require("./records.service");
var RelatedObjectDataField = (function (_super) {
    __extends(RelatedObjectDataField, _super);
    function RelatedObjectDataField(options, injector) {
        var _this = _super.call(this, options, injector) || this;
        _this.relatedObjects = [];
        _this.accessDeniedObjects = [];
        _this.failedObjects = [];
        _this.columns = options['columns'] || [];
        var relatedObjects = _this.relatedObjects;
        _this.value = options['value'] || _this.setEmptyValue();
        _this.recordsService = _this.getFromInjector(records_service_1.RecordsService);
        var that = _this;
        _.forEach(_this.value, function (item) {
            _this.recordsService.getRecordMeta(item.id).then(function (meta) {
                if (!meta) {
                    that.failedObjects.push(meta);
                }
                else if (meta.status == "Access Denied") {
                    that.accessDeniedObjects.push(meta);
                }
                else if (meta.title) {
                    that.relatedObjects.push(meta);
                }
                else {
                    that.failedObjects.push(meta);
                }
            });
        });
        return _this;
    }
    RelatedObjectDataField.prototype.createFormModel = function (valueElem) {
        if (valueElem === void 0) { valueElem = undefined; }
        if (valueElem) {
            this.value = valueElem;
        }
        this.formModel = new forms_1.FormControl(this.value || []);
        if (this.value) {
            this.setValue(this.value);
        }
        return this.formModel;
    };
    RelatedObjectDataField.prototype.setValue = function (value) {
        this.formModel.patchValue(value, { emitEvent: false });
        this.formModel.markAsTouched();
    };
    RelatedObjectDataField.prototype.setEmptyValue = function () {
        this.value = [];
        return this.value;
    };
    return RelatedObjectDataField;
}(field_base_1.FieldBase));
exports.RelatedObjectDataField = RelatedObjectDataField;
var rbRelatedObjectDataTemplate = './field-relatedobjectdata.html';
if (typeof aotMode == 'undefined') {
    rbRelatedObjectDataTemplate = '../angular/shared/form/field-relatedobjectdata.html';
}
var RelatedObjectDataComponent = (function (_super) {
    __extends(RelatedObjectDataComponent, _super);
    function RelatedObjectDataComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RelatedObjectDataComponent = __decorate([
        core_1.Component({
            selector: 'rb-relatedobjectdata',
            templateUrl: './field-relatedobjectdata.html'
        })
    ], RelatedObjectDataComponent);
    return RelatedObjectDataComponent;
}(field_simple_component_1.SimpleComponent));
exports.RelatedObjectDataComponent = RelatedObjectDataComponent;
