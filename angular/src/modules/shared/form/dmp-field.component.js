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
import { Component, Input, Inject, ViewChild, ViewContainerRef, ComponentFactoryResolver, ApplicationRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldBase } from './field-base';
import * as _ from "lodash-es";
var DmpFieldComponent = (function () {
    function DmpFieldComponent(componentFactoryResolver, app) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.app = app;
        this.isEmbedded = false;
        this.disabledElements = [];
    }
    Object.defineProperty(DmpFieldComponent.prototype, "isValid", {
        get: function () {
            if (this.form && this.form.controls) {
                return this.form.controls[this.field.name].valid;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    DmpFieldComponent.prototype.isDisabled = function () {
        var disabledExpression = this.field.options['disabledExpression'];
        if (disabledExpression != null) {
            var imports = this.fieldAnchor;
            var variables = {};
            variables['imports'] = this.fieldMap._rootComp;
            var compiled = _.template(disabledExpression, variables);
            var parentElement = jQuery(this.fieldElement.nativeElement.parentElement);
            if (compiled() == "true") {
                this.disabledElements = parentElement.find('*:disabled');
                parentElement.find('input').prop("disabled", true);
                return 'disabled';
            }
            else {
                if (jQuery(this.fieldElement.nativeElement).prop('disabled') == 'disabled') {
                    parentElement.find('input').prop("disabled", false);
                    _.each(this.disabledElements, function (disabledElement) { return disabledElement.prop("disabled", true); });
                }
                return null;
            }
        }
        return null;
    };
    DmpFieldComponent.prototype.ngOnChanges = function () {
        if (!this.field || !this.componentFactoryResolver) {
            return;
        }
        this.fieldAnchor.clear();
        var compFactory = this.componentFactoryResolver.resolveComponentFactory(this.field.compClass);
        var fieldCompRef = this.fieldAnchor.createComponent(compFactory, undefined, this.app['_injector']);
        fieldCompRef.instance.injector = this.app['_injector'];
        fieldCompRef.instance.field = this.field;
        fieldCompRef.instance.form = this.form;
        fieldCompRef.instance.fieldMap = this.fieldMap;
        fieldCompRef.instance.parentId = this.parentId;
        fieldCompRef.instance.isEmbedded = this.isEmbedded;
        fieldCompRef.instance.name = this.name;
        fieldCompRef.instance.index = this.index;
        this.field.setFieldMapEntry(this.fieldMap, fieldCompRef);
    };
    __decorate([
        Input(),
        __metadata("design:type", FieldBase)
    ], DmpFieldComponent.prototype, "field", void 0);
    __decorate([
        Input(),
        __metadata("design:type", FormGroup)
    ], DmpFieldComponent.prototype, "form", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DmpFieldComponent.prototype, "value", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DmpFieldComponent.prototype, "fieldMap", void 0);
    __decorate([
        ViewChild('field', { read: ViewContainerRef }),
        __metadata("design:type", ViewContainerRef)
    ], DmpFieldComponent.prototype, "fieldAnchor", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], DmpFieldComponent.prototype, "parentId", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], DmpFieldComponent.prototype, "isEmbedded", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DmpFieldComponent.prototype, "name", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], DmpFieldComponent.prototype, "index", void 0);
    __decorate([
        ViewChild('field'),
        __metadata("design:type", Object)
    ], DmpFieldComponent.prototype, "fieldElement", void 0);
    DmpFieldComponent = __decorate([
        Component({
            selector: 'dmp-field',
            template: '<span [attr.disabled]="isDisabled()" #field></span>'
        }),
        __param(0, Inject(ComponentFactoryResolver)),
        __metadata("design:paramtypes", [ComponentFactoryResolver, ApplicationRef])
    ], DmpFieldComponent);
    return DmpFieldComponent;
}());
export { DmpFieldComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG1wLWZpZWxkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRtcC1maWVsZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBbUJBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsZ0JBQWdCLEVBQUUsd0JBQXdCLEVBQWdCLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5SSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUV6QyxPQUFPLEtBQUssQ0FBQyxNQUFNLFlBQVksQ0FBQztBQWFoQztJQThDRSwyQkFBc0Qsd0JBQWtELEVBQVksR0FBbUI7UUFBakYsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtRQUFZLFFBQUcsR0FBSCxHQUFHLENBQWdCO1FBbEI5SCxlQUFVLEdBQVksS0FBSyxDQUFDO1FBbUJuQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFJRCxzQkFBSSxzQ0FBTzthQUFYO1lBQ0UsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUNuRCxDQUFDO1lBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNmLENBQUM7OztPQUFBO0lBS00sc0NBQVUsR0FBakI7UUFFRSxJQUFJLGtCQUFrQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDbEUsRUFBRSxDQUFBLENBQUMsa0JBQWtCLElBQUksSUFB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