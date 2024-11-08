import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-calculadora-peso',
  templateUrl: './calculadora-peso.component.html',
  styleUrls: ['./calculadora-peso.component.css']
})
export class CalculadoraPesoComponent {
  visible = false;
  pesoForm: FormGroup;
  pesoIdeal: { min: number; max: number } | null = null;
  mensajePeso: { texto: string; color: string; icono: string } | null = null;

  constructor(private fb: FormBuilder) {
    this.pesoForm = this.fb.group({
      categoria: ['', Validators.required],
      sexo: ['', Validators.required],
      peso: [null, [Validators.required, Validators.min(0)]]
    });
  }

  calcularPesoIdeal(): void {
    if (this.pesoForm.valid) {
      const { categoria, sexo, peso } = this.pesoForm.value;
      if (sexo === 'macho') {
        switch (categoria) {
          case 'domestico':
            this.pesoIdeal = { min: 3.6, max: 4.5 };
            break;
          case 'himalayo':
            this.pesoIdeal = { min: 3.2, max: 5.4 };
            break;
          case 'maine_coon':
            this.pesoIdeal = { min: 6.8, max: 11.3 };
            break;
          case 'persa':
            this.pesoIdeal = { min: 3.2, max: 5.4 };
            break;
          case 'siames':
            this.pesoIdeal = { min: 3.2, max: 4.5 };
            break;
        }
      } else {
        switch (categoria) {
          case 'domestico':
            this.pesoIdeal = { min: 3.6, max: 4.5 };
            break;
          case 'himalayo':
            this.pesoIdeal = { min: 3.2, max: 5.4 };
            break;
          case 'maine_coon':
            this.pesoIdeal = { min: 4.5, max: 5.8 };
            break;
          case 'persa':
            this.pesoIdeal = { min: 3.2, max: 5.4 };
            break;
          case 'siames':
            this.pesoIdeal = { min: 3.2, max: 4.5 };
            break;
        }
      }
      // Determina el mensaje con color e icono basado en el peso
      if (peso < this.pesoIdeal!.min) {
        this.mensajePeso = {
          texto: 'Tu gato está por debajo de su peso ideal.',
          color: 'text-blue-600',
          icono: 'bi bi-emoji-frown'
        };
      } else if (peso > this.pesoIdeal!.max) {
        this.mensajePeso = {
          texto: 'Tu gato está por encima de su peso ideal.',
          color: 'text-red-600',
          icono: 'bi bi-emoji-frown'
        };
      } else {
        this.mensajePeso = {
          texto: '¡Felicidades! Tu gato tiene un peso ideal.',
          color: 'text-green-600',
          icono: 'bi bi-emoji-smile'
        };
      }

      this.visible = true; // Muestra el diálogo
    }
  }
}
