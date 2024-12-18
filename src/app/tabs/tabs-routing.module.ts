import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AutorizadoGuard } from '../guards/autorizado.guard';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'inicio',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule),
        canActivate: [AutorizadoGuard],
      },
      {
        path: 'clase',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule),
        canActivate: [AutorizadoGuard],
      },
      {
        path: 'asistencias/:id',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule),
        canActivate: [AutorizadoGuard],
      },

      {
        path: 'justificaciones/:id',
        loadChildren: () => import('../tab4/tab4.module').then(m => m.Tab4PageModule),
        canActivate: [AutorizadoGuard],
      },
      {
        path: 'escaneo',
        loadChildren: () => import('../pages/escaneoqr/escaneoqr.module').then( m => m.EscaneoqrPageModule),
        canActivate: [AutorizadoGuard],
      },
      {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/inicio',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule { }
