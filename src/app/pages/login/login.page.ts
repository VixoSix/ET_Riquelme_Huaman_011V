import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userdata: any;

  profesor = {
    id: 0,
    nombre:"",
    apellido:"",
    usuario: "",
    correo: "",
    contrasenia: "",
    isactive: false,
    imagen:""
  }

  loginForm: FormGroup;

  constructor(
    private authservice: AuthService,
    private router: Router,
    private toast: ToastController,
    private alertcontroller: AlertController,
    private builder: FormBuilder,
    private afAuth: AngularFireAuth
  ) {
    this.loginForm = this.builder.group({
      'correo': new FormControl("", [Validators.required, Validators.email]),
      'contrasenia': new FormControl("", [Validators.required, Validators.minLength(8)]),
    })
  }

  ngOnInit() {
    if (this.authservice.IsLoggedIn()) {

      this.showToast('Debe cerrar sesión para volver al login');

      // Si está logueado, redirige a la página de inicio
      this.router.navigate(['/tabs/inicio']);
      
    }
  }

  login() {
    if (!this.loginForm.valid) {
      return;
    }

    const correo = this.loginForm.value.correo;
    const contrasenia = this.loginForm.value.contrasenia;

    this.afAuth.signInWithEmailAndPassword(correo, contrasenia).then(() => {
      this.authservice.getEmail(correo).subscribe(
        (resp:any) => {
          this.userdata = resp;

          if (this.userdata.length === 0) {
            this.loginForm.reset();
            this.UsuarioNoExiste();
            return;
          }

          this.profesor = {
            id: this.userdata[0].id,
            nombre:this.userdata[0].nombre,
            apellido:this.userdata[0].apellido,
            usuario: this.userdata[0].usuario,
            contrasenia: this.userdata[0].contrasenia,
            correo: this.userdata[0].correo,
            isactive: this.userdata[0].isactive,
            imagen:this.userdata[0].imagen
          };
          if (this.profesor.contrasenia !== contrasenia) {
            const profesorActualizado = { ...this.profesor, contrasenia};
            this.authservice.putUsuario(profesorActualizado).subscribe(
              () => {
                this.IniciarSesion(profesorActualizado);
              },
              (error) => {
                console.error('Error al actualizar la contraseña en el JSON:', error);
                this.showToast('Error al sincronizar la contraseña en el sistema.');
              }
            )
          } else if (!this.profesor.isactive) {
            this.loginForm.reset();
            this.UsuarioInactivo();
            return;
          } else {
            this.IniciarSesion(this.profesor);
          }
        },
        (error) => {
          console.error('Error al obtener usuario del JSON:', error);
          this.showToast('Hubo un error al buscar el usuario en el sistema.');
        }
      );
    }).catch((error) => {
      console.error('Error al iniciar sesión con Firebase:', error);
      this.ErrorUsuario(); // Muestra error en caso de credenciales incorrectas
    });
  }

  private IniciarSesion(profesor: any) {
    sessionStorage.clear(); // Limpia los datos previos
    sessionStorage.setItem('profesorId', profesor.id);
    sessionStorage.setItem('username', profesor.usuario);
    sessionStorage.setItem('password', profesor.contrasenia);
    sessionStorage.setItem('correo', profesor.correo);
    sessionStorage.setItem('ingresado', 'true');
    this.showToast('Sesión Iniciada ' + profesor.usuario);
    this.router.navigate(['/tabs/inicio']);
  }


  async showToast(msg: any) {
    const toast = await this.toast.create({
      message: msg,
      duration: 3000
    })
    toast.present();
  }


  async UsuarioInactivo() {
    const alerta = await this.alertcontroller.create({
      header: 'Usuario inactivo',
      message: 'Contactar a admin@admin.cl',
      buttons: ['OK']
    })
    alerta.present();
  }


  async ErrorUsuario() {
    const alerta = await this.alertcontroller.create({
      header: 'Error..',
      message: 'Revise sus credenciales',
      buttons: ['OK']
    })
    alerta.present();
  }

  async UsuarioNoExiste() {
    const alerta = await this.alertcontroller.create({
      header: 'No existe...',
      message: 'Debe registrarse..',
      buttons: ['OK']
    })
    alerta.present();
  }

  Registrar() {
    this.router.navigate(['/registro']);
  }

  Password(){
    this.router.navigate(['/password']);
  }
}
