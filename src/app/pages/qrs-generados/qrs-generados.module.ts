import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrsGeneradosPageRoutingModule } from './qrs-generados-routing.module';

import { QrsGeneradosPage } from './qrs-generados.page';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrsGeneradosPageRoutingModule,
    QRCodeModule
  ],
  declarations: [QrsGeneradosPage]
})
export class QrsGeneradosPageModule {}
