import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  private requestResetUrl = 'http://localhost:8090/sign-in/request-reset';
  private resetPasswordUrl = 'http://localhost:8090/sign-in/reset';

  constructor(private http: HttpClient) { }

  requestPasswordReset(email: string): Observable<any> {
    return this.http.post<any>(this.requestResetUrl, { email });
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post<any>(this.resetPasswordUrl, { token, newPassword });
  }
}
