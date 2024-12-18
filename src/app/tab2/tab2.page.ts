import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { IAsignatura } from '../interfaces/iasignatura';
import { AsignaturasApiService } from '../services/asignaturas-api.service';
import { UsuarioApiService } from '../services/usuario-api.service';
import { IUsuarios } from '../interfaces/iusuario';
import { IProfesor } from '../interfaces/iprofesor';
import { ProfesorApiService } from '../services/profesor-api.service';
import { Iasistencia } from '../interfaces/iasistencia';
import { AsistenciaApiService } from '../services/asistencia-api.service';
import { IQrsGenerado, IQrsGenerados } from '../interfaces/i-qrs-generados';
import { QrsGeneradosApiService } from '../services/qrs-generados-api.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  presentingElement: any;
  Asignaturas: IAsignatura[] = [];
  Profesores: IProfesor[] = [];
  usuarioActual: IUsuarios | undefined;
  qrdata:string;
  asistenciaForm: FormGroup;
  hoy: string;
  Asistencias: Iasistencia[] = [];
  botonDeshabilitado: boolean = false;

  constructor(private menucontroller:MenuController,
              private alert: AlertController,
              private aApi: AsignaturasApiService,
              private router: Router,
              private uApi: UsuarioApiService,
              private pApi: ProfesorApiService,
              private asisApi: AsistenciaApiService,
              private qrApi: QrsGeneradosApiService,
              private fBuilder: FormBuilder) {
                this.asistenciaForm = this.fBuilder.group({
                  "asignatura": new FormControl ("", [Validators.required]),
                  "fecha": new FormControl ("", [Validators.required]),
                  "docente": new FormControl ("", [Validators.required]),
                });

                this.qrdata='';

                const fechaActual = new Date();
                this.hoy = fechaActual.toISOString().split('T')[0];
              }

  mostrarMenu(){
    this.menucontroller.open('first');
  }

  ngOnInit() {
    this.asisApi.getAsistencia().subscribe((data: Iasistencia[]) => {
      this.Asistencias = data;
    })
    
    this.aApi.getAsignatura().subscribe((data: IAsignatura[]) => {
      this.Asignaturas = data;
    });

    this.pApi.getProfesor().subscribe((data: IProfesor[]) => {
      this.Profesores = data;
    });

    const correo = sessionStorage.getItem('correo');
    if (correo) {
      this.uApi.getUsuario().subscribe((usuarios: IUsuarios[]) => {
        this.usuarioActual = usuarios.find((usuario) => usuario.correo === correo);
        if (!this.usuarioActual) {
          console.error('Usuario no encontrado con el correo:', correo);
        }
      });
    } else {
      console.error('No se encontró el correo en sessionStorage.');
    }
  }

  async registrarAsistencia() {
    if (this.asistenciaForm.valid && this.usuarioActual) {
      let fechaFormateada: string;
      const asistenciaDataForm = this.asistenciaForm.value;
      const asignaturaSeleccionada = this.Asignaturas.find(
        (asignatura) => asignatura.nombre === asistenciaDataForm.asignatura
      );
  
      const profesorSeleccionado = this.Profesores.find(
        (profesor) => profesor.nombre === asistenciaDataForm.docente
      );
  
      if (!asignaturaSeleccionada || !profesorSeleccionado) {
        console.error('Error al encontrar asignatura o profesor seleccionado.');
        return;
      }
  
      const fechaOriginal = new Date(asistenciaDataForm.fecha);
      fechaFormateada = `${fechaOriginal.getUTCDate().toString().padStart(2, '0')}-${(fechaOriginal.getUTCMonth() + 1).toString().padStart(2, '0')}-${fechaOriginal.getUTCFullYear()}`;

      const asistenciaExistente = this.Asistencias.some((asistencia: Iasistencia) =>
              asistencia.asignaturaId === Number(asignaturaSeleccionada.id) &&
              asistencia.fecha === fechaFormateada &&
              asistencia.alumnoId === Number(this.usuarioActual!.id)
      );
      if (asistenciaExistente) {
        await this.mostrarAlerta('Ya tienes registrada una asistencia para esta asignatura y fecha.');
        return;
      }

      const nuevaAsistenciaId = await this.generarId();
      const nuevaAsistencia: Iasistencia = {
        id: nuevaAsistenciaId,
        profesorId: Number(profesorSeleccionado.id),
        asignaturaId: Number(asignaturaSeleccionada.id),
        alumnoId: Number(this.usuarioActual.id),
        rut: this.usuarioActual.rut,
        nombre: `${this.usuarioActual.nombre} ${this.usuarioActual.apellido}`,
        fecha: fechaFormateada,
        asistio: true
      };

      this.qrdata = JSON.stringify({
        idAsistencia: nuevaAsistenciaId,
        idProfesor: Number(profesorSeleccionado.id),
        idAsignatura: Number(asignaturaSeleccionada.id),
        idAlumno: this.usuarioActual.id.toString(),
        rut: this.usuarioActual.rut,
        nombre: `${this.usuarioActual.nombre} ${this.usuarioActual.apellido}`,
        fechaAsistencia: fechaFormateada,
        asistio: true,
      });
      const nuevoQr: IQrsGenerado = {
        id: await this.generarIdQr(),
        idAsistencia: nuevaAsistenciaId,
        idProfesor: Number(profesorSeleccionado.id),
        idAsignatura: Number(asignaturaSeleccionada.id),
        idAlumno: this.usuarioActual.id.toString(),
        rut: this.usuarioActual.rut,
        nombre: `${this.usuarioActual.nombre} ${this.usuarioActual.apellido}`,
        fechaAsistencia: fechaFormateada,
        asistio: true,
        qr: this.qrdata
      };

      console.log('Asistencias actuales:', this.Asistencias);
      console.log('Fecha formateada:', fechaFormateada);
      console.log('Asignatura seleccionada:', asignaturaSeleccionada);
      console.log('Usuario actual:', this.usuarioActual);

      try {
        const asistenciaPromise = this.asisApi.postAsistencia(nuevaAsistencia).toPromise();
        const qrPromise = this.qrApi.postQr(nuevoQr).toPromise();
        await Promise.all([asistenciaPromise, qrPromise]);
        this.botonDeshabilitado = true;
        await this.actualizarAsistencias();
        this.mostrarMensaje();
      } catch (err) {
        console.error('Error al registrar la asistencia o el QR:', err);
      }
    } else {
      console.error('Formulario inválido o usuario no encontrado.');
    }
  }

  async actualizarAsistencias(){
    try {
      const asistencias = await this.asisApi.getAsistencia().toPromise();
      this.Asistencias = asistencias || []; // Esto asegura que nunca se asigne undefined
    } catch (error) {
      console.error('Error al obtener asistencias:', error);
      this.Asistencias = []; // En caso de error, se asigna un arreglo vacío
    }
  }

  async generarId(): Promise<string>{
    try {
      const asistencias = await this.asisApi.getAsistencia().toPromise();
      if (!asistencias || asistencias.length === 0) {
        return '1';
      }
      const maxId = asistencias.reduce((max, asistencia) => {
        const currentId = parseInt(asistencia.id, 10);
        return currentId > max ? currentId : max;
      }, 0);
      return (maxId + 1).toString();
    } catch (error) {
      console.error('Error al generar el ID:', error);
      return '1';
    }
  }

  limpiarTab2(){
    this.asistenciaForm.reset();
    this.qrdata = '';
    this.botonDeshabilitado = false;
  }

  async mostrarMensaje() {
    setTimeout(async () => {
      const alerta = await this.alert.create({
        header: 'Asistencia registrada',
        cssClass: 'custom-alert',
        buttons: [
          {
            text: 'OK',
            role: 'confirm',
            handler: () => {
              this.router.navigate(['/asistencias']);
              this.limpiarTab2();
            }
          }
        ]
      });
      await alerta.present();
    }, 5000);
  }

  async mostrarAlerta(mensaje: string) {
    const alerta = await this.alert.create({
      header: 'Error',
      message: mensaje,
      cssClass: 'custom-alert',
      buttons: ['OK']
    });
    alerta.present();
    this.limpiarTab2();
  }

  async generarIdQr(): Promise<string> {
    try{
      const qrs = await this.qrApi.getQr().toPromise();
      if (!qrs || qrs.length === 0){
        return '1';
      }
      const maxId = qrs.reduce((max, qr) => {
        const currentId = parseInt(qr.id, 10);
        return currentId > max ? currentId : max;
      }, 0);
      return (maxId + 1).toString();
    } catch (error) {
      console.error('Error al generar el ID:', error);
      return '1';
    }
  }
}
