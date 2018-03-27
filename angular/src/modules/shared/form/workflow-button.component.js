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
import { AnchorOrButtonComponent } from './field-simple.component';
import { AnchorOrButton } from './field-simple';
var WorkflowStepButton = (function (_super) {
    __extends(WorkflowStepButton, _super);
    function WorkflowStepButton(options, injector) {
        var _this = _super.call(this, options, injector) || this;
        _this.targetStep = options['targetStep'] || null;
        return _this;
    }
    return WorkflowStepButton;
}(AnchorOrButton));
export { WorkflowStepButton };
var WorkflowStepButtonComponent = (function (_super) {
    __extends(WorkflowStepButtonComponent, _super);
    function WorkflowStepButtonComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WorkflowStepButtonComponent.prototype.gotoTargetStep = function (event) {
        return this.fieldMap._rootComp.stepTo(this.field.targetStep);
    };
    WorkflowStepButtonComponent = __decorate([
        Component({
            selector: 'workflowstep-button',
            template: "\n  <button type=\"{{field.type}}\" [ngClass]=\"field.cssClasses\" (click)=\"gotoTargetStep($event)\" [disabled]=\"isDisabled()\">{{field.label}}</button>\n  ",
        })
    ], WorkflowStepButtonComponent);
    return WorkflowStepButtonComponent;
}(AnchorOrButtonComponent));
export { WorkflowStepButtonComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2Zsb3ctYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIndvcmtmbG93LWJ1dHRvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFbkUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWhEO0lBQXdDLHNDQUFjO0lBR3BELDRCQUFZLE9BQVksRUFBRSxRQUFZO1FBQXRDLFlBQ0Usa0JBQU0sT0FBTyxFQUFFLFFBQVEsQ0FBQyxTQUV6QjtRQURDLEtBQUksQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLElBQUksQ0FBQzs7SUFDbEQsQ0FBQztJQUNILHlCQUFDO0FBQUQsQ0FBQyxBQVBELENBQXdDLGNBQWMsR0FPckQ7O0FBU0Q7SUFBaUQsK0NBQXVCO0lBQXhFOztJQU1BLENBQUM7SUFIQyxvREFBYyxHQUFkLFVBQWUsS0FBUztRQUN0QixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUxVLDJCQUEyQjtRQU52QyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUscUJBQXFCO1lBQy9CLFFBQVEsRUFBRSxnS0FFVDtTQUNGLENBQUM7T0FDVywyQkFBMkIsQ0FNdkM7SUFBRCxrQ0FBQztDQUFBLEFBTkQsQ0FBaUQsdUJBQXVCLEdBTXZFO1NBTlksMkJBQTJCIn0=