import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(
    private http: HttpClient
  ) { }

  sendConfirmationEmail(userData: any) {
    return this.http.post('http://localhost:3005/enviar-email-confirmacao', userData)
  }

}
