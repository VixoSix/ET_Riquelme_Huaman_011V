import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { UsuarioApiService } from 'src/app/services/usuario-api.service';
import { IUsuario, IUsuarios } from 'src/app/interfaces/iusuario';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
})
export class EditarPerfilPage implements OnInit {

  usuario: any;
  usuarios: IUsuarios[] = [];
  editarUsuarioForm: FormGroup;

  constructor(private router: Router,
              private alertcontroller: AlertController,
              private activated: ActivatedRoute,
              private uApi: UsuarioApiService,
              private fBuilder: FormBuilder) { 
                this.editarUsuarioForm = this.fBuilder.group({
                  "nombre": new FormControl (""),
                  "apellido": new FormControl (""),
                  "usuario": new FormControl (""),
                  "imagen": new FormControl ("")
                })
              }

  ngOnInit() {
    const correo = sessionStorage.getItem('correo');
    if (correo) {
      this.uApi.getUsuario().subscribe((usuarios) => {
        this.usuarios = usuarios;
        this.usuario = this.usuarios.find((user) => user.correo === correo);
        if (this.usuario) {
          this.editarUsuarioForm.patchValue({
            nombre: this.usuario.nombre,
            apellido: this.usuario.apellido,
            usuario: this.usuario.usuario
          });
        } else {
          console.error('Usuario no encontrado para el correo:', correo);
        }
      });
    } else {
      console.error('Correo no encontrado en la sesión.');
    }
  }

  subirImagen(event: any){
    const file = event.target.files[0];
    const reader = new FileReader();
    const perfilEditado = this.editarUsuarioForm.value;
    if (file) {
      reader.onload = () => {
        perfilEditado.imagen = reader.result as string;
      };
      reader.readAsDataURL(file);
    } else {
      console.error("No se seleccionó ningún archivo.");
    }
  }

  guardarYSalir(){
    if (this.editarUsuarioForm) {
      const correo = sessionStorage.getItem('correo');
      const perfilEditado = this.editarUsuarioForm.value;
      if (correo) {
        this.uApi.getUsuario().subscribe((usuarios) => {
          const usuario = usuarios.find((Usuario) => Usuario.correo === correo);
          if (usuario) {
            const perfilEncontrado = this.usuario;

            console.log('Cambios en el perfil: ', perfilEditado);

            if (perfilEncontrado) {
              console.log('Usuario encontrado: ', perfilEncontrado);

              if(perfilEditado.nombre) {
                perfilEncontrado.nombre = perfilEditado.nombre;
              }
              if(perfilEditado.apellido) {
                perfilEncontrado.apellido = perfilEditado.apellido;
              }
              if(perfilEditado.usuario) {
                perfilEncontrado.usuario = perfilEditado.usuario;
              }
              if(perfilEditado.imagen) {
                perfilEncontrado.imagen = perfilEditado.imagen;
              }
              console.log('Perfil acualizado: ', perfilEncontrado);

              this.uApi.putUsuario(perfilEncontrado).subscribe({
                next: (updatedUsuario) => {
                  console.log('Perfil actualizado:', updatedUsuario);
                  this.mensaje();
                },
                error: (err) => {
                  console.error('Error al actualizar el perfil:', err);
                }
              });
            } else {
              console.warn('No se encontró ninung perfil de usuario');
            }
          } else {
            console.error('No se encontró ningún usuario');
          }
        })
      } else {
        console.error('No se encontró ningún correo de usuario');
      }
    } else {
      console.error('Formulario invalido');
    }
  }

  async mensaje(){
    const alert = await this.alertcontroller.create({
      header: 'Mensaje',
      message: 'Su usuario ha sido modificado',
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler:() => {
            this.router.navigate(['/perfil']);
          },
        },
      ],
    });
    await alert.present();
  }

  eliminarImagen() {
    const correo = sessionStorage.getItem('correo');
    if (correo) {
      this.uApi.getUsuario().subscribe((usuarios) => {
        const usuario = usuarios.find((Usuario) => Usuario.correo === correo);
        if (usuario) {
          // Eliminar solo la imagen, sin afectar otros datos del usuario
          usuario.imagen = '';

          this.uApi.putUsuario(usuario).subscribe({
            next: (updatedUsuario) => {
              console.log('Imagen eliminada:', updatedUsuario);
              this.mensaje();
            },
            error: (err) => {
              console.error('Error al eliminar la imagen:', err);
            }
          });
        } else {
          console.error('No se encontró ningún usuario');
        }
      });
    } else {
      console.error('No se encontró ningún correo de usuario');
    }
  }

  async consultaEliminar(){
    const alert = await this.alertcontroller.create({
      header: 'Confirmar Eliminación',
      message: 'Elimina la información?',
      cssClass: 'custom-alert',
      buttons: [
         {
          text: 'Si',
          role: 'confirm',
          handler: () => {
            this.eliminarImagen();
            this.mensaje();
          },
        },
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            this.router.navigate(['/perfil']);
          },
        },
      ],
    });
    await alert.present();
  }
  volver(){
    this.router.navigate(['/perfil']);
  }
}
