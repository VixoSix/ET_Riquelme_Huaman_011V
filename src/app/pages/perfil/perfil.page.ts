import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AsignaturasService } from 'src/app/services/asignaturas.service';
import { AuthService } from 'src/app/services/auth.service';
import { Profesor } from 'src/interfaces/profesor';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage {
  usuario: Profesor | null = null;
  asignaturas: any[] = [];
  cargando: boolean = true;
  userdata: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private asignaturaService:AsignaturasService
  ) {}

  ionViewWillEnter() {
    this.cargarDatosUsuario();
  }

  cargarDatosUsuario() {
    const emailLogueado = sessionStorage.getItem('correo');
    console.log('Email almacenado:', emailLogueado);

    if (emailLogueado) {
      // Obtener datos del usuario
      this.authService.getEmail(emailLogueado).subscribe(
        (resp) => {
          this.userdata = resp;
          if (this.userdata && this.userdata[0]) {
            // Asignar los datos del usuario
            this.usuario = {
              id: this.userdata[0].id,
              usuario: this.userdata[0].usuario,
              nombre: this.userdata[0].nombre,
              apellido: this.userdata[0].apellido,
              correo: this.userdata[0].correo,
              contrasenia: this.userdata[0].contrasenia,
              codigo_recuperacion: this.userdata[0].codigo_recuperacion,
              isactive: this.userdata[0].isactive,
              imagen: this.userdata[0].imagen,
            };

            // Obtener las asignaturas del profesor
            this.asignaturaService.GetAsignaturasPorProfesor(this.usuario.id).subscribe(
              (asignaturasResp) => {
                this.asignaturas = asignaturasResp;
                this.cargando = false;
              },
              (error) => {
                console.error('Error al obtener las asignaturas:', error);
                this.cargando = false;
              }
            );
          }
        },
        (error) => {
          console.error('Error al obtener los datos del usuario:', error);
          this.cargando = false;
        }
      );
    } else {
      console.error('No se encontró email en sessionStorage');
      this.cargando = false;
    }
  }


  actualizarUsuario(Observable: any){ 
    this.router.navigate(['/actualizar-perfil'],
      {queryParams: {usuario: JSON.stringify(Observable)}}
    )
  }
}