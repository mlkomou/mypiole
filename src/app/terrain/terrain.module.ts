import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TerrainPageRoutingModule } from './terrain-routing.module';

import { TerrainPage } from './terrain.page';
import {LocalStorageProvider} from "../providers/local-storage/local-storage";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TerrainPageRoutingModule
  ],
  providers: [LocalStorageProvider],
  declarations: [TerrainPage]
})
export class TerrainPageModule {}
