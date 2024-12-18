import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUsuario } from '../interfaces/iusuario';

@Injectable({
  providedIn: 'root'
})
export class RecoverPasswordService {

  private usuarios: IUsuario[] = [];
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
    this.cargarUsuarios();
   }

   private cargarUsuarios(): void{
      this.http.get<IUsuario[]>(`${this.apiUrl}/Alumno`).subscribe(
        data => (this.usuarios = data),
        error => console.error('Error cargando usuarios: ',error)
      );
   }

   generarCodigoRecuperacion(): string {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let codigo = '';
    for (let i = 0; i < 6; i++){
      const indice = Math.floor(Math.random() * caracteres.length);
      codigo += caracteres[indice];
    }
    return codigo;
   }

   solicitarCodigo(correo: string): Observable<boolean> {
    const usuario = this.usuarios.find(u => u.correo === correo);
    if (usuario){
      const codigo = this.generarCodigoRecuperacion();
      usuario.codigo_recuperacion = codigo;
      console.log(`El código de recuperación para ${correo} es: ${codigo}`);
      return of(true);
    }
    return of(false);
   }

   verificarCodigo(correo: string, codigo: string): Observable<boolean> {
    const usuario = this.usuarios.find(u => u.correo === correo);
    if (usuario && usuario.codigo_recuperacion === codigo){
      return of(true);
    }
    return of(false);
   }

   establecerNuevaContrasenia(correo:string, nuevaContrasenia: string):Observable<boolean>{
    const usuario = this.usuarios.find(u => u.correo === correo);
    if (usuario){
      usuario.contrasenia = nuevaContrasenia;
      usuario.codigo_recuperacion = '';
      return of(true);
    }
    return of(false);
   }

   guardarUsuarios(): void{
    console.log('Usuarios actualizados: ', this.usuarios);
   }

}
