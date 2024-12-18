import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  usuario: any;

  constructor(
    private router: Router,
    private menucontroller: MenuController
  ) {}
  ngOnInit() {
    this.usuario = sessionStorage.getItem('username');
    console.log(this.usuario);
  }
  mostrarMenu(){
    this.menucontroller.enable(true); 
    this.menucontroller.open('first'); //invoca a menuId de App.component.html
  }

  Seccion() {
    this.router.navigate(['/tabs/clase']);
  }

  asistencia() {
    this.router.navigate(['/tabs/asistencias']);
  }

}
