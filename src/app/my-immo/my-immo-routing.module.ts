import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyImmoPage } from './my-immo.page';

const routes: Routes = [
  {
    path: '',
    component: MyImmoPage
  },
  {
    path: 'add-immo',
    loadChildren: () => import('./add-immo/add-immo.module').then( m => m.AddImmoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyImmoPageRoutingModule {}
