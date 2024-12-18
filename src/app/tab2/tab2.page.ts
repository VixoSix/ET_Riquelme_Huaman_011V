import { Component, OnInit } from '@angular/core';
import { Asignaturas } from 'src/interfaces/asignatura';
import { AsignaturasService } from '../services/asignaturas.service';
import { Seccion } from 'src/interfaces/seccion';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  asignaturas: Asignaturas[] = [];
  secciones: Seccion[] = [];
  profesorId!: number;
  seccionesCargadas = false;
  constructor(
    private asignaturasService: AsignaturasService,
    private router:Router
  ) { }

  ngOnInit() {
    this.cargarDatos();
  }

  ionViewWillEnter() {
    this.cargarDatos();
  }

  cargarDatos() {
    // Obtener el profesorId del sessionStorage
    this.profesorId = +sessionStorage.getItem('profesorId')!;
  
    // Traer todas las asignaturas
    this.asignaturasService.getAllAsignaturas().subscribe(
      (data) => {
        this.asignaturas = data.filter(asignatura => asignatura.profesorId === this.profesorId);
        console.log('Asignaturas filtradas:', this.asignaturas);
      },
      (error) => {
        console.error('Error al obtener asignaturas:', error);
      }
    );
  
    // Traer todas las secciones
    this.asignaturasService.getSecciones().subscribe(
      (data) => {
        this.secciones = data;
        this.seccionesCargadas = true; // Marcamos que las secciones están listas
        console.log('Secciones obtenidas:', this.secciones);
      },
      (error) => {
        console.error('Error al obtener secciones:', error);
      }
    );
  }

  getSeccionNombre(seccionId: string): string {
    if (!this.secciones || this.secciones.length === 0) {
      console.warn('Las secciones aún no están cargadas.');
      return 'Sección no encontrada';
    }
    const seccion = this.secciones.find(sec => String(sec.id) === String(seccionId));
  
    return seccion ? seccion.seccion : 'Sección no encontrada';
  }

  verAsistencias(asignaturaId: string): void {
    this.router.navigate(['/tabs/asistencias', asignaturaId]);
  }
}