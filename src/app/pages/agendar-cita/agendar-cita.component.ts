import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/model/user';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CitasService } from 'src/app/services/citas.service';


@Component({
  selector: 'app-agendar-cita',
  templateUrl: './agendar-cita.component.html',
  styleUrls: ['./agendar-cita.component.css'],
  providers: [MessageService]
})
export class AgendarCitaComponent implements OnInit {
  agendarCitaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private citasService: CitasService, // Inyecta el servicio de citas
    private router: Router
  ) {
    this.agendarCitaForm = this.fb.group({
      nombreCliente: ['', [Validators.required]],
      nombreMascota: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      fecha: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.agendarCitaForm.valid) {
      const cita = this.agendarCitaForm.value;
      // Formatea la fecha en el formato aaaa-mm-dd
      const fecha = new Date(cita.fecha);
      cita.fecha = fecha.toISOString().split('T')[0];

      this.citasService.asignarCita(cita).subscribe(
        (response) => {
          console.log('Cita agendada:', response);
          this.messageService.add({ severity: 'success', summary: '¡Exitoso!', detail: 'Cita agendada', life: 3000 });
          this.agendarCitaForm.reset(); // Limpia el formulario
          setTimeout(() => {
            this.router.navigate(['/']); // Navega a la página principal después de 5 segundos
          }, 5000);
        },
        (error) => {
          console.error('Error al agendar cita:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un error al agendar la cita. Intenta nuevamente. Puede ser que no haya cupo ese día, te recomiendo elegir uno diferente.', life: 3000 });
        }
      );
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Por favor completa todos los campos', life: 3000 });
    }
  }
}
