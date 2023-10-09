import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {IonicModule, NavParams} from '@ionic/angular';

import { MyImmoPageRoutingModule } from './my-immo-routing.module';

import { MyImmoPage } from './my-immo.page';
import {TranslateModule} from "@ngx-translate/core";
import {LocalStorageProvider} from "../providers/local-storage/local-storage";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MyImmoPageRoutingModule,
        TranslateModule
    ],
  providers: [LocalStorageProvider, NavParams],

  declarations: [MyImmoPage]
})
export class MyImmoPageModule {}
