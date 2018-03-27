/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@angular/common";
import * as i3 from "@asymmetrik/ngx-leaflet/dist/leaflet/core/leaflet.directive";
import * as i4 from "@asymmetrik/ngx-leaflet/dist/leaflet/layers/control/leaflet-control-layers.directive";
import * as i5 from "@asymmetrik/ngx-leaflet-draw/dist/leaflet-draw/core/leaflet-draw.directive";
import * as i6 from "./field-map.component";
var styles_MapComponent = [];
var RenderType_MapComponent = i0.ɵcrt({ encapsulation: 2, styles: styles_MapComponent, data: {} });
export { RenderType_MapComponent as RenderType_MapComponent };
function View_MapComponent_2(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "button", [["class", "btn btn-default"], ["type", "button"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.toggleHelp() !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), i0.ɵeld(1, 0, null, null, 0, "span", [["aria-hidden", "true"], ["class", "glyphicon glyphicon-question-sign"]], null, null, null, null, null))], null, null); }
function View_MapComponent_3(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 0, "span", [["class", "help-block"]], [[8, "id", 0], [8, "innerHTML", 1]], null, null, null, null))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = i0.ɵinlineInterpolate(1, "", ("helpBlock_" + _co.field.name), ""); var currVal_1 = _co.field.help; _ck(_v, 0, 0, currVal_0, currVal_1); }); }
function View_MapComponent_4(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "span", [["class", "text-danger"]], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["Entered text is not a valid KML or GeoJSON"]))], null, null); }
function View_MapComponent_1(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 42, "div", [["class", "form-group"]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "submit"], [null, "reset"]], function (_v, en, $event) { var ad = true; if (("submit" === en)) {
        var pd_0 = (i0.ɵnov(_v, 1).onSubmit($event) !== false);
        ad = (pd_0 && ad);
    } if (("reset" === en)) {
        var pd_1 = (i0.ɵnov(_v, 1).onReset() !== false);
        ad = (pd_1 && ad);
    } return ad; }, null, null)), i0.ɵdid(1, 540672, null, 0, i1.FormGroupDirective, [[8, null], [8, null]], { form: [0, "form"] }, null), i0.ɵprd(2048, null, i1.ControlContainer, null, [i1.FormGroupDirective]), i0.ɵdid(3, 16384, null, 0, i1.NgControlStatusGroup, [i1.ControlContainer], null, null), (_l()(), i0.ɵted(-1, null, ["\n  "])), (_l()(), i0.ɵeld(5, 0, null, null, 4, "label", [], [[1, "for", 0]], null, null, null, null)), (_l()(), i0.ɵted(6, null, ["\n    ", " ", "\n    "])), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_MapComponent_2)), i0.ɵdid(8, 16384, null, 0, i2.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵted(-1, null, ["\n  "])), (_l()(), i0.ɵeld(10, 0, null, null, 0, "br", [], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["\n  "])), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_MapComponent_3)), i0.ɵdid(13, 16384, null, 0, i2.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵted(-1, null, ["\n\n  "])), (_l()(), i0.ɵeld(15, 0, null, null, 4, "div", [["leaflet", ""], ["leafletDraw", ""], ["style", "height: 450px;"]], null, [[null, "leafletMapReady"], ["window", "resize"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("window:resize" === en)) {
        var pd_0 = (i0.ɵnov(_v, 16).onResize() !== false);
        ad = (pd_0 && ad);
    } if (("leafletMapReady" === en)) {
        var pd_1 = (_co.field.onMapReady($event) !== false);
        ad = (pd_1 && ad);
    } return ad; }, null, null)), i0.ɵdid(16, 606208, null, 0, i3.LeafletDirective, [i0.ElementRef, i0.NgZone], { options: [0, "options"] }, { mapReady: "leafletMapReady" }), i0.ɵdid(17, 475136, null, 0, i4.LeafletLayersControlDirective, [i3.LeafletDirective, i0.KeyValueDiffers, i0.NgZone], { layersControlConfig: [0, "layersControlConfig"] }, null), i0.ɵdid(18, 737280, null, 0, i5.LeafletDrawDirective, [i3.LeafletDirective], { drawOptions: [0, "drawOptions"] }, null), (_l()(), i0.ɵted(-1, null, ["\n  "])), (_l()(), i0.ɵted(-1, null, ["\n  "])), (_l()(), i0.ɵeld(21, 0, null, null, 20, "div", [["class", "padding-top-10"]], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["\n  "])), (_l()(), i0.ɵeld(23, 0, null, null, 10, "div", [], null, null, null, null, null)), (_l()(), i0.ɵeld(24, 0, null, null, 1, "label", [], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["Enter KML or GeoJSON"])), (_l()(), i0.ɵeld(26, 0, null, null, 0, "br", [], null, null, null, null, null)), (_l()(), i0.ɵeld(27, 0, null, null, 6, "textarea", [["class", "form-control"], ["rows", "5"]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"], [null, "input"], [null, "blur"], [null, "compositionstart"], [null, "compositionend"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("input" === en)) {
        var pd_0 = (i0.ɵnov(_v, 28)._handleInput($event.target.value) !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (i0.ɵnov(_v, 28).onTouched() !== false);
        ad = (pd_1 && ad);
    } if (("compositionstart" === en)) {
        var pd_2 = (i0.ɵnov(_v, 28)._compositionStart() !== false);
        ad = (pd_2 && ad);
    } if (("compositionend" === en)) {
        var pd_3 = (i0.ɵnov(_v, 28)._compositionEnd($event.target.value) !== false);
        ad = (pd_3 && ad);
    } if (("ngModelChange" === en)) {
        var pd_4 = ((_co.field.importDataString = $event) !== false);
        ad = (pd_4 && ad);
    } return ad; }, null, null)), i0.ɵdid(28, 16384, null, 0, i1.DefaultValueAccessor, [i0.Renderer2, i0.ElementRef, [2, i1.COMPOSITION_BUFFER_MODE]], null, null), i0.ɵprd(1024, null, i1.NG_VALUE_ACCESSOR, function (p0_0) { return [p0_0]; }, [i1.DefaultValueAccessor]), i0.ɵdid(30, 671744, null, 0, i1.NgModel, [[2, i1.ControlContainer], [8, null], [8, null], [2, i1.NG_VALUE_ACCESSOR]], { model: [0, "model"], options: [1, "options"] }, { update: "ngModelChange" }), i0.ɵpod(31, { standalone: 0 }), i0.ɵprd(2048, null, i1.NgControl, null, [i1.NgModel]), i0.ɵdid(33, 16384, null, 0, i1.NgControlStatus, [i1.NgControl], null, null), (_l()(), i0.ɵted(-1, null, ["\n  "])), (_l()(), i0.ɵeld(35, 0, null, null, 5, "div", [["class", "padding-top-10"]], null, null, null, null, null)), (_l()(), i0.ɵeld(36, 0, null, null, 1, "a", [["class", "btn btn-info"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.field.importData() !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), i0.ɵted(-1, null, ["Import"])), (_l()(), i0.ɵted(-1, null, [" "])), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_MapComponent_4)), i0.ɵdid(40, 16384, null, 0, i2.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵted(-1, null, ["\n"])), (_l()(), i0.ɵted(-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; var currVal_7 = _co.form; _ck(_v, 1, 0, currVal_7); var currVal_11 = _co.field.help; _ck(_v, 8, 0, currVal_11); var currVal_12 = _co.helpShow; _ck(_v, 13, 0, currVal_12); var currVal_13 = _co.field.leafletOptions; _ck(_v, 16, 0, currVal_13); var currVal_14 = _co.field.layersControl; _ck(_v, 17, 0, currVal_14); var currVal_15 = _co.field.drawOptions; _ck(_v, 18, 0, currVal_15); var currVal_23 = _co.field.importDataString; var currVal_24 = _ck(_v, 31, 0, true); _ck(_v, 30, 0, currVal_23, currVal_24); var currVal_25 = _co.field.importFailed; _ck(_v, 40, 0, currVal_25); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = i0.ɵnov(_v, 3).ngClassUntouched; var currVal_1 = i0.ɵnov(_v, 3).ngClassTouched; var currVal_2 = i0.ɵnov(_v, 3).ngClassPristine; var currVal_3 = i0.ɵnov(_v, 3).ngClassDirty; var currVal_4 = i0.ɵnov(_v, 3).ngClassValid; var currVal_5 = i0.ɵnov(_v, 3).ngClassInvalid; var currVal_6 = i0.ɵnov(_v, 3).ngClassPending; _ck(_v, 0, 0, currVal_0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6); var currVal_8 = _co.field.name; _ck(_v, 5, 0, currVal_8); var currVal_9 = _co.field.label; var currVal_10 = _co.getRequiredLabelStr(); _ck(_v, 6, 0, currVal_9, currVal_10); var currVal_16 = i0.ɵnov(_v, 33).ngClassUntouched; var currVal_17 = i0.ɵnov(_v, 33).ngClassTouched; var currVal_18 = i0.ɵnov(_v, 33).ngClassPristine; var currVal_19 = i0.ɵnov(_v, 33).ngClassDirty; var currVal_20 = i0.ɵnov(_v, 33).ngClassValid; var currVal_21 = i0.ɵnov(_v, 33).ngClassInvalid; var currVal_22 = i0.ɵnov(_v, 33).ngClassPending; _ck(_v, 27, 0, currVal_16, currVal_17, currVal_18, currVal_19, currVal_20, currVal_21, currVal_22); }); }
function View_MapComponent_5(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 6, "div", [], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["\n  "])), (_l()(), i0.ɵeld(2, 0, null, null, 3, "div", [["leaflet", ""], ["style", "height: 450px;"]], null, [[null, "leafletMapReady"], ["window", "resize"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("window:resize" === en)) {
        var pd_0 = (i0.ɵnov(_v, 3).onResize() !== false);
        ad = (pd_0 && ad);
    } if (("leafletMapReady" === en)) {
        var pd_1 = (_co.field.onMapReady($event) !== false);
        ad = (pd_1 && ad);
    } return ad; }, null, null)), i0.ɵdid(3, 606208, null, 0, i3.LeafletDirective, [i0.ElementRef, i0.NgZone], { options: [0, "options"] }, { mapReady: "leafletMapReady" }), i0.ɵdid(4, 475136, null, 0, i4.LeafletLayersControlDirective, [i3.LeafletDirective, i0.KeyValueDiffers, i0.NgZone], { layersControlConfig: [0, "layersControlConfig"] }, null), (_l()(), i0.ɵted(-1, null, ["\n  "])), (_l()(), i0.ɵted(-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.field.leafletOptions; _ck(_v, 3, 0, currVal_0); var currVal_1 = _co.field.layersControl; _ck(_v, 4, 0, currVal_1); }, null); }
export function View_MapComponent_0(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 4, "div", [["class", "padding-bottom-10"]], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["\n  "])), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_MapComponent_1)), i0.ɵdid(3, 16384, null, 0, i2.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵted(-1, null, ["\n"])), (_l()(), i0.ɵted(-1, null, ["\n"])), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_MapComponent_5)), i0.ɵdid(7, 16384, null, 0, i2.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵted(-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.field.editMode; _ck(_v, 3, 0, currVal_0); var currVal_1 = !_co.field.editMode; _ck(_v, 7, 0, currVal_1); }, null); }
export function View_MapComponent_Host_0(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "rb-mapdata", [], null, null, null, View_MapComponent_0, RenderType_MapComponent)), i0.ɵdid(1, 49152, null, 0, i6.MapComponent, [], null, null)], null, null); }
var MapComponentNgFactory = i0.ɵccf("rb-mapdata", i6.MapComponent, View_MapComponent_Host_0, { field: "field", form: "form", fieldMap: "fieldMap", index: "index", name: "name", isEmbedded: "isEmbedded" }, {}, []);
export { MapComponentNgFactory as MapComponentNgFactory };
//# sourceMappingURL=field-map.component.ngfactory.js.map