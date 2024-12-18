import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsuarioApiService } from 'src/app/services/usuario-api.service';
import { IUsuarios } from 'src/app/interfaces/iusuario';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recuperar-contrasenia',
  templateUrl: './recuperar-contrasenia.page.html',
  styleUrls: ['./recuperar-contrasenia.page.scss'],
})
export class RecuperarContraseniaPage implements OnInit {

  restablecerForm: FormGroup;
  usuario:any;
  usuarios: IUsuarios[] = [];

  constructor(private router: Router,
              private activated: ActivatedRoute,
              private uApi: UsuarioApiService,
              private alertcontroller: AlertController,
              private fBuilder: FormBuilder) { 
                this.restablecerForm = this.fBuilder.group({
                  "contrasenia1" : new FormControl("", [Validators.required, Validators.minLength(8)]),
                  "contrasenia2" : new FormControl("", [Validators.required, Validators.minLength(8)])
                })
                this.activated.queryParams.subscribe(params => {
                  this.usuario = JSON.parse(params['user'])
                })
              }

  ngOnInit() {
    this.activated.queryParams.subscribe(params => {
      console.log('Query Params:', params); 
    });
  }

  actualiarContrasenia(){
    if (this.restablecerForm.valid){
      const contrasenias = this.restablecerForm.value;
      const contrasenia1 = contrasenias.contrasenia1;
      const contrasenia2 = contrasenias.contrasenia2;
      if (contrasenia1 == contrasenia2){
        this.activated.queryParams.subscribe(params => {
          if (params['user']) {
            this.usuario = JSON.parse(params['user']);
          } else {
            console.warn('No se encontró el parámetro usuario.');
          }
        });
        if (this.usuario && this.usuario.id) {
          this.usuario.contrasenia = contrasenia1;
        
          this.uApi.putUsuario(this.usuario).subscribe({
            next: (updatedUsuario) => {
              console.log('Usuario actualizado después de modificar la contraseña: ', updatedUsuario);
              this.mensaje();
            },
            error: (err) => {
              console.error('Error al actualizar el usuario:', err);
            }
          });
        } else {
          console.warn('No se encontró un usuario válido para actualizar.');
        }
      } else {
        console.error('Las contraseñas no coinciden');
        this.AlertaError();
      }
    } else {
      console.error('Formulario invalido');
    }
  }

  async mensaje(){
    const alert = await this.alertcontroller.create({
      header: 'Actualizando su Contraseña',
      message: 'Su Contraseña ha sido actualizada',
      cssClass: 'custom-alert',
      buttons: [
         {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.router.navigate(['/login']);
          },
        },
      ],
    });
    await alert.present();
  }

  async AlertaError() {
    const alerta = await this.alertcontroller.create({
      header: 'Error',
      message: 'Las contraseñas no coinciden',
      cssClass: 'custom-alert',
      buttons: ['OK']
    });
    alerta.present();
  }

  volver(){
    this.router.navigate(['/olvido-contrasenia']);
  }
}
