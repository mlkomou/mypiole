import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {IonicModule, NavParams} from '@ionic/angular';

import { FavoryPageRoutingModule } from './favory-routing.module';

import { FavoryPage } from './favory.page';
import {TranslateModule} from "@ngx-translate/core";
import {LocalStorageProvider} from "../providers/local-storage/local-storage";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        FavoryPageRoutingModule,
        TranslateModule
    ],
  providers: [LocalStorageProvider, NavParams],
  declarations: [FavoryPage]
})
export class FavoryPageModule {}
