import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailTerrainPage } from './detail-terrain.page';

const routes: Routes = [
  {
    path: '',
    component: DetailTerrainPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailTerrainPageRoutingModule {}
