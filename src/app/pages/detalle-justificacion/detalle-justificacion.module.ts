import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleJustificacionPageRoutingModule } from './detalle-justificacion-routing.module';

import { DetalleJustificacionPage } from './detalle-justificacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleJustificacionPageRoutingModule
  ],
  declarations: [DetalleJustificacionPage]
})
export class DetalleJustificacionPageModule {}
