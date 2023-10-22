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
    return this.http.post('https://node-mysql-api-exw0.onrender.com/enviar-email-confirmacao', userData)
  }

}
