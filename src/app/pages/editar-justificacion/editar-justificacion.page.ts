import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { IAsignatura } from 'src/app/interfaces/iasignatura';
import { AsignaturasApiService } from 'src/app/services/asignaturas-api.service';
import { Ijustificacion, Ijustificaciones } from 'src/app/interfaces/ijustificacion';
import { JustificacionApiService } from 'src/app/services/justificacion-api.service';
import { IProfesor } from 'src/app/interfaces/iprofesor';
import { ProfesorApiService } from 'src/app/services/profesor-api.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UsuarioApiService } from 'src/app/services/usuario-api.service';


@Component({
  selector: 'app-editar-justificacion',
  templateUrl: './editar-justificacion.page.html',
  styleUrls: ['./editar-justificacion.page.scss'],
})
export class EditarJustificacionPage implements OnInit {

  Asignaturas: IAsignatura[] = [];
  Profesores: IProfesor[] = [];
  justificacion: Ijustificaciones | undefined;
  Justificaciones: Ijustificacion[] = [];
  justificacionId: number | null = null;
  editarJustificacionForm: FormGroup;
  hoy: string;

  constructor(private jApi: JustificacionApiService,
              private alertcontroller: AlertController,
              private activated: ActivatedRoute,
              private router: Router,
              private aApi: AsignaturasApiService,
              private pApi: ProfesorApiService,
              private fBuilder: FormBuilder) { 
                this.editarJustificacionForm = this.fBuilder.group({
                  fecha: new FormControl (""),
                  asignatura: new FormControl (""),
                  docente: new FormControl (""),
                  descripcion: new FormControl (""),
                  imagen: new FormControl ("")
                });

                this.activated.queryParams.subscribe((params) => {
                  this.justificacion = JSON.parse(params['user']);
                })

                const fechaActual = new Date();
                this.hoy = fechaActual.toISOString().split('T')[0];
              }

  ngOnInit() {
    this.aApi.getAsignatura().subscribe((data:IAsignatura[]) => {
      this.Asignaturas = data;
    });
    
    this.pApi.getProfesor().subscribe((data: IProfesor[]) => {
      this.Profesores = data;
    });

    this.jApi.getJustificacion().subscribe((data: Ijustificacion[]) => {
      this.Justificaciones = data;
    });

    this.cargarJustificaciones();
  }

  cargarJustificaciones(){
    this.jApi.getJustificacion().subscribe(
      (data) => {
        this.Justificaciones = data;
      },
      (error) => {
        console.error('Error al cargar justificaciones:', error);
      }
    );
  }

  subirImagen(event: any){
    const file = event.target.files[0];
    const reader = new FileReader();  
    const nuevaJustificacion = this.editarJustificacionForm.value;
    if (file){
      reader.onload = () => {
        nuevaJustificacion.imagen = reader.result as string;
      };
      reader.readAsDataURL(file);
    } else {
      console.error("No se seleccionó ningún archivo.");
    }
  }

  async actualizarJustificacion(){
    if (!this.justificacion){
      console.error('No hay justificación seleccionada para editar.');
      return;
    }

    let fechaFormateada: string;
    const editarJustificacionDataForm = this.editarJustificacionForm.value;
    const fechaOriginal = new Date(editarJustificacionDataForm.fecha);
    fechaFormateada = `${fechaOriginal.getUTCDate().toString().padStart(2, '0')}-${(fechaOriginal.getUTCMonth() + 1).toString().padStart(2, '0')}-${fechaOriginal.getUTCFullYear()}`;

    let fechaSeleccionada: string;
    let idAsignaturaSeleccionada: number | undefined;
    let idProfesorSeleccionado: number | undefined;
    let descripcionNueva: string;
    let imagenNueva: string;
    

    if (editarJustificacionDataForm.fecha){
      fechaSeleccionada = fechaFormateada;
    } else{
      fechaSeleccionada = this.justificacion!.fecha;
    }

    if (editarJustificacionDataForm.asignatura){
      const asignaturaSeleccionada = this.Asignaturas.find(
        (asignatura) => asignatura.nombre === editarJustificacionDataForm.asignatura
      );
      idAsignaturaSeleccionada = Number(asignaturaSeleccionada?.id);
    } else{
      idAsignaturaSeleccionada = this.justificacion!.asignaturaId;
    }

    if (editarJustificacionDataForm.docente){
      const profesorSeleccionado = this.Profesores.find(
       (profesor) => profesor.nombre === editarJustificacionDataForm.docente 
      );
      idProfesorSeleccionado = Number(profesorSeleccionado?.id);
    } else{
      idProfesorSeleccionado = this.justificacion!.profesorId;
    }

    if (editarJustificacionDataForm.descripcion){
      descripcionNueva = editarJustificacionDataForm.descripcion;
    } else{
      descripcionNueva = this.justificacion!.descripcion;
    }

    if (editarJustificacionDataForm.imagen){
      imagenNueva = editarJustificacionDataForm.imagen;
    } else{
      imagenNueva = this.justificacion!.justificatorio;
    }


    const nuevaJustificacion: Ijustificacion = {
      id: this.justificacion!.id,
      profesorId: idProfesorSeleccionado,
      asignaturaId: idAsignaturaSeleccionada,
      alumnoId: this.justificacion!.alumnoId,
      nombre: this.justificacion!.nombre,
      fecha: fechaSeleccionada,
      asistio: this.justificacion!.asistio,
      justificatorio: imagenNueva,
      descripcion: descripcionNueva,
      comentario: this.justificacion!.comentario
    };

    try{
      const justificacionPromise = this.jApi.putJustificacion(nuevaJustificacion).toPromise();
      await Promise.all([justificacionPromise]);
      this.mensaje();
    } catch (err) {
      console.error('Error al actualizar la justificacion: ', err);
    }
  }

  async mensaje(){
    const alert = await this.alertcontroller.create({
      header: 'Actualizando su Justificación',
      message: 'Su justificación ha sido actualizada',
      cssClass: 'custom-alert',
      buttons: [
         {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.router.navigate(['/justificaciones']);
          },
        },
      ],
    });
    await alert.present();
  }

  volver(){
    this.router.navigate(['/detalle-justificacion']);
  }

}
