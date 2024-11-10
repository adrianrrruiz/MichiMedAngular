import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Cliente } from 'src/app/model/cliente';
import { HistorialMedicoDTO } from 'src/app/model/historial-medico-dto';
import { Mascota } from 'src/app/model/mascota';
import { ChatgptService } from 'src/app/services/chatgpt.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { TratamientoService } from 'src/app/services/tratamiento.service';

@Component({
  selector: 'app-online-services',
  templateUrl: './online-services.component.html',
  styleUrls: ['./online-services.component.css'],
  providers: [MessageService],
})
export class OnlineServicesComponent implements OnInit {
  findMascotasDialog: boolean = false;
  viewTratamientosMascotaDialog: boolean = false;
  cedula: string = '';
  mascotas: Mascota[] = [];
  clientes: any[] = [];
  tratamientos: HistorialMedicoDTO[] = [];

  // Para la recomendación
  recomendacionDialog: boolean = false;
  cliente!: Cliente;
  recomendacion: string = '';
  selectedMascota: Mascota | null = null;

  constructor(
    private clienteService: ClienteService,
    private messageService: MessageService,
    private tratamientoService: TratamientoService,
    private chatgptService: ChatgptService
  ) {}

  ngOnInit() {
    setTimeout(() => {
      const leftCards = document.querySelector('.left-cards');
      const rightCards = document.querySelector('.right-cards');

      if (leftCards) {
        leftCards.classList.remove('-translate-x-full', 'opacity-0');
        leftCards.classList.add('translate-x-0', 'opacity-100');
      }

      if (rightCards) {
        rightCards.classList.remove('translate-x-full', 'opacity-0');
        rightCards.classList.add('translate-x-0', 'opacity-100');
      }
    }, 100); // Pequeño retraso para asegurarse de que el contenido se ha cargado
  }

  showFindMascotasDialog() {
    this.findMascotasDialog = true;
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
        this.cliente = cliente;
        this.clienteService.getClienteMascotas(cliente.id!).subscribe(
          (clienteMascotas: Mascota[]) => {
            if (clienteMascotas.length > 0) {
              this.mascotas = clienteMascotas;
            } else {
              this.mascotas = [];
              this.messageService.add({
                severity: 'info',
                summary: 'Sin mascotas',
                detail: 'No se encontraron mascotas para esta cédula.',
              });
            }
          },
          (error) => {
            this.mascotas = [];
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
        this.mascotas = [];
        console.error('Error al obtener cliente:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se encontró un cliente con la cédula ingresada',
        });
      }
    );
  }

  consultarRecomendacion(mascota: Mascota){
    const message = `Mi nombre es ${this.cliente.nombre} y mi gatito se llama ${mascota.nombre}, tiene ${mascota.edad} años, pesa ${mascota.peso} kg y es de raza ${mascota.raza}`;
    this.recomendacionDialog = true;
    this.recomendacion = '';
    this.selectedMascota = null;
    this.chatgptService.getRecomendacion(message).subscribe(
      (response: any) => {
          this.selectedMascota = mascota;
          this.recomendacion = response;
      },
      (error) => {
        console.error('Error obteniendo recomendación:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Hubo un error al obtener la recomendación',
          life: 3000,
        });
        this.recomendacionDialog = false;
    });
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
          this.viewTratamientosMascotaDialog = true;
        }
      });
  }

  getSeverity(status: string): string {
    // Retorna la severidad del estado del tratamiento
    switch (status) {
      case 'En tratamiento':
        return 'info';
      case 'Tratado':
        return 'success';
      default:
        return 'info';
    }
  }
}
