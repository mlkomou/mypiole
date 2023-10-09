import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactezNousPageRoutingModule } from './contactez-nous-routing.module';

import { ContactezNousPage } from './contactez-nous.page';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ContactezNousPageRoutingModule,
        TranslateModule
    ],
  declarations: [ContactezNousPage]
})
export class ContactezNousPageModule {}
