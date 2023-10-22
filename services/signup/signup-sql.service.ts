import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignupSqlService {
  constructor(
    private http: HttpClient
  ) { }

  newUser(userData: any) {
    return this.http.post('http://localhost:3005/cadastrar-usuario', userData)
  }
}
