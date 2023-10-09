import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {IonicModule, NavParams} from '@ionic/angular';

import { LocationPageRoutingModule } from './location-routing.module';

import { LocationPage } from './location.page';
import {TranslateModule} from "@ngx-translate/core";
import {LocalStorageProvider} from "../providers/local-storage/local-storage";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        LocationPageRoutingModule,
        TranslateModule
    ],
  declarations: [LocationPage],
  providers: [LocalStorageProvider, NavParams]
})
export class LocationPageModule {}
