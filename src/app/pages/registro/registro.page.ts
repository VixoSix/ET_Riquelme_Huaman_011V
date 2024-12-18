import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ProfesorNuevo } from 'src/interfaces/profesor';
import { Location } from '@angular/common';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  registroForm: FormGroup;

  nuevoProfesor: ProfesorNuevo={
    nombre:"",
    apellido:"",
    usuario:"",
    correo:"",
    contrasenia:"",
    isactive:false,
    imagen:"",
    codigo_recuperacion:""
  }

  userdata: any;

  constructor(
    private authservice: AuthService,
    private alertcontroller: AlertController,
    private router: Router,
    private fBuilder: FormBuilder,
    private location: Location
  ) {
      this.registroForm = this.fBuilder.group({ 
      'usuario' : new FormControl ("", [Validators.required, Validators.minLength(6)]),
      'nombre' : new FormControl ("", [Validators.required]),
      'apellido' : new FormControl ("", [Validators.required]),
      'correo': new FormControl ("", [Validators.required, Validators.email]),
      'contrasenia': new FormControl("", [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]),
    })
}

  ngOnInit() {
  }

  crearUsuario(){
    if (this.registroForm.valid){
      this.authservice.GetUserByUsername(this.registroForm.value.username).subscribe(resp=>{
        this.userdata = resp; 
        if(this.userdata.length>0){
           this.registroForm.reset();
          this.errorDuplicidad();
        }
        else{
          this.nuevoProfesor.usuario = this.registroForm.value.usuario;
          this.nuevoProfesor.nombre = this.registroForm.value.nombre;
          this.nuevoProfesor.apellido = this.registroForm.value.apellido;
          this.nuevoProfesor.contrasenia = this.registroForm.value.contrasenia;
          this.nuevoProfesor.correo = this.registroForm.value.correo;
          this.nuevoProfesor.isactive=true;
          this.authservice.PostUsuario(this.nuevoProfesor).subscribe();
          this.registroForm.reset();
          this.mostrarMensaje();
          this.router.navigateByUrl('/login');
        }
      })
    }
  }

  async mostrarMensaje(){
    const alerta = await this.alertcontroller.create({
      header: 'Usuario creado',
      message: 'Bienvenid@! ' + this.nuevoProfesor.usuario,
      buttons: ['OK']
    });
    alerta.present();
  }

  async errorDuplicidad(){
    const alerta = await this.alertcontroller.create({
      header: 'Error..',
      message: 'Usted '+ this.nuevoProfesor.usuario + ' ya esta registrado:D',
      buttons: ['OK']
    });
    alerta.present();
  }

  volver() {
    this.location.back(); // Navega a la página anterior
  }

}
