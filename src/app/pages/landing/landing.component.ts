import { Component } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { Mascota } from '../../model/mascota';
import { MessageService } from 'primeng/api';
import { TratamientoService } from 'src/app/services/tratamiento.service';
import { HistorialMedicoDTO } from 'src/app/model/historial-medico-dto';
import { LandingService } from 'src/app/services/landing.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
  providers: [MessageService],
})
export class LandingComponent {
  findMascotasDialog: boolean = false;
  viewTratamientosMascotaDialog: boolean = false;
  selectedMascota: Mascota | null = null;
  cedula: string = '';
  mascotas: Mascota[] = [];
  clientes: any[] = [];
  tratamientos: HistorialMedicoDTO[] = [];

  formData = {
    nombre: '',
    email: '',
    asunto: '',
    mensaje: '',
  };

  constructor(
    private clienteService: ClienteService,
    private messageService: MessageService,
    private tratamientoService: TratamientoService,
    private emailService: LandingService
  ) {}

  getSeverity(status: string): string {
    // Retorna la severidad del estado del tratamiento
    switch (status) {
      case 'En tratamiento':
        return 'info';
      case 'Tratado':
        return 'success';
      default:
        return 'warning';
    }
  }

  buscarMascota() {
    // Busca la mascota por su cedula
    const cedulaTrimmed = this.cedula.trim();

    if (!cedulaTrimmed) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Por favor ingresa una cédula válida',
      });
      return;
    }

    this.clienteService.getClienteByCedula(cedulaTrimmed).subscribe(
      (cliente) => {
        this.clienteService.getClienteMascotas(cliente.id!).subscribe(
          (clienteMascotas: Mascota[]) => {
            if (clienteMascotas.length > 0) {
              this.mascotas = clienteMascotas;
            } else {
              this.messageService.add({
                severity: 'info',
                summary: 'Sin mascotas',
                detail: 'No se encontraron mascotas para esta cédula.',
              });
            }
          },
          (error) => {
            console.error('Error al obtener mascotas:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Error al obtener las mascotas del cliente',
            });
          }
        );
      },
      (error) => {
        console.error('Error al obtener cliente:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se encontró un cliente con la cédula ingresada',
        });
      }
    );
  }

  showFindMascotasDialog() {
    this.findMascotasDialog = true;
  }

  showTratamientosMascotaDialog() {
    this.findMascotasDialog = false;
    this.viewTratamientosMascotaDialog = true;
  }

  verTratamientos(idMascota: number) {
    // Obtiene y muestra los tratamientos de una mascota
    this.tratamientoService
      .getHistorialMedicoByMascotaId(idMascota)
      .subscribe((tratamientos) => {
        if (tratamientos.length === 0) {
          this.messageService.add({
            severity: 'info',
            summary: 'Información',
            detail:
              'No se encontraron tratamientos para la mascota seleccionada',
            life: 3000,
          });
        } else {
          this.tratamientos = tratamientos;
          this.showTratamientosMascotaDialog();
        }
      });
  }

  ngAfterViewInit() {
    // Inicializa el carrusel
    const carousel = document.querySelector('.carousel') as HTMLElement;
    const slides = document.querySelectorAll(
      '.slide'
    ) as NodeListOf<HTMLElement>;
    let currentSlide = 0;

    function showSlide(n: number) {
      currentSlide = (n + slides.length) % slides.length;
      if (carousel) {
        carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
      }
    }

    function nextSlide() {
      showSlide(currentSlide + 1);
    }

    setInterval(nextSlide, 5000);
  }

  openNewWindow(objective: string) {
    switch (objective) {
      case 'calculadora':
        window.open('/calculadora-peso', '_blank');
        break;
      case 'blog':
        window.open('/blogs', '_blank');
        break;
      case 'tienda':
        window.open('/tienda', '_blank');
        break;
    }
  }

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
