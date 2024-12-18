import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarAsistenciaPageRoutingModule } from './editar-asistencia-routing.module';

import { EditarAsistenciaPage } from './editar-asistencia.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EditarAsistenciaPageRoutingModule
  ],
  declarations: [EditarAsistenciaPage]
})
export class EditarAsistenciaPageModule {}
