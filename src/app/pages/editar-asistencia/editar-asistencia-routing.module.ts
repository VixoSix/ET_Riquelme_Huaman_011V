import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarAsistenciaPage } from './editar-asistencia.page';

const routes: Routes = [
  {
    path: '',
    component: EditarAsistenciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarAsistenciaPageRoutingModule {}
