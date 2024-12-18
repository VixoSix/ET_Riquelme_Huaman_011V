import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleAsistenciaPageRoutingModule } from './detalle-asistencia-routing.module';

import { DetalleAsistenciaPage } from './detalle-asistencia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleAsistenciaPageRoutingModule
  ],
  declarations: [DetalleAsistenciaPage]
})
export class DetalleAsistenciaPageModule {}
