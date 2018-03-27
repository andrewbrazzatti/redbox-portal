// Copyright (c) 2017 Queensland Cyber Infrastructure Foundation (http://www.qcif.edu.au/)
//
// GNU GENERAL PUBLIC LICENSE
//    Version 2, June 1991
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 2 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License along
// with this program; if not, write to the Free Software Foundation, Inc.,
// 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.

import { Input, Component, Injectable , Inject, OnInit, Output, EventEmitter} from '@angular/core';
import { SimpleComponent } from './field-simple.component';
import { FieldBase } from './field-base';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as _ from "lodash-es";
import { Observable } from 'rxjs';
import { Subject } from "rxjs/Subject";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map'
import { Http } from '@angular/http';
import { BaseService } from '../base-service';
import { CompleterService, CompleterData, CompleterItem } from 'ng2-completer';
import { ConfigService } from '../config-service';
import * as luceneEscapeQuery from "lucene-escape-query";
/**
 * Vocabulary Field
 *
 * Author: <a href='https://github.com/shilob' target='_blank'>Shilo Banihit</a>
 *
 */
export class VocabField extends FieldBase<any> {
  public vocabId: string;
  public sourceData: any;
  public completerService: CompleterService;
  public dataService: CompleterData;
  public initialValue: any;
  public titleFieldName: string;
  public titleFieldArr: string[];
  public titleFieldDelim: any;
  public searchFields: string;
  public fieldNames: string[];
  public sourceType: string;
  public lookupService: any;
  public placeHolder: string;
  public disableEditAfterSelect: boolean;
  public stringLabelToField: string;

  constructor(options: any, injector: any) {
    super(options, injector);
    this.hasLookup = true;
    this.vocabId = options['vocabId'] || '';
    this.controlType = 'textbox';
    this.titleFieldName = options['titleFieldName'] || 'title';
    this.titleFieldArr = options['titleFieldArr'] || [];
    this.searchFields = options['searchFields'] || '';
    this.titleFieldDelim = options['titleFieldDelim'] || ' - ';
    this.fieldNames = options['fieldNames'] || [];
    this.sourceType = options['sourceType'] || 'vocab';
    this.placeHolder = options['placeHolder'] || 'Select a valid value';
    this.disableEditAfterSelect = options['disableEditAfterSelect'] == undefined ? true : options['disableEditAfterSelect'];
    this.stringLabelToField = options['stringLabelToField'] ? options['stringLabelToField'] : 'dc_title';
  }

  createFormModel(valueElem: any = undefined, createFormGroup:boolean=false) {
    if (valueElem) {
      this.value = valueElem;
    }
    if (createFormGroup) {
      const flds = {};
      _.forEach(this.fieldNames, fld => {
        _.forOwn(fld, (srcFld, targetFld) => {
          flds[targetFld] = new FormControl(this.value[targetFld] || '');
        });
      });
      this.formModel = new FormGroup(flds);
    } else {
      this.formModel = new FormControl(this.value || '');
    }
    if (this.value) {
      const init = _.cloneDeep(this.value);
      init.title = this.getTitle(this.value);
      this.initialValue = init;
    }

    if (this.required) {
      this.formModel.setValidators([Validators.required]);
    }
    return this.formModel;
  }

  postInit(value: any) {
    if (value) {
      this.value = value;
    } else {
      this.setEmptyValue();
    }
    this.initLookupData();
  }

  setEmptyValue() {
    this.value = null;
    return this.value;
  }

  setLookupServices(completerService: any, lookupService: any) {
    this.completerService = completerService;
    this.lookupService = lookupService;
  }

  initLookupData() {
    if (this.sourceType == "vocab") {
      // Hack for creating the intended title...
      _.forEach(this.sourceData, (data: any) => {
        data.title = this.getTitle(data);
      });
      this.dataService = this.completerService.local(this.sourceData, this.searchFields, 'title');
    } else if (this.sourceType == "collection" || this.sourceType == "user") {
      let url = this.lookupService.getCollectionRootUrl(this.vocabId);
      if (this.sourceType == "user") {
        url = this.lookupService.getUserLookupUrl();
      }
      console.log(`Using: ${url}`);
      // at the moment, multiple titles arrays are not supported
      // TODO: consider replacing with ngx-bootstrap typeahead
      const title = this.titleFieldArr.length == 1 ? this.titleFieldArr[0] : 'title';
      console.log(`Using title: ${title}`);
      this.dataService = this.completerService.remote(url, this.searchFields, title);
    } else if (this.sourceType == "mint") {
      const url = this.lookupService.getMintRootUrl(this.vocabId);
      console.log(`Using: ${url}`);

      this.dataService = new MintLookupDataService(
        url,
        this.lookupService.http,
        this.fieldNames,
        this.titleFieldName,
        this.titleFieldArr,
        this.titleFieldDelim,
        this.searchFields);
    }
  }

  getTitle(data: any): string {
    let title = '';
    if (data) {
      if (_.isString(this.titleFieldDelim)) {
        _.forEach(this.titleFieldArr, (titleFld: string) => {
          const titleVal = data[titleFld];
          if (titleVal) {
            title = `${title}${_.isEmpty(title) ? '' : this.titleFieldDelim}${titleVal}`;
          }
        });
      } else {
        // expecting a delim pair array, 'prefix', 'suffix'
        _.forEach(this.titleFieldArr, (titleFld: string, idx) => {
          const delimPair = this.titleFieldDelim[idx];
          const titleVal = data[titleFld];
          if (titleVal) {
            title = `${title}${_.isEmpty(title) ? '' : delimPair.prefix}${titleVal}${_.isEmpty(title) ? '' : delimPair.suffix}`;
          }
        });
      }
    }
    return title;
  }

  getValue(data: any) {
    const valObj = {};
    if (_.isString(data)) {
      console.log(`Data is string...`)
      valObj[this.stringLabelToField] = data;
      return valObj;
    }
    _.forEach(this.fieldNames, (fldName: any) => {
      if (data.originalObject) {
        this.getFieldValuePair(fldName, data.originalObject, valObj)
      } else {
        this.getFieldValuePair(fldName, data, valObj)
      }
    });
    return valObj;
  }

  getFieldValuePair(fldName: any, data: any, valObj: any) {
     if (_.isString(fldName)) {
      valObj[fldName] = _.get(data, fldName);
     } else {
       // expects a value pair
       _.forOwn(fldName, (srcFld, targetFld) => {
        if (_.get(data, srcFld)) {
          valObj[targetFld] = _.get(data, srcFld);
        } else {
          valObj[targetFld] = _.get(data, targetFld);
         }
       });
     }
   }

}

class MintLookupDataService extends Subject<CompleterItem[]> implements CompleterData {

  searchFields: any[];

  constructor(private url:string,
    private http: Http,
    private fields: string[],
    private compositeTitleName: string,
    private titleFieldArr: string[],
    private titleFieldDelim: any[],
    searchFieldStr: any)
  {
    super();
    this.searchFields = searchFieldStr.split(',');
  }

  public search(term: string): void {
    term = _.trim(luceneEscapeQuery.escape(term));
    let searchString='';
    if (!_.isEmpty(term)) {
      term = _.toLower(term);
      _.forEach(this.searchFields, (searchFld) => {
        searchString = `${searchString}${_.isEmpty(searchString) ? '' : ' OR '}${searchFld}:${term}*`
      });
    }
    const searchUrl = `${this.url}${searchString}`;
    // this.http.get(`${searchUrl}`).map((res: any, index:number) => {
    //   // Convert the result to CompleterItem[]
    //   let data = res.json();
    //   let matches: CompleterItem[] = _.map(data, (mintDataItem: any) => { return this.convertToItem(mintDataItem); });
    //   this.next(matches);
    // }).subscribe();
  }

  public cancel() {
    // Handle cancel
  }

  public convertToItem(data: any): CompleterItem | null {
    if (!data) {
      return null;
    }
    const item = {};
    _.forEach(this.fields, (fieldName) => {
      if (_.isString(fieldName)) {
        item[fieldName] = data[fieldName];
      } else {
        // expects a value pair
        _.forOwn(fieldName, (srcFld, targetFld) => {
          if (_.get(data, srcFld)) {
            item[srcFld] = _.get(data, srcFld);
          } else {
            item[targetFld] = _.get(data, targetFld);
          }
        });
      }
    });
    // build the title,
    item[this.compositeTitleName] = this.getTitle(data);
    return item as CompleterItem;
  }

  getTitle(data: any): string {
    let title = '';
    if (data) {
      if (_.isString(this.titleFieldDelim)) {
        _.forEach(this.titleFieldArr, (titleFld: string) => {
          const titleVal = data[titleFld];
          if (titleVal) {
            title = `${title}${_.isEmpty(title) ? '' : this.titleFieldDelim}${data[titleFld]}`;
          }
        });
      } else {
        // expecting a delim pair array, 'prefix', 'suffix'
        _.forEach(this.titleFieldArr, (titleFld: string, idx) => {
          const delimPair = this.titleFieldDelim[idx];
          const titleVal = data[titleFld];
          if (titleVal) {
            title = `${title}${delimPair.prefix}${titleVal}${delimPair.suffix}`;
          }
        });
      }
    }
    return title;
  }
}

@Injectable()
export class VocabFieldLookupService extends BaseService {

  constructor (@Inject(Http) http: Http, @Inject(ConfigService) protected configService: ConfigService) {
    super(http, configService);
  }

  getLookupData(field: VocabField) {
    const vocabId  = field.vocabId;
    // only retrieving static data when on vocab mode
    if (field.sourceType == "vocab") {
      const url = `${this.brandingAndPortalUrl}/${this.config.vocabRootUrl}/${vocabId}`;
      return this.http.get(url, this.options)
        .flatMap((res: any) => {
          const data = this.extractData(res);
          field.sourceData = data;
          field.postInit(field.value);
          return Observable.of(field);
        });
    }
    field.postInit(field.value);
    return Observable.of(field);
  }

  getCollectionRootUrl(collectionId: string) {
    return `${this.brandingAndPortalUrl}/${this.config.collectionRootUri}/${collectionId}/?search=`;
  }

  getUserLookupUrl(searchSource: string = '') {
    return `${this.brandingAndPortalUrl}/${this.config.userRootUri}/?source=${searchSource}&name=`;
  }

  findLookupData(field: VocabField, search: string) {

  }

  getMintRootUrl(source: string) {
    return `${this.brandingAndPortalUrl}/${this.config.mintRootUri}/${source}/?search=`;
  }
}

@Component({
  selector: 'rb-vocab',
  template: `
  <div *ngIf="field.editMode && !isEmbedded" [formGroup]='form' [ngClass]="getGroupClass()">
    <label>
      {{field.label}} {{getRequiredLabelStr()}}
      <button type="button" class="btn btn-default" *ngIf="field.help" (click)="toggleHelp()"><span class="glyphicon glyphicon-question-sign" aria-hidden="true"></span></button>
    </label>
    <span id="{{ 'helpBlock_' + field.name }}" class="help-block" *ngIf="this.helpShow" >{{field.help}}</span>
    <ng2-completer [(ngModel)]="searchStr" [ngModelOptions]="{standalone: true}" [disableInput]="disableInput" [placeholder]="field.placeHolder" [clearUnselected]="disableEditAfterSelect && field.disableEditAfterSelect" (keyup)="onKeyup($event)" (selected)="onSelect($event)" [datasource]="field.dataService" [minSearchLength]="0" [inputClass]="'form-control'" [initialValue]="field.initialValue"></ng2-completer>
    <div class="text-danger" *ngIf="hasRequiredError()">{{field.validationMessages.required}}</div>
  </div>
  <div *ngIf="field.editMode && isEmbedded" [formGroup]='form' [ngClass]="getGroupClass()">
    <div class="row">
      <span id="{{ 'helpBlock_' + field.name }}" class="help-block" *ngIf="this.helpShow" >{{field.help}}</span>
      <div class="col-xs-11 padding-remove">
        <ng2-completer [(ngModel)]="searchStr" [ngModelOptions]="{standalone: true}" [disableInput]="disableInput" [placeholder]="field.placeHolder" [clearUnselected]="disableEditAfterSelect && field.disableEditAfterSelect" (keyup)="onKeyup($event)" (selected)="onSelect($event)" [datasource]="field.dataService" [minSearchLength]="0" [inputClass]="'form-control'" [initialValue]="field.initialValue"></ng2-completer>
      </div>
      <div class="col-xs-1 padding-remove">
        <button type='button' *ngIf="removeBtnText" [disabled]="!canRemove" (click)="onRemove($event)" [ngClass]="removeBtnClass" >{{removeBtnText}}</button>
        <button [disabled]="!canRemove" type='button' [ngClass]="removeBtnClass" (click)="onRemove($event)"></button>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12 text-danger" *ngIf="hasRequiredError()">{{field.validationMessages.required}}</div>
    </div>
  </div>

  <li *ngIf="!field.editMode" class="key-value-pair">
    <span *ngIf="field.label" class="key">{{field.label}}</span>
    <span class="value">{{field.getTitle(field.value)}}</span>
  </li>
  `,
})
export class VocabFieldComponent extends SimpleComponent {
  protected searchStr: string;
  @Input() field: VocabField;
  @Input() isEmbedded: boolean = false;
  @Input() canRemove: boolean = false;
  @Input() removeBtnText: string = null;
  @Input() removeBtnClass: string = 'fa fa-minus-circle btn text-20 pull-right btn-danger';
  @Input() index: number;
  @Input() disableEditAfterSelect: boolean = true;
  @Output() onRemoveBtnClick: EventEmitter<any> = new EventEmitter<any>();
  disableInput: boolean;

  constructor() {
    super();
  }

  public getGroupClass(fldName:string=null): string {
    return `col-xs-12 form-group ${this.hasRequiredError() ? 'has-error' : '' }`;
  }

  onSelect(selected: any) {
    let disableEditAfterSelect = this.disableEditAfterSelect && this.field.disableEditAfterSelect;
    if (selected) {
      this.field.formModel.setValue(this.field.getValue(selected));
      if (disableEditAfterSelect)
        this.disableInput = true;
    } else {
      if (disableEditAfterSelect) {
        // means user can't edit, so no worries!
        this.field.formModel.setValue(null);
      } else {
        // set whatever value on the searchStr, let the fields decide how to parse the string...
        this.field.formModel.setValue(this.field.getValue(this.searchStr));
      }
    }
  }

  onKeyup(value: any) {
    let disableEditAfterSelect = this.disableEditAfterSelect && this.field.disableEditAfterSelect;
    if (!disableEditAfterSelect) {
      this.field.formModel.setValue(this.field.getValue(this.searchStr));
    }
  }

  onRemove(event: any) {
    this.onRemoveBtnClick.emit([event, this.index]);
  }
}
