import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-btn1',
  templateUrl: './btn1.component.html',
  styleUrls: ['./btn1.component.css']
})
export class Btn1Component {

  @Input() label: string = 'Botón'; // Texto dentro del botón
  @Input() icon?: string; // Clase o URL del icono (opcional)
  @Output() onClick = new EventEmitter<void>(); // Evento de clic

  handleClick() {
    this.onClick.emit(); // Emite el evento al hacer clic
  }
}
