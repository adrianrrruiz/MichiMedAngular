import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../model/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http: HttpClient) {}

  getProductos() {
    return this.http.get('http://localhost:8090/productos');
  }

  getProductoById(id: number) {
    return this.http.get('http://localhost:8090/productos/' + id);
  }

  addProducto(producto: Producto) {
    this.http.post('http://localhost:8090/productos/add', producto).subscribe();
  }

  updateProducto(updatedProducto: Producto) {
    return this.http.put('http://localhost:8090/productos/update', updatedProducto);
  }

  deleteProducto(id: number) {
    return this.http.delete('http://localhost:8090/productos/delete/' + id);
  }
}
