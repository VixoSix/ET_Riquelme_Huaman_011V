import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActualizarPerfilPage } from './actualizar-perfil.page';

const routes: Routes = [
  {
    path: '',
    component: ActualizarPerfilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActualizarPerfilPageRoutingModule {}
