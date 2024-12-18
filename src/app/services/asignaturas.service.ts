import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Asignaturas, Asistencias, Justificacion } from 'src/interfaces/asignatura';
import { Seccion } from 'src/interfaces/seccion';
@Injectable({
  providedIn: 'root'
})
export class AsignaturasService {

  constructor(private http: HttpClient) { }
  
  getAllAsignaturas(): Observable<Asignaturas[]> {
    return this.http.get<Asignaturas[]>(`${environment.apiUrl}/asignaturas`);
  }

  getSecciones(): Observable<Seccion[]> {
    return this.http.get<Seccion[]>(`${environment.apiUrl}/seccion`);
  }

  GetAsignaturasPorProfesor(profesorId: string): Observable<any> {
    return this.http.get<any[]>(`${environment.apiUrl}/asignaturas?profesorId=${profesorId}`);
  }

  getAsignaturaById(asignaturaId: string): Observable<Asignaturas> {
    return this.http.get<Asignaturas>(`${environment.apiUrl}/asignaturas/${asignaturaId}`);
  }

  getAsistenciasPorAsignatura(asignaturaId: string) {
    return this.http.get<Asistencias[]>(`${environment.apiUrl}/asistencias?asignaturaId=${asignaturaId}`);
  }

  getJustificacionesPorAsignatura(asignaturaId: string) {
    return this.http.get<Justificacion[]>(`${environment.apiUrl}/justificacion?asignaturaId=${asignaturaId}`);
  }


  // Obtener justificación por ID
  getJustificacionById(id: string): Observable<Justificacion> {
    return this.http.get<Justificacion>(`${environment.apiUrl}/justificacion/${id}`);
  }

  updateJustificacion(id: string, justificacion: Justificacion): Observable<Justificacion> {
    return this.http.put<Justificacion>(`${environment.apiUrl}/justificacion/${id}`, justificacion);
  }


  //ASISTENCIAS 


  registrarNuevaAsistencia(asistencia: Asistencias): Observable<Asistencias> {
    return this.http.post<Asistencias>(`${environment.apiUrl}/asistencias`, asistencia);
  }

  obtenerAsistencias(): Observable<Asistencias[]> {
    return this.http.get<Asistencias[]>(`${environment.apiUrl}/asistencias`).pipe(
      catchError(() => of([])) // En caso de error, retornamos una lista vacía.
    );
  }

  getUltimoId(): Observable<string> {
    return this.http.get<Asistencias[]>(`${environment.apiUrl}/asistencias`).pipe(
      map((asistencias) => {
        // Convertir los ids a números para poder usar Math.max y luego devolver el id como string
        const maxId = Math.max(...asistencias.map(a => Number(a.id) || 0));  // Convertir el id a número y usar 0 como fallback si no es un número válido
        return maxId.toString(); // Convertimos de vuelta a string
      }),
      catchError(() => of('0')) // En caso de error, devolvemos '0' como valor por defecto
    );
  }

}
