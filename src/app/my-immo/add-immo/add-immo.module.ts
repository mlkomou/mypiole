import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule, NavParams} from '@ionic/angular';

import { AddImmoPageRoutingModule } from './add-immo-routing.module';

import { AddImmoPage } from './add-immo.page';
import {TranslateModule} from "@ngx-translate/core";
import {SwiperModule} from "swiper/angular";
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddImmoPageRoutingModule,
    TranslateModule,
    ReactiveFormsModule,
    SwiperModule
  ],
  providers: [LocalStorageProvider, NavParams],
  declarations: [AddImmoPage]
})
export class AddImmoPageModule {}
