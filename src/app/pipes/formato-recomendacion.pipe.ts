import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatoRecomendacion'
})
export class FormatoRecomendacionPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return value;

    // Reemplazar **texto** por <strong>texto</strong>
    value = value.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Reemplazar saltos de línea con <br>
    value = value.replace(/\n/g, '<br>');

    return value;
  }

}
