import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EscaneoqrPage } from './escaneoqr.page';

const routes: Routes = [
  {
    path: '',
    component: EscaneoqrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EscaneoqrPageRoutingModule {}
