import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleJustificacionPage } from './detalle-justificacion.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleJustificacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleJustificacionPageRoutingModule {}
