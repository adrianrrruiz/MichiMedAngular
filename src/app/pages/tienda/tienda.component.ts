import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

interface Categoria {
  nombre: string;
  descripcion: string;
}

interface Producto {
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
}

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css'],
  providers: [MessageService],
})
export class TiendaComponent implements OnInit {
  categorias: Categoria[] = [
    { nombre: 'Alimentos', descripcion: 'Los mejores alimentos para tu gato.' },
    { nombre: 'Juguetes', descripcion: 'Juguetes para el entretenimiento de tu gato.' },
    { nombre: 'Higiene', descripcion: 'Productos de limpieza y aseo para tu gato.' },
    { nombre: 'Accesorios', descripcion: 'Collares, camas y más para tu gato.' },
  ];

  productos: Producto[] = [
    {
      nombre: 'Alimento Premium para Gatos',
      descripcion: 'Alimento de alta calidad para gatos de todas las edades.',
      precio: 50000,
      imagen: '../assets/img/producto1.jpg',
    },
    {
      nombre: 'Juguete Ratón',
      descripcion: 'Ratón de peluche para la diversión de tu gato.',
      precio: 12000,
      imagen: '../assets/img/producto2.jpg',
    },
    // Agrega más productos según sea necesario
  ];

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {}

  verCategorias(): void {
    // lógica para mostrar categorías o filtros de productos
  }

  filtrarCategoria(categoria: Categoria): void {
    // lógica para filtrar productos por categoría
    console.log(`Filtrando productos de la categoría: ${categoria.nombre}`);
  }

  agregarAlCarrito(producto: Producto): void {
    this.messageService.add({ severity: 'success', summary: 'Producto añadido', detail: `${producto.nombre} fue agregado al carrito.` });
  }
}
