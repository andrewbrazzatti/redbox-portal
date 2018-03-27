/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "../../../../node_modules/ng2-completer/components/completer-cmp.ngfactory";
import * as i4 from "ng2-completer/components/completer-cmp";
import * as i5 from "ng2-completer/services/completer-service";
import * as i6 from "./field-vocab.component";
var styles_VocabFieldComponent = [];
var RenderType_VocabFieldComponent = i0.ɵcrt({ encapsulation: 2, styles: styles_VocabFieldComponent, data: {} });
export { RenderType_VocabFieldComponent as RenderType_VocabFieldComponent };
function View_VocabFieldComponent_2(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "button", [["class", "btn btn-default"], ["type", "button"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.toggleHelp() !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), i0.ɵeld(1, 0, null, null, 0, "span", [["aria-hidden", "true"], ["class", "glyphicon glyphicon-question-sign"]], null, null, null, null, null))], null, null); }
function View_VocabFieldComponent_3(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "span", [["class", "help-block"]], [[8, "id", 0]], null, null, null, null)), (_l()(), i0.ɵted(1, null, ["", ""]))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = i0.ɵinlineInterpolate(1, "", ("helpBlock_" + _co.field.name), ""); _ck(_v, 0, 0, currVal_0); var currVal_1 = _co.field.help; _ck(_v, 1, 0, currVal_1); }); }
function View_VocabFieldComponent_4(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "div", [["class", "text-danger"]], null, null, null, null, null)), (_l()(), i0.ɵted(1, null, ["", ""]))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.field.validationMessages.required; _ck(_v, 1, 0, currVal_0); }); }
function View_VocabFieldComponent_1(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 25, "div", [], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "submit"], [null, "reset"]], function (_v, en, $event) { var ad = true; if (("submit" === en)) {
        var pd_0 = (i0.ɵnov(_v, 2).onSubmit($event) !== false);
        ad = (pd_0 && ad);
    } if (("reset" === en)) {
        var pd_1 = (i0.ɵnov(_v, 2).onReset() !== false);
        ad = (pd_1 && ad);
    } return ad; }, null, null)), i0.ɵdid(1, 278528, null, 0, i1.NgClass, [i0.IterableDiffers, i0.KeyValueDiffers, i0.ElementRef, i0.Renderer2], { ngClass: [0, "ngClass"] }, null), i0.ɵdid(2, 540672, null, 0, i2.FormGroupDirective, [[8, null], [8, null]], { form: [0, "form"] }, null), i0.ɵprd(2048, null, i2.ControlContainer, null, [i2.FormGroupDirective]), i0.ɵdid(4, 16384, null, 0, i2.NgControlStatusGroup, [i2.ControlContainer], null, null), (_l()(), i0.ɵted(-1, null, ["\n    "])), (_l()(), i0.ɵeld(6, 0, null, null, 4, "label", [], null, null, null, null, null)), (_l()(), i0.ɵted(7, null, ["\n      ", " ", "\n      "])), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_VocabFieldComponent_2)), i0.ɵdid(9, 16384, null, 0, i1.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵted(-1, null, ["\n    "])), (_l()(), i0.ɵted(-1, null, ["\n    "])), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_VocabFieldComponent_3)), i0.ɵdid(13, 16384, null, 0, i1.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵted(-1, null, ["\n    "])), (_l()(), i0.ɵeld(15, 0, null, null, 6, "ng2-completer", [], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"], [null, "keyup"], [null, "selected"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("ngModelChange" === en)) {
        var pd_0 = ((_co.searchStr = $event) !== false);
        ad = (pd_0 && ad);
    } if (("keyup" === en)) {
        var pd_1 = (_co.onKeyup($event) !== false);
        ad = (pd_1 && ad);
    } if (("selected" === en)) {
        var pd_2 = (_co.onSelect($event) !== false);
        ad = (pd_2 && ad);
    } return ad; }, i3.View_CompleterCmp_0, i3.RenderType_CompleterCmp)), i0.ɵdid(16, 12697600, null, 0, i4.CompleterCmp, [i5.CompleterService], { minSearchLength: [0, "minSearchLength"], clearUnselected: [1, "clearUnselected"], placeholder: [2, "placeholder"], disableInput: [3, "disableInput"], inputClass: [4, "inputClass"], initialValue: [5, "initialValue"], datasource: [6, "datasource"] }, { selected: "selected", keyup: "keyup" }), i0.ɵprd(1024, null, i2.NG_VALUE_ACCESSOR, function (p0_0) { return [p0_0]; }, [i4.CompleterCmp]), i0.ɵdid(18, 671744, null, 0, i2.NgModel, [[2, i2.ControlContainer], [8, null], [8, null], [2, i2.NG_VALUE_ACCESSOR]], { model: [0, "model"], options: [1, "options"] }, { update: "ngModelChange" }), i0.ɵpod(19, { standalone: 0 }), i0.ɵprd(2048, null, i2.NgControl, null, [i2.NgModel]), i0.ɵdid(21, 16384, null, 0, i2.NgControlStatus, [i2.NgControl], null, null), (_l()(), i0.ɵted(-1, null, ["\n    "])), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_VocabFieldComponent_4)), i0.ɵdid(24, 16384, null, 0, i1.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵted(-1, null, ["\n  "]))], function (_ck, _v) { var _co = _v.component; var currVal_7 = _co.getGroupClass(); _ck(_v, 1, 0, currVal_7); var currVal_8 = _co.form; _ck(_v, 2, 0, currVal_8); var currVal_11 = _co.field.help; _ck(_v, 9, 0, currVal_11); var currVal_12 = _co.helpShow; _ck(_v, 13, 0, currVal_12); var currVal_20 = 0; var currVal_21 = (_co.disableEditAfterSelect && _co.field.disableEditAfterSelect); var currVal_22 = _co.field.placeHolder; var currVal_23 = _co.disableInput; var currVal_24 = "form-control"; var currVal_25 = _co.field.initialValue; var currVal_26 = _co.field.dataService; _ck(_v, 16, 0, currVal_20, currVal_21, currVal_22, currVal_23, currVal_24, currVal_25, currVal_26); var currVal_27 = _co.searchStr; var currVal_28 = _ck(_v, 19, 0, true); _ck(_v, 18, 0, currVal_27, currVal_28); var currVal_29 = _co.hasRequiredError(); _ck(_v, 24, 0, currVal_29); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = i0.ɵnov(_v, 4).ngClassUntouched; var currVal_1 = i0.ɵnov(_v, 4).ngClassTouched; var currVal_2 = i0.ɵnov(_v, 4).ngClassPristine; var currVal_3 = i0.ɵnov(_v, 4).ngClassDirty; var currVal_4 = i0.ɵnov(_v, 4).ngClassValid; var currVal_5 = i0.ɵnov(_v, 4).ngClassInvalid; var currVal_6 = i0.ɵnov(_v, 4).ngClassPending; _ck(_v, 0, 0, currVal_0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6); var currVal_9 = _co.field.label; var currVal_10 = _co.getRequiredLabelStr(); _ck(_v, 7, 0, currVal_9, currVal_10); var currVal_13 = i0.ɵnov(_v, 21).ngClassUntouched; var currVal_14 = i0.ɵnov(_v, 21).ngClassTouched; var currVal_15 = i0.ɵnov(_v, 21).ngClassPristine; var currVal_16 = i0.ɵnov(_v, 21).ngClassDirty; var currVal_17 = i0.ɵnov(_v, 21).ngClassValid; var currVal_18 = i0.ɵnov(_v, 21).ngClassInvalid; var currVal_19 = i0.ɵnov(_v, 21).ngClassPending; _ck(_v, 15, 0, currVal_13, currVal_14, currVal_15, currVal_16, currVal_17, currVal_18, currVal_19); }); }
function View_VocabFieldComponent_6(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "span", [["class", "help-block"]], [[8, "id", 0]], null, null, null, null)), (_l()(), i0.ɵted(1, null, ["", ""]))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = i0.ɵinlineInterpolate(1, "", ("helpBlock_" + _co.field.name), ""); _ck(_v, 0, 0, currVal_0); var currVal_1 = _co.field.help; _ck(_v, 1, 0, currVal_1); }); }
function View_VocabFieldComponent_7(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 2, "button", [["type", "button"]], [[8, "disabled", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.onRemove($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), i0.ɵdid(1, 278528, null, 0, i1.NgClass, [i0.IterableDiffers, i0.KeyValueDiffers, i0.ElementRef, i0.Renderer2], { ngClass: [0, "ngClass"] }, null), (_l()(), i0.ɵted(2, null, ["", ""]))], function (_ck, _v) { var _co = _v.component; var currVal_1 = _co.removeBtnClass; _ck(_v, 1, 0, currVal_1); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = !_co.canRemove; _ck(_v, 0, 0, currVal_0); var currVal_2 = _co.removeBtnText; _ck(_v, 2, 0, currVal_2); }); }
function View_VocabFieldComponent_8(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "div", [["class", "col-xs-12 text-danger"]], null, null, null, null, null)), (_l()(), i0.ɵted(1, null, ["", ""]))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.field.validationMessages.required; _ck(_v, 1, 0, currVal_0); }); }
function View_VocabFieldComponent_5(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 37, "div", [], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "submit"], [null, "reset"]], function (_v, en, $event) { var ad = true; if (("submit" === en)) {
        var pd_0 = (i0.ɵnov(_v, 2).onSubmit($event) !== false);
        ad = (pd_0 && ad);
    } if (("reset" === en)) {
        var pd_1 = (i0.ɵnov(_v, 2).onReset() !== false);
        ad = (pd_1 && ad);
    } return ad; }, null, null)), i0.ɵdid(1, 278528, null, 0, i1.NgClass, [i0.IterableDiffers, i0.KeyValueDiffers, i0.ElementRef, i0.Renderer2], { ngClass: [0, "ngClass"] }, null), i0.ɵdid(2, 540672, null, 0, i2.FormGroupDirective, [[8, null], [8, null]], { form: [0, "form"] }, null), i0.ɵprd(2048, null, i2.ControlContainer, null, [i2.FormGroupDirective]), i0.ɵdid(4, 16384, null, 0, i2.NgControlStatusGroup, [i2.ControlContainer], null, null), (_l()(), i0.ɵted(-1, null, ["\n    "])), (_l()(), i0.ɵeld(6, 0, null, null, 24, "div", [["class", "row"]], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["\n      "])), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_VocabFieldComponent_6)), i0.ɵdid(9, 16384, null, 0, i1.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵted(-1, null, ["\n      "])), (_l()(), i0.ɵeld(11, 0, null, null, 9, "div", [["class", "col-xs-11 padding-remove"]], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["\n        "])), (_l()(), i0.ɵeld(13, 0, null, null, 6, "ng2-completer", [], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"], [null, "keyup"], [null, "selected"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("ngModelChange" === en)) {
        var pd_0 = ((_co.searchStr = $event) !== false);
        ad = (pd_0 && ad);
    } if (("keyup" === en)) {
        var pd_1 = (_co.onKeyup($event) !== false);
        ad = (pd_1 && ad);
    } if (("selected" === en)) {
        var pd_2 = (_co.onSelect($event) !== false);
        ad = (pd_2 && ad);
    } return ad; }, i3.View_CompleterCmp_0, i3.RenderType_CompleterCmp)), i0.ɵdid(14, 12697600, null, 0, i4.CompleterCmp, [i5.CompleterService], { minSearchLength: [0, "minSearchLength"], clearUnselected: [1, "clearUnselected"], placeholder: [2, "placeholder"], disableInput: [3, "disableInput"], inputClass: [4, "inputClass"], initialValue: [5, "initialValue"], datasource: [6, "datasource"] }, { selected: "selected", keyup: "keyup" }), i0.ɵprd(1024, null, i2.NG_VALUE_ACCESSOR, function (p0_0) { return [p0_0]; }, [i4.CompleterCmp]), i0.ɵdid(16, 671744, null, 0, i2.NgModel, [[2, i2.ControlContainer], [8, null], [8, null], [2, i2.NG_VALUE_ACCESSOR]], { model: [0, "model"], options: [1, "options"] }, { update: "ngModelChange" }), i0.ɵpod(17, { standalone: 0 }), i0.ɵprd(2048, null, i2.NgControl, null, [i2.NgModel]), i0.ɵdid(19, 16384, null, 0, i2.NgControlStatus, [i2.NgControl], null, null), (_l()(), i0.ɵted(-1, null, ["\n      "])), (_l()(), i0.ɵted(-1, null, ["\n      "])), (_l()(), i0.ɵeld(22, 0, null, null, 7, "div", [["class", "col-xs-1 padding-remove"]], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["\n        "])), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_VocabFieldComponent_7)), i0.ɵdid(25, 16384, null, 0, i1.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵted(-1, null, ["\n        "])), (_l()(), i0.ɵeld(27, 0, null, null, 1, "button", [["type", "button"]], [[8, "disabled", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.onRemove($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), i0.ɵdid(28, 278528, null, 0, i1.NgClass, [i0.IterableDiffers, i0.KeyValueDiffers, i0.ElementRef, i0.Renderer2], { ngClass: [0, "ngClass"] }, null), (_l()(), i0.ɵted(-1, null, ["\n      "])), (_l()(), i0.ɵted(-1, null, ["\n    "])), (_l()(), i0.ɵted(-1, null, ["\n    "])), (_l()(), i0.ɵeld(32, 0, null, null, 4, "div", [["class", "row"]], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["\n      "])), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_VocabFieldComponent_8)), i0.ɵdid(35, 16384, null, 0, i1.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵted(-1, null, ["\n    "])), (_l()(), i0.ɵted(-1, null, ["\n  "]))], function (_ck, _v) { var _co = _v.component; var currVal_7 = _co.getGroupClass(); _ck(_v, 1, 0, currVal_7); var currVal_8 = _co.form; _ck(_v, 2, 0, currVal_8); var currVal_9 = _co.helpShow; _ck(_v, 9, 0, currVal_9); var currVal_17 = 0; var currVal_18 = (_co.disableEditAfterSelect && _co.field.disableEditAfterSelect); var currVal_19 = _co.field.placeHolder; var currVal_20 = _co.disableInput; var currVal_21 = "form-control"; var currVal_22 = _co.field.initialValue; var currVal_23 = _co.field.dataService; _ck(_v, 14, 0, currVal_17, currVal_18, currVal_19, currVal_20, currVal_21, currVal_22, currVal_23); var currVal_24 = _co.searchStr; var currVal_25 = _ck(_v, 17, 0, true); _ck(_v, 16, 0, currVal_24, currVal_25); var currVal_26 = _co.removeBtnText; _ck(_v, 25, 0, currVal_26); var currVal_28 = _co.removeBtnClass; _ck(_v, 28, 0, currVal_28); var currVal_29 = _co.hasRequiredError(); _ck(_v, 35, 0, currVal_29); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = i0.ɵnov(_v, 4).ngClassUntouched; var currVal_1 = i0.ɵnov(_v, 4).ngClassTouched; var currVal_2 = i0.ɵnov(_v, 4).ngClassPristine; var currVal_3 = i0.ɵnov(_v, 4).ngClassDirty; var currVal_4 = i0.ɵnov(_v, 4).ngClassValid; var currVal_5 = i0.ɵnov(_v, 4).ngClassInvalid; var currVal_6 = i0.ɵnov(_v, 4).ngClassPending; _ck(_v, 0, 0, currVal_0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6); var currVal_10 = i0.ɵnov(_v, 19).ngClassUntouched; var currVal_11 = i0.ɵnov(_v, 19).ngClassTouched; var currVal_12 = i0.ɵnov(_v, 19).ngClassPristine; var currVal_13 = i0.ɵnov(_v, 19).ngClassDirty; var currVal_14 = i0.ɵnov(_v, 19).ngClassValid; var currVal_15 = i0.ɵnov(_v, 19).ngClassInvalid; var currVal_16 = i0.ɵnov(_v, 19).ngClassPending; _ck(_v, 13, 0, currVal_10, currVal_11, currVal_12, currVal_13, currVal_14, currVal_15, currVal_16); var currVal_27 = !_co.canRemove; _ck(_v, 27, 0, currVal_27); }); }
function View_VocabFieldComponent_10(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "span", [["class", "key"]], null, null, null, null, null)), (_l()(), i0.ɵted(1, null, ["", ""]))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.field.label; _ck(_v, 1, 0, currVal_0); }); }
function View_VocabFieldComponent_9(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 7, "li", [["class", "key-value-pair"]], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["\n    "])), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_VocabFieldComponent_10)), i0.ɵdid(3, 16384, null, 0, i1.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵted(-1, null, ["\n    "])), (_l()(), i0.ɵeld(5, 0, null, null, 1, "span", [["class", "value"]], null, null, null, null, null)), (_l()(), i0.ɵted(6, null, ["", ""])), (_l()(), i0.ɵted(-1, null, ["\n  "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.field.label; _ck(_v, 3, 0, currVal_0); }, function (_ck, _v) { var _co = _v.component; var currVal_1 = _co.field.getTitle(_co.field.value); _ck(_v, 6, 0, currVal_1); }); }
export function View_VocabFieldComponent_0(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵted(-1, null, ["\n  "])), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_VocabFieldComponent_1)), i0.ɵdid(2, 16384, null, 0, i1.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵted(-1, null, ["\n  "])), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_VocabFieldComponent_5)), i0.ɵdid(5, 16384, null, 0, i1.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵted(-1, null, ["\n\n  "])), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_VocabFieldComponent_9)), i0.ɵdid(8, 16384, null, 0, i1.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵted(-1, null, ["\n  "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = (_co.field.editMode && !_co.isEmbedded); _ck(_v, 2, 0, currVal_0); var currVal_1 = (_co.field.editMode && _co.isEmbedded); _ck(_v, 5, 0, currVal_1); var currVal_2 = !_co.field.editMode; _ck(_v, 8, 0, currVal_2); }, null); }
export function View_VocabFieldComponent_Host_0(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "rb-vocab", [], null, null, null, View_VocabFieldComponent_0, RenderType_VocabFieldComponent)), i0.ɵdid(1, 49152, null, 0, i6.VocabFieldComponent, [], null, null)], null, null); }
var VocabFieldComponentNgFactory = i0.ɵccf("rb-vocab", i6.VocabFieldComponent, View_VocabFieldComponent_Host_0, { field: "field", form: "form", fieldMap: "fieldMap", index: "index", name: "name", isEmbedded: "isEmbedded", canRemove: "canRemove", removeBtnText: "removeBtnText", removeBtnClass: "removeBtnClass", disableEditAfterSelect: "disableEditAfterSelect" }, { onRemoveBtnClick: "onRemoveBtnClick" }, []);
export { VocabFieldComponentNgFactory as VocabFieldComponentNgFactory };
//# sourceMappingURL=field-vocab.component.ngfactory.js.map