import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Profesor } from 'src/interfaces/profesor';



@Injectable({
  providedIn: 'root'
})
export class RecoverService {

  private usuarios: Profesor[] = [];
  private apiUrl = environment.apiUrl;


  constructor(private http: HttpClient) { 
    this.cargarUsuarios();
  }

  // Carga inicial de usuarios desde un archivo JSON
  private cargarUsuarios(): void {
    this.http.get<Profesor[]>(`${this.apiUrl}/Profesor`).subscribe(
      data => (this.usuarios = data),
      error => console.error('Error cargando usuarios:', error)
    );
  }

  // Generar y enviar un código de recuperación
  // generarCodigo(email: string): Observable<string> {
  //   const usuario = this.usuarios.find(u => u.email === email);
  //   if (usuario) {
  //     usuario.codigo_recuperacion = Math.floor(100000 + Math.random() * 900000).toString(); // Código de 6 dígitos
  //     return of(usuario.codigo_recuperacion);
  //   } else {
  //     return of('Correo no encontrado');
  //   }
  // }


  generarCodigoRecuperacion(): string {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let codigo = '';
    for (let i = 0; i < 6; i++) {  // Código de 6 caracteres
      const indice = Math.floor(Math.random() * caracteres.length);
      codigo += caracteres[indice];
    }
    return codigo;
  }




  // se asigna el codigo al usuario
  solicitarCodigo(correo: string): Observable<boolean> {
    const usuario = this.usuarios.find(u => u.correo === correo);
    if (usuario) {
      const codigo = this.generarCodigoRecuperacion();
      usuario.codigo_recuperacion = codigo;
  
      // Simulando el envío de un correo con el código
      console.log(`El código de recuperación para ${correo} es: ${codigo}`);
      return of(true);
    }
    return of(false);
  }
  

  // Verificar el código de recuperación
  // verificarCodigo(email: string, codigo: string): Observable<boolean> {
  //   const usuario = this.usuarios.find(u => u.email === email);
  //   return of(usuario?.codigo_recuperacion === codigo);
  // }



  verificarCodigo(correo: string, codigo: string): Observable<boolean> {
    const usuario = this.usuarios.find(u => u.correo === correo);
    if (usuario && usuario.codigo_recuperacion === codigo) {
      return of(true);  // Código correcto
    }
    return of(false);  // Código incorrecto
  }




  // Actualizar la contraseña del usuario
  // actualizarContraseña(email: string, nuevaContraseña: string): Observable<boolean> {
  //   const usuario = this.usuarios.find(u => u.email === email);
  //   if (usuario) {
  //     usuario.password = nuevaContraseña;
  //     usuario.codigo_recuperacion = ''; // Limpia el código después de usarlo
  //     return of(true);
  //   }
  //   return of(false);
  // }


  establecerNuevaContraseña(correo: string, nuevaPassword: string): Observable<boolean> {
    const usuario = this.usuarios.find(u => u.correo === correo);
    if (usuario) {
      usuario.contrasenia = nuevaPassword;  // Actualizamos la contraseña
      usuario.codigo_recuperacion = '';    // Limpiamos el código de recuperación
      return of(true);  // Indicamos que la actualización fue exitosa
    }
    return of(false);  // Si no se encuentra el usuario, devolvemos false
  }




  // Opción adicional: Guardar los usuarios actualizados en un archivo (simulado con un log en consola)
  guardarUsuarios(): void {
    console.log('Usuarios actualizados:', this.usuarios);
  }
}
