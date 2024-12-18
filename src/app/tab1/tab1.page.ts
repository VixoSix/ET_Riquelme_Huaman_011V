import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { UsuarioApiService } from '../services/usuario-api.service';
import { IAsignatura, ISeccion } from '../interfaces/iasignatura';
import { AsignaturasApiService } from '../services/asignaturas-api.service';
import { IProfesor } from '../interfaces/iprofesor';
import { ProfesorApiService } from '../services/profesor-api.service';
import { Swiper } from 'swiper';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page{

  swiper: Swiper | undefined;
  Usuario: any;
  userdata:any;
  Asignaturas: IAsignatura[] = [];
  Profesores: IProfesor[] = [];
  Secciones: ISeccion[] = [];

  constructor(private menucontroller:MenuController,
              private router: Router,
              private uApi: UsuarioApiService,
              private aApi: AsignaturasApiService,
              private pApi: ProfesorApiService) {}

  ngOnInit(){
    this.swiper = new Swiper('.swiper-container', {
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });

    const correoLogeado = sessionStorage.getItem('correo');

    this.uApi.getCorreo(correoLogeado).subscribe(resp => {
      this.userdata = resp;
      this.Usuario =  {
        id: this.userdata[0].id,
        nombre: this.userdata[0].nombre,
        apellido: this.userdata[0].apellido,
        correo: this.userdata[0].correo,
        usuario: this.userdata[0].usuario,
        contrasenia: this.userdata[0].contrasenia,
        rut: this.userdata[0].rut,
        isactive: this.userdata[0].isactive,
        imagen: this.userdata[0].imagen
      }
    });

    this.aApi.getAsignatura().subscribe((data: IAsignatura[]) => {
      this.Asignaturas = data;
    });

    this.pApi.getProfesor().subscribe((data: IProfesor[]) =>{
      this.Profesores = data;
    });

    this.aApi.getSeccion().subscribe((data: ISeccion[]) => {
      this.Secciones = data;
    })

    this.aApi.getAsignatura().subscribe((asignaturas: IAsignatura[]) => {
      this.Asignaturas = asignaturas;
      this.aApi.getSeccion().subscribe((secciones: ISeccion[]) => {
        this.Secciones = secciones;
      });
    });
  }

  getSeccion(asignatura: IAsignatura): string | undefined {
    const seccion = this.Secciones.find(
      (seccion) => seccion.id === asignatura.seccionId.toString()
    );
    return seccion?.seccion;
  }

  getProfesorPorId(profesorId: number): IProfesor | undefined {
    return this.Profesores.find(profesor => profesor.id === profesorId.toString());
  }

  ionViewWillEnter(){
    this.swiper = new Swiper('.swiper-container', {
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });

    const correoLogeado = sessionStorage.getItem('correo');
    this.uApi.getCorreo(correoLogeado).subscribe(resp => {
      this.userdata = resp;
      this.Usuario =  {
        id: this.userdata[0].id,
        nombre: this.userdata[0].nombre,
        apellido: this.userdata[0].apellido,
        correo: this.userdata[0].correo,
        usuario: this.userdata[0].usuario,
        contrasenia: this.userdata[0].contrasenia,
        rut: this.userdata[0].rut,
        isactive: this.userdata[0].isactive,
        imagen: this.userdata[0].imagen
      }
    });
  }

  mostrarMenu(){
    this.menucontroller.open('first');
  }

  irAlPerfil(){
    this.router.navigate(['/perfil']);
  }

  verAsignaturas(){
    this.router.navigate(['/clases']);
  }

  verDocentes(){
    this.router.navigate(['/docentes']);
  }

}
