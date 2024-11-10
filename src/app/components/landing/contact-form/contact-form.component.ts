import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { LandingService } from 'src/app/services/landing.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
  providers: [MessageService]

})
export class ContactFormComponent {

  formData = {
    nombre: '',
    email: '',
    asunto: '',
    mensaje: '',
  };

  constructor(
    private messageService: MessageService,
    private emailService: LandingService
  ) {}


  onSubmit() {
    this.emailService.sendEmail(this.formData).subscribe(
      (response: any) => {
        // Verifica si la respuesta contiene 'success: true'
        if (response && response.success) {
          console.log('Correo enviado:', response);
          this.messageService.add({
            severity: 'success',
            summary: '¡Éxito!',
            detail: 'Correo enviado con éxito',
            life: 3000,
          });
          this.formData = { nombre: '', email: '', asunto: '', mensaje: '' };
        } else {
          console.error('Error desde el servidor:', response?.message || 'Desconocido');
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Hubo un error al enviar el correo. Intenta nuevamente.',
            life: 3000,
          });
        }
      },
      (error) => {
        console.error('Error enviando correo:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Hubo un error al enviar el correo. Intenta nuevamente.',
          life: 3000,
        });
      }
    );
  }
}
