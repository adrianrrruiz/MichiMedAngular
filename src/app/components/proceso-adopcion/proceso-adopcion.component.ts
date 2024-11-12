import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Mascota } from '../../model/mascota';

@Component({
  selector: 'app-proceso-adopcion',
  templateUrl: './proceso-adopcion.component.html',
  styleUrls: ['./proceso-adopcion.component.css']
})
export class ProcesoAdopcionComponent implements OnInit {
  @Input() mascota!: Mascota;
  @Input() visible: boolean = false; // Para controlar la visibilidad del diálogo
  @Output() close = new EventEmitter<void>();

  activeStep: number = 0;
  steps: any[] = [];
  stepperVisible: boolean = false;
  selectedGato: Mascota | null = null;

  nombreAdoptante: string = '';
  telefonoAdoptante: string = '';

  ngOnInit() {
    this.steps = [
      { label: 'Información del Adoptante' },
      { label: 'Confirmación' },
      { label: 'Completar' }
    ];
  }

  siguientePaso() {
    if (this.activeStep < this.steps.length - 1) {
      this.activeStep++;
    } else {
      this.completarAdopcion();
    }
  }

  pasoAnterior() {
    if (this.activeStep > 0) {
      this.activeStep--;
    }
  }

  completarAdopcion() {
    console.log('Adopción completada para:', this.mascota.nombre);
    this.close.emit(); 
  }

  cancelar() {
    this.close.emit();
  }


  abrirStepper(gato: Mascota): void {
    this.selectedGato = gato;
    this.stepperVisible = true;
    this.activeStep = 0;
  }

  cerrarStepper(): void {
    this.stepperVisible = false;
    this.selectedGato = null;
    this.nombreAdoptante = '';
    this.telefonoAdoptante = '';
  }

}
