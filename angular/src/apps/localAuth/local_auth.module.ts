import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ReactiveFormsModule} from "@angular/forms";
import { HttpModule } from '@angular/http';
import { LocalAuthComponent }  from './local_auth.component';
import { SharedModule } from '../../modules/shared/shared.module';

@NgModule({
  imports:      [ BrowserModule, HttpModule, ReactiveFormsModule, SharedModule ],
  declarations: [ LocalAuthComponent ],
  providers:    [ ],
  bootstrap:    [ LocalAuthComponent ]
})
export class LocalAuthModule { }
