import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Iasistencias } from 'src/app/interfaces/iasistencia';
import { AsistenciaApiService } from 'src/app/services/asistencia-api.service';
import { IQrsGenerados } from 'src/app/interfaces/i-qrs-generados';
import { QrsGeneradosApiService } from 'src/app/services/qrs-generados-api.service';
import { IAsignatura } from 'src/app/interfaces/iasignatura';
import { AsignaturasApiService } from 'src/app/services/asignaturas-api.service';
import { IProfesor } from 'src/app/interfaces/iprofesor';
import { ProfesorApiService } from 'src/app/services/profesor-api.service';

@Component({
  selector: 'app-detalle-asistencia',
  templateUrl: './detalle-asistencia.page.html',
  styleUrls: ['./detalle-asistencia.page.scss'],
})
export class DetalleAsistenciaPage implements OnInit {

  asistencias: Iasistencias[] = [];
  qrGenerado: any;
  qrsGenerados: IQrsGenerados[] = [];
  asignatura: IAsignatura | undefined;
  asistencia: Iasistencias | undefined;
  profesor: IProfesor | undefined;

  constructor(private activated: ActivatedRoute,
              private router: Router,
              private alertcontroller: AlertController,
              private asisApi: AsistenciaApiService,
              private qrApi: QrsGeneradosApiService,
              private aApi: AsignaturasApiService,
              private pApi: ProfesorApiService) { 
                this.activated.queryParams.subscribe(params => {
                  this.asistencia = JSON.parse(params['user'])

                  this.aApi.getAsignatura().subscribe((asignaturas: IAsignatura[]) => {
                    const asignaturaIdAsString = this.asistencia!.asignaturaId.toString();
                    this.asignatura = asignaturas.find(a => a.id === asignaturaIdAsString);
                  });

                  this.pApi.getProfesor().subscribe((profesores: IProfesor[]) => {
                    const profesorIdAsString = this.asistencia!.profesorId.toString();
                    this.profesor = profesores.find(a => a.id === profesorIdAsString);
                  });
                });
              }

  ngOnInit() {
  }

  eliminar(){
    if (!this.asistencia) {
      console.error('No hay asistencia seleccionada para eliminar.');
      return;
    }
  
    this.qrApi.getQr().subscribe(
      (qrs: IQrsGenerados[]) => {
        const qrAsociado = qrs.find(qr => qr.idAsistencia === this.asistencia!.id);
  
        if (!qrAsociado) {
          console.error('No se encontró un QR asociado a esta asistencia.');
          return;
        }
  
        this.qrApi.deleteQr(qrAsociado).subscribe(
          () => {
            this.asisApi.deleteAsistencia(this.asistencia).subscribe(
              () => {
                this.mensaje();
              },
              (error) => {
                console.error('Error al eliminar la asistencia:', error);
              }
            );
          },
          (error) => {
            console.error('Error al eliminar el QR:', error);
          }
        );
      },
      (error) => {
        console.error('Error al obtener los QRs generados:', error);
      }
    );
  }

  editarAsistencia(asistencia:any){
    this.router.navigate([`/editar-asistencia/${asistencia.id}`], {
      queryParams: { user: JSON.stringify(asistencia) },
    });
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
            this.eliminar();
            this.mensaje();
          },
        },
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            this.router.navigate(['/asistencias']);
          },
        },
      ],
    });
    await alert.present();
  }

  async mensaje(){
    const alert = await this.alertcontroller.create({
      header: 'Eliminando Asistencia',
      message: 'Su asistencia ha sido eliminada',
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

  volver(){
    this.router.navigate(['/asistencias']);
  }
}