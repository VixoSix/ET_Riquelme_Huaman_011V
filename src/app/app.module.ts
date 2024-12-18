import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { AuthService } from './services/auth.service';

//firebase config
import { environment } from '../environments/environment'; // aqui se encuentra una variable de configuracion para inicializar firebase          
import { AngularFireModule } from '@angular/fire/compat';  //Modulo para inicializar y que todo funcione bien 
import { AngularFireAuthModule } from '@angular/fire/compat/auth';  //Modulo de authenticacion
import { AngularFirestoreModule } from "@angular/fire/compat/firestore"; //Modulo Firestore (BD)

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot({mode:"md"}),
    AppRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideHttpClient(), AuthService],
  bootstrap: [AppComponent],
})
export class AppModule { }
