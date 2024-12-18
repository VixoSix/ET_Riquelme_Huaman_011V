import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { UsuarioApiService } from '../services/usuario-api.service';
import { IUsuario } from '../interfaces/iusuario';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  newUsuario: IUsuario={
    id: "",
    nombre: "",
    apellido: "",
    correo: "",
    usuario: "",
    contrasenia: "",
    rut:"",
    imagen:"",
    isactive: false,
    codigo_recuperacion:""
  }

  userdata: any;

  registroForm: FormGroup;

  constructor(private alert: AlertController,
              private router: Router,
              private uApi: UsuarioApiService,
              private fBuilder: FormBuilder) { 
                this.registroForm = this.fBuilder.group({
                  "nombre": new FormControl ("", [Validators.required, Validators.minLength(3)]),
                  "apellido": new FormControl ("", [Validators.required, Validators.minLength(3)]),
                  "correo": new FormControl ("", [Validators.required, Validators.email]),
                  "contrasenia": new FormControl ("", [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]),
                  "usuario": new FormControl ("", [Validators.required, Validators.minLength(3)]),
                  "rut": new FormControl ("", [Validators.required, Validators.minLength(8)])
                })
  }

  ngOnInit() {
  }

  volver() {
    this.router.navigateByUrl('/login');
  }

  registrarse() {
    if (this.registroForm.valid){
      this.uApi.getCorreo(this.registroForm.value.email).subscribe(async resp =>{
        this.userdata = resp;
        if (this.userdata.Length>0){
          this.registroForm.reset();
          this.errorDuplicidad();
        }
        else{
          this.newUsuario.id = await this.generarId();
          this.newUsuario.nombre =  this.registroForm.value.nombre;
          this.newUsuario.apellido = this.registroForm.value.apellido;
          this.newUsuario.correo = this.registroForm.value.correo;
          this.newUsuario.usuario = this.registroForm.value.usuario;
          this.newUsuario.contrasenia = this.registroForm.value.contrasenia;
          this.newUsuario.rut = this.registroForm.value.rut;
          this.newUsuario.isactive=true;
          this.uApi.postUsuario(this.newUsuario).subscribe();
          this.registroForm.reset();
          this.mostrarMensaje();
          this.router.navigateByUrl('/tabs/tab1');
        }
      })
    }
  }

  async generarId() {
    try{
      const usuarios = await this.uApi.getUsuario().toPromise();
      if (!usuarios || usuarios.length === 0){
        return '1';
      }
      const maxId = usuarios.reduce((max,usuario) => {
        const currentId = parseInt(usuario.id, 10);
        return currentId > max ? currentId : max;
      }, 0);
      return (maxId + 1).toString();
    } catch (error) {
      console.error('Error al generar el ID:', error);
      return '1';
    }
  }

  async mostrarMensaje(){
    const alerta = await this.alert.create({
      header: 'Usuario registrado',
      message: 'Bienvenid@! ' + this.newUsuario.nombre,
      cssClass: 'custom-alert',
      buttons: ['OK']
    });
    alerta.present();
  }

  async errorDuplicidad(){
    const alerta = await this.alert.create({
      header: 'Error',
      message: this.newUsuario.nombre + ' ya está registrado',
      cssClass: 'custom-alert',
      buttons: ['OK']
    });
    alerta.present();
  }

}
