import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUsuarios } from 'src/app/interfaces/iusuario';
import { UsuarioApiService } from 'src/app/services/usuario-api.service';
import { Ijustificacion, Ijustificaciones } from 'src/app/interfaces/ijustificacion';
import { JustificacionApiService } from 'src/app/services/justificacion-api.service';
import { IAsignatura } from 'src/app/interfaces/iasignatura';
import { AsignaturasApiService } from 'src/app/services/asignaturas-api.service';


@Component({
  selector: 'app-justificaciones',
  templateUrl: './justificaciones.page.html',
  styleUrls: ['./justificaciones.page.scss'],
})
export class JustificacionesPage implements OnInit {

  usuarioActual: IUsuarios | undefined;
  justificaciones: Ijustificaciones[] = [];
  asignaturas: IAsignatura[] = [];
  justificacionesConAsignaturas: Array<Ijustificaciones & { asignatura?: IAsignatura }> = [];

  constructor(private router: Router,
              private japi: JustificacionApiService,
              private aApi: AsignaturasApiService,
              private uApi: UsuarioApiService) { }

  ngOnInit() {
    const correo = sessionStorage.getItem('correo');
    if (correo){
      this.uApi.getUsuario().subscribe((usuarios: IUsuarios[]) => {
        this.usuarioActual = usuarios.find((usuario) => usuario.correo === correo);
        if (!this.usuarioActual) {
          console.error('Usuario no encontrado con el correo:', correo);
        } else {
          this.Justificaciones();
        }
      });
    } else {
      console.error('No se encontró el correo en sessionStorage.');
    }
  }

  ionViewWillEnter(){
    this.Justificaciones();
  }

  Justificaciones(){
    if (this.usuarioActual){
      this.japi.getJustificacion().subscribe((justificaciones: Ijustificaciones[]) => {
        this.justificaciones = justificaciones.filter(justificacion => justificacion.alumnoId === Number(this.usuarioActual?.id));
        this.aApi.getAsignatura().subscribe((asignaturas: IAsignatura[]) => {
          this.asignaturas = asignaturas;
          this.justificacionesConAsignaturas = this.justificaciones.map(justificacion => {
            const asignaturaIdAsString = justificacion.asignaturaId.toString();
            const asignatura = this.asignaturas.find(a => a.id === asignaturaIdAsString);
            return { ...justificacion, asignatura};
          });
        });
      });
    }
  }

  // Justificaciones(){
  //   const correo = sessionStorage.getItem('correo');
  //   if (correo) {
  //     console.log('El corro del usuario es:', correo);
  //     this.uApi.getUsuario().subscribe((usuarios) => {
  //       const usuario = usuarios.find((Usuario) => Usuario.correo === correo);
  //       if (usuario) {
  //         console.log('Usuario encontrado:', usuario);
  //         if (usuario.justificaciones && usuario.justificaciones.length > 0) {
  //           this.justificaciones = usuario.justificaciones;
  //           console.log('Justificaciones del usuario: ', this.justificaciones);
  //         } else {
  //           console.warn('Este usuario no tiene justificaciones registradas.');
  //           this.justificaciones = [];
  //         }
  //       } else {
  //         console.error('No se encontró ningún usuario');
  //       }
  //     })
  //   } else {
  //     console.error('No se encontró ningún correo');
  //   }
  // }

  buscarJustificaciones(Observable:any){
    this.router.navigate(['/detalle-justificacion'],
      {queryParams:{user: JSON.stringify(Observable)}})
  }

  volver(){
    this.router.navigate(['/tabs/tab1']);
  }

}
