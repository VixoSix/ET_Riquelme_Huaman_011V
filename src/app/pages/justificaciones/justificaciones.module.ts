import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JustificacionesPageRoutingModule } from './justificaciones-routing.module';

import { JustificacionesPage } from './justificaciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JustificacionesPageRoutingModule
  ],
  declarations: [JustificacionesPage]
})
export class JustificacionesPageModule {}
