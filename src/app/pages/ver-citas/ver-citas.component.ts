import { Component, OnInit } from '@angular/core';
import { CitasService } from 'src/app/services/citas.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-ver-citas',
  templateUrl: './ver-citas.component.html',
  styleUrls: ['./ver-citas.component.css'],
  providers: [MessageService]
})
export class VerCitasComponent implements OnInit {
  selectedDate: string | null = null;
  citas: any[] = [];

  constructor(private citasService: CitasService, private messageService: MessageService) {}

  ngOnInit(): void {}

  buscarCitas(): void {
    if (this.selectedDate) {
      this.citasService.obtenerCitasPorFecha(this.selectedDate).subscribe(
        (response) => {
          this.citas = response;
          if (this.citas.length === 0) {
            this.messageService.add({ severity: 'info', summary: 'Información', detail: 'Hoy no hay citas asignadas', life: 3000 });
          }
        },
        (error) => {
          console.error('Error al obtener citas:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un error al obtener las citas. Intenta nuevamente.', life: 3000 });
        }
      );
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Por favor selecciona una fecha', life: 3000 });
    }
  }
}
