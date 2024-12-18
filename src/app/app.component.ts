import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController, ToastController } from '@ionic/angular';
import { AuthService } from './services/auth.service';


interface Menu{
  icon:string;
  redirecTo: string;
  name:string;
}
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  opciones:Menu[]=[
    {
      icon:'person-circle-outline',
      redirecTo:'/perfil',
      name:'Perfil'
    },
    {
      icon:'settings-outline',
      redirecTo:'/configuracion',
      name:'Configuracion'
    }
    ]
  constructor(
    private router: Router,
    private alert: AlertController,
    private auth: AuthService,
    private toast: ToastController,
    private menu: MenuController
  ) {}

  usuario:any;
  ngOnInit()  {
    this.usuario = sessionStorage.getItem('nombre');
    console.log(this.usuario);
  }

  async CerrarSesion(){
    const alert = await this.alert.create({
      header: 'Mensaje',
      mode:'ios',
      message: '¿Desea cerrar sesión?',
      buttons: [
        {
          text: 'Si',
          role: 'confirm',
          handler: () => {
              this.logOut();
          },
        },
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
              this.router.navigate(['/inicio']);
  
            },
        },
      ],
    });
    await alert.present();
  }

  logOut() {
    // Cerrar el menú manualmente
    this.menu.close('first');
  
    // Eliminar datos de sesión
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('password');
    sessionStorage.removeItem('correo');
    sessionStorage.removeItem('ingresado');
    sessionStorage.removeItem('profesorId');
  
    // Mostrar un mensaje de éxito
    this.showToast('Sesión Cerrada');
  
    // Redirigir a la página de login
    this.router.navigate(['/login']).then(() => {
      // Verificar redirección
      console.log('Redirigido al login');
    });
  }

  async showToast(msg: any){
    const toast= await this.toast.create({
      message:msg,
      duration: 3000
    })
    toast.present();
  }
}
