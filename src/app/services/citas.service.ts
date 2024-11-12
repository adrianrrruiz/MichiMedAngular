import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  private apiUrlAsignar = 'http://localhost:8090/citas/asignar';
  private apiUrlFecha = 'http://localhost:8090/citas/fecha';

  constructor(private http: HttpClient) { }

  asignarCita(cita: { nombreCliente: string, nombreMascota: string, descripcion: string, fecha: string }): Observable<any> {
    return this.http.post<any>(this.apiUrlAsignar, cita);
  }

  obtenerCitasPorFecha(fecha: string): Observable<any> {
    const url = `${this.apiUrlFecha}/${fecha}`;
    return this.http.get<any>(url);
  }
}
