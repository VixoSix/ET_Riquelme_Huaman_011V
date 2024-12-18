import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { IAsignatura } from 'src/app/interfaces/iasignatura';
import { AsignaturasApiService } from 'src/app/services/asignaturas-api.service';
import { IProfesor } from 'src/app/interfaces/iprofesor';
import { ProfesorApiService } from 'src/app/services/profesor-api.service';
import { Iasistencia, Iasistencias } from 'src/app/interfaces/iasistencia';
import { AsistenciaApiService } from 'src/app/services/asistencia-api.service';
import { IQrsGenerado, IQrsGenerados } from 'src/app/interfaces/i-qrs-generados';
import { QrsGeneradosApiService } from 'src/app/services/qrs-generados-api.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-editar-asistencia',
  templateUrl: './editar-asistencia.page.html',
  styleUrls: ['./editar-asistencia.page.scss'],
})
export class EditarAsistenciaPage implements OnInit {
  Asignaturas: IAsignatura[] = [];
  Profesores: IProfesor[] = [];
  asistencia: Iasistencias | undefined;
  Asistencias: Iasistencia[] = [];
  qrData: IQrsGenerado | undefined;
  asistenciaId: number | null = null;
  editarAsistenciaForm: FormGroup;
  hoy: string;
  qrdata: string;

  constructor(private activated: ActivatedRoute,
              private router: Router,
              private alertcontroller: AlertController,
              private pApi: ProfesorApiService,
              private aApi: AsignaturasApiService,
              private qrApi: QrsGeneradosApiService,
              private asisApi: AsistenciaApiService,
              private fBuilder: FormBuilder) {
                this.editarAsistenciaForm = this.fBuilder.group({
                  asignatura: new FormControl(''),
                  fecha: new FormControl(''),
                  docente: new FormControl(''),
                });
                this.qrdata = '';

                this.activated.queryParams.subscribe((params) => {
                  this.asistencia = JSON.parse(params['user']);
                });

                const fechaActual = new Date();
                this.hoy = fechaActual.toISOString().split('T')[0];
              }

  ngOnInit() {
    this.aApi.getAsignatura().subscribe((data: IAsignatura[]) => {
      this.Asignaturas = data;
    });

    this.pApi.getProfesor().subscribe((data: IProfesor[]) => {
      this.Profesores = data;
    });

    this.asisApi.getAsistencia().subscribe((data: Iasistencia[]) => {
      this.Asistencias = data;
    });

    this.cargarAsistencias();
  }

  cargarAsistencias() {
    this.asisApi.getAsistencia().subscribe(
      (data) => {
        this.Asistencias = data;
      },
      (error) => {
        console.error('Error al cargar asistencias:', error);
      }
    );
  }

  async actualizarAsistencia() {
    if (!this.asistencia){
      console.error('No hay asistencia seleccionada para editar.');
      return;
    }

    //Obtener el qr asociado a la asistencia para editar
    this.qrApi.getQr().subscribe(
      async (qrs: IQrsGenerados[]) => {
        const qrAsociado = qrs.find(qr => qr.idAsistencia === this.asistencia!.id);
        if (!qrAsociado){
          console.error('No se encontró un QR asociado a esta asistencia.');
          return;
        }
        let fechaFormateada: string;
        //Obetner los datos del formulario
        const editarAsistenciaDataForm = this.editarAsistenciaForm.value;
        const fechaOriginal = new Date(editarAsistenciaDataForm.fecha);
        fechaFormateada = `${fechaOriginal.getUTCDate().toString().padStart(2, '0')}-${(fechaOriginal.getUTCMonth() + 1).toString().padStart(2, '0')}-${fechaOriginal.getUTCFullYear()}`;
  
        let idAsignaturaSeleccionada: number | undefined;
        let idProfesorSeleccionado: number | undefined;
        let fechaSeleccionada: string;

        if(editarAsistenciaDataForm.asignatura){
          const asignaturaSeleccionada = this.Asignaturas.find(
              (asignatura) => asignatura.nombre === editarAsistenciaDataForm.asignatura
            );
          idAsignaturaSeleccionada = Number(asignaturaSeleccionada?.id);
        } else {
          idAsignaturaSeleccionada = this.asistencia!.asignaturaId;
        }
        if (editarAsistenciaDataForm.docente){
          const profesorSeleccionado = this.Profesores.find(
            (profesor) => profesor.nombre === editarAsistenciaDataForm.docente
          );
          idProfesorSeleccionado = Number(profesorSeleccionado?.id);
        } else{
          idProfesorSeleccionado = this.asistencia!.profesorId;
        }
        if (editarAsistenciaDataForm.fecha){
          fechaSeleccionada = fechaFormateada;
        } else{
          fechaSeleccionada = this.asistencia!.fecha;
        }

        //Validar que no existan asistencias duplicadas
        const duplicada = this.Asistencias.some(
          (a) => 
            a.id !== this.asistencia!.id &&
            a.asignaturaId == idAsignaturaSeleccionada &&
            a.fecha == fechaSeleccionada
        );
        if (duplicada){
          this.mostrarAlerta(
            'Ya existe una asistencia registrada con esa asignatura y fecha.'
          );
          return;
        }

        //GENERAR LOS DATOS DEL QR:
        this.qrdata = JSON.stringify({
          idAsistencia: qrAsociado.idAsistencia,
          idProfesor: idProfesorSeleccionado,
          idAsignatura: idAsignaturaSeleccionada,
          idAlumno: qrAsociado.idAlumno,
          rut: qrAsociado.rut,
          nombre: qrAsociado.nombre,
          fechaAsistencia: fechaSeleccionada,
          asistio: qrAsociado.asistio
        })

        //Editar el QR asociado
        const qrActualizado: IQrsGenerado = {
          id: qrAsociado.id,
          idAsistencia: qrAsociado.idAsistencia,
          idProfesor: idProfesorSeleccionado,
          idAsignatura: idAsignaturaSeleccionada,
          idAlumno: qrAsociado.idAlumno,
          rut: qrAsociado.rut,
          nombre: qrAsociado.nombre,
          fechaAsistencia: fechaSeleccionada,
          asistio: qrAsociado.asistio,
          qr: this.qrdata
        }

        //Editar la asistencia
        const nuevaAsistencia: Iasistencia = {
          id: this.asistencia!.id,
          profesorId: idProfesorSeleccionado,
          asignaturaId: idAsignaturaSeleccionada,
          alumnoId: this.asistencia!.alumnoId,
          rut: this.asistencia!.rut,
          nombre: this.asistencia!.nombre,
          fecha: fechaSeleccionada,
          asistio: this.asistencia!.asistio
        };

        try{
          const asistenciaPromise = this.asisApi.putAsistencia(nuevaAsistencia).toPromise();
          const qrPromise = this.qrApi.putQr(qrActualizado).toPromise();
          await Promise.all([asistenciaPromise, qrPromise]);
          this.mensaje();
        } catch (err) {
          console.error('Error al actualizar la asistencia o el QR: ', err);
        }
      }
    )
  }

  async mensaje() {
    const alert = await this.alertcontroller.create({
      header: 'Actualizando su Asistencia',
      message: 'Su asistencia ha sido actualizada',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.router.navigate(['/asistencias']);
          },
        },
      ],
    });
    await alert.present();
  }

  async mostrarAlerta(mensaje: string) {
    const alerta = await this.alertcontroller.create({
      header: 'Error',
      message: mensaje,
      cssClass: 'custom-alert',
      buttons: ['OK'],
    });
    alerta.present();
  }

  volver() {
    this.router.navigate(['/detalle-asistencia']);
  }
}