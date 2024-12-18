import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioApiService } from 'src/app/services/usuario-api.service';
import { IUsuarios } from 'src/app/interfaces/iusuario';
import { IQrsGenerados } from 'src/app/interfaces/i-qrs-generados';
import { QrsGeneradosApiService } from 'src/app/services/qrs-generados-api.service';

@Component({
  selector: 'app-qrs-generados',
  templateUrl: './qrs-generados.page.html',
  styleUrls: ['./qrs-generados.page.scss'],
})
export class QrsGeneradosPage implements OnInit {

  qrsGenerados: IQrsGenerados[] = [];
  usuarioActual: IUsuarios | undefined;

  constructor(private router: Router,
              private qrApi: QrsGeneradosApiService,
              private uApi: UsuarioApiService) { }

  ngOnInit() {
    const correo = sessionStorage.getItem('correo');
    if (correo){
      this.uApi.getUsuario().subscribe((usuarios: IUsuarios[]) => {
        this.usuarioActual = usuarios.find((usuario) => usuario.correo === correo);
        if (!this.usuarioActual){
          console.error('Usuario no encontrado con el correo:', correo);
        } else {
          this.QRS();
        }
      });
    }
  }

  ionViewWillEnter(){
    this.QRS();
  }

  QRS(){
    if (this.usuarioActual) {
      this.qrApi.getQr().subscribe((qrs: IQrsGenerados[]) => {
        // Filtramos los QR que pertenecen al usuario actual
        this.qrsGenerados = qrs.filter((qr) => qr.idAlumno === this.usuarioActual?.id);
      });
    }
  }

  volver(){
    this.router.navigate(['/perfil']);
  }

}
