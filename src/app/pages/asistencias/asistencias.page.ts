import { Component, OnInit } from '@angular/core';
import { UsuarioApiService } from 'src/app/services/usuario-api.service';
import { Router } from '@angular/router';
import { IUsuarios } from 'src/app/interfaces/iusuario';
import { Iasistencias } from 'src/app/interfaces/iasistencia';
import { AsistenciaApiService } from 'src/app/services/asistencia-api.service';
import { IAsignatura } from 'src/app/interfaces/iasignatura';
import { AsignaturasApiService } from 'src/app/services/asignaturas-api.service';

@Component({
  selector: 'app-asistencias',
  templateUrl: './asistencias.page.html',
  styleUrls: ['./asistencias.page.scss'],
})
export class AsistenciasPage implements OnInit {
  usuarioActual: IUsuarios | undefined;
  asistencias: Iasistencias[] = [];
  asignaturas: IAsignatura[] = [];
  asistenciasConAsignaturas: Array<Iasistencias & { asignatura?: IAsignatura }> = [];

  constructor(
    private router: Router,
    private uApi: UsuarioApiService,
    private aApi: AsignaturasApiService,
    private asisApi: AsistenciaApiService
  ) {}

  ngOnInit() {
    const correo = sessionStorage.getItem('correo');
    if (correo) {
      this.uApi.getUsuario().subscribe((usuarios: IUsuarios[]) => {
        this.usuarioActual = usuarios.find((usuario) => usuario.correo === correo);
        if (!this.usuarioActual) {
          console.error('Usuario no encontrado con el correo:', correo);
        } else {
          this.cargarAsistencias();
        }
      });
    } else {
      console.error('No se encontró el correo en sessionStorage.');
    }
  }

  ionViewWillEnter() {
    this.cargarAsistencias();
  }

  cargarAsistencias() {
    if (this.usuarioActual) {
      this.asisApi.getAsistencia().subscribe((asistencias: Iasistencias[]) => {
        const idUsuarioNumber = Number(this.usuarioActual?.id);
        this.asistencias = asistencias.filter(asistencia => asistencia.alumnoId === idUsuarioNumber);
        this.aApi.getAsignatura().subscribe((asignaturas: IAsignatura[]) => {
          this.asignaturas = asignaturas;
          this.asistenciasConAsignaturas = this.asistencias.map(asistencia => {
            const asignaturaIdAsString = asistencia.asignaturaId.toString();
            const asignatura = this.asignaturas.find(a => a.id === asignaturaIdAsString);
            return { ...asistencia, asignatura };
          });
        });
      });
    }
  }

  buscarAsistencias(asistencia: Iasistencias) {
    this.router.navigate(['/detalle-asistencia'], {
      queryParams: { user: JSON.stringify(asistencia) },
    });
  }

  volver() {
    this.router.navigate(['/tabs/tab1']);
  }
}