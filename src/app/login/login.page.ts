import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { UsuarioApiService } from '../services/usuario-api.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { RecoverPasswordService } from '../services/recover-password.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userdata:any;

  Usuario={
    id:0,
    nombre:"",
    apellido:"",
    correo:"",
    usuario:"",
    contrasenia:"",
    rut:"",
    isactive:false
  }

  loginForm:FormGroup;

  constructor(private alert: AlertController,
              private router: Router,
              private toast: ToastController,
              private uApi: UsuarioApiService,
              private afAuth: AngularFireAuth,
              private builder: FormBuilder) { 
                this.loginForm = this.builder.group({
                  "correo" : new FormControl("", [Validators.required, Validators.minLength(8)]),
                  "contrasenia" : new FormControl("", [Validators.required, Validators.minLength(8)])
                })
              }

  ngOnInit() {
  }

  login() {
    if (!this.loginForm.valid){
      return;
    }
    const correo = this.loginForm.value.correo;
    const contrasenia = this.loginForm.value.contrasenia;

    this.afAuth.signInWithEmailAndPassword(correo, contrasenia).then(() => {
      this.uApi.getCorreo(correo).subscribe(resp => {
        this.userdata = resp;
        console.log(this.userdata);
        if (this.userdata.Length === 0){
          this.loginForm.reset();
          this.UsuarioNoExiste();
          return;
        }

        this.Usuario = {
          id: this.userdata[0].id,
          nombre: this.userdata[0].nombre,
          apellido: this.userdata[0].apellido,
          correo: this.userdata[0].correo,
          usuario: this.userdata[0].usuario,
          contrasenia: this.userdata[0].contrasenia,
          rut: this.userdata[0].rut,
          isactive: this.userdata[0].isactive
        }
        if (this.Usuario.contrasenia !== contrasenia){
          const alumnoActualizado = { ...this.Usuario, contrasenia};
          this.uApi.putUsuario(alumnoActualizado).subscribe(
            () => {
              this.IniciarSesion(alumnoActualizado);
            },
            (error) => {
              console.error('Error al actualizar la contraseña en el JSON:', error);
              this.showToast('Error al sincronizar la contraseña en el sistema.');
            }
          )
        } else if (!this.Usuario.isactive){
          this.loginForm.reset();
          this.UsuarioInactivo();
          return;
        } else {
          this.IniciarSesion(this.Usuario);
        }
      },
      (error) => {
        console.error('Error al obtener usuario del JSON:', error);
        this.showToast('Hubo un error al buscar el usuario en el sistema.');
      }
    );
    }).catch((error) => {
      console.error('Error al iniciar sesión con Firebase:', error);
      this.ErrorUsuario();
    })
  }

  private IniciarSesion(Usuario:any){
    sessionStorage.setItem('nombre',Usuario.nombre);
    sessionStorage.setItem('apellido',Usuario.apellido);
    sessionStorage.setItem('correo',Usuario.correo);
    sessionStorage.setItem('usuario',Usuario.usuario);
    sessionStorage.setItem('contrasenia',Usuario.contrasenia);
    sessionStorage.setItem('rut',Usuario.rut);
    sessionStorage.setItem('ingresado', 'true');
    this.showToast('Sesión Iniciada');
    this.router.navigate(['/tabs/tab1']);
    this.mensaje();
  }

  async mensaje(){
    const alert = await this.alert.create({
      header: 'Bienvenido',
      message: 'Disfruta de ClassCheckIn',
      cssClass: 'custom-alert',
      buttons: [
         {
          text: 'OK',
          role: 'confirm',
        },
      ],
    });
    await alert.present();
  }

  async showToast(msg: any){
    const toast = await this.toast.create({
      message:msg,
      duration: 3000
    })
    toast.present();
  }

  async UsuarioInactivo(){
    const alerta = await this.alert.create({
      header: 'Usuario Inactivo',
      message: 'Contactar a admin@classcheckin.cl',
      cssClass: 'custom-alert',
      buttons: ['OK']
    })
    alerta.present();
  }

  async ErrorUsuario(){
    const alerta = await this.alert.create({
      header: 'Error',
      message: 'Revise sus credenciales',
      cssClass: 'custom-alert',
      buttons: ['OK']
    })
    alerta.present();
  }

  async UsuarioNoExiste(){
    const alerta = await this.alert.create({
      header: 'Usuario No existe',
      message: 'Debe registrarse',
      cssClass: 'custom-alert',
      buttons: ['OK']
    })
    alerta.present();
  }

  register() {
    this.router.navigate(['/register']);
  }

  olvidoContrasenia(){
    this.router.navigate(['/olvido-contrasenia']);
  }

}
