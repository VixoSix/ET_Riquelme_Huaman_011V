import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { UsuarioApiService } from 'src/app/services/usuario-api.service';
import { IUsuarios } from 'src/app/interfaces/iusuario';
import { AlertController } from '@ionic/angular';
import { RecoverPasswordService } from 'src/app/services/recover-password.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-olvido-contrasenia',
  templateUrl: './olvido-contrasenia.page.html',
  styleUrls: ['./olvido-contrasenia.page.scss'],
})
export class OlvidoContraseniaPage implements OnInit {

  restablecerForm: FormGroup;
  usuarios: IUsuarios[] = [];
  usuario:any;

  constructor(private router: Router,
              private uApi: UsuarioApiService,
              private alert: AlertController,
              private recover: RecoverPasswordService,
              private afAuth: AngularFireAuth,
              private fBuiler: FormBuilder) { 
                this.restablecerForm = this.fBuiler.group({
                  "correo" : new FormControl("", [Validators.required, Validators.minLength(8)])
                })
              }

  ngOnInit() {
  }

  IrARestablecer(){
    if (this.restablecerForm.valid){
      const correoIngresado = this.restablecerForm.get('correo')?.value;
      console.log("El correo ingresado es: ", correoIngresado);

      this.uApi.getUsuario().subscribe(async (usuarios) => {
        const usuarioExiste = usuarios.find((Usuario) => Usuario.correo === correoIngresado);
        console.log("El usuario almacenado con ese correo es: ", usuarioExiste);

        if (usuarioExiste){
          // this.router.navigate(['/recuperar-contrasenia'], {
          //   queryParams: { user: JSON.stringify(usuarioExiste) },
          // });
          const correo = this.restablecerForm.value.correo;
          try{
            await this.afAuth.sendPasswordResetEmail(correo);
            console.log('Correo de recuperación enviado. Revisa tu bandeja de entrada.');
            this.router.navigate(['/login']);
          } catch (error) {
            console.error('Error al enviar el correo: ', error);
          }
        } else {
          console.error('Usuario no encontrado');
          this.AlertaError();
        }
      })
    } else {
      console.error('Formulario invalido');
    }
  }

  async AlertaError() {
    const alerta = await this.alert.create({
      header: 'Error',
      message: 'El correo ingresado no existe',
      cssClass: 'custom-alert',
      buttons: ['OK']
    });
    alerta.present();
  }

  volver(){
    this.router.navigate(['/login']);
  }

}
