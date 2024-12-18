import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActualizarPerfilPageRoutingModule } from './actualizar-perfil-routing.module';

import { ActualizarPerfilPage } from './actualizar-perfil.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActualizarPerfilPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ActualizarPerfilPage]
})
export class ActualizarPerfilPageModule {}
