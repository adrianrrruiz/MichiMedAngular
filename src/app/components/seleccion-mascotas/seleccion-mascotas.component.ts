import { Component, OnInit } from '@angular/core';
import { MascotaService } from '../../services/mascota.service';
import { Mascota } from '../../model/mascota';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-seleccion-mascotas',
  templateUrl: './seleccion-mascotas.component.html',
  styleUrls: ['./seleccion-mascotas.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class SeleccionMascotasComponent implements OnInit {
  gatos: Mascota[] = [];
  gatosFiltrados: Mascota[] = [];
  gatosDisponibles: any[] = [];
  isLoading = true;
  errorMessage = '';
  selectedGato: any = null;
  stepperVisible: boolean = false;
  activeStep: number = 0;
  steps: any[] = [];

  // Estados para el dropdown
  statuses: any[] = [
    { label: 'En Adopción', value: 'En Adopción' },
    { label: 'En tratamiento', value: 'En tratamiento' },
    { label: 'Tratado', value: 'Tratado' }
  ];

  // Variables para los datos del adoptante
  nombreAdoptante: string = '';
  telefonoAdoptante: string = '';

  constructor(
    private mascotaService: MascotaService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.fetchMascotas();
    this.steps = [
      { label: 'Información del Adoptante' },
      { label: 'Confirmación' },
      { label: 'Completar' }
    ];
  }

  fetchMascotas(): void {
    this.mascotaService.getMascotas().subscribe(
      (data: Mascota[]) => {
        this.gatos = data;
        this.gatosFiltrados = [...this.gatos];
        this.updateGatosDisponibles();
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al cargar las mascotas:', error);
        this.errorMessage = 'Ocurrió un error al cargar las mascotas. Intenta de nuevo más tarde.';
        this.isLoading = false;
      }
    );
  }

  // Función para actualizar la lista de gatos disponibles
  private updateGatosDisponibles(): void {
    this.gatosDisponibles = this.gatos
      .filter(gato => gato.estado === 'En Adopción')
      .map(gato => ({ label: gato.nombre, value: gato }));
  }

  abrirStepper(gato: Mascota): void {
    this.selectedGato = gato;
    this.stepperVisible = true;
    this.activeStep = 0;
  }

  siguientePaso(): void {
    if (this.activeStep === 0 && (!this.nombreAdoptante.trim() || !this.telefonoAdoptante.trim())) {
      this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Por favor, completa ambos campos para continuar.' });
      return;
    }
    if (this.activeStep < this.steps.length - 1) {
      this.activeStep++;
    }
  }

  pasoAnterior(): void {
    if (this.activeStep > 0) {
      this.activeStep--;
    }
  }

  cerrarStepper(): void {
    this.stepperVisible = false;
    this.selectedGato = null;
    this.nombreAdoptante = '';
    this.telefonoAdoptante = '';
    this.gatosFiltrados = [...this.gatos];
  }

  completarAdopcion(): void {
    if (this.selectedGato) {
      // Llamada al servicio para iniciar la adopción en el backend
      this.mascotaService.iniciarAdopcion(this.selectedGato.id).subscribe(
        () => {
          // Actualiza el estado en la mascota seleccionada
          this.selectedGato.estado = 'Pendiente de Confirmación';

          // Encuentra la mascota en la lista `gatos` y actualiza el estado
          const indexGato = this.gatos.findIndex(gato => gato.id === this.selectedGato.id);
          if (indexGato !== -1) {
            this.gatos[indexGato].estado = 'Pendiente de Confirmación';
          }

          // Encuentra la mascota en la lista `gatosFiltrados` y actualiza el estado
          const indexGatoFiltrado = this.gatosFiltrados.findIndex(gato => gato.id === this.selectedGato.id);
          if (indexGatoFiltrado !== -1) {
            this.gatosFiltrados[indexGatoFiltrado].estado = 'Pendiente de Confirmación';
          }

          // Actualiza la lista de gatos disponibles para reflejar el cambio
          this.updateGatosDisponibles();

          this.messageService.add({
            severity: 'success',
            summary: '¡Adopción iniciada!',
            detail: `La adopción de ${this.selectedGato.nombre} está en proceso y pendiente de confirmación por la veterinaria.`
          });

          // Cierra el stepper después de la adopción
          this.cerrarStepper();
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Ocurrió un problema al iniciar la adopción. Intente nuevamente.'
          });
          console.error('Error al iniciar adopción:', error);
        }
      );
    }
  }

  onSelectGato(): void {
    if (this.selectedGato) {
      // Filtrar la lista para mostrar solo el gato seleccionado basado en el valor seleccionado
      this.gatosFiltrados = this.gatos.filter(gato => gato.nombre === this.selectedGato!.value.nombre);
    } else {
      // Si no hay gato seleccionado, mostrar todos los gatos
      this.gatosFiltrados = [...this.gatos];
    }
  }

  cancelarBusqueda(): void {
    this.selectedGato = null;
    this.gatosFiltrados = [...this.gatos];
  }

  allowOnlyNumbers(event: KeyboardEvent): void {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  getSeverity(status: string): string {
    switch (status) {
      case 'En Adopción':
        return 'warning';
      case 'En tratamiento':
        return 'info';
      case 'Tratado':
        return 'success';
      default:
        return 'warning';
    }
  }

  onEstadoChange(mascota: Mascota): void {
    if (mascota.estado === 'En Adopción') {
      this.confirmationService.confirm({
        message: '¿Estás seguro de que quieres poner a este gato en adopción?',
        header: 'Confirmar Adopción',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.messageService.add({ severity: 'info', summary: 'Confirmado', detail: `El gato ${mascota.nombre} está ahora en adopción.` });
        },
        reject: () => {
          mascota.estado = 'En tratamiento';
        }
      });
    }
  }
}
