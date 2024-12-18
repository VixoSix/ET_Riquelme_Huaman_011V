import { Component, OnInit } from '@angular/core';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController, MenuController } from '@ionic/angular';
import { AsignaturasService } from 'src/app/services/asignaturas.service';
import { Asistencias } from 'src/interfaces/asignatura';

@Component({
  selector: 'app-escaneoqr',
  templateUrl: './escaneoqr.page.html',
  styleUrls: ['./escaneoqr.page.scss'],
})
export class EscaneoqrPage  {
  isSupported = false;
  barcodes: Barcode[] = [];

  constructor(
    private alertController: AlertController,
    private asignaturasService: AsignaturasService,
    private menucontroller: MenuController,
  ) {}

  ngOnInit() {
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
  }

  mostrarMenu() {
    this.menucontroller.enable(true); 
    this.menucontroller.open('first');
  }

  async scan(): Promise<void> {
    try {
      const { barcodes } = await BarcodeScanner.scan();
      if (barcodes.length > 0) {
        const qrData = barcodes[0].rawValue;
  
        console.log('Datos del QR escaneado:', qrData);
  
        const asistenciaData = this.parseQrData(qrData);
  
        if (!asistenciaData) {
          console.error('Datos del QR no válidos:', qrData);
          this.presentAlert('Datos del QR no válidos');
          return;
        }
  
        // Verificar que los datos esenciales están presentes
        if (
          !asistenciaData.id ||
          !asistenciaData.profesorId ||
          !asistenciaData.asignaturaId ||
          !asistenciaData.alumnoId ||
          !asistenciaData.nombre ||
          !asistenciaData.fecha
        ) {
          console.error('Faltan datos esenciales en el QR:', qrData);
          this.presentAlert('Faltan datos esenciales en el QR');
          return;
        }
  
        // Si los datos son correctos, registrar la asistencia
        this.registrarAsistencia(asistenciaData);
      } else {
        console.log('No se detectaron códigos QR.');
      }
    } catch (error) {
      console.error('Error al escanear el QR:', error);
      this.presentAlert('Error al escanear el QR');
    }
  }

  // Función para registrar la asistencia
  registrarAsistencia(asistenciaData: any): void {
    this.asignaturasService.getUltimoId().subscribe(
      (ultimoId) => {
        // Convertir el id a número y luego incrementar
        const nuevoId = Number(ultimoId) + 1;
  
        const nuevaAsistencia: Asistencias = {
          id: nuevoId.toString(),  // Convertimos el nuevo id de vuelta a string
          profesorId: asistenciaData.profesorId,
          asignaturaId: asistenciaData.asignaturaId,
          alumnoId: asistenciaData.alumnoId,
          nombre: asistenciaData.nombre,
          fecha: asistenciaData.fecha,
          asistio: true,
        };
  
        this.asignaturasService.registrarNuevaAsistencia(nuevaAsistencia).subscribe(
          (response) => {
            console.log('Asistencia registrada:', response);
            this.presentAlert('Asistencia registrada correctamente');
          },
          (error) => {
            console.error('Error al registrar la asistencia:', error);
            this.presentAlert('Error al registrar la asistencia');
          }
        );
      },
      (error) => {
        console.error('Error al obtener el último id:', error);
        this.presentAlert('Error al obtener el último id');
      }
    );
  }

  parseQrData(qrData: string): Asistencias | null {
    try {
      const parsedData = JSON.parse(qrData);
      
      // Mapeo de los datos del QR a la interfaz Asistencias
      const asistenciaData: Asistencias = {
        id: parsedData.idAsistencia,              // mapeamos 'idAsistencia' a 'id'
        profesorId: parsedData.idProfesor ,// mapeamos 'idProfesor' a 'profesorId' y lo convertimos a string si es necesario
        asignaturaId: parsedData.idAsignatura, // mapeamos 'idAsignatura' a 'asignaturaId' y lo convertimos a string si es necesario
        alumnoId: parsedData.idAlumno,            // mapeamos 'idAlumno' a 'alumnoId'
        nombre: parsedData.nombre,                // mapeamos 'nombre' directamente
        fecha: parsedData.fechaAsistencia,       // mapeamos 'fechaAsistencia' a 'fecha'
        asistio: parsedData.asistio,              // mapeamos 'asistio' directamente
      };
  
      // Validación de que todos los campos necesarios estén presentes
      if (!asistenciaData.id || !asistenciaData.profesorId || !asistenciaData.asignaturaId || !asistenciaData.alumnoId || !asistenciaData.nombre || !asistenciaData.fecha || asistenciaData.asistio === undefined) {
        return null;
      }
  
      return asistenciaData;
    } catch (error) {
      console.error('Error al parsear el QR:', error);
      return null;
    }
  }

  // Mostrar alerta
  async presentAlert(message: string): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}