import { NgModule }      from '@angular/core';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';
import { RecordsService } from './form/records.service';
import { FieldControlService } from './form/field-control.service';
import { TextFieldComponent, RepeatableTextfieldComponent } from './form/field-textfield.component';
import { DropdownFieldComponent, TabOrAccordionContainerComponent, ButtonBarContainerComponent, TextBlockComponent, TextAreaComponent, DateTimeComponent, AnchorOrButtonComponent, SaveButtonComponent, CancelButtonComponent, HtmlRawComponent, HiddenValueComponent, LinkValueComponent, SelectionFieldComponent } from './form/field-simple.component';
import { VocabField, VocabFieldComponent, VocabFieldLookupService } from './form/field-vocab.component';
import { RepeatableVocabComponent, RepeatableContributorComponent } from './form/field-repeatable.component';
import { ContributorComponent } from './form/field-contributor.component';
import { RelatedObjectDataComponent } from './form/field-relatedobjectdata.component';
import { MapComponent } from './form/field-map.component';
import { WorkflowStepButtonComponent } from './form/workflow-button.component';
import { ConfigService } from './config-service';
import { TranslationService } from './translation-service';
import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';
import { Ng2CompleterModule } from "ng2-completer";
import { TranslateI18NextModule } from 'ngx-i18next';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletDrawModule } from '@asymmetrik/ngx-leaflet-draw';
import { DmpFieldComponent } from './form/dmp-field.component';
import { UserSimpleService } from './user.service-simple';
import { DashboardService } from './dashboard-service';
import { StringTemplatePipe }  from './StringTemplatePipe';
import { RolesService } from './roles-service';
import { UtilityService } from './util-service';
import { EmailNotificationService } from './email-service';
import { GenericGroupComponent, RepeatableGroupComponent } from './form/field-group.component';
 

@NgModule({
  imports:      [ BrowserModule, FormsModule, ReactiveFormsModule, NKDatetimeModule, Ng2CompleterModule, TranslateI18NextModule, LeafletModule.forRoot(), LeafletDrawModule.forRoot() ],
  exports:      [ NKDatetimeModule, Ng2CompleterModule, TranslateI18NextModule, DmpFieldComponent, TextFieldComponent, DropdownFieldComponent, TabOrAccordionContainerComponent, ButtonBarContainerComponent, TextBlockComponent, TextAreaComponent, DateTimeComponent, AnchorOrButtonComponent, VocabFieldComponent, RepeatableVocabComponent, ContributorComponent, RepeatableContributorComponent, HtmlRawComponent, HiddenValueComponent, WorkflowStepButtonComponent, LinkValueComponent, SelectionFieldComponent, RepeatableTextfieldComponent, StringTemplatePipe, GenericGroupComponent, RepeatableGroupComponent, MapComponent ],
  declarations: [ DmpFieldComponent, TextFieldComponent, DropdownFieldComponent, TabOrAccordionContainerComponent, ButtonBarContainerComponent, TextBlockComponent, TextAreaComponent, DateTimeComponent, AnchorOrButtonComponent, SaveButtonComponent, CancelButtonComponent, VocabFieldComponent, RepeatableVocabComponent, ContributorComponent, RepeatableContributorComponent, HtmlRawComponent, HiddenValueComponent, WorkflowStepButtonComponent, LinkValueComponent, SelectionFieldComponent, RepeatableTextfieldComponent, RelatedObjectDataComponent, StringTemplatePipe, GenericGroupComponent, RepeatableGroupComponent, MapComponent ],
  providers:    [ FieldControlService, RecordsService, VocabFieldLookupService, ConfigService, TranslationService, UserSimpleService, DashboardService, RolesService, EmailNotificationService, UtilityService ],
  bootstrap:    [ ],
  entryComponents: [ DmpFieldComponent, TextFieldComponent, DropdownFieldComponent, TabOrAccordionContainerComponent, ButtonBarContainerComponent, TextBlockComponent, TextAreaComponent, DateTimeComponent, AnchorOrButtonComponent, SaveButtonComponent, CancelButtonComponent, VocabFieldComponent, RepeatableVocabComponent, ContributorComponent, RepeatableContributorComponent, HtmlRawComponent, HiddenValueComponent, WorkflowStepButtonComponent, LinkValueComponent, SelectionFieldComponent, RepeatableTextfieldComponent, RelatedObjectDataComponent, GenericGroupComponent, RepeatableGroupComponent, MapComponent ]
})
export class SharedModule { }
