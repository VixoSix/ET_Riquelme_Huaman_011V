import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocentesPage } from './docentes.page';

const routes: Routes = [
  {
    path: '',
    component: DocentesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocentesPageRoutingModule {}
