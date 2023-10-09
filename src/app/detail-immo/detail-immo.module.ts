import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailImmoPageRoutingModule } from './detail-immo-routing.module';

import { DetailImmoPage } from './detail-immo.page';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        DetailImmoPageRoutingModule,
        TranslateModule
    ],
  declarations: [DetailImmoPage]
})
export class DetailImmoPageModule {}
