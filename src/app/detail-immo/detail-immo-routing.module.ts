import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailImmoPage } from './detail-immo.page';

const routes: Routes = [
  {
    path: '',
    component: DetailImmoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailImmoPageRoutingModule {}
