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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var field_simple_component_1 = require("./field-simple.component");
var field_base_1 = require("./field-base");
var forms_1 = require("@angular/forms");
var _ = require("lodash-es");
var field_vocab_component_1 = require("./field-vocab.component");
var ContributorField = (function (_super) {
    __extends(ContributorField, _super);
    function ContributorField(options, injector) {
        var _this = _super.call(this, options, injector) || this;
        _this.fullNameResponseField = "text_full_name";
        _this.controlType = 'textbox';
        _this.nameColHdr = options['nameColHdr'] ? _this.getTranslated(options['nameColHdr'], options['nameColHdr']) : 'Researcher Name';
        _this.emailColHdr = options['emailColHdr'] ? _this.getTranslated(options['emailColHdr'], options['emailColHdr']) : 'Email Address';
        _this.roleColHdr = options['roleColHdr'] ? _this.getTranslated(options['roleColHdr'], options['roleColHdr']) : 'Project Role';
        _this.showHeader = options['showHeader'] || true;
        _this.roles = options['roles'] || [];
        _this.value = options['value'] || _this.setEmptyValue();
        _this.fieldNames = options['fieldNames'] || [];
        var textFullNameFieldName = _.find(_this.fieldNames, function (fieldNameObject) {
            return fieldNameObject['text_full_name'] != undefined;
        });
        if (textFullNameFieldName != null) {
            _this.fullNameResponseField = textFullNameFieldName['text_full_name'];
        }
        _this.validationMessages = options['validationMessages'] || { required: {
                email: _this.getTranslated(options['validation_required_email'], 'Email required'),
                text_full_name: _this.getTranslated(options['validation_required_name'], 'Name is required'),
                role: _this.getTranslated(options['validation_required_role'], 'Select a role')
            },
            invalid: { email: _this.getTranslated(options['validation_invalid_email'], 'Email format is incorrect') } };
        _this.groupFieldNames = ['text_full_name', 'email'];
        _this.freeText = options['freeText'] || false;
        _this.forceLookupOnly = options['forceLookupOnly'] || false;
        if (_this.forceLookupOnly) {
            _this.freeText = false;
        }
        _this.role = options['role'] ? _this.getTranslated(options['role'], options['role']) : null;
        _this.username = options['username'] || '';
        _this.previousEmail = _this.value ? _this.value.email : '';
        _this.validators = {
            text_full_name: [forms_1.Validators.required],
            email: [forms_1.Validators.required, forms_1.Validators.email]
        };
        if (!_this.freeText) {
            _this.vocabField = new field_vocab_component_1.VocabField(_this.options, _this.injector);
            _this.hasLookup = true;
        }
        return _this;
    }
    ContributorField.prototype.setLookupServices = function (completerService, lookupService) {
        if (!this.freeText) {
            this.vocabField.setLookupServices(completerService, lookupService);
        }
    };
    ContributorField.prototype.createFormModel = function (valueElem) {
        if (valueElem === void 0) { valueElem = undefined; }
        if (valueElem) {
            this.value = valueElem;
        }
        if (!this.freeText) {
            this.vocabField.setEmptyValue();
            this.formModel = this.vocabField.createFormModel(this.value, true);
            this.formModel.addControl('username', new forms_1.FormControl(this.value.username));
            this.formModel.addControl('role', new forms_1.FormControl(this.value.role));
            if (this.value) {
                this.setValue(this.value);
            }
        }
        else {
            this.formModel = new forms_1.FormGroup({ text_full_name: new forms_1.FormControl(this.value.text_full_name || null),
                email: new forms_1.FormControl(this.value.email || null),
                role: new forms_1.FormControl(this.value.role || null),
                username: new forms_1.FormControl(this.value.username || '') });
        }
        if (this.required) {
            this.enableValidators();
        }
        return this.formModel;
    };
    ContributorField.prototype.setValue = function (value, emitEvent) {
        if (emitEvent === void 0) { emitEvent = true; }
        if (!this.hasInit) {
            this.hasInit = true;
            value.username = _.isUndefined(value.username) ? '' : value.username;
        }
        else {
            if (_.isUndefined(value.username) || (value.email && value.email != this.previousEmail)) {
                value.username = '';
                this.previousEmail = value.email;
            }
        }
        this.formModel.patchValue(value, { emitEvent: emitEvent });
        this.formModel.markAsTouched();
        this.formModel.markAsDirty();
    };
    ContributorField.prototype.toggleValidator = function (c) {
        var _this = this;
        return function (value) {
            if (value || _.find(_this.formModel.controls, function (c) { return c.value; })) {
                _this.enableValidators();
            }
            else {
                _this.disableValidators();
            }
        };
    };
    ContributorField.prototype.enableValidators = function () {
        var _this = this;
        if (this.enabledValidators) {
            return;
        }
        this.enabledValidators = true;
        _.forEach(this.groupFieldNames, function (f) {
            _this.formModel.controls[f].setValidators(_this.validators[f]);
        });
    };
    ContributorField.prototype.disableValidators = function () {
        if (!this.enabledValidators) {
            return;
        }
        this.enabledValidators = false;
        _.forEach(this.formModel.controls, function (c) {
            c.setValidators(null);
            c.setErrors(null);
        });
    };
    ContributorField.prototype.postInit = function (value) {
        if (value) {
            this.value = value;
            if (!this.freeText) {
                this.vocabField.value = value;
                this.vocabField.initialValue = _.cloneDeep(value);
                this.vocabField.initialValue.title = this.vocabField.getTitle(value);
                this.vocabField.initLookupData();
            }
        }
        else {
            this.setEmptyValue();
        }
    };
    ContributorField.prototype.setEmptyValue = function () {
        this.value = { text_full_name: null, email: null, role: null, username: '' };
        if (this.formModel) {
            _.forOwn(this.formModel.controls, function (c, cName) {
                c.setValue(null);
            });
        }
        return this.value;
    };
    Object.defineProperty(ContributorField.prototype, "isValid", {
        get: function () {
            var _this = this;
            var validity = false;
            _.forEach(this.groupFieldNames, function (f) {
                validity = validity && _this.formModel.controls[f].valid;
            });
            return validity;
        },
        enumerable: true,
        configurable: true
    });
    ContributorField.prototype.triggerValidation = function () {
        var _this = this;
        _.forEach(this.groupFieldNames, function (f) {
            _this.formModel.controls[f].updateValueAndValidity({ onlySelf: true, emitEvent: false });
            _this.formModel.controls[f].markAsTouched();
        });
    };
    ContributorField.prototype.getValidationError = function () {
        var _this = this;
        var errObj = null;
        if (this.formModel) {
            _.forEach(this.groupFieldNames, function (f) {
                if (!_.isEmpty(_this.formModel.controls[f].errors)) {
                    errObj = _this.formModel.controls[f].errors;
                }
            });
        }
        return errObj;
    };
    ContributorField.prototype.reactEvent = function (eventName, eventData, origData) {
        this.setValue(eventData, false);
    };
    return ContributorField;
}(field_base_1.FieldBase));
exports.ContributorField = ContributorField;
var ContributorComponent = (function (_super) {
    __extends(ContributorComponent, _super);
    function ContributorComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isEmbedded = false;
        return _this;
    }
    ContributorComponent.prototype.getGroupClass = function (fldName) {
        var hasError = false;
        hasError = hasError || (this.field.formModel.controls[fldName].hasError('required'));
        if (!hasError && fldName == 'email') {
            hasError = hasError || (this.field.formModel.controls[fldName].hasError('email'));
        }
        return "col-xs-5 form-group" + (hasError ? ' has-error' : '');
    };
    ContributorComponent.prototype.onSelect = function (selected) {
        if (selected) {
            if ((_.isUndefined(selected.title) && _.isUndefined(selected.text_full_name) && _.isEmpty(selected.title) && _.isEmpty(selected.text_full_name))
                || (selected.title && selected.title == this.field.formModel.value.text_full_name)) {
                console.log("Same or empty selection, returning...");
                return;
            }
            var val = void 0;
            if (selected.text_full_name) {
                val = this.field.vocabField.getValue(selected);
            }
            else if (selected[this.field.fullNameResponseField]) {
                val = this.field.vocabField.getValue(selected);
            }
            else {
                val = { text_full_name: selected.title };
            }
            val.role = this.field.role;
            this.field.setValue(val);
        }
        else {
            console.log("No selected user.");
            if (this.field.forceLookupOnly) {
                console.log("Forced lookup, clearing data..");
                this.field.setEmptyValue();
            }
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ContributorComponent.prototype, "isEmbedded", void 0);
    ContributorComponent = __decorate([
        core_1.Component({
            selector: 'rb-contributor',
            template: "\n  <div *ngIf=\"field.editMode\" class='padding-bottom-10'>\n    <div class=\"row\" *ngIf=\"field.label && field.showHeader\">\n      <div class=\"col-xs-4\"><h5>{{field.label}} {{getRequiredLabelStr()}}</h5></div>\n    </div>\n    <div class=\"row\">\n      <ng-container *ngIf=\"field.freeText\" [formGroup]='field.formModel'>\n        <!-- Free Text version -->\n        <!--\n        <ng-container >\n          <div [ngClass]=\"getGroupClass('name')\">\n            <input formControlName=\"name\" type=\"text\" class=\"form-control\"/>\n            <div class=\"text-danger\" *ngIf=\"field.formModel.controls['name'].touched && field.formModel.controls['name'].hasError('required')\">{{field.validationMessages.required.name}}</div>\n          </div>\n          <div [ngClass]=\"getGroupClass('email')\">\n            <input formControlName=\"email\" type=\"text\" class=\"form-control\" />\n            <div class=\"text-danger\" *ngIf=\"field.formModel.controls['email'].touched && field.formModel.controls['email'].hasError('email')\">{{field.validationMessages.invalid.email}}</div>\n            <div class=\"text-danger\" *ngIf=\"field.formModel.controls['email'].touched && field.formModel.controls['email'].hasError('required')\">{{field.validationMessages.required.email}}</div>\n          </div>\n        </ng-container>  -->\n\n        <div *ngIf=\"!isEmbedded\">\n          <div class=\"row\">\n            <span class='col-xs-10' >\n              <!-- Free text not embedded version -->\n              <div class='col-xs-1'>\n                <span class='text-right'>{{ field.nameColHdr }}</span>\n              </div>\n              <div [ngClass]=\"getGroupClass('text_full_name')\">\n                <input formControlName=\"text_full_name\" type=\"text\" class=\"form-control\"/>\n                <div class=\"text-danger\" *ngIf=\"field.formModel.controls['text_full_name'].touched && field.formModel.controls['text_full_name'].hasError('required')\">{{field.validationMessages.required.text_full_name}}</div>\n              </div>\n              <div class='col-xs-1'>\n                <span class='text-right'>{{ field.emailColHdr }}</span>\n              </div>\n              <div [ngClass]=\"getGroupClass('email')\">\n                <input formControlName=\"email\" type=\"text\" class=\"form-control\" />\n                <div class=\"text-danger\" *ngIf=\"field.formModel.controls['email'].touched && field.formModel.controls['email'].hasError('email')\">{{field.validationMessages.invalid.email}}</div>\n                <div class=\"text-danger\" *ngIf=\"field.formModel.controls['email'].touched && field.formModel.controls['email'].hasError('required')\">{{field.validationMessages.required.email}}</div>\n              </div>\n            </span>\n          </div>\n        </div>\n\n        <ng-container *ngIf=\"isEmbedded\">\n          <!-- Embedded free text version -->\n          <div class='col-xs-1'>\n            <span class='text-right'>{{ field.nameColHdr }}</span>\n          </div>\n          <div [ngClass]=\"getGroupClass('text_full_name')\">\n            <input formControlName=\"text_full_name\" type=\"text\" class=\"form-control\"/>\n            <div class=\"text-danger\" *ngIf=\"field.formModel.controls['text_full_name'].touched && field.formModel.controls['text_full_name'].hasError('required')\">{{field.validationMessages.required.text_full_name}}</div>\n          </div>\n          <div class='col-xs-1'>\n            <span class='text-right'>{{ field.emailColHdr }}</span>\n          </div>\n          <div [ngClass]=\"getGroupClass('email')\">\n            <input formControlName=\"email\" type=\"text\" class=\"form-control\" />\n            <div class=\"text-danger\" *ngIf=\"field.formModel.controls['email'].touched && field.formModel.controls['email'].hasError('email')\">{{field.validationMessages.invalid.email}}</div>\n            <div class=\"text-danger\" *ngIf=\"field.formModel.controls['email'].touched && field.formModel.controls['email'].hasError('required')\">{{field.validationMessages.required.email}}</div>\n          </div>\n        </ng-container>\n\n      </ng-container>\n      <!-- Lookup version -->\n      <ng-container *ngIf=\"!field.freeText\" [formGroup]=\"field.formModel\">\n        <div *ngIf=\"!isEmbedded\">\n          <div class=\"row\">\n            <span class='col-xs-10' >\n              <!-- Lookup Not Embedded version -->\n              <div class='col-xs-1'>\n                <span class='text-right'>{{ field.nameColHdr }}</span>\n              </div>\n              <div [ngClass]=\"getGroupClass('text_full_name')\">\n                <ng2-completer [overrideSuggested]=\"!field.forceLookupOnly\" [inputClass]=\"'form-control'\" [placeholder]=\"field.vocabField.placeHolder\" [clearUnselected]=\"field.forceLookupOnly\" (selected)=\"onSelect($event)\" [datasource]=\"field.vocabField.dataService\" [minSearchLength]=\"0\" [initialValue]=\"field.vocabField.initialValue\"></ng2-completer>\n                <div class=\"text-danger\" *ngIf=\"field.formModel.controls['text_full_name'].hasError('required')\">{{field.validationMessages.required.text_full_name}}</div>\n              </div>\n              <div class='col-xs-1'>\n                <span class='text-right'>{{ field.emailColHdr }}</span>\n              </div>\n              <div [ngClass]=\"getGroupClass('email')\">\n                <input formControlName=\"email\" type=\"text\" class=\"form-control\" [readOnly]=\"field.forceLookupOnly\"/>\n                <div class=\"text-danger\" *ngIf=\"field.formModel.controls['email'].touched && field.formModel.controls['email'].hasError('email')\">{{field.validationMessages.invalid.email}}</div>\n                <div class=\"text-danger\" *ngIf=\"field.formModel.controls['email'].touched && field.formModel.controls['email'].hasError('required')\">{{field.validationMessages.required.email}}</div>\n              </div>\n            </span>\n          </div>\n        </div>\n        <ng-container *ngIf=\"isEmbedded\">\n          <!-- Lookup Embedded version -->\n          <div class='col-xs-1'>\n            <span class='text-right'>{{ field.nameColHdr }}</span>\n          </div>\n          <div [ngClass]=\"getGroupClass('text_full_name')\">\n            <ng2-completer [overrideSuggested]=\"!field.forceLookupOnly\" [inputClass]=\"'form-control'\" [placeholder]=\"field.vocabField.placeHolder\" [clearUnselected]=\"field.forceLookupOnly\" (selected)=\"onSelect($event)\" [datasource]=\"field.vocabField.dataService\" [minSearchLength]=\"0\" [initialValue]=\"field.vocabField.initialValue\"></ng2-completer>\n            <div class=\"text-danger\" *ngIf=\"field.formModel.controls['text_full_name'].hasError('required')\">{{field.validationMessages.required.text_full_name}}</div>\n          </div>\n          <div class='col-xs-1'>\n            <span class='text-right'>{{ field.emailColHdr }}</span>\n          </div>\n          <div [ngClass]=\"getGroupClass('email')\">\n            <input formControlName=\"email\" type=\"text\" class=\"form-control\" [readOnly]=\"field.forceLookupOnly\"/>\n            <div class=\"text-danger\" *ngIf=\"field.formModel.controls['email'].touched && field.formModel.controls['email'].hasError('email')\">{{field.validationMessages.invalid.email}}</div>\n            <div class=\"text-danger\" *ngIf=\"field.formModel.controls['email'].touched && field.formModel.controls['email'].hasError('required')\">{{field.validationMessages.required.email}}</div>\n          </div>\n        </ng-container>\n      </ng-container>\n    </div>\n  </div>\n  <div *ngIf=\"!field.editMode\">\n    <label *ngIf=\"field.label\">{{field.label}}</label>\n    <div class=\"row\" *ngIf=\"field.showHeader\">\n      <div class=\"col-xs-4\"><label>{{field.nameColHdr}}</label></div>\n      <div class=\"col-xs-4\"><label>{{field.emailColHdr}}</label></div>\n      <div class=\"col-xs-4\"><label>{{field.roleColHdr}}</label></div>\n    </div>\n    <div class=\"row\">\n      <div class=\"col-xs-4\">{{field.value.text_full_name}}</div>\n      <div class=\"col-xs-4\">{{field.value.email}}</div>\n      <div class=\"col-xs-4\">{{field.value.role}}</div>\n    </div>\n  </div>\n  ",
        })
    ], ContributorComponent);
    return ContributorComponent;
}(field_simple_component_1.SimpleComponent));
exports.ContributorComponent = ContributorComponent;
