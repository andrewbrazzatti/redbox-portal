/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
import * as i0 from "@angular/core";
import * as i1 from "./field-vocab.component.ngfactory";
import * as i2 from "./field-vocab.component";
import * as i3 from "@angular/common";
import * as i4 from "./field-repeatable.component";
import * as i5 from "./field-contributor.component.ngfactory";
import * as i6 from "./field-contributor.component";
var styles_RepeatableVocabComponent = [];
var RenderType_RepeatableVocabComponent = i0.ɵcrt({ encapsulation: 2, styles: styles_RepeatableVocabComponent, data: {} });
export { RenderType_RepeatableVocabComponent as RenderType_RepeatableVocabComponent };
function View_RepeatableVocabComponent_2(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "button", [["class", "btn btn-default"], ["type", "button"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.toggleHelp() !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), i0.ɵeld(1, 0, null, null, 0, "span", [["aria-hidden", "true"], ["class", "glyphicon glyphicon-question-sign"]], null, null, null, null, null))], null, null); }
function View_RepeatableVocabComponent_3(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 0, "span", [["class", "help-block"]], [[8, "id", 0], [8, "innerHTML", 1]], null, null, null, null))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = i0.ɵinlineInterpolate(1, "", ("helpBlock_" + _co.field.name), ""); var currVal_1 = _co.field.help; _ck(_v, 0, 0, currVal_0, currVal_1); }); }
function View_RepeatableVocabComponent_4(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 7, "div", [["class", "row"]], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["\n      "])), (_l()(), i0.ɵeld(2, 0, null, null, 4, "span", [["class", "col-xs-12"]], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["\n        "])), (_l()(), i0.ɵeld(4, 0, null, null, 1, "rb-vocab", [], null, [[null, "onRemoveBtnClick"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("onRemoveBtnClick" === en)) {
        var pd_0 = (_co.removeElem($event[0], $event[1]) !== false);
        ad = (pd_0 && ad);
    } return ad; }, i1.View_VocabFieldComponent_0, i1.RenderType_VocabFieldComponent)), i0.ɵdid(5, 49152, null, 0, i2.VocabFieldComponent, [], { field: [0, "field"], form: [1, "form"], fieldMap: [2, "fieldMap"], index: [3, "index"], isEmbedded: [4, "isEmbedded"], canRemove: [5, "canRemove"], removeBtnText: [6, "removeBtnText"], removeBtnClass: [7, "removeBtnClass"] }, { onRemoveBtnClick: "onRemoveBtnClick" }), (_l()(), i0.ɵted(-1, null, ["\n      "])), (_l()(), i0.ɵted(-1, null, ["\n    "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _v.context.$implicit; var currVal_1 = _co.form; var currVal_2 = _co.fieldMap; var currVal_3 = _v.context.index; var currVal_4 = true; var currVal_5 = (_co.field.fields.length > 1); var currVal_6 = _co.field.removeButtonText; var currVal_7 = _co.field.removeButtonClass; _ck(_v, 5, 0, currVal_0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7); }, null); }
function View_RepeatableVocabComponent_5(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 2, "button", [["type", "button"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.addElem($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), i0.ɵdid(1, 278528, null, 0, i3.NgClass, [i0.IterableDiffers, i0.KeyValueDiffers, i0.ElementRef, i0.Renderer2], { ngClass: [0, "ngClass"] }, null), (_l()(), i0.ɵted(2, null, ["", ""]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.field.addButtonTextClass; _ck(_v, 1, 0, currVal_0); }, function (_ck, _v) { var _co = _v.component; var currVal_1 = _co.field.addButtonText; _ck(_v, 2, 0, currVal_1); }); }
function View_RepeatableVocabComponent_6(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "button", [["type", "button"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.addElem($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), i0.ɵdid(1, 278528, null, 0, i3.NgClass, [i0.IterableDiffers, i0.KeyValueDiffers, i0.ElementRef, i0.Renderer2], { ngClass: [0, "ngClass"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.field.addButtonClass; _ck(_v, 1, 0, currVal_0); }, null); }
function View_RepeatableVocabComponent_1(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 34, "div", [], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["\n    "])), (_l()(), i0.ɵeld(2, 0, null, null, 13, "div", [["class", "row"]], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["\n      "])), (_l()(), i0.ɵeld(4, 0, null, null, 10, "div", [["class", "col-xs-12"]], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["\n      "])), (_l()(), i0.ɵeld(6, 0, null, null, 4, "label", [], null, null, null, null, null)), (_l()(), i0.ɵted(7, null, ["", "\n        "])), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_RepeatableVocabComponent_2)), i0.ɵdid(9, 16384, null, 0, i3.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵted(-1, null, ["\n      "])), (_l()(), i0.ɵted(-1, null, ["\n      "])), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_RepeatableVocabComponent_3)), i0.ɵdid(13, 16384, null, 0, i3.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵted(-1, null, ["\n      "])), (_l()(), i0.ɵted(-1, null, ["\n    "])), (_l()(), i0.ɵted(-1, null, ["\n    "])), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_RepeatableVocabComponent_4)), i0.ɵdid(18, 802816, null, 0, i3.NgForOf, [i0.ViewContainerRef, i0.TemplateRef, i0.IterableDiffers], { ngForOf: [0, "ngForOf"] }, null), (_l()(), i0.ɵted(-1, null, ["\n    "])), (_l()(), i0.ɵeld(20, 0, null, null, 13, "div", [["class", "row"]], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["\n      "])), (_l()(), i0.ɵeld(22, 0, null, null, 1, "span", [["class", "col-xs-11"]], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["\u00A0\n      "])), (_l()(), i0.ɵted(-1, null, ["\n      "])), (_l()(), i0.ɵeld(25, 0, null, null, 7, "span", [["class", "col-xs-1"]], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["\n        "])), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_RepeatableVocabComponent_5)), i0.ɵdid(28, 16384, null, 0, i3.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵted(-1, null, ["\n        "])), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_RepeatableVocabComponent_6)), i0.ɵdid(31, 16384, null, 0, i3.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵted(-1, null, ["\n      "])), (_l()(), i0.ɵted(-1, null, ["\n    "])), (_l()(), i0.ɵted(-1, null, ["\n  "]))], function (_ck, _v) { var _co = _v.component; var currVal_1 = _co.field.help; _ck(_v, 9, 0, currVal_1); var currVal_2 = _co.helpShow; _ck(_v, 13, 0, currVal_2); var currVal_3 = _co.field.fields; _ck(_v, 18, 0, currVal_3); var currVal_4 = _co.field.addButtonText; _ck(_v, 28, 0, currVal_4); var currVal_5 = !_co.field.addButtonText; _ck(_v, 31, 0, currVal_5); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.field.label; _ck(_v, 7, 0, currVal_0); }); }
function View_RepeatableVocabComponent_8(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "span", [["class", "key"]], null, null, null, null, null)), (_l()(), i0.ɵted(1, null, ["", ""]))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.field.label; _ck(_v, 1, 0, currVal_0); }); }
function View_RepeatableVocabComponent_9(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "rb-vocab", [], null, null, null, i1.View_VocabFieldComponent_0, i1.RenderType_VocabFieldComponent)), i0.ɵdid(1, 49152, null, 0, i2.VocabFieldComponent, [], { field: [0, "field"], form: [1, "form"], fieldMap: [2, "fieldMap"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _v.context.$implicit; var currVal_1 = _co.form; var currVal_2 = _co.fieldMap; _ck(_v, 1, 0, currVal_0, currVal_1, currVal_2); }, null); }
function View_RepeatableVocabComponent_7(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 13, "li", [["class", "key-value-pair"]], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["\n    "])), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_RepeatableVocabComponent_8)), i0.ɵdid(3, 16384, null, 0, i3.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵted(-1, null, ["\n    "])), (_l()(), i0.ɵeld(5, 0, null, null, 7, "span", [["class", "value"]], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["\n      "])), (_l()(), i0.ɵeld(7, 0, null, null, 4, "ul", [["class", "key-value-list"]], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["\n        "])), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_RepeatableVocabComponent_9)), i0.ɵdid(10, 802816, null, 0, i3.NgForOf, [i0.ViewContainerRef, i0.TemplateRef, i0.IterableDiffers], { ngForOf: [0, "ngForOf"] }, null), (_l()(), i0.ɵted(-1, null, ["\n      "])), (_l()(), i0.ɵted(-1, null, ["\n    "])), (_l()(), i0.ɵted(-1, null, ["\n  "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.field.label; _ck(_v, 3, 0, currVal_0); var currVal_1 = _co.field.fields; _ck(_v, 10, 0, currVal_1); }, null); }
export function View_RepeatableVocabComponent_0(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵted(-1, null, ["\n  "])), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_RepeatableVocabComponent_1)), i0.ɵdid(2, 16384, null, 0, i3.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵted(-1, null, ["\n  "])), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_RepeatableVocabComponent_7)), i0.ɵdid(5, 16384, null, 0, i3.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵted(-1, null, ["\n  "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.field.editMode; _ck(_v, 2, 0, currVal_0); var currVal_1 = !_co.field.editMode; _ck(_v, 5, 0, currVal_1); }, null); }
export function View_RepeatableVocabComponent_Host_0(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "repeatable-vocab", [], null, null, null, View_RepeatableVocabComponent_0, RenderType_RepeatableVocabComponent)), i0.ɵdid(1, 49152, null, 0, i4.RepeatableVocabComponent, [], null, null)], null, null); }
var RepeatableVocabComponentNgFactory = i0.ɵccf("repeatable-vocab", i4.RepeatableVocabComponent, View_RepeatableVocabComponent_Host_0, { field: "field", form: "form", fieldMap: "fieldMap", index: "index", name: "name", isEmbedded: "isEmbedded" }, {}, []);
export { RepeatableVocabComponentNgFactory as RepeatableVocabComponentNgFactory };
var styles_RepeatableContributorComponent = [];
var RenderType_RepeatableContributorComponent = i0.ɵcrt({ encapsulation: 2, styles: styles_RepeatableContributorComponent, data: {} });
export { RenderType_RepeatableContributorComponent as RenderType_RepeatableContributorComponent };
function View_RepeatableContributorComponent_3(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 4, "button", [["type", "button"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.removeElem($event, _v.parent.context.index) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), i0.ɵdid(1, 278528, null, 0, i3.NgClass, [i0.IterableDiffers, i0.KeyValueDiffers, i0.ElementRef, i0.Renderer2], { ngClass: [0, "ngClass"] }, null), i0.ɵdid(2, 278528, null, 0, i3.NgStyle, [i0.KeyValueDiffers, i0.ElementRef, i0.Renderer2], { ngStyle: [0, "ngStyle"] }, null), i0.ɵpod(3, { "margin-top": 0 }), (_l()(), i0.ɵted(4, null, ["", ""]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.field.removeButtonTextClass; _ck(_v, 1, 0, currVal_0); var currVal_1 = _ck(_v, 3, 0, _v.parent.context.$implicit.marginTop); _ck(_v, 2, 0, currVal_1); }, function (_ck, _v) { var _co = _v.component; var currVal_2 = _co.field.removeButtonText; _ck(_v, 4, 0, currVal_2); }); }
function View_RepeatableContributorComponent_4(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 3, "button", [["type", "button"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.removeElem($event, _v.parent.context.index) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), i0.ɵdid(1, 278528, null, 0, i3.NgClass, [i0.IterableDiffers, i0.KeyValueDiffers, i0.ElementRef, i0.Renderer2], { ngClass: [0, "ngClass"] }, null), i0.ɵdid(2, 278528, null, 0, i3.NgStyle, [i0.KeyValueDiffers, i0.ElementRef, i0.Renderer2], { ngStyle: [0, "ngStyle"] }, null), i0.ɵpod(3, { "margin-top": 0 })], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.field.removeButtonClass; _ck(_v, 1, 0, currVal_0); var currVal_1 = _ck(_v, 3, 0, _v.parent.context.$implicit.marginTop); _ck(_v, 2, 0, currVal_1); }, null); }
function View_RepeatableContributorComponent_2(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 16, "div", [["class", "row"]], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["\n      "])), (_l()(), i0.ɵeld(2, 0, null, null, 4, "span", [["class", "col-xs-10"]], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["\n        "])), (_l()(), i0.ɵeld(4, 0, null, null, 1, "rb-contributor", [], null, null, null, i5.View_ContributorComponent_0, i5.RenderType_ContributorComponent)), i0.ɵdid(5, 49152, null, 0, i6.ContributorComponent, [], { field: [0, "field"], form: [1, "form"], fieldMap: [2, "fieldMap"], isEmbedded: [3, "isEmbedded"] }, null), (_l()(), i0.ɵted(-1, null, ["\n      "])), (_l()(), i0.ɵted(-1, null, ["\n      "])), (_l()(), i0.ɵeld(8, 0, null, null, 7, "span", [["class", "col-xs-2"]], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["\n        "])), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_RepeatableContributorComponent_3)), i0.ɵdid(11, 16384, null, 0, i3.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵted(-1, null, ["\n        "])), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_RepeatableContributorComponent_4)), i0.ɵdid(14, 16384, null, 0, i3.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵted(-1, null, ["\n      "])), (_l()(), i0.ɵted(-1, null, ["\n    "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _v.context.$implicit; var currVal_1 = _co.form; var currVal_2 = _co.fieldMap; var currVal_3 = true; _ck(_v, 5, 0, currVal_0, currVal_1, currVal_2, currVal_3); var currVal_4 = ((_co.field.fields.length > 1) && _co.field.removeButtonText); _ck(_v, 11, 0, currVal_4); var currVal_5 = ((_co.field.fields.length > 1) && !_co.field.removeButtonText); _ck(_v, 14, 0, currVal_5); }, null); }
function View_RepeatableContributorComponent_5(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 2, "button", [["type", "button"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.addElem($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), i0.ɵdid(1, 278528, null, 0, i3.NgClass, [i0.IterableDiffers, i0.KeyValueDiffers, i0.ElementRef, i0.Renderer2], { ngClass: [0, "ngClass"] }, null), (_l()(), i0.ɵted(2, null, ["", ""]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.field.addButtonTextClass; _ck(_v, 1, 0, currVal_0); }, function (_ck, _v) { var _co = _v.component; var currVal_1 = _co.field.addButtonText; _ck(_v, 2, 0, currVal_1); }); }
function View_RepeatableContributorComponent_6(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "button", [["type", "button"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.addElem($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), i0.ɵdid(1, 278528, null, 0, i3.NgClass, [i0.IterableDiffers, i0.KeyValueDiffers, i0.ElementRef, i0.Renderer2], { ngClass: [0, "ngClass"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.field.addButtonClass; _ck(_v, 1, 0, currVal_0); }, null); }
function View_RepeatableContributorComponent_1(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 16, "div", [], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["\n    "])), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_RepeatableContributorComponent_2)), i0.ɵdid(3, 802816, null, 0, i3.NgForOf, [i0.ViewContainerRef, i0.TemplateRef, i0.IterableDiffers], { ngForOf: [0, "ngForOf"] }, null), (_l()(), i0.ɵted(-1, null, ["\n    "])), (_l()(), i0.ɵeld(5, 0, null, null, 10, "div", [["class", "row"]], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["\n      "])), (_l()(), i0.ɵeld(7, 0, null, null, 7, "span", [["class", "col-xs-12"]], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["\n        "])), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_RepeatableContributorComponent_5)), i0.ɵdid(10, 16384, null, 0, i3.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵted(-1, null, ["\n        "])), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_RepeatableContributorComponent_6)), i0.ɵdid(13, 16384, null, 0, i3.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵted(-1, null, ["\n      "])), (_l()(), i0.ɵted(-1, null, ["\n    "])), (_l()(), i0.ɵted(-1, null, ["\n  "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.field.fields; _ck(_v, 3, 0, currVal_0); var currVal_1 = _co.field.addButtonText; _ck(_v, 10, 0, currVal_1); var currVal_2 = !_co.field.addButtonText; _ck(_v, 13, 0, currVal_2); }, null); }
function View_RepeatableContributorComponent_8(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 10, "tr", [], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["\n          "])), (_l()(), i0.ɵeld(2, 0, null, null, 1, "td", [], null, null, null, null, null)), (_l()(), i0.ɵted(3, null, ["", ""])), (_l()(), i0.ɵted(-1, null, ["\n          "])), (_l()(), i0.ɵeld(5, 0, null, null, 1, "td", [], null, null, null, null, null)), (_l()(), i0.ɵted(6, null, ["", ""])), (_l()(), i0.ɵted(-1, null, ["\n          "])), (_l()(), i0.ɵeld(8, 0, null, null, 1, "td", [], null, null, null, null, null)), (_l()(), i0.ɵted(9, null, ["", ""])), (_l()(), i0.ɵted(-1, null, ["\n        "]))], null, function (_ck, _v) { var currVal_0 = _v.context.$implicit.value.name; _ck(_v, 3, 0, currVal_0); var currVal_1 = _v.context.$implicit.value.email; _ck(_v, 6, 0, currVal_1); var currVal_2 = _v.context.$implicit.value.role; _ck(_v, 9, 0, currVal_2); }); }
function View_RepeatableContributorComponent_7(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 18, "div", [["class", "table-responsive"]], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["\n    "])), (_l()(), i0.ɵeld(2, 0, null, null, 15, "table", [["class", "table table-striped table-condensed"]], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["\n      "])), (_l()(), i0.ɵeld(4, 0, null, null, 6, "thead", [], null, null, null, null, null)), (_l()(), i0.ɵeld(5, 0, null, null, 1, "th", [], null, null, null, null, null)), (_l()(), i0.ɵted(6, null, ["", ""])), (_l()(), i0.ɵeld(7, 0, null, null, 1, "th", [], null, null, null, null, null)), (_l()(), i0.ɵted(8, null, ["", ""])), (_l()(), i0.ɵeld(9, 0, null, null, 1, "th", [], null, null, null, null, null)), (_l()(), i0.ɵted(10, null, ["", ""])), (_l()(), i0.ɵted(-1, null, ["\n      "])), (_l()(), i0.ɵeld(12, 0, null, null, 4, "tbody", [], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["\n        "])), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_RepeatableContributorComponent_8)), i0.ɵdid(15, 802816, null, 0, i3.NgForOf, [i0.ViewContainerRef, i0.TemplateRef, i0.IterableDiffers], { ngForOf: [0, "ngForOf"] }, null), (_l()(), i0.ɵted(-1, null, ["\n      "])), (_l()(), i0.ɵted(-1, null, ["\n    "])), (_l()(), i0.ɵted(-1, null, ["\n  "]))], function (_ck, _v) { var _co = _v.component; var currVal_3 = _co.field.fields; _ck(_v, 15, 0, currVal_3); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.field.fields[0].nameColHdr; _ck(_v, 6, 0, currVal_0); var currVal_1 = _co.field.fields[0].emailColHdr; _ck(_v, 8, 0, currVal_1); var currVal_2 = _co.field.fields[0].roleColHdr; _ck(_v, 10, 0, currVal_2); }); }
export function View_RepeatableContributorComponent_0(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵted(-1, null, ["\n  "])), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_RepeatableContributorComponent_1)), i0.ɵdid(2, 16384, null, 0, i3.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵted(-1, null, ["\n  "])), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_RepeatableContributorComponent_7)), i0.ɵdid(5, 16384, null, 0, i3.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵted(-1, null, ["\n  "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.field.editMode; _ck(_v, 2, 0, currVal_0); var currVal_1 = !_co.field.editMode; _ck(_v, 5, 0, currVal_1); }, null); }
export function View_RepeatableContributorComponent_Host_0(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "repeatable-contributor", [], null, null, null, View_RepeatableContributorComponent_0, RenderType_RepeatableContributorComponent)), i0.ɵdid(1, 114688, null, 0, i4.RepeatableContributorComponent, [], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var RepeatableContributorComponentNgFactory = i0.ɵccf("repeatable-contributor", i4.RepeatableContributorComponent, View_RepeatableContributorComponent_Host_0, { field: "field", form: "form", fieldMap: "fieldMap", index: "index", name: "name", isEmbedded: "isEmbedded" }, {}, []);
export { RepeatableContributorComponentNgFactory as RepeatableContributorComponentNgFactory };
//# sourceMappingURL=field-repeatable.component.ngfactory.js.map