import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarJustificacionPageRoutingModule } from './editar-justificacion-routing.module';

import { EditarJustificacionPage } from './editar-justificacion.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EditarJustificacionPageRoutingModule
  ],
  declarations: [EditarJustificacionPage]
})
export class EditarJustificacionPageModule {}
