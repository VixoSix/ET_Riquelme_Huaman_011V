import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecuperarContraseniaPage } from './recuperar-contrasenia.page';

const routes: Routes = [
  {
    path: '',
    component: RecuperarContraseniaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecuperarContraseniaPageRoutingModule {}
