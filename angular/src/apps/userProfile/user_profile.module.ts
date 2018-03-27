import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import { HttpModule } from '@angular/http';
import { ModalModule } from 'ngx-bootstrap';

import { UserProfileComponent }  from './user_profile.component';
import { SharedModule } from '../../modules/shared/shared.module';

@NgModule({
  imports:      [ BrowserModule, HttpModule, ReactiveFormsModule, FormsModule, SharedModule, ModalModule.forRoot() ],
  declarations: [ UserProfileComponent ],
  providers:    [ ],
  bootstrap:    [ UserProfileComponent ]
})
export class UserProfileModule { }
