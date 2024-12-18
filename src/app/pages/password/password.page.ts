import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { RecoverService } from 'src/app/services/recover.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage implements OnInit {

  resetPasswordForm: FormGroup;

  constructor(
    private router: Router,
    private recover:RecoverService,
    private fb: FormBuilder, 
    private afAuth: AngularFireAuth
  ) {
    this.resetPasswordForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {}

  // Método para volver atrás al login
  volverAtras() {
    this.router.navigate(['/login']);
  }
  async enviarCorreoRecuperacion() {
    const correo = this.resetPasswordForm.value.correo;
    try {
      await this.afAuth.sendPasswordResetEmail(correo);
      alert('Correo de recuperación enviado. Revisa tu bandeja de entrada.');
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error al enviar el correo: ', error);
      alert('Hubo un error al enviar el correo. Intenta nuevamente.');
    }
  }
}
