import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ResetPasswordService } from 'src/app/services/reset-password.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-token',
  templateUrl: './get-token.component.html',
  styleUrls: ['./get-token.component.css'],
  providers: [MessageService]
})
export class GetTokenComponent {
  resetForm: FormGroup; // Formulario de inicio de sesión
  @Output() formSubmit = new EventEmitter<void>(); // Evento emitido al enviar formulario

  fraseMotivacional: String = ''; // Frase motivacional

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private resetPasswordService: ResetPasswordService,
    private router: Router
  ) {
    this.resetForm = this.fb.group({
      // Inicializa el formulario con validaciones
      email: ['', [Validators.required]],
    });

  }

  onSubmit(): void {
    if (this.resetForm.valid) {
      const email = this.resetForm.get('email')?.value;
      this.resetPasswordService.requestPasswordReset(email).subscribe(
        response => {
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Solicitud de restablecimiento de contraseña enviada. Revisa tu correo e ingresa el codigo que te enviamos.' });
          this.formSubmit.emit();
          setTimeout(() => {
          this.router.navigate(['/reset-password']);
          }, 5000);
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo enviar la solicitud de restablecimiento de contraseña.' });
        }
      );
    }
  }

}
