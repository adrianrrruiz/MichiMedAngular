import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ResetPasswordService } from 'src/app/services/reset-password.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  providers: [MessageService]
})
export class ResetPasswordComponent {
  resetForm: FormGroup; // Formulario de inicio de sesión
  @Output() formSubmit = new EventEmitter<void>(); // Evento emitido al enviar formulario

  fraseMotivacional: String = ''; // Frase motivacional

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private messageService: MessageService,
    private resetPasswordService: ResetPasswordService
  ) {
    this.resetForm = this.fb.group({
      // Inicializa el formulario con validaciones
      token: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.resetForm.valid) {
      const token = this.resetForm.get('token')?.value;
      const password = this.resetForm.get('password')?.value;
      this.resetPasswordService.resetPassword(token, password).subscribe(
        response => {
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Contraseña restablecida correctamente.' });
          this.formSubmit.emit();
          this.resetForm.reset(); // Limpiar el formulario
          setTimeout(() => {
            this.router.navigate(['/sign-in']); // Redirigir después de 5 segundos
          }, 5000);
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo restablecer la contraseña.' });
        }
      );
    }
  }
}
