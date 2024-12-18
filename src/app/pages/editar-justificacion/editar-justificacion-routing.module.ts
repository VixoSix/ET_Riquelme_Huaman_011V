import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarJustificacionPage } from './editar-justificacion.page';

const routes: Routes = [
  {
    path: '',
    component: EditarJustificacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarJustificacionPageRoutingModule {}
