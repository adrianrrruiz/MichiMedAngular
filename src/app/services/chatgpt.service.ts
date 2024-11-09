import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatgptService {

  constructor(private http: HttpClient) {}

  getRecomendacion(mensaje: string): Observable<String> {
    return this.http.get(`http://localhost:8090/gpt/prompt?message=${mensaje}`, { responseType: 'text' });
  }
}
