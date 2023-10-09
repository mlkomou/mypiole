import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule, NavParams} from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import {TranslateModule} from "@ngx-translate/core";
import {LocalStorageProvider} from "../providers/local-storage/local-storage";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        LoginPageRoutingModule,
        TranslateModule,
      ReactiveFormsModule
    ],
  providers: [LocalStorageProvider, NavParams],
  declarations: [LoginPage]
})
export class LoginPageModule {}
