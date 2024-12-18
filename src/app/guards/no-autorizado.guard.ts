import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UsuarioApiService } from '../services/usuario-api.service';

@Injectable({
  providedIn: 'root',
})
export class NoAutorizadoGuard implements CanActivate {

  constructor(private uApi: UsuarioApiService,
              private router: Router){}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      if (this.uApi.IsLoggedIn()) {
        // Si el usuario ya está autenticado, redirigir a la página principal o donde desees
        this.router.navigateByUrl('/tabs/tab1'); // Cambia a la ruta deseada
        return false;
      }
      return true; 
  }
}
