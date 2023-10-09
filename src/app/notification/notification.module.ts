import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {IonicModule, NavParams} from '@ionic/angular';

import { NotificationPageRoutingModule } from './notification-routing.module';

import { NotificationPage } from './notification.page';
import {LocalStorageProvider} from "../providers/local-storage/local-storage";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificationPageRoutingModule,
    TranslateModule
  ],
  providers: [LocalStorageProvider, NavParams],

  declarations: [NotificationPage]
})
export class NotificationPageModule {}
