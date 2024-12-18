import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ijustificacion, Ijustificaciones } from '../interfaces/ijustificacion';

@Injectable({
  providedIn: 'root'
})
export class JustificacionApiService {

  constructor(private httpclient: HttpClient) { }

  postJustificacion(newJustificacion: Ijustificacion):Observable<Ijustificacion>{
    return this.httpclient.post<Ijustificacion>(`${environment.apiUrl}/justificacion`, newJustificacion);
  }

  getJustificacion():Observable<Ijustificaciones[]>{
    return this.httpclient.get<Ijustificaciones[]>(`${environment.apiUrl}/justificacion`);
  }

  putJustificacion(Justificacion:any):Observable<Ijustificaciones>{
    return this.httpclient.put<Ijustificaciones>(`${environment.apiUrl}/justificacion/${Justificacion.id}`, Justificacion);
  }

  deleteJustificacion(Justificacion:any):Observable<Ijustificaciones>{
    return this.httpclient.delete<Ijustificaciones>(`${environment.apiUrl}/justificacion/${Justificacion.id}`);
  }

}
