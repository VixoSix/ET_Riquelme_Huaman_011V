import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Profesor, ProfesorNuevo } from 'src/interfaces/profesor';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpclient: HttpClient) { }

  GetAllUsers(): Observable<Profesor[]> {
    return this.httpclient.get<Profesor[]>(`${environment.apiUrl}/Profesor`);
  }
  
  GetUserByUsername(profesor: any): Observable<Profesor[]> {
    return this.httpclient.get<Profesor[]>(`${environment.apiUrl}/Profesor/?usuario=${profesor}`);
  }

  IsLoggedIn() {
    return sessionStorage.getItem('correo') != null;
  }

  putUsuario(profesor:any):Observable<Profesor>{
    return this.httpclient.put<Profesor>(`${environment.apiUrl}/Profesor/${profesor.id}`, profesor);
  }

  PostUsuario(newProfesor: ProfesorNuevo): Observable<ProfesorNuevo> {
    return this.httpclient.post<Profesor>(`${environment.apiUrl}/Profesor`, newProfesor);
  }

  GetUsuarioId(id: number): Observable<Profesor> {
    return this.httpclient.get<Profesor>(`${environment.apiUrl}/Profesor/?id=${id}`);
  }

  getEmail(profesor: any): Observable<Profesor> {
    return this.httpclient.get<Profesor>(`${environment.apiUrl}/Profesor/?correo=${profesor}`);
  }
  

  getUsuarioPorId(id: number): Observable<Profesor> {
    return this.httpclient.get<Profesor>(`${environment.apiUrl}/Profesor/${id}`);
  }
  
  getEmailPassword(email: string): Observable<Profesor[]> {
    return this.httpclient.get<Profesor[]>(`${environment.apiUrl}/Profesor?correo=${email}`);
  }

    // actualizar cambio de contraseña 
  updatePasswordInJSON(correo: string, newPassword: string): Observable<Profesor> {
    return this.httpclient.put<Profesor>(`${environment.apiUrl}/Profesor/${correo}`, { contrasenia: newPassword });
  }


}
