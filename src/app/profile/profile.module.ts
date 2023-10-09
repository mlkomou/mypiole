import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {IonicModule, NavParams} from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import {TranslateModule} from "@ngx-translate/core";
import {LocalStorageProvider} from "../providers/local-storage/local-storage";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ProfilePageRoutingModule,
        TranslateModule
    ],
  providers: [LocalStorageProvider, NavParams],

  declarations: [ProfilePage]
})
export class ProfilePageModule {}
