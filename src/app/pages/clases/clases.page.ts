import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IAsignatura, ISeccion } from 'src/app/interfaces/iasignatura';
import { AsignaturasApiService } from 'src/app/services/asignaturas-api.service';
import { IProfesor } from 'src/app/interfaces/iprofesor';
import { ProfesorApiService } from 'src/app/services/profesor-api.service';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.page.html',
  styleUrls: ['./clases.page.scss'],
})
export class ClasesPage implements OnInit {

  Asignaturas: IAsignatura[] = [];
  Profesores: IProfesor[] = [];
  Secciones: ISeccion[] = [];
  asignaturasConProfesores: { asignatura: IAsignatura, profesor: IProfesor | null }[] = [];

  constructor(private router: Router,
              private pApi: ProfesorApiService,
              private aApi: AsignaturasApiService) { }

  ngOnInit() {
    this.aApi.getAsignatura().subscribe((data: IAsignatura[]) => {
      this.Asignaturas = data;
      this.generarAsignaturasConProfesores();
    });

    this.pApi.getProfesor().subscribe((data: IProfesor[]) => {
      this.Profesores = data;
      this.generarAsignaturasConProfesores();
    });

    this.aApi.getSeccion().subscribe((data: ISeccion[]) => {
      this.Secciones = data;
    });

    this.aApi.getAsignatura().subscribe((asignaturas: IAsignatura[]) => {
      this.Asignaturas = asignaturas;
      this.aApi.getSeccion().subscribe((secciones: ISeccion[]) => {
        this.Secciones = secciones;
      });
    });
  }

  getSeccion(asignatura: IAsignatura): string | undefined{
    const seccion = this.Secciones.find(
      (seccion) => seccion.id === asignatura.seccionId.toString()
    );
    return seccion?.seccion;
  }

  generarAsignaturasConProfesores() {
    if (this.Asignaturas.length && this.Profesores.length) {
      this.asignaturasConProfesores = this.Asignaturas.map(asignatura => {
        const profesor = this.Profesores.find(p => p.id === asignatura.profesorId.toString());
        return { asignatura, profesor: profesor || null }; // Si no hay profesor, devuelve null
      });
    }
  }

  // getProfesorPorId(profesorId: number): IProfesor | undefined{
  //   return this.Profesores.find(profesor => profesor.id === profesorId.toString());
  // }

  volver(){
    this.router.navigate(['/tabs/tab1']);
  }
}
