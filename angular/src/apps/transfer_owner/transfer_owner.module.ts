import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpModule } from '@angular/http';
import { TransferOwnerComponent }  from './transfer_owner.component';
import { SharedModule } from '../../modules/shared/shared.module';

@NgModule({
  imports:      [ BrowserModule, HttpModule, ReactiveFormsModule, FormsModule, SharedModule ],
  declarations: [ TransferOwnerComponent ],
  providers:    [ ],
  bootstrap:    [ TransferOwnerComponent ]
})
export class TransferOwnerModule { }
