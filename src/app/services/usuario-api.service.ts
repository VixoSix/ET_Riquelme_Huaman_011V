import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUsuario, IUsuarios } from '../interfaces/iusuario';
// import { AngularFireAuth } from '@angular/fire';

@Injectable({
  providedIn: 'root'
})
export class UsuarioApiService {

  constructor(private httpclient: HttpClient) { }

  //Crear nuevo usuario
  postUsuario(newUsuario: IUsuario):Observable<IUsuario>{
    return this.httpclient.post<IUsuario>(`${environment.apiUrl}/Alumno`, newUsuario);
  }

  //Obtener usuario
  getUsuario():Observable<IUsuarios[]>{
    return this.httpclient.get<IUsuarios[]>(`${environment.apiUrl}/Alumno`);
  }

  //Actualiar usuario
  putUsuario(Usuario:any):Observable<IUsuarios>{
    return this.httpclient.put<IUsuarios>(`${environment.apiUrl}/Alumno/${Usuario.id}`, Usuario);
  }

  getCorreo(Usuario:any):Observable<IUsuarios>{
    return this.httpclient.get<IUsuarios>(`${environment.apiUrl}/Alumno/?correo=${Usuario}`);
  }

  IsLoggedIn(){
    return sessionStorage.getItem('correo')!=null;
  }

  logOut(){
    sessionStorage.removeItem('nombre');
    sessionStorage.removeItem('apellido');
    sessionStorage.removeItem('correo');
    sessionStorage.removeItem('usuario');
    sessionStorage.removeItem('contrasenia');
    sessionStorage.removeItem('rut');
  }

  updatePassword(correo: string, newContrasenia: string): Observable<IUsuarios> {
    return this.httpclient.put<IUsuarios>(`${environment.apiUrl}/Alumno/${correo}`, { contrasenia: newContrasenia });
  }

}
