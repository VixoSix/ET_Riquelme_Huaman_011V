import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProfesor } from '../interfaces/iprofesor';

@Injectable({
  providedIn: 'root'
})
export class ProfesorApiService {

  constructor(private httpclient: HttpClient) { }

  getProfesor():Observable<IProfesor[]>{
    return this.httpclient.get<IProfesor[]>(`${environment.apiUrl}/Profesor`);
  }
}
