import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailTerrainPageRoutingModule } from './detail-terrain-routing.module';

import { DetailTerrainPage } from './detail-terrain.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailTerrainPageRoutingModule
  ],
  declarations: [DetailTerrainPage]
})
export class DetailTerrainPageModule {}
