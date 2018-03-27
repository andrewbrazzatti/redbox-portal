"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var field_simple_1 = require("./field-simple");
var field_textfield_component_1 = require("./field-textfield.component");
var field_simple_component_1 = require("./field-simple.component");
var field_vocab_component_1 = require("./field-vocab.component");
var field_repeatable_component_1 = require("./field-repeatable.component");
var field_contributor_component_1 = require("./field-contributor.component");
var workflow_button_component_1 = require("./workflow-button.component");
var field_relatedobjectdata_component_1 = require("./field-relatedobjectdata.component");
var field_map_component_1 = require("./field-map.component");
var _ = require("lodash-es");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/of");
require("rxjs/add/operator/mergeMap");
require("rxjs/add/operator/last");
require("rxjs/add/observable/from");
var ng2_completer_1 = require("ng2-completer");
var config_service_1 = require("../config-service");
var translation_service_1 = require("../translation-service");
var util_service_1 = require("../util-service");
var field_group_component_1 = require("./field-group.component");
var FieldControlService = (function () {
    function FieldControlService(vocabFieldLookupService, completerService, configService, translationService, utilityService, app) {
        this.vocabFieldLookupService = vocabFieldLookupService;
        this.completerService = completerService;
        this.configService = configService;
        this.translationService = translationService;
        this.utilityService = utilityService;
        this.app = app;
        this.classes = {
            'TextField': { 'meta': field_simple_1.TextField, 'comp': field_textfield_component_1.TextFieldComponent },
            'TextArea': { 'meta': field_simple_1.TextArea, 'comp': field_simple_component_1.TextAreaComponent },
            'DateTime': { 'meta': field_simple_1.DateTime, 'comp': field_simple_component_1.DateTimeComponent },
            'Container': { 'meta': field_simple_1.Container, 'comp': [field_simple_component_1.TextBlockComponent, field_group_component_1.GenericGroupComponent] },
            'TabOrAccordionContainer': { 'meta': field_simple_1.TabOrAccordionContainer, 'comp': field_simple_component_1.TabOrAccordionContainerComponent },
            'ButtonBarContainer': { 'meta': field_simple_1.ButtonBarContainer, 'comp': field_simple_component_1.ButtonBarContainerComponent },
            'AnchorOrButton': { 'meta': field_simple_1.AnchorOrButton, 'comp': field_simple_component_1.AnchorOrButtonComponent },
            'SaveButton': { 'meta': field_simple_1.SaveButton, 'comp': field_simple_component_1.SaveButtonComponent },
            'CancelButton': { 'meta': field_simple_1.CancelButton, 'comp': field_simple_component_1.CancelButtonComponent },
            'VocabField': { 'meta': field_vocab_component_1.VocabField, 'comp': field_vocab_component_1.VocabFieldComponent, 'lookupService': 'vocabFieldLookupService' },
            'RepeatableContainer': { 'meta': field_repeatable_component_1.RepeatableContainer, 'comp': [field_repeatable_component_1.RepeatableVocabComponent, field_repeatable_component_1.RepeatableContributorComponent, field_textfield_component_1.RepeatableTextfieldComponent, field_group_component_1.RepeatableGroupComponent] },
            'ContributorField': { 'meta': field_contributor_component_1.ContributorField, 'comp': field_contributor_component_1.ContributorComponent, 'lookupService': 'vocabFieldLookupService' },
            'HiddenValue': { 'meta': field_simple_1.HiddenValue, 'comp': field_simple_component_1.HiddenValueComponent },
            'WorkflowStepButton': { 'meta': workflow_button_component_1.WorkflowStepButton, 'comp': workflow_button_component_1.WorkflowStepButtonComponent },
            'LinkValueComponent': { 'meta': field_simple_1.LinkValue, 'comp': field_simple_component_1.LinkValueComponent },
            'SelectionField': { 'meta': field_simple_1.SelectionField, 'comp': [field_simple_component_1.SelectionFieldComponent, field_simple_component_1.DropdownFieldComponent] },
            'RelatedObjectDataField': { 'meta': field_relatedobjectdata_component_1.RelatedObjectDataField, 'comp': field_relatedobjectdata_component_1.RelatedObjectDataComponent, 'lookupService': 'vocabFieldLookupService' },
            'MapField': { 'meta': field_map_component_1.MapField, 'comp': field_map_component_1.MapComponent, 'lookupService': 'vocabFieldLookupService' }
        };
    }
    FieldControlService.prototype.addComponentClasses = function (componentClasses) {
        this.classes = _.merge(this.classes, componentClasses);
    };
    FieldControlService.prototype.getEmptyFormGroup = function () {
        return new forms_1.FormGroup({});
    };
    FieldControlService.prototype.toFormGroup = function (fields, fieldMap) {
        if (fieldMap === void 0) { fieldMap = null; }
        var group = {};
        this.populateFormGroup(fields, group, fieldMap);
        this.setupEventHandlers(fieldMap);
        return new forms_1.FormGroup(group);
    };
    FieldControlService.prototype.setupEventHandlers = function (fieldMap) {
        _.forOwn(fieldMap, function (fMap) {
            if (fMap.field) {
                fMap.field.setupEventHandlers();
            }
        });
    };
    FieldControlService.prototype.populateFormGroup = function (fields, group, fieldMap) {
        var _this = this;
        fields.forEach(function (field) {
            if (field.fields && !field.hasGroup) {
                _this.populateFormGroup(field.fields, group, fieldMap);
            }
            else {
                field.getGroup(group, fieldMap);
            }
        });
        return group;
    };
    FieldControlService.prototype.getFieldsMeta = function (fieldsArr) {
        var _this = this;
        var fields = _.map(fieldsArr, function (f) {
            console.log(f.class);
            if (typeof _this.classes[f.class] != 'undefined') {
                console.log(f.class + ' is null');
            }
            var inst = new _this.classes[f.class].meta(f.definition, _this.app['_injector']);
            inst.utilityService = _this.utilityService;
            if (_.isArray(_this.classes[f.class].comp)) {
                inst.compClass = _.find(_this.classes[f.class].comp, function (c) { return c.name == f.compClass; });
                if (_.isUndefined(inst.compClass)) {
                    inst.compClass = _this.classes[f.class].comp[0];
                }
            }
            else {
                inst.compClass = _this.classes[f.class].comp;
            }
            if (f.definition && f.definition.fields) {
                inst.fields = _this.getFieldsMeta(f.definition.fields);
            }
            return inst;
        });
        return fields;
    };
    FieldControlService.prototype.flattenFields = function (fields, fieldArr) {
        var _this = this;
        _.map(fields, function (f) {
            fieldArr.push(f);
            if (f.fields) {
                _this.flattenFields(f.fields, fieldArr);
            }
        });
    };
    FieldControlService.prototype.getLookupData = function (fields) {
        var _this = this;
        var fieldArray = [];
        this.flattenFields(fields, fieldArray);
        return Observable_1.Observable.from(fieldArray).flatMap(function (f) {
            if (f.hasLookup) {
                var lookupServiceName = _this.classes[f.constructor.name].lookupService;
                f.setLookupServices(_this.completerService, _this[lookupServiceName]);
                return _this[lookupServiceName].getLookupData(f);
            }
            else {
                return Observable_1.Observable.of(null);
            }
        })
            .flatMap(function (field) {
            return Observable_1.Observable.of(field);
        })
            .last()
            .flatMap(function (whatever) {
            return Observable_1.Observable.of(fields);
        });
    };
    FieldControlService = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(field_vocab_component_1.VocabFieldLookupService)), __param(1, core_1.Inject(ng2_completer_1.CompleterService)),
        __param(2, core_1.Inject(config_service_1.ConfigService)),
        __param(3, core_1.Inject(translation_service_1.TranslationService)),
        __param(4, core_1.Inject(util_service_1.UtilityService)),
        __metadata("design:paramtypes", [field_vocab_component_1.VocabFieldLookupService, ng2_completer_1.CompleterService,
            config_service_1.ConfigService,
            translation_service_1.TranslationService,
            util_service_1.UtilityService,
            core_1.ApplicationRef])
    ], FieldControlService);
    return FieldControlService;
}());
exports.FieldControlService = FieldControlService;
