import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Ijustificaciones } from 'src/app/interfaces/ijustificacion';
import { JustificacionApiService } from 'src/app/services/justificacion-api.service';
import { AlertController } from '@ionic/angular';
import { IAsignatura } from 'src/app/interfaces/iasignatura';
import { AsignaturasApiService } from 'src/app/services/asignaturas-api.service';
import { IProfesor } from 'src/app/interfaces/iprofesor';
import { ProfesorApiService } from 'src/app/services/profesor-api.service';


@Component({
  selector: 'app-detalle-justificacion',
  templateUrl: './detalle-justificacion.page.html',
  styleUrls: ['./detalle-justificacion.page.scss'],
})
export class DetalleJustificacionPage implements OnInit {

  justificaciones: Ijustificaciones[] = [];
  justificacion: Ijustificaciones | undefined;
  asignatura: IAsignatura | undefined;
  profesor: IProfesor | undefined;

  constructor(private activated: ActivatedRoute,
              private router: Router,
              private alertcontroller: AlertController,
              private aApi:AsignaturasApiService,
              private pApi: ProfesorApiService,
              private jApi: JustificacionApiService) { 
                this.activated.queryParams.subscribe(params =>{
                  this.justificacion = JSON.parse(params['user'])

                  this.aApi.getAsignatura().subscribe((asignaturas: IAsignatura[]) => {
                    const asignaturaIdAsString = this.justificacion!.asignaturaId.toString();
                    this.asignatura = asignaturas.find(a => a.id === asignaturaIdAsString);
                  });

                  this.pApi.getProfesor().subscribe((profesores: IProfesor[]) => {
                    const profesorIdAsString = this.justificacion!.profesorId.toString();
                    this.profesor = profesores.find(a => a.id === profesorIdAsString);
                  });
                });
              }

  ngOnInit() {
  }

  eliminar(){
    if (!this.justificacion){
      console.error('No hay justificación seleccionada para eliminar.');
      return;
    }
    this.jApi.deleteJustificacion(this.justificacion).subscribe(
      () => {
        this.mensaje();
      },
      (error) => {
        console.error('Error al eliminar la justificación:', error);
      }
    );
  }


  editarJustificacion(justificacion:any){
    this.router.navigate([`/editar-justificacion/${justificacion.id}`], {
      queryParams: { user: JSON.stringify(justificacion) },
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
            this.router.navigate(['/tabs/tab4']);
          },
        },
      ],
    });
    await alert.present();
  }


  async mensaje(){
    const alert = await this.alertcontroller.create({
      header: 'Eliminando Justificación',
      message: 'Su justificación ha sido eliminada',
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
    this.router.navigate(['/justificaciones']);
  }
}
