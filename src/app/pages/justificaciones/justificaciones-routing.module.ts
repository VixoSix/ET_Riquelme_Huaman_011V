import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JustificacionesPage } from './justificaciones.page';

const routes: Routes = [
  {
    path: '',
    component: JustificacionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JustificacionesPageRoutingModule {}
