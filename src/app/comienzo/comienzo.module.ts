import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComienzoPageRoutingModule } from './comienzo-routing.module';

import { ComienzoPage } from './comienzo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComienzoPageRoutingModule
  ],
  declarations: [ComienzoPage]
})
export class ComienzoPageModule {}
