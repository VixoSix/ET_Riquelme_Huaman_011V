import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Asignaturas, Asistencias, Justificacion } from 'src/interfaces/asignatura';
import { AsignaturasService } from '../services/asignaturas.service';
import * as moment from 'moment';
import 'moment/locale/es';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  asignaturaId!: string;
  asignatura!: Asignaturas;
  asistencias: Asistencias[] = [];
  justificaciones: Justificacion[] = [];
  loading = true;

  groupedAsistencias: { [key: string]: Asistencias[] } = {};
  groupedJustificaciones :{ [key: string]: Justificacion[] } = {};
  groupedAsistenciasArray: Array<{ date: string, asistenciasGroup: Asistencias[] }> = [];
  groupedJustificacionesArray: Array<{ date: string, justificacionesGroup: Justificacion[] }> = [];


  constructor(
    private menucontroller: MenuController,
    private route: ActivatedRoute,
    private router: Router,
    private asignaturasService: AsignaturasService,
  ) {}

  mostrarMenu() {
    this.menucontroller.enable(true); 
    this.menucontroller.open('first');
  }

  ionViewWillEnter() {
    this.asignaturaId = this.route.snapshot.paramMap.get('id')!;
    this.cargarDatos();
  }

  cargarDatos() {
    this.loading = true;
  
    this.asignaturasService.getAsignaturaById(this.asignaturaId).subscribe(
      (asignatura) => {
        this.asignatura = asignatura;
  
        this.asignaturasService.getAsistenciasPorAsignatura(this.asignaturaId).subscribe((asistencias) => {
          this.asistencias = asistencias;
  
          this.asignaturasService.getJustificacionesPorAsignatura(this.asignaturaId).subscribe((justificaciones) => {
            this.justificaciones = justificaciones;
  
            // Agrupar datos por fecha
            this.groupDataByDate();
  
            this.loading = false;
          });
        });
      },
      (error) => {
        console.error('Error al cargar datos:', error);
        this.loading = false;
      }
    );
  }


  groupDataByDate() {
    // Agrupar asistencias por fecha
    const groupedAsistencias = this.asistencias.reduce((acc, asistencia) => {
      const date = asistencia.fecha;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(asistencia);
      return acc;
    }, {} as { [key: string]: Asistencias[] });
  
    // Agrupar justificaciones por fecha
    const groupedJustificaciones = this.justificaciones.reduce((acc, justificacion) => {
      const date = justificacion.fecha;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(justificacion);
      return acc;
    }, {} as { [key: string]: Justificacion[] });
  
    // Convertir a arrays para facilitar su uso en la interfaz
    this.groupedAsistenciasArray = Object.entries(groupedAsistencias).map(([date, asistenciasGroup]) => ({
      date,
      asistenciasGroup,
    }));
  
    this.groupedJustificacionesArray = Object.entries(groupedJustificaciones).map(([date, justificacionesGroup]) => ({
      date,
      justificacionesGroup,
    }));
  }

  obtenerDiaSemana(fecha: string): string {
    // Usa el formato explícito para interpretar dd/mm/aaaa
    return moment(fecha, 'DD/MM/YYYY').locale('es').format('dddd'); // Obtiene el día de la semana en español
  }

  goToDetail(justificacionId: string) {
    this.router.navigate([`/tabs/justificaciones/${justificacionId}`]); // Pasa el id en la URL
  }
}

