import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QrsGeneradosPage } from './qrs-generados.page';

const routes: Routes = [
  {
    path: '',
    component: QrsGeneradosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QrsGeneradosPageRoutingModule {}
