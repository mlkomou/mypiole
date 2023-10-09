import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AproposPageRoutingModule } from './apropos-routing.module';

import { AproposPage } from './apropos.page';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AproposPageRoutingModule,
    TranslateModule
  ],
  declarations: [AproposPage]
})
export class AproposPageModule {}
