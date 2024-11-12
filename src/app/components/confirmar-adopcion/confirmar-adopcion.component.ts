import { Component, OnInit } from '@angular/core';
import { MascotaService } from '../../services/mascota.service';
import { Mascota } from '../../model/mascota';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-confirmar-adopcion',
  templateUrl: './confirmar-adopcion.component.html',
  styleUrls: ['./confirmar-adopcion.component.css'],
  providers: [MessageService]
})
export class ConfirmarAdopcionComponent implements OnInit {
  mascotasPendientes: Mascota[] = [];

  constructor(
    private mascotaService: MascotaService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.obtenerMascotasPendientes();
  }

  obtenerMascotasPendientes(): void {
    this.mascotaService.getMascotas().subscribe(
      (mascotas) => {
        this.mascotasPendientes = mascotas.filter(
          mascota => mascota.estado === 'Pendiente de Confirmación'
        );
        console.log(this.mascotasPendientes); // Verifica aquí que tengas datos
      },
      (error) => {
        console.error('Error al cargar mascotas pendientes:', error);
      }
    );
  }
  

  confirmarAdopcion(id: number): void {
    this.mascotaService.confirmarAdopcion(id).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Adopción confirmada',
          detail: 'La adopción ha sido confirmada exitosamente.'
        });
        this.obtenerMascotasPendientes(); // Refrescar la lista
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Ocurrió un problema al confirmar la adopción. Intente nuevamente.'
        });
        console.error('Error al confirmar adopción:', error);
      }
    );
  }

  rechazarAdopcion(id: number): void {
    this.mascotaService.rechazarAdopcion(id).subscribe(
      () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Adopción rechazada',
          detail: 'La adopción ha sido rechazada.'
        });
        this.obtenerMascotasPendientes(); // Refrescar la lista
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Ocurrió un problema al rechazar la adopción. Intente nuevamente.'
        });
        console.error('Error al rechazar adopción:', error);
      }
    );
  }
}
