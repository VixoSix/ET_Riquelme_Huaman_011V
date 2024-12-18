import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleAsistenciaPage } from './detalle-asistencia.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleAsistenciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleAsistenciaPageRoutingModule {}
