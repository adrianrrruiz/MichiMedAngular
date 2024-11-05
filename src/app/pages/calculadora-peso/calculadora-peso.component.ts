import { Component } from '@angular/core';

@Component({
  selector: 'app-calculadora-peso',
  templateUrl: './calculadora-peso.component.html',
  styleUrls: ['./calculadora-peso.component.css'] // Puedes eliminar esto si solo usas Tailwind
})
export class CalculadoraPesoComponent {
  categoria: string | null = null;
  edad: number | null = null;
  peso: number | null = null;
  pesoIdeal: { min: number; max: number } | null = null;

  calcularPesoIdeal(): void {
    if (this.categoria && this.edad !== null && this.peso !== null) {
      // Definir los rangos de peso según la categoría
      switch (this.categoria) {
        case 'domestico':
          this.pesoIdeal = { min: 3.6, max: 4.5 };
          break;
        case 'persa':
          this.pesoIdeal = { min: 3.0, max: 5.5 };
          break;
        case 'siames':
          this.pesoIdeal = { min: 2.0, max: 4.5 };
          break;
        case 'maine_coon':
          this.pesoIdeal = { min: 4.5, max: 11.0 };
          break;
        default:
          this.pesoIdeal = null;
      }
    }
  }
}
