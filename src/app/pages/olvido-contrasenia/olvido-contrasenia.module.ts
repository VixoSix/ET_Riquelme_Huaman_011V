import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OlvidoContraseniaPageRoutingModule } from './olvido-contrasenia-routing.module';
import { OlvidoContraseniaPage } from './olvido-contrasenia.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OlvidoContraseniaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [OlvidoContraseniaPage]
})
export class OlvidoContraseniaPageModule {}
