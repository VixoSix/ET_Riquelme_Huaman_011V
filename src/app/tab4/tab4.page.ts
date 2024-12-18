import { Component  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Justificacion } from 'src/interfaces/asignatura';
import { AsignaturasService } from '../services/asignaturas.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page {
  
  justificacionId!: string;
  justificacion!: Justificacion;
  comentario!: string;
  justificatorio!: string; // Aquí almacenamos la URL de la imagen
  descripcion!: string;

  constructor(
    private menucontroller: MenuController,
    private route: ActivatedRoute,
    private asignaturasService: AsignaturasService,
    private router: Router,
    private location: Location
  ) {}

  mostrarMenu() {
    this.menucontroller.enable(true); 
    this.menucontroller.open('first');
  }

  ionViewWillEnter() {
    this.justificacionId = this.route.snapshot.paramMap.get('id')!;
    this.loadJustificacion();
  }

  loadJustificacion() {
    this.asignaturasService.getJustificacionById(this.justificacionId).subscribe((justificacion) => {
      this.justificacion = justificacion;
      this.comentario = justificacion.comentario || '';
      this.justificatorio = justificacion.justificatorio || ''; // Cargar URL de la imagen
      this.descripcion = justificacion.descripcion || '';
    });
  }

  updateJustificacion() {
    const updatedJustificacion: Justificacion = {
      ...this.justificacion,
      comentario: this.comentario // Solo se actualiza el comentario
    };

    this.asignaturasService.updateJustificacion(this.justificacionId, updatedJustificacion).subscribe((updatedJustificacion) => {
      this.justificacion = updatedJustificacion;
      alert('Comentario actualizado con éxito');
      this.router.navigate(['/tabs/clase']);
    });
  }

  volver() {
    this.location.back(); // Navega a la página anterior
  }
}