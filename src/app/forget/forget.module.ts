import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForgetPageRoutingModule } from './forget-routing.module';

import { ForgetPage } from './forget.page';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ForgetPageRoutingModule,
        TranslateModule,
      ReactiveFormsModule
    ],
  declarations: [ForgetPage]
})
export class ForgetPageModule {}
