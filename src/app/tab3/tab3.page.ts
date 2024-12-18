import { Component } from '@angular/core';
import { IAsignatura } from '../interfaces/iasignatura';
import { AsignaturasApiService } from '../services/asignaturas-api.service';
import { IProfesor } from '../interfaces/iprofesor';
import { ProfesorApiService } from '../services/profesor-api.service';
import { AlertController } from '@ionic/angular';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Ijustificacion } from '../interfaces/ijustificacion';
import { JustificacionApiService } from '../services/justificacion-api.service';
import { IUsuarios } from '../interfaces/iusuario';
import { UsuarioApiService } from '../services/usuario-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  imagenSubida: any = null;
  jForm: FormGroup;
  Asignaturas: IAsignatura[] = [];
  Profesores: IProfesor[] = [];
  usuarioActual: IUsuarios | undefined;
  hoy: string;
  
  constructor(private uApi: UsuarioApiService,
              private aApi: AsignaturasApiService,
              private pApi: ProfesorApiService,
              private jApi: JustificacionApiService,
              private alert: AlertController,
              private router: Router,
              private fbuilder: FormBuilder) {
                this.jForm = this.fbuilder.group({
                  "fecha": new FormControl ("", [Validators.required]),
                  "asignatura": new FormControl ("", [Validators.required]),
                  "docente": new FormControl ("", [Validators.required]),
                  "descripcion": new FormControl ("", [Validators.required]),
                  "imagen": new FormControl ("", [Validators.required])
                })

                const fechaActual = new Date();
                this.hoy = fechaActual.toISOString().split('T')[0];
              }

  ngOnInit(){
    this.aApi.getAsignatura().subscribe((data: IAsignatura[]) => {
      this.Asignaturas = data;
    });

    this.pApi.getProfesor().subscribe((data: IProfesor[]) => {
      this.Profesores = data;
    });

    const correo = sessionStorage.getItem('correo');
    if (correo){
      this.uApi.getUsuario().subscribe((usuarios: IUsuarios[]) => {
        this.usuarioActual = usuarios.find((usuario) => usuario.correo === correo);
        if (!this.usuarioActual){
          console.error('Usuario no encontrado con el correo:', correo);
        }
      });
    } else{
      console.error('No se encontró el correo en sessionStorage.');
    }

  }

  subirImagen(event: any){
    const file = event.target.files[0]; 
    const reader = new FileReader();
    const nuevaJustificacion = this.jForm.value;
    if (file){
       
      reader.onload = () => {
        nuevaJustificacion.imagen = reader.result as string;
      };
      reader.readAsDataURL(file);
    } else {
      console.error("No se seleccionó ningún archivo.");
    }
  }

  async CrearJustificacion(){
    if (this.jForm.valid && this.usuarioActual){
      let fechaFormateada: string;
      const justificacionDataForm = this.jForm.value;
      const fechaOriginal = new Date(justificacionDataForm.fecha);
      fechaFormateada = `${fechaOriginal.getUTCDate().toString().padStart(2, '0')}-${(fechaOriginal.getUTCMonth() + 1).toString().padStart(2, '0')}-${fechaOriginal.getUTCFullYear()}`;

      const asignaturaSeleccionada = this.Asignaturas.find(
        (asignatura) => asignatura.nombre === justificacionDataForm.asignatura
      );
      const profesorSeleccionado = this.Profesores.find(
        (profesor) => profesor.nombre === justificacionDataForm.docente
      );

      if (!asignaturaSeleccionada || !profesorSeleccionado){
        console.error('Error al encontrar asignatura o profesor seleccionado.');
        return;
      }

      const nuevaJustificacionId = await this.generarId();
      const nuevaJustificacion: Ijustificacion = {
        id: nuevaJustificacionId,
        profesorId: Number(profesorSeleccionado.id),
        asignaturaId: Number(asignaturaSeleccionada.id),
        alumnoId: Number(this.usuarioActual.id),
        nombre: `${this.usuarioActual.nombre} ${this.usuarioActual.apellido}`,
        fecha: fechaFormateada,
        asistio: false,
        justificatorio: justificacionDataForm.imagen,
        descripcion: justificacionDataForm.descripcion,
        comentario: ''
      };

      try {
        const justificacionPromise = this.jApi.postJustificacion(nuevaJustificacion).toPromise();
        await Promise.all([justificacionPromise]);
        this.mostrarMensaje();
      } catch (err) {
        console.error('Error al registrar la justificación', err);
      }
    } else {
      console.error('Formulario inválido o usuario no encontrado');
    }
  }

  async generarId(): Promise<string>{
    try{
      const justifiaciones = await this.jApi.getJustificacion().toPromise();
      if (!justifiaciones || justifiaciones.length === 0){
        return '1';
      }
      const maxId = justifiaciones.reduce((max, justificacion) => {
        const currentId = parseInt(justificacion.id, 10);
        return currentId > max ? currentId : max;
      }, 0);
      return (maxId + 1).toString();
    } catch (error) {
      console.error('Error al generar el ID:', error);
      return '1';
    }
  }

  limpiarTab3(){
    this.jForm.reset();
  }

  async mostrarMensaje(){
    const alerta = await this.alert.create({
      header: 'Justificacion creada',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.router.navigate(['/justificaciones']);
            this.limpiarTab3();
          }
        }
      ]
    });
    alerta.present();
  }
}
