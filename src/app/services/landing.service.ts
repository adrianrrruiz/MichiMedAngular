import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LandingService {
  private apiUrl = 'http://localhost:3000/send-email'; // URL del backend

  constructor(private http: HttpClient) {}

  sendEmail(data: {
    nombre: string;
    email: string;
    asunto: string;
    mensaje: string;
  }): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
