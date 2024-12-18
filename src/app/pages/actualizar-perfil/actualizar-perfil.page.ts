import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service'; // Asegúrate de importar el servicio
import { Profesor } from 'src/interfaces/profesor';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';



@Component({
  selector: 'app-actualizar-perfil',
  templateUrl: './actualizar-perfil.page.html',
  styleUrls: ['./actualizar-perfil.page.scss'],
})
export class ActualizarPerfilPage{

  usuario: any
  editMode: boolean = false;
  profesor = {
    id: "",
    usuario: "",
    nombre: "",
    apellido: "",
    correo: "",
    contrasenia: "",
    isactive: false,
    imagen: ""
  };

  seleccionarImagen: string | ArrayBuffer | null = null;
  actualizarImagen: any = {};

  constructor(
    private alertcontroller: AlertController,
    private router: Router,
    private activated: ActivatedRoute,
    private auth: AuthService,
    private location: Location,
  ) {
    this.activated.queryParams.subscribe(param => {
      try {
        this.usuario = JSON.parse(param['usuario']);
      } catch (error) {
        console.error('Error al procesar los datos del usuario:', error);
      }
    });
  }

  ngOnInit() {
    // Aquí se asegura que el objeto usuario esté correctamente asignado
    this.profesor = this.usuario;
    this.actualizarImagen = this.profesor.imagen;

    if (this.profesor.imagen) {
      this.seleccionarImagen = this.profesor.imagen;
    }
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  guardarCambios() {
    if (this.usuario) {
      console.log('Usuario a actualizar:', this.usuario); // Verifica los valores
      this.auth.putUsuario(this.profesor).subscribe(
        (resp) => {
          this.usuario = resp; // Asegura que el usuario se actualice correctamente
          this.profesor = resp;
          this.editMode = false; // Desactiva el modo de edición
          this.mensaje(); // Muestra el mensaje de éxito
        },
        (error) => console.error('Error al actualizar el perfil:', error)
      );
    }
  }

  subirImagen(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    if (file) {
      reader.onload = () => {
        this.seleccionarImagen = reader.result;
        this.usuario.imagen = reader.result;
      };

      reader.readAsDataURL(file);
    }
  }

  async mensaje() {
    const alert = await this.alertcontroller.create({
      header: 'Mensaje',
      message: 'Su usuario ha sido modificado',
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            // Enviar el usuario actualizado a la página de perfil
            this.router.navigate(['/perfil'], {
              queryParams: { usuario: JSON.stringify(this.usuario) }
            });
          },
        },
      ],
    });

    await alert.present();
  }

  volver() {
    this.location.back(); // Navega a la página anterior
  }
}