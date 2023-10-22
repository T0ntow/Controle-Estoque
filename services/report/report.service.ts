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
    return this.http.get('http://localhost:3005/saidas')
  }

  getEntry() {
    return this.http.get('http://localhost:3005/entradas')
  }
}
