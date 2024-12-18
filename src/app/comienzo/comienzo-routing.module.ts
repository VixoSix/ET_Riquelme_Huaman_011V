import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComienzoPage } from './comienzo.page';

const routes: Routes = [
  {
    path: '',
    component: ComienzoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComienzoPageRoutingModule {}
