import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {IonicModule, NavParams} from '@ionic/angular';

import { PromotionPageRoutingModule } from './promotion-routing.module';

import { PromotionPage } from './promotion.page';
import {TranslateModule} from "@ngx-translate/core";
import {LocalStorageProvider} from "../providers/local-storage/local-storage";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PromotionPageRoutingModule,
        TranslateModule
    ],
  providers: [LocalStorageProvider, NavParams],

  declarations: [PromotionPage]
})
export class PromotionPageModule {}
