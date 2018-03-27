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
import { Input, Component, Output, EventEmitter } from '@angular/core';
import { SimpleComponent } from './field-simple.component';
import { Container } from './field-simple';
import { FormArray } from '@angular/forms';
import * as _ from "lodash-es";
var RepeatableContainer = (function (_super) {
    __extends(RepeatableContainer, _super);
    function RepeatableContainer(options, injector) {
        var _this = _super.call(this, options, injector) || this;
        _this.hasGroup = true;
        _this.addButtonText = options['addButtonText'] || '';
        _this.removeButtonText = options['removeButtonText'] || null;
        _this.skipClone = options['skipClone'] || [];
        _this.forceClone = options['forceClone'] || [];
        _this.addButtonTextClass = options['addButtonTextClass'] || 'btn btn-success pull-right';
        _this.addButtonClass = options['addButtonClass'] || 'fa fa-plus-circle btn text-20 pull-right btn-success';
        _this.removeButtonTextClass = options['removeButtonTextClass'] || 'btn btn-danger pull-right';
        _this.removeButtonClass = options['removeButtonClass'] || 'fa fa-minus-circle btn text-20 pull-right btn-danger';
        return _this;
    }
    RepeatableContainer.prototype.getInitArrayEntry = function () {
        if (this.fields[0].isGroup) {
            var grp = {};
            var fm = {};
            var fg = this.fields[0].getGroup(grp, fm);
            return [fg];
        }
        return [this.fields[0].createFormModel()];
    };
    RepeatableContainer.prototype.getGroup = function (group, fieldMap) {
        var _this = this;
        fieldMap[this.name] = { field: this };
        if (!this.value || this.value.length == 0) {
            this.formModel = new FormArray(this.getInitArrayEntry());
        }
        else {
            var fieldCtr_1 = 0;
            var baseField_1 = this.fields[0];
            var elems_1 = [];
            this.fields = _.map(this.value, function (valueElem) {
                var fieldClone = null;
                if (fieldCtr_1 == 0) {
                    fieldClone = baseField_1;
                    fieldClone.value = valueElem;
                }
                else {
                    fieldClone = _this.createNewElem(baseField_1, valueElem);
                }
                fieldCtr_1++;
                elems_1.push(fieldClone.createFormModel(valueElem));
                return fieldClone;
            });
            this.formModel = new FormArray(elems_1);
            _.each(this.fields, function (f) {
                f.setupEventHandlers();
            });
        }
        fieldMap[this.name].control = this.formModel;
        if (this.groupName) {
            if (group[this.groupName]) {
                group[this.groupName].addControl(this.name, this.formModel);
            }
            else {
                var fg = {};
                fg[this.name] = this.formModel;
                group[this.groupName] = fg;
            }
        }
        else {
            group[this.name] = this.formModel;
        }
    };
    RepeatableContainer.prototype.createNewElem = function (baseFieldInst, value) {
        var _this = this;
        if (value === void 0) { value = null; }
        var newOpts = _.cloneDeep(baseFieldInst.options);
        newOpts.value = null;
        var newInst = new baseFieldInst.constructor(newOpts, this.injector);
        _.forEach(this.skipClone, function (f) {
            newInst[f] = null;
        });
        _.forEach(this.forceClone, function (f) {
            if (_.isString(f)) {
                newInst[f] = _.cloneDeep(baseFieldInst[f]);
            }
            else {
                newInst[f.field] = _.cloneDeepWith(baseFieldInst[f.field], _this.getCloneCustomizer(f));
            }
        });
        if (_.isFunction(newInst.postInit)) {
            newInst.postInit(value);
        }
        return newInst;
    };
    RepeatableContainer.prototype.getCloneCustomizer = function (cloneOpts) {
        return function (value, key) {
            if (_.find(cloneOpts.skipClone, function (skippedEntry) { return skippedEntry == key; })) {
                return false;
            }
        };
    };
    RepeatableContainer.prototype.addElem = function () {
        var newElem = this.createNewElem(this.fields[0]);
        if (_.isFunction(newElem.setEmptyValue)) {
            newElem.setEmptyValue();
        }
        this.fields.push(newElem);
        var newFormModel = newElem.createFormModel();
        this.formModel.push(newFormModel);
        return newElem;
    };
    RepeatableContainer.prototype.removeElem = function (index) {
        _.remove(this.fields, function (val, idx) { return idx == index; });
        this.formModel.removeAt(index);
    };
    RepeatableContainer.prototype.triggerValidation = function () {
        _.forEach(this.fields, function (f) {
            f.triggerValidation();
        });
    };
    return RepeatableContainer;
}(Container));
export { RepeatableContainer };
var EmbeddableComponent = (function (_super) {
    __extends(EmbeddableComponent, _super);
    function EmbeddableComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.canRemove = false;
        _this.removeBtnText = null;
        _this.removeBtnClass = 'btn fa fa-minus-circle btn text-20 pull-left btn btn-danger';
        _this.onRemoveBtnClick = new EventEmitter();
        return _this;
    }
    EmbeddableComponent.prototype.onRemove = function (event) {
        this.onRemoveBtnClick.emit([event, this.index]);
    };
    EmbeddableComponent.prototype.getGroupClass = function (fldName) {
        if (fldName === void 0) { fldName = null; }
        var baseClass = 'form-group';
        if (this.isEmbedded) {
            baseClass = '';
        }
        return baseClass + " " + (this.hasRequiredError() ? 'has-error' : '') + " " + this.field.groupClasses;
    };
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], EmbeddableComponent.prototype, "canRemove", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], EmbeddableComponent.prototype, "removeBtnText", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], EmbeddableComponent.prototype, "removeBtnClass", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], EmbeddableComponent.prototype, "index", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], EmbeddableComponent.prototype, "onRemoveBtnClick", void 0);
    return EmbeddableComponent;
}(SimpleComponent));
export { EmbeddableComponent };
var RepeatableComponent = (function (_super) {
    __extends(RepeatableComponent, _super);
    function RepeatableComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RepeatableComponent.prototype.addElem = function (event) {
        this.field.addElem();
    };
    RepeatableComponent.prototype.removeElem = function (event, i) {
        this.field.removeElem(i);
    };
    return RepeatableComponent;
}(SimpleComponent));
export { RepeatableComponent };
var RepeatableVocabComponent = (function (_super) {
    __extends(RepeatableVocabComponent, _super);
    function RepeatableVocabComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RepeatableVocabComponent = __decorate([
        Component({
            selector: 'repeatable-vocab',
            template: "\n  <div *ngIf=\"field.editMode\">\n    <div class=\"row\">\n      <div class=\"col-xs-12\">\n      <label>{{field.label}}\n        <button type=\"button\" class=\"btn btn-default\" *ngIf=\"field.help\" (click)=\"toggleHelp()\"><span class=\"glyphicon glyphicon-question-sign\" aria-hidden=\"true\"></span></button>\n      </label>\n      <span id=\"{{ 'helpBlock_' + field.name }}\" class=\"help-block\" *ngIf=\"this.helpShow\" [innerHtml]=\"field.help\"></span>\n      </div>\n    </div>\n    <div *ngFor=\"let fieldElem of field.fields; let i = index;\" class=\"row\">\n      <span class=\"col-xs-12\">\n        <rb-vocab [field]=\"fieldElem\" [form]=\"form\" [fieldMap]=\"fieldMap\" [isEmbedded]=\"true\" [removeBtnText]=\"field.removeButtonText\" [removeBtnClass]=\"field.removeButtonClass\" [canRemove]=\"field.fields.length > 1\" (onRemoveBtnClick)=\"removeElem($event[0], $event[1])\" [index]=\"i\"></rb-vocab>\n      </span>\n    </div>\n    <div class=\"row\">\n      <span class=\"col-xs-11\">&nbsp;\n      </span>\n      <span class=\"col-xs-1\">\n        <button *ngIf=\"field.addButtonText\" type='button' (click)=\"addElem($event)\" [ngClass]=\"field.addButtonTextClass\" >{{field.addButtonText}}</button>\n        <button *ngIf=\"!field.addButtonText\" type='button' (click)=\"addElem($event)\" [ngClass]=\"field.addButtonClass\"></button>\n      </span>\n    </div>\n  </div>\n  <li *ngIf=\"!field.editMode\" class=\"key-value-pair\">\n    <span *ngIf=\"field.label\" class=\"key\">{{field.label}}</span>\n    <span class=\"value\">\n      <ul class=\"key-value-list\">\n        <rb-vocab *ngFor=\"let fieldElem of field.fields; let i = index;\" [field]=\"fieldElem\" [form]=\"form\" [fieldMap]=\"fieldMap\"></rb-vocab>\n      </ul>\n    </span>\n  </li>\n  ",
        })
    ], RepeatableVocabComponent);
    return RepeatableVocabComponent;
}(RepeatableComponent));
export { RepeatableVocabComponent };
var RepeatableContributor = (function (_super) {
    __extends(RepeatableContributor, _super);
    function RepeatableContributor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RepeatableContributor;
}(RepeatableContainer));
export { RepeatableContributor };
var RepeatableContributorComponent = (function (_super) {
    __extends(RepeatableContributorComponent, _super);
    function RepeatableContributorComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RepeatableContributorComponent.prototype.ngOnInit = function () {
        this.field.fields[0].marginTop = '25px';
    };
    RepeatableContributorComponent.prototype.addElem = function (event) {
        var newElem = this.field.addElem();
        newElem.marginTop = '0px';
        newElem.vocabField.initialValue = null;
        newElem.setupEventHandlers();
    };
    RepeatableContributorComponent.prototype.removeElem = function (event, i) {
        this.field.removeElem(i);
        if (i == 0) {
            this.field.fields[0].marginTop = '25px';
            this.field.fields[0]["showHeader"] = true;
        }
    };
    RepeatableContributorComponent = __decorate([
        Component({
            selector: 'repeatable-contributor',
            template: "\n  <div *ngIf=\"field.editMode\">\n    <div *ngFor=\"let fieldElem of field.fields; let i = index;\" class=\"row\">\n      <span class=\"col-xs-10\">\n        <rb-contributor [field]=\"fieldElem\" [form]=\"form\" [fieldMap]=\"fieldMap\" [isEmbedded]=\"true\"></rb-contributor>\n      </span>\n      <span class=\"col-xs-2\">\n        <button type='button' *ngIf=\"field.fields.length > 1 && field.removeButtonText\" (click)=\"removeElem($event, i)\"  [ngClass]=\"field.removeButtonTextClass\" [ngStyle]=\"{'margin-top': fieldElem.marginTop}\" >{{field.removeButtonText}}</button>\n        <button type='button' *ngIf=\"field.fields.length > 1 && !field.removeButtonText\" (click)=\"removeElem($event, i)\" [ngClass]=\"field.removeButtonClass\" [ngStyle]=\"{'margin-top': fieldElem.marginTop}\" ></button>\n      </span>\n    </div>\n    <div class=\"row\">\n      <span class=\"col-xs-12\">\n        <button *ngIf=\"field.addButtonText\" type='button' (click)=\"addElem($event)\" [ngClass]=\"field.addButtonTextClass\" >{{field.addButtonText}}</button>\n        <button *ngIf=\"!field.addButtonText\" type='button' (click)=\"addElem($event)\" [ngClass]=\"field.addButtonClass\" ></button>\n      </span>\n    </div>\n  </div>\n  <div  *ngIf=\"!field.editMode\" class=\"table-responsive\">\n    <table class=\"table table-striped table-condensed\">\n      <thead><th>{{field.fields[0].nameColHdr}}</th><th>{{field.fields[0].emailColHdr}}</th><th>{{field.fields[0].roleColHdr}}</th></thead>\n      <tbody>\n        <tr *ngFor=\"let fieldElem of field.fields; let i = index;\">\n          <td>{{fieldElem.value.name}}</td>\n          <td>{{fieldElem.value.email}}</td>\n          <td>{{fieldElem.value.role}}</td>\n        </tr>\n      </tbody>\n    </table>\n  </div>\n  ",
        })
    ], RepeatableContributorComponent);
    return RepeatableContributorComponent;
}(RepeatableComponent));
export { RepeatableContributorComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQtcmVwZWF0YWJsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWVsZC1yZXBlYXRhYmxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbUJBLE9BQU8sRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFVLE1BQU0sRUFBRSxZQUFZLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDOUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzNELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxLQUFLLENBQUMsTUFBTSxZQUFZLENBQUM7QUFTaEM7SUFBeUMsdUNBQVM7SUFVaEQsNkJBQVksT0FBWSxFQUFFLFFBQWE7UUFBdkMsWUFDRSxrQkFBTSxPQUFPLEVBQUUsUUFBUSxDQUFDLFNBVXpCO1FBVEMsS0FBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDckIsS0FBSSxDQUFDLGFBQWEsR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3BELEtBQUksQ0FBQyxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsa0JBQWtCLENBQUMsSUFBSSxJQUFJLENBQUM7UUFDNUQsS0FBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzVDLEtBQUksQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM5QyxLQUFJLENBQUMsa0JBQWtCLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLElBQUksNEJBQTRCLENBQUM7UUFDeEYsS0FBSSxDQUFDLGNBQWMsR0FBRyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxzREFBc0QsQ0FBQztRQUMxRyxL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