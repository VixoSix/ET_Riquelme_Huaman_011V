import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IQrsGenerado, IQrsGenerados } from '../interfaces/i-qrs-generados';

@Injectable({
  providedIn: 'root'
})
export class QrsGeneradosApiService {

  constructor(private httpclient: HttpClient) { }

    postQr(newQr: IQrsGenerado):Observable<IQrsGenerado>{
      return this.httpclient.post<IQrsGenerado>(`${environment.apiUrl}/qrsGenerados`, newQr);
    }
  
    getQr():Observable<IQrsGenerados[]>{
      return this.httpclient.get<IQrsGenerados[]>(`${environment.apiUrl}/qrsGenerados`);
    }
  
    putQr(Qr:any):Observable<IQrsGenerados>{
      return this.httpclient.put<IQrsGenerados>(`${environment.apiUrl}/qrsGenerados/${Qr.id}`, Qr);
    }
  
    deleteQr(Qr:any):Observable<IQrsGenerados>{
      return this.httpclient.delete<IQrsGenerados>(`${environment.apiUrl}/qrsGenerados/${Qr.id}`);
    }

}
