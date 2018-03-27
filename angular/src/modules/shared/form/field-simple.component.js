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
import { Input, Component } from '@angular/core';
import { FieldBase } from './field-base';
import { FormGroup, FormControl } from '@angular/forms';
import * as _ from "lodash-es";
var SimpleComponent = (function () {
    function SimpleComponent() {
        this.isEmbedded = false;
    }
    SimpleComponent.prototype.getFormControl = function (name, ctrlIndex) {
        if (name === void 0) { name = null; }
        if (ctrlIndex === void 0) { ctrlIndex = null; }
        var fc = null;
        if (_.isEmpty(name)) {
            name = this.name;
        }
        if (_.isEmpty(name)) {
            name = this.field.name;
        }
        if (this.fieldMap && this.field) {
            fc = this.field.getControl(name, this.fieldMap);
        }
        if (!_.isNull(ctrlIndex) && !_.isUndefined(ctrlIndex)) {
            if (!_.isNull(fc.controls) && !_.isUndefined(fc.controls)) {
                fc = fc.controls[ctrlIndex];
            }
        }
        else if (this.index != null) {
            fc = fc.controls[this.index];
        }
        if (name != this.field.name && !_.isEmpty(this.field.name) && !_.isUndefined(fc.controls)) {
            fc = fc.controls[this.field.name];
        }
        return fc;
    };
    SimpleComponent.prototype.getGroupClass = function (fldName) {
        if (fldName === void 0) { fldName = null; }
        return "form-group " + (this.hasRequiredError() ? 'has-error' : '') + " " + this.field.groupClasses;
    };
    SimpleComponent.prototype.hasRequiredError = function () {
        return (this.field.formModel ? this.field.formModel.touched && this.field.formModel.hasError('required') : false);
    };
    SimpleComponent.prototype.toggleHelp = function () {
        this.helpShow = !this.helpShow;
    };
    SimpleComponent.prototype.getRequiredLabelStr = function () {
        return this.field.required ? '(*)' : '';
    };
    SimpleComponent.prototype.getFromInjector = function (token) {
        return this.injector.get(token);
    };
    __decorate([
        Input(),
        __metadata("design:type", FieldBase)
    ], SimpleComponent.prototype, "field", void 0);
    __decorate([
        Input(),
        __metadata("design:type", FormGroup)
    ], SimpleComponent.prototype, "form", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SimpleComponent.prototype, "fieldMap", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SimpleComponent.prototype, "index", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SimpleComponent.prototype, "name", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], SimpleComponent.prototype, "isEmbedded", void 0);
    return SimpleComponent;
}());
export { SimpleComponent };
var TextAreaComponent = (function (_super) {
    __extends(TextAreaComponent, _super);
    function TextAreaComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextAreaComponent.prototype.ngOnInit = function () {
        if (!this.field.editMode) {
            this.field.formatValueForDisplay();
        }
    };
    TextAreaComponent = __decorate([
        Component({
            selector: 'text-area',
            template: "\n  <div *ngIf=\"field.editMode\" [formGroup]='form' class=\"form-group\">\n    <label [attr.for]=\"field.name\">\n      {{field.label}} {{ getRequiredLabelStr()}}\n      <button type=\"button\" class=\"btn btn-default\" *ngIf=\"field.help\" (click)=\"toggleHelp()\"><span class=\"glyphicon glyphicon-question-sign\" aria-hidden=\"true\"></span></button>\n    </label><br/>\n    <span id=\"{{ 'helpBlock_' + field.name }}\" class=\"help-block\" *ngIf=\"this.helpShow\" [innerHtml]=\"field.help\"></span>\n    <textarea [formControl]=\"getFormControl()\"  [attr.rows]=\"field.rows\" [attr.cols]=\"field.cols\" [id]=\"field.name\" class=\"form-control\">{{field.value}}</textarea>\n    <div class=\"text-danger\" *ngIf=\"getFormControl().hasError('required') && getFormControl().touched && !field.validationMessages?.required\">{{field.label}} is required</div>\n    <div class=\"text-danger\" *ngIf=\"getFormControl().hasError('required') && getFormControl().touched && field.validationMessages?.required\">{{field.validationMessages.required}}</div>\n  </div>\n  <li *ngIf=\"!field.editMode\" class=\"key-value-pair\">\n    <span class=\"key\" *ngIf=\"field.label\">{{field.label}}</span>\n    <span *ngFor=\"let line of field.lines\">\n      {{line}}\n      <br/>\n    </span>\n    <br/>\n  </li>\n  "
        })
    ], TextAreaComponent);
    return TextAreaComponent;
}(SimpleComponent));
export { TextAreaComponent };
var SelectionComponent = (function (_super) {
    __extends(SelectionComponent, _super);
    function SelectionComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SelectionComponent.prototype.getLabel = function (val) {
        var opt = _.find(this.field.options, function (opt) {
            return opt.value == val;
        });
        if (opt) {
            return opt.label;
        }
        else {
            return '';
        }
    };
    return SelectionComponent;
}(SimpleComponent));
export { SelectionComponent };
var DropdownFieldComponent = (function (_super) {
    __extends(DropdownFieldComponent, _super);
    function DropdownFieldComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DropdownFieldComponent = __decorate([
        Component({
            selector: 'dropdownfield',
            template: "\n  <div [formGroup]='form' *ngIf=\"field.editMode\" class=\"form-group\">\n     <label [attr.for]=\"field.name\">\n      {{field.label}} {{ getRequiredLabelStr()}}\n      <button type=\"button\" class=\"btn btn-default\" *ngIf=\"field.help\" (click)=\"toggleHelp()\"><span class=\"glyphicon glyphicon-question-sign\" aria-hidden=\"true\"></span></button>\n     </label><br/>\n     <span id=\"{{ 'helpBlock_' + field.name }}\" class=\"help-block\" *ngIf=\"this.helpShow\" [innerHtml]=\"field.help\"></span>\n     <select [formControl]=\"getFormControl()\"  [id]=\"field.name\" class=\"form-control\">\n        <option *ngFor=\"let opt of field.options\" [value]=\"opt.value\">{{opt.label}}</option>\n     </select>\n     <div class=\"text-danger\" *ngIf=\"getFormControl().hasError('required') && getFormControl().touched && !field.validationMessages?.required\">{{field.label}} is required</div>\n     <div class=\"text-danger\" *ngIf=\"getFormControl().hasError('required') && getFormControl().touched && field.validationMessages?.required\">{{field.validationMessages.required}}</div>\n  </div>\n  <div *ngIf=\"!field.editMode\" class=\"key-value-pair\">\n    <span class=\"key\" *ngIf=\"field.label\">{{field.label}}</span>\n    <span class=\"value\">{{getLabel(field.value)}}</span>\n  </div>\n  ",
        })
    ], DropdownFieldComponent);
    return DropdownFieldComponent;
}(SelectionComponent));
export { DropdownFieldComponent };
var SelectionFieldComponent = (function (_super) {
    __extends(SelectionFieldComponent, _super);
    function SelectionFieldComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SelectionFieldComponent.prototype.isRadio = function () {
        return this.field.controlType == 'radio';
    };
    SelectionFieldComponent.prototype.getControlFromOption = function (opt) {
        var formcontrol = this.getFormControl();
        var control = _.find(formcontrol.controls, function (ctrl) {
            return opt.value == ctrl.value;
        });
        return control;
    };
    SelectionFieldComponent.prototype.onChange = function (opt, event) {
        var formcontrol = this.getFormControl();
        if (event.target.checked) {
            formcontrol.push(new FormControl(opt.value));
        }
        else {
            var idx_1 = null;
            _.forEach(formcontrol.controls, function (ctrl, i) {
                if (ctrl.value == opt.value) {
                    idx_1 = i;
                    return false;
                }
            });
            formcontrol.removeAt(idx_1);
        }
    };
    SelectionFieldComponent = __decorate([
        Component({
            selector: 'selectionfield',
            template: "\n  <div [formGroup]='form' *ngIf=\"field.editMode\" class=\"form-group\">\n     <label [attr.for]=\"field.name\">\n      {{field.label}} {{ getRequiredLabelStr()}}\n      <button type=\"button\" class=\"btn btn-default\" *ngIf=\"field.help\" (click)=\"toggleHelp()\"><span class=\"glyphicon glyphicon-question-sign\" aria-hidden=\"true\"></span></button>\n     </label><br/>\n     <span id=\"{{ 'helpBlock_' + field.name }}\" class=\"help-block\" *ngIf=\"this.helpShow\" [innerHtml]=\"field.help\"></span>\n     <span *ngFor=\"let opt of field.options\">\n      <!-- radio type hard-coded otherwise accessor directive will not work! -->\n      <input *ngIf=\"isRadio()\" type=\"radio\" name=\"{{field.name}}\" [id]=\"field.name + '_' + opt.value\" [formControl]=\"getFormControl()\" [value]=\"opt.value\">\n      <input *ngIf=\"!isRadio()\" type=\"{{field.controlType}}\" name=\"{{field.name}}\" [id]=\"field.name + '_' + opt.value\" [value]=\"opt.value\" (change)=\"onChange(opt, $event)\" [attr.selected]=\"getControlFromOption(opt)\" [attr.checked]=\"getControlFromOption(opt)\">\n      <label for=\"{{field.name + '_' + opt.value}}\" class=\"radio-label\">{{ opt.label }}</label>\n      <br/>\n     </span>\n     <div class=\"text-danger\" *ngIf=\"getFormControl().hasError('required') && getFormControl().touched && !field.validationMessages?.required\">{{field.label}} is required</div>\n     <div class=\"text-danger\" *ngIf=\"getFormControl().hasError('required') && getFormControl().touched && field.validationMessages?.required\">{{field.validationMessages.required}}</div>\n  </div>\n  <div *ngIf=\"!field.editMode\" class=\"key-value-pair\">\n    <ng-container *ngIf=\"isRadio()\">\n      <span *ngIf=\"field.label\" class=\"key\">{{field.label}}</span>\n      <span class=\"value\">{{getLabel(field.value)}}</span>\n    </ng-container>\n    <ng-container *ngIf=\"!isRadio()\">\n      <span *ngIf=\"field.label\" class=\"key\">{{field.label}}</span>\n      <span class=\"value\" *ngFor=\"let value of field.value\">{{getLabel(value)}}<br/></span>\n    </ng-container>\n  </div>\n  ",
        })
    ], SelectionFieldComponent);
    return SelectionFieldComponent;
}(SelectionComponent));
export { SelectionFieldComponent };
var TabOrAccordionContainerComponent = (function (_super) {
    __extends(TabOrAccordionContainerComponent, _super);
    function TabOrAccordionContainerComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TabOrAccordionContainerComponent.prototype.ngAfterViewInit = function () {
        var that = this;
        jQuery("[role='tab']").on('shown.bs.tab', function () {
            that.field.onTabChange.emit(this.getAttribute("href").substring(1, this.getAttribute("href").length));
        });
    };
    TabOrAccordionContainerComponent = __decorate([
        Component({
            selector: 'tabcontainer',
            template: "\n  <div *ngIf=\"field.editMode\" class=\"row\" style=\"min-height:300px;\">\n    <div [ngClass]=\"field.cssClasses\">\n      <div [ngClass]=\"field.tabNavContainerClass\">\n        <ul [ngClass]=\"field.tabNavClass\">\n          <li *ngFor=\"let tab of field.fields\" [ngClass]=\"{'active': tab.active}\"><a href=\"#{{tab.id}}\" data-toggle=\"tab\" role=\"tab\">{{tab.label}}</a></li>\n        </ul>\n      </div>\n      <div [ngClass]=\"field.tabContentContainerClass\">\n        <div [ngClass]=\"field.tabContentClass\">\n      <!--\n      Inlined the tab definition instead of creating it's own component otherwise Bootstrap refuses to toggle the panes\n      Likely because of the extra DOM node (component selector) that it doesn't know what to do.\n      TODO: remove inlining, or perhaps consider a 3rd-party NG2 tab component\n      -->\n          <div *ngFor=\"let tab of field.fields\" [ngClass]=\"{'tab-pane': true, 'fade': true, 'active': tab.active==true, 'in': tab.active==true}\" id=\"{{tab.id}}\">\n            <dmp-field *ngFor=\"let field of tab.fields\" [field]=\"field\" [form]=\"form\" class=\"form-row\" [fieldMap]=\"fieldMap\" [parentId]=\"tab.id\"></dmp-field>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div *ngIf=\"!field.editMode\" [ngClass]=\"field.accContainerClass\">\n    <div class=\"panel-group\">\n      <div *ngFor=\"let tab of field.fields\" [ngClass]=\"field.accClass\">\n        <div class=\"panel-heading\">\n          <h4 class=\"panel-title\">\n            <a data-toggle=\"collapse\" href=\"#{{tab.id}}\">{{tab.label}}</a>\n          </h4>\n        </div>\n        <div id=\"{{tab.id}}\" class=\"panel-collapse collapse\">\n          <div class=\"panel-body\">\n            <ul class=\"key-value-list\">\n              <dmp-field *ngFor=\"let field of tab.fields\" [field]=\"field\" [form]=\"form\" class=\"form-row\" [fieldMap]=\"fieldMap\"></dmp-field>\n            </ul>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  "
        })
    ], TabOrAccordionContainerComponent);
    return TabOrAccordionContainerComponent;
}(SimpleComponent));
export { TabOrAccordionContainerComponent };
var ButtonBarContainerComponent = (function (_super) {
    __extends(ButtonBarContainerComponent, _super);
    function ButtonBarContainerComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ButtonBarContainerComponent = __decorate([
        Component({
            selector: 'buttonbarcontainer',
            template: "\n    <div *ngIf=\"field.editMode\" class=\"form-row\">\n      <div class=\"pull-right col-md-10\">\n      <dmp-field *ngFor=\"let field1 of field.fields\" [field]=\"field1\" [form]=\"form\" class=\"form-row\" [fieldMap]=\"fieldMap\"></dmp-field>\n    </div>\n  "
        })
    ], ButtonBarContainerComponent);
    return ButtonBarContainerComponent;
}(SimpleComponent));
export { ButtonBarContainerComponent };
var HtmlRawComponent = (function (_super) {
    __extends(HtmlRawComponent, _super);
    function HtmlRawComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HtmlRawComponent = __decorate([
        Component({
            selector: 'htmlraw',
            template: "\n  <ng-content></ng-content>\n  ",
        })
    ], HtmlRawComponent);
    return HtmlRawComponent;
}(SimpleComponent));
export { HtmlRawComponent };
var TextBlockComponent = (function (_super) {
    __extends(TextBlockComponent, _super);
    function TextBlockComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextBlockComponent = __decorate([
        Component({
            selector: 'text-block',
            template: "\n  <div [ngSwitch]=\"field.type\">\n    <h1 *ngSwitchCase=\"'h1'\" [ngClass]=\"field.cssClasses\">{{field.value}}</h1>\n    <h2 *ngSwitchCase=\"'h2'\" [ngClass]=\"field.cssClasses\">{{field.value}}</h2>\n    <h3 *ngSwitchCase=\"'h3'\" [ngClass]=\"field.cssClasses\">{{field.value}}</h3>\n    <h4 *ngSwitchCase=\"'h4'\" [ngClass]=\"field.cssClasses\">{{field.value}}</h4>\n    <h5 *ngSwitchCase=\"'h5'\" [ngClass]=\"field.cssClasses\">{{field.value}}</h5>\n    <hr *ngSwitchCase=\"'hr'\" [ngClass]=\"field.cssClasses\">\n    <span *ngSwitchCase=\"'span'\" [ngClass]=\"field.cssClasses\">{{field.value}}</span>\n    <p *ngSwitchDefault [ngClass]=\"field.cssClasses\">{{field.value}}</p>\n  </div>\n  ",
        })
    ], TextBlockComponent);
    return TextBlockComponent;
}(SimpleComponent));
export { TextBlockComponent };
var DateTimeComponent = (function (_super) {
    __extends(DateTimeComponent, _super);
    function DateTimeComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DateTimeComponent.prototype.formatValue = function () {
        return this.field.formatValue(this.getFormControl().value);
    };
    DateTimeComponent = __decorate([
        Component({
            selector: 'date-time',
            template: "\n  <div *ngIf=\"field.editMode\" [formGroup]='form' class=\"form-group\">\n    <label [attr.for]=\"field.name\">\n      {{field.label}} {{ getRequiredLabelStr()}}\n      <button type=\"button\" class=\"btn btn-default\" *ngIf=\"field.help\" (click)=\"toggleHelp()\"><span class=\"glyphicon glyphicon-question-sign\" aria-hidden=\"true\"></span></button>\n    </label><br/>\n    <span id=\"{{ 'helpBlock_' + field.name }}\" class=\"help-block\" *ngIf=\"this.helpShow\" [innerHtml]=\"field.help\"></span>\n    <datetime #dateTime [formControl]=\"getFormControl()\" [timepicker]=\"field.timePickerOpts\" [datepicker]=\"field.datePickerOpts\" [hasClearButton]=\"field.hasClearButton\"></datetime>\n  </div>\n  <li *ngIf=\"!field.editMode\" class=\"key-value-pair\">\n    <span class=\"key\" *ngIf=\"field.label\">{{field.label}}</span>\n    <span class=\"value\">{{field.formatValueForDisplay()}}</span>\n  </li>\n  "
        })
    ], DateTimeComponent);
    return DateTimeComponent;
}(SimpleComponent));
export { DateTimeComponent };
var SaveButtonComponent = (function (_super) {
    __extends(SaveButtonComponent, _super);
    function SaveButtonComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SaveButtonComponent.prototype.onClick = function (event) {
        var _this = this;
        if (this.field.closeOnSave == true) {
            var successObs = this.fieldMap._rootComp.onSubmit();
            successObs.subscribe(function (successful) {
                if (successful) {
                    window.location.href = _this.field.redirectLocation;
                }
            });
        }
        else {
            this.fieldMap._rootComp.onSubmit().subscribe();
        }
    };
    SaveButtonComponent = __decorate([
        Component({
            selector: 'save-button',
            template: "\n    <button type=\"button\" (click)=\"onClick($event)\" class=\"btn\" [ngClass]=\"field.cssClasses\" [disabled]=\"!fieldMap._rootComp.needsSave || fieldMap._rootComp.isSaving()\">{{field.label}}</button>\n  ",
        })
    ], SaveButtonComponent);
    return SaveButtonComponent;
}(SimpleComponent));
export { SaveButtonComponent };
var CancelButtonComponent = (function (_super) {
    __extends(CancelButtonComponent, _super);
    function CancelButtonComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CancelButtonComponent = __decorate([
        Component({
            selector: 'cancel-button',
            template: "\n    <button type=\"button\" class=\"btn btn-warning\" [disabled]=\"fieldMap._rootComp.isSaving()\" (click)=\"fieldMap._rootComp.onCancel()\">{{field.label}}</button>\n  ",
        })
    ], CancelButtonComponent);
    return CancelButtonComponent;
}(SimpleComponent));
export { CancelButtonComponent };
var AnchorOrButtonComponent = (function (_super) {
    __extends(AnchorOrButtonComponent, _super);
    function AnchorOrButtonComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AnchorOrButtonComponent.prototype.onClick = function (event) {
        this.fieldMap._rootComp[this.field.onClick_RootFn]();
    };
    AnchorOrButtonComponent.prototype.isDisabled = function () {
        if (this.field.isDisabledFn) {
            return this.fieldMap._rootComp[this.field.isDisabledFn]();
        }
        return false;
    };
    AnchorOrButtonComponent = __decorate([
        Component({
            selector: 'anchor-button',
            template: "\n  <button *ngIf=\"field.controlType=='button'\" type=\"{{field.type}}\" [ngClass]=\"field.cssClasses\" (click)=\"onClick($event)\" [disabled]=\"isDisabled()\">{{field.label}}</button>\n  <a *ngIf=\"field.controlType=='anchor'\" href='{{field.value}}' [ngClass]=\"field.cssClasses\" ><span *ngIf=\"field.showPencil\" class=\"glyphicon glyphicon-pencil\">&nbsp;</span>{{field.label}}</a>\n  ",
        })
    ], AnchorOrButtonComponent);
    return AnchorOrButtonComponent;
}(SimpleComponent));
export { AnchorOrButtonComponent };
var LinkValueComponent = (function (_super) {
    __extends(LinkValueComponent, _super);
    function LinkValueComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LinkValueComponent.prototype.isVisible = function () {
        return !_.isEmpty(this.field.value);
    };
    LinkValueComponent = __decorate([
        Component({
            selector: 'link-value',
            template: "\n  <li *ngIf=\"!field.editMode && isVisible()\" class=\"key-value-pair padding-bottom-10\">\n    <span class=\"key\" *ngIf=\"field.label\">{{field.label}}</span>\n    <span class=\"value\"><a href='{{field.value}}' target=\"field.target\">{{field.value}}</a></span>\n  </li>\n  ",
        })
    ], LinkValueComponent);
    return LinkValueComponent;
}(SimpleComponent));
export { LinkValueComponent };
var HiddenValueComponent = (function (_super) {
    __extends(HiddenValueComponent, _super);
    function HiddenValueComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HiddenValueComponent.prototype.handleChange = function (value, source) {
        var _this = this;
        console.log("Hidden Value change: " + source);
        console.log(value);
        var targetVal = null;
        if (_.isArray(value)) {
            targetVal = [];
            _.forEach(value, function (v) {
                var tVal = '';
                _.forEach(_this.field.onChange.control.subFields, function (subField) {
                    tVal = "" + (_.isEmpty(tVal) ? tVal : "" + tVal + _this.field.onChange.control.delim) + v[subField];
                });
                targetVal.push(tVal);
            });
        }
        this.getFormControl().setValue(targetVal, this.field.onChange.updateConf);
        console.log("Form now has value:");
        console.log(this.form.value);
    };
    HiddenValueComponent = __decorate([
        Component({
            selector: 'hidden-field',
            template: "\n  <div [formGroup]='form'>\n    <input type=\"hidden\" [formControl]=\"getFormControl()\" />\n  </div>\n  ",
        })
    ], HiddenValueComponent);
    return HiddenValueComponent;
}(SimpleComponent));
export { HiddenValueComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQtc2ltcGxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpZWxkLXNpbXBsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW1CQSxPQUFPLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBZ0QsTUFBTSxlQUFlLENBQUM7QUFDL0YsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUV6QyxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBYSxNQUFNLGdCQUFnQixDQUFDO0FBQ25FLE9BQU8sS0FBSyxDQUFDLE1BQU0sWUFBWSxDQUFDO0FBUWhDO0lBQUE7UUFzQlcsZUFBVSxHQUFZLEtBQUssQ0FBQztJQWtGdkMsQ0FBQztJQS9EUSx3Q0FBYyxHQUFyQixVQUFzQixJQUFtQixFQUFFLFNBQXdCO1FBQTdDLHFCQUFBLEVBQUEsV0FBbUI7UUFBRSwwQkFBQSxFQUFBLGdCQUF3QjtRQUNqRSxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFDZCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQixJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUNuQixDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEIsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1FBQ3pCLENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBRWhDLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2xELENBQUM7UUFDRCxFQUFF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