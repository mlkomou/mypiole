import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {IonicModule, NavParams} from '@ionic/angular';

import { ImmoPageRoutingModule } from './immo-routing.module';

import { ImmoPage } from './immo.page';
import {LocalStorageProvider} from "../providers/local-storage/local-storage";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImmoPageRoutingModule,
    TranslateModule
  ],
  providers: [LocalStorageProvider, NavParams],
  declarations: [ImmoPage]
})
export class ImmoPageModule {}
