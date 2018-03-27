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
import { Component } from '@angular/core';
import { EmbeddableComponent, RepeatableComponent } from './field-repeatable.component';
var TextFieldComponent = (function (_super) {
    __extends(TextFieldComponent, _super);
    function TextFieldComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextFieldComponent = __decorate([
        Component({
            selector: 'textfield',
            template: "\n  <div *ngIf=\"field.editMode\" [ngClass]=\"getGroupClass()\">\n    <div *ngIf=\"!isEmbedded\" >\n      <label [attr.for]=\"field.name\">\n        {{field.label}} {{ getRequiredLabelStr() }}\n        <button type=\"button\" class=\"btn btn-default\" *ngIf=\"field.help\" (click)=\"toggleHelp()\"><span class=\"glyphicon glyphicon-question-sign\" aria-hidden=\"true\"></span></button>\n        <span id=\"{{ 'helpBlock_' + field.name }}\" class=\"help-block\" *ngIf=\"this.helpShow\" [innerHtml]=\"field.help\"></span>\n      </label>\n      <input [formGroup]='form' [formControl]=\"getFormControl()\"  [id]=\"field.name\" [type]=\"field.type\" [readonly]=\"field.readOnly\" [ngClass]=\"field.cssClasses\" [attr.aria-describedby]=\"field.help ? 'helpBlock_' + field.name : null\">\n    </div>\n    <div *ngIf=\"isEmbedded\" class=\"input-group padding-bottom-15\">\n      <input [formControl]=\"getFormControl(name, index)\"  [id]=\"field.name\" [type]=\"field.type\" [readonly]=\"field.readOnly\" [ngClass]=\"field.cssClasses\" [attr.aria-describedby]=\"field.help ? 'helpBlock_' + field.name : null\">\n      <span class=\"input-group-btn\">\n        <button type='button' *ngIf=\"removeBtnText\" [disabled]=\"!canRemove\" (click)=\"onRemove($event)\" [ngClass]=\"removeBtnClass\" >{{removeBtnText}}</button>\n        <button [disabled]=\"!canRemove\" type='button' [ngClass]=\"removeBtnClass\" (click)=\"onRemove($event)\"></button>\n      </span>\n    </div>\n    <div *ngIf=\"field.required\" [style.visibility]=\"getFormControl() && getFormControl().hasError('required') && getFormControl().touched ? 'inherit':'hidden'\">\n      <div class=\"text-danger\" *ngIf=\"!field.validationMessages?.required\">{{field.label}} is required</div>\n      <div class=\"text-danger\" *ngIf=\"field.validationMessages?.required\">{{field.validationMessages.required}}</div>\n    </div>\n  </div>\n  <div *ngIf=\"!field.editMode\" class=\"key-value-pair\">\n    <span class=\"key\" *ngIf=\"field.label\">{{field.label}}</span>\n    <span class=\"value\">{{field.value}}</span>\n  </div>\n  ",
        })
    ], TextFieldComponent);
    return TextFieldComponent;
}(EmbeddableComponent));
export { TextFieldComponent };
var RepeatableTextfieldComponent = (function (_super) {
    __extends(RepeatableTextfieldComponent, _super);
    function RepeatableTextfieldComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RepeatableTextfieldComponent.prototype.ngOnInit = function () {
    };
    RepeatableTextfieldComponent.prototype.addElem = function (event) {
        var newElem = this.field.addElem();
    };
    RepeatableTextfieldComponent.prototype.removeElem = function (event, i) {
        this.field.removeElem(i);
    };
    RepeatableTextfieldComponent = __decorate([
        Component({
            selector: 'repeatable-textfield',
            template: "\n  <div *ngIf=\"field.editMode\">\n    <div class=\"row\">\n      <div class=\"col-xs-12\">\n      <label>{{field.label}}\n        <button type=\"button\" class=\"btn btn-default\" *ngIf=\"field.help\" (click)=\"toggleHelp()\"><span class=\"glyphicon glyphicon-question-sign\" aria-hidden=\"true\"></span></button>\n      </label>\n      <span id=\"{{ 'helpBlock_' + field.name }}\" class=\"help-block\" *ngIf=\"this.helpShow\" [innerHtml]=\"field.help\"></span>\n      </div>\n    </div>\n    <div *ngFor=\"let fieldElem of field.fields; let i = index;\" class=\"row\">\n      <span class=\"col-xs-12\">\n        <textfield [name]=\"field.name\" [field]=\"fieldElem\" [form]=\"form\" [fieldMap]=\"fieldMap\" [isEmbedded]=\"true\" [removeBtnText]=\"field.removeButtonText\" [removeBtnClass]=\"field.removeButtonClass\" [canRemove]=\"field.fields.length > 1\" (onRemoveBtnClick)=\"removeElem($event[0], $event[1])\" [index]=\"i\"></textfield>\n      </span>\n    </div>\n    <div class=\"row\">\n      <span class=\"col-xs-12\">\n        <button *ngIf=\"field.addButtonText\" type='button' (click)=\"addElem($event)\" [ngClass]=\"field.addButtonTextClass\" >{{field.addButtonText}}</button>\n        <button *ngIf=\"!field.addButtonText\" type='button' (click)=\"addElem($event)\" [ngClass]=\"field.addButtonClass\"></button>\n      </span>\n    </div>\n  </div>\n  <li *ngIf=\"!field.editMode\" class=\"key-value-pair\">\n    <span *ngIf=\"field.label\" class=\"key\">{{field.label}}</span>\n    <span class=\"value\">\n      <ul class=\"key-value-list\">\n        <textfield *ngFor=\"let fieldElem of field.fields; let i = index;\"  [field]=\"fieldElem\" [form]=\"form\" [fieldMap]=\"fieldMap\"></textfield>\n      </ul>\n    </span>\n  </li>\n  ",
        })
    ], RepeatableTextfieldComponent);
    return RepeatableTextfieldComponent;
}(RepeatableComponent));
export { RepeatableTextfieldComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQtdGV4dGZpZWxkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpZWxkLXRleHRmaWVsZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQW1CQSxPQUFPLEVBQVMsU0FBUyxFQUF1QyxNQUFNLGVBQWUsQ0FBQztBQUd0RixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQWtDeEY7SUFBd0Msc0NBQW1CO0lBQTNEOztJQUVBLENBQUM7SUFGWSxrQkFBa0I7UUE5QjlCLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxXQUFXO1lBQ3JCLFFBQVEsRUFBRSxxaUVBMEJUO1NBQ0YsQ0FBQztPQUNXLGtCQUFrQixDQUU5QjtJQUFELHlCQUFDO0NBQUEsQUFGRCxDQUF3QyxtQkFBbUIsR0FFMUQ7U0FGWSxrQkFBa0I7QUFzQy9CO0lBQWtELGdEQUFtQjtJQUFyRTs7SUFZQSxDQUFDO0lBVkMsK0NBQVEsR0FBUjtJQUNBLENBQUM7SUFFRCw4Q0FBTyxHQUFQLFVBQVEsS0FBVTtRQUNoQixJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxpREFBVSxHQUFWLFVBQVcsS0FBVSxFQUFFLENBQVM7UUFDOUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQVhVLDRCQUE0QjtRQWxDeEMsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLHNCQUFzQjtZQUNoQyxRQUFRLEVBQUUsc3REQThCVDtTQUNGLENBQUM7T0FDVyw0QkFBNEIsQ0FZeEM7SUFBRCxtQ0FBQztDQUFBLEFBWkQsQ0FBa0QsbUJBQW1CLEdBWXBFO1NBWlksNEJBQTRCIn0=