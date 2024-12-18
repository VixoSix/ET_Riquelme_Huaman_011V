import { UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UsuarioApiService } from '../services/usuario-api.service';
import { ToastController } from '@ionic/angular';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AutorizadoGuard implements CanActivate {
  constructor(private uApi: UsuarioApiService,
              private toast: ToastController,
              private router: Router){}
  
  canActivate():
    | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (!this.uApi.IsLoggedIn()){
        this.showToast('Debe iniciar sesión..');
        this.router.navigateByUrl('/login');
        return false;
      }
      else{
        this.uApi.IsLoggedIn();
        return true;    
      }
      
    }

    async showToast(msg: any){
      const toast = await this.toast.create({
        message:msg,
        duration: 3000
      });
      toast.present();
    }
}
