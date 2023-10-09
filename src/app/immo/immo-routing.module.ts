import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImmoPage } from './immo.page';

const routes: Routes = [
  {
    path: '',
    component: ImmoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImmoPageRoutingModule {}
