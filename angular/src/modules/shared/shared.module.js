"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var platform_browser_1 = require("@angular/platform-browser");
var records_service_1 = require("./form/records.service");
var field_control_service_1 = require("./form/field-control.service");
var field_textfield_component_1 = require("./form/field-textfield.component");
var field_simple_component_1 = require("./form/field-simple.component");
var field_vocab_component_1 = require("./form/field-vocab.component");
var field_repeatable_component_1 = require("./form/field-repeatable.component");
var field_contributor_component_1 = require("./form/field-contributor.component");
var field_relatedobjectdata_component_1 = require("./form/field-relatedobjectdata.component");
var field_map_component_1 = require("./form/field-map.component");
var workflow_button_component_1 = require("./form/workflow-button.component");
var config_service_1 = require("./config-service");
var translation_service_1 = require("./translation-service");
var ng2_datetime_js_1 = require("ng2-datetime/ng2-datetime.js");
var ng2_completer_1 = require("ng2-completer");
var ngx_i18next_1 = require("ngx-i18next");
var ngx_leaflet_1 = require("@asymmetrik/ngx-leaflet");
var ngx_leaflet_draw_1 = require("@asymmetrik/ngx-leaflet-draw");
var dmp_field_component_1 = require("./form/dmp-field.component");
var user_service_simple_1 = require("./user.service-simple");
var dashboard_service_1 = require("./dashboard-service");
var StringTemplatePipe_1 = require("./StringTemplatePipe");
var roles_service_1 = require("./roles-service");
var util_service_1 = require("./util-service");
var email_service_1 = require("./email-service");
var field_group_component_1 = require("./form/field-group.component");
var SharedModule = (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, forms_1.ReactiveFormsModule, ng2_datetime_js_1.NKDatetimeModule, ng2_completer_1.Ng2CompleterModule, ngx_i18next_1.TranslateI18NextModule, ngx_leaflet_1.LeafletModule.forRoot(), ngx_leaflet_draw_1.LeafletDrawModule.forRoot()],
            exports: [ng2_datetime_js_1.NKDatetimeModule, ng2_completer_1.Ng2CompleterModule, ngx_i18next_1.TranslateI18NextModule, dmp_field_component_1.DmpFieldComponent, field_textfield_component_1.TextFieldComponent, field_simple_component_1.DropdownFieldComponent, field_simple_component_1.TabOrAccordionContainerComponent, field_simple_component_1.ButtonBarContainerComponent, field_simple_component_1.TextBlockComponent, field_simple_component_1.TextAreaComponent, field_simple_component_1.DateTimeComponent, field_simple_component_1.AnchorOrButtonComponent, field_vocab_component_1.VocabFieldComponent, field_repeatable_component_1.RepeatableVocabComponent, field_contributor_component_1.ContributorComponent, field_repeatable_component_1.RepeatableContributorComponent, field_simple_component_1.HtmlRawComponent, field_simple_component_1.HiddenValueComponent, workflow_button_component_1.WorkflowStepButtonComponent, field_simple_component_1.LinkValueComponent, field_simple_component_1.SelectionFieldComponent, field_textfield_component_1.RepeatableTextfieldComponent, StringTemplatePipe_1.StringTemplatePipe, field_group_component_1.GenericGroupComponent, field_group_component_1.RepeatableGroupComponent, field_map_component_1.MapComponent],
            declarations: [dmp_field_component_1.DmpFieldComponent, field_textfield_component_1.TextFieldComponent, field_simple_component_1.DropdownFieldComponent, field_simple_component_1.TabOrAccordionContainerComponent, field_simple_component_1.ButtonBarContainerComponent, field_simple_component_1.TextBlockComponent, field_simple_component_1.TextAreaComponent, field_simple_component_1.DateTimeComponent, field_simple_component_1.AnchorOrButtonComponent, field_simple_component_1.SaveButtonComponent, field_simple_component_1.CancelButtonComponent, field_vocab_component_1.VocabFieldComponent, field_repeatable_component_1.RepeatableVocabComponent, field_contributor_component_1.ContributorComponent, field_repeatable_component_1.RepeatableContributorComponent, field_simple_component_1.HtmlRawComponent, field_simple_component_1.HiddenValueComponent, workflow_button_component_1.WorkflowStepButtonComponent, field_simple_component_1.LinkValueComponent, field_simple_component_1.SelectionFieldComponent, field_textfield_component_1.RepeatableTextfieldComponent, field_relatedobjectdata_component_1.RelatedObjectDataComponent, StringTemplatePipe_1.StringTemplatePipe, field_group_component_1.GenericGroupComponent, field_group_component_1.RepeatableGroupComponent, field_map_component_1.MapComponent],
            providers: [field_control_service_1.FieldControlService, records_service_1.RecordsService, field_vocab_component_1.VocabFieldLookupService, config_service_1.ConfigService, translation_service_1.TranslationService, user_service_simple_1.UserSimpleService, dashboard_service_1.DashboardService, roles_service_1.RolesService, email_service_1.EmailNotificationService, util_service_1.UtilityService],
            bootstrap: [],
            entryComponents: [dmp_field_component_1.DmpFieldComponent, field_textfield_component_1.TextFieldComponent, field_simple_component_1.DropdownFieldComponent, field_simple_component_1.TabOrAccordionContainerComponent, field_simple_component_1.ButtonBarContainerComponent, field_simple_component_1.TextBlockComponent, field_simple_component_1.TextAreaComponent, field_simple_component_1.DateTimeComponent, field_simple_component_1.AnchorOrButtonComponent, field_simple_component_1.SaveButtonComponent, field_simple_component_1.CancelButtonComponent, field_vocab_component_1.VocabFieldComponent, field_repeatable_component_1.RepeatableVocabComponent, field_contributor_component_1.ContributorComponent, field_repeatable_component_1.RepeatableContributorComponent, field_simple_component_1.HtmlRawComponent, field_simple_component_1.HiddenValueComponent, workflow_button_component_1.WorkflowStepButtonComponent, field_simple_component_1.LinkValueComponent, field_simple_component_1.SelectionFieldComponent, field_textfield_component_1.RepeatableTextfieldComponent, field_relatedobjectdata_component_1.RelatedObjectDataComponent, field_group_component_1.GenericGroupComponent, field_group_component_1.RepeatableGroupComponent, field_map_component_1.MapComponent]
        })
    ], SharedModule);
    return SharedModule;
}());
exports.SharedModule = SharedModule;
