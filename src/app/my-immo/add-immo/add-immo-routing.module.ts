import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddImmoPage } from './add-immo.page';

const routes: Routes = [
  {
    path: '',
    component: AddImmoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddImmoPageRoutingModule {}
