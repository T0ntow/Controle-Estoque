import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  constructor(
    private http: HttpClient,
  ) { }

  getExit() {
    return this.http.get('https://node-mysql-api-exw0.onrender.com/saidas')
  }

  getEntry() {
    return this.http.get('https://node-mysql-api-exw0.onrender.com/entradas')
  }
}
