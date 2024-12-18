import { Component } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { UsuarioApiService } from './services/usuario-api.service';
import { Router } from '@angular/router';

register();


interface Opciones{
  icon: string;
  redirecTo: string;
  name: string;
}

interface Menu{
  icon: string;
  redirecTo: string;
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  opciones: Opciones[] =[
    {
      icon:'person-outline',
      name: 'Perfil',
      redirecTo:'/perfil'
    },
    {
      icon:'clipboard-outline',
      name: 'Asistencias',
      redirecTo:'/asistencias'
    },
    {
      icon:'document-text-outline',
      name: 'Justificaciones',
      redirecTo:'/justificaciones'
    },
    {
      icon:'pencil-outline',
      name: 'Listado de Asignaturas',
      redirecTo:'/clases'
    },
    {
      icon:'school-outline',
      name: 'Listado de Docentes',
      redirecTo:'/docentes'
    },
    {
      icon:'log-out-outline',
      name: 'Cerrar Sesión',
      redirecTo:'/comienzo'
    }
  ]

  constructor(private userApi : UsuarioApiService,
    private router:Router
  ) {}

  handleOptionClick(opcion: Opciones) {
    if (opcion.name === 'Cerrar Sesión') {
      this.userApi.logOut();
      this.router.navigate([opcion.redirecTo]);
    } else {
      this.router.navigate([opcion.redirecTo]);
    }
  }
}
