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
var GenericGroupComponent = (function (_super) {
    __extends(GenericGroupComponent, _super);
    function GenericGroupComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GenericGroupComponent = __decorate([
        Component({
            selector: 'generic-group-field',
            template: "\n  <ng-container *ngIf=\"field.editMode\">\n    <div *ngIf=\"field.label\">\n      <label>\n        {{field.label}} {{getRequiredLabelStr()}}\n        <button type=\"button\" class=\"btn btn-default\" *ngIf=\"field.help\" (click)=\"toggleHelp()\"><span class=\"glyphicon glyphicon-question-sign\" aria-hidden=\"true\"></span></button>\n      </label>\n      <span id=\"{{ 'helpBlock_' + field.name }}\" class=\"help-block\" *ngIf=\"this.helpShow\" >{{field.help}}</span>\n    </div>\n    <ng-container *ngIf=\"isEmbedded\">\n      <div [formGroup]='form' [ngClass]=\"field.cssClasses\">\n        <div class='row'>\n          <div class=\"col-xs-11\">\n            <dmp-field *ngFor=\"let childField of field.fields\" [name]=\"name\" [index]=\"index\" [field]=\"childField\" [form]=\"form\" [fieldMap]=\"fieldMap\"></dmp-field>\n          </div>\n          <div class=\"col-xs-1\">\n            <button type='button' *ngIf=\"removeBtnText\" [disabled]=\"!canRemove\" (click)=\"onRemove($event)\" [ngClass]=\"removeBtnClass\" >{{removeBtnText}}</button>\n            <button [disabled]=\"!canRemove\" type='button' [ngClass]=\"removeBtnClass\" (click)=\"onRemove($event)\"></button>\n          </div>\n        </div>\n      </div>\n    </ng-container>\n    <ng-container *ngIf=\"!isEmbedded\">\n      <div [formGroup]='form' [ngClass]=\"field.cssClasses\">\n        <dmp-field *ngFor=\"let field of field.fields\" [field]=\"field\" [form]=\"form\" [fieldMap]=\"fieldMap\"></dmp-field>\n      </div>\n    </ng-container>\n  </ng-container>\n  <ng-container *ngIf=\"!field.editMode\">\n    <div [formGroup]='form' [ngClass]=\"field.cssClasses\">\n      <dmp-field *ngFor=\"let field of field.fields\" [field]=\"field\" [form]=\"form\" [fieldMap]=\"fieldMap\"></dmp-field>\n    </div>\n  </ng-container>\n  ",
        })
    ], GenericGroupComponent);
    return GenericGroupComponent;
}(EmbeddableComponent));
export { GenericGroupComponent };
var RepeatableGroupComponent = (function (_super) {
    __extends(RepeatableGroupComponent, _super);
    function RepeatableGroupComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RepeatableGroupComponent = __decorate([
        Component({
            selector: 'repeatable-group',
            template: "\n  <div *ngIf=\"field.editMode\">\n    <div *ngIf=\"field.label\">\n      <label>\n        {{field.label}} {{getRequiredLabelStr()}}\n        <button type=\"button\" class=\"btn btn-default\" *ngIf=\"field.help\" (click)=\"toggleHelp()\"><span class=\"glyphicon glyphicon-question-sign\" aria-hidden=\"true\"></span></button>\n      </label>\n      <span id=\"{{ 'helpBlock_' + field.name }}\" class=\"help-block\" *ngIf=\"this.helpShow\" >{{field.help}}</span>\n    </div>\n    <ng-container *ngFor=\"let fieldElem of field.fields; let i = index;\" >\n      <div class=\"row\">\n        <span class=\"col-xs-12\">\n          <generic-group-field [name]=\"field.name\" [index]=\"i\" [field]=\"fieldElem\" [form]=\"form\" [fieldMap]=\"fieldMap\" [isEmbedded]=\"true\" [removeBtnText]=\"field.removeButtonText\" [removeBtnClass]=\"field.removeButtonClass\" [canRemove]=\"field.fields.length > 1\" (onRemoveBtnClick)=\"removeElem($event[0], $event[1])\" [index]=\"i\"></generic-group-field>\n        </span>\n      </div>\n      <div class=\"row\">\n        <span class=\"col-xs-12\">&nbsp;</span>\n      </div>\n    </ng-container>\n    <div class=\"row\">\n      <span class=\"col-xs-11\">&nbsp;\n      </span>\n      <span class=\"col-xs-1\">\n        <button *ngIf=\"field.addButtonText\" type='button' (click)=\"addElem($event)\" [ngClass]=\"field.addButtonTextClass\" >{{field.addButtonText}}</button>\n        <button *ngIf=\"!field.addButtonText\" type='button' (click)=\"addElem($event)\" [ngClass]=\"field.addButtonClass\"></button>\n      </span>\n    </div>\n  </div>\n  <li *ngIf=\"!field.editMode\" class=\"key-value-pair\">\n    <span *ngIf=\"field.label\" class=\"key\">{{field.label}}</span>\n    <span class=\"value\">\n      <ul class=\"key-value-list\">\n        <generic-group-field *ngFor=\"let fieldElem of field.fields; let i = index;\" [field]=\"fieldElem\" [form]=\"form\" [fieldMap]=\"fieldMap\"></generic-group-field>\n      </ul>\n    </span>\n  </li>\n  ",
        })
    ], RepeatableGroupComponent);
    return RepeatableGroupComponent;
}(RepeatableComponent));
export { RepeatableGroupComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQtZ3JvdXAuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmllbGQtZ3JvdXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFrQkEsT0FBTyxFQUFTLFNBQVMsRUFBdUMsTUFBTSxlQUFlLENBQUM7QUFDdEYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLG1CQUFtQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFpR3hGO0lBQTJDLHlDQUFtQjtJQUE5RDs7SUFDQSxDQUFDO0lBRFkscUJBQXFCO1FBckNqQyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUscUJBQXFCO1lBQy9CLFFBQVEsRUFBRSw2d0RBaUNUO1NBQ0YsQ0FBQztPQUNXLHFCQUFxQixDQUNqQztJQUFELDRCQUFDO0NBQUEsQUFERCxDQUEyQyxtQkFBbUIsR0FDN0Q7U0FEWSxxQkFBcUI7QUFnSGxDO0lBQThDLDRDQUFtQjtJQUFqRTs7SUFDQSxDQUFDO0lBRFksd0JBQXdCO1FBeENwQyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsa0JBQWtCO1lBQzVCLFFBQVEsRUFBRSxnOERBb0NUO1NBQ0YsQ0FBQztPQUNXLHdCQUF3QixDQUNwQztJQUFELCtCQUFDO0NBQUEsQUFERCxDQUE4QyxtQkFBbUIsR0FDaEU7U0FEWSx3QkFBd0IifQ==