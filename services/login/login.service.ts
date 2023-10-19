import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
    ) { }

  login(userData: any) {
    return this.http.post('http://localhost:3000/login', userData)
  }

  isTokenValid(): boolean {
    const token = localStorage.getItem('token'); // Obtém o token do Local Storage

    if (token) {
      // Use o JwtHelperService para verificar se o token é válido
      try {
        return !this.jwtHelper.isTokenExpired(token);
      } catch (error) {
        console.error('Erro ao verificar token:', error);
        return false;
      }
    }

    // Se não houver token, ele não é válido
    return false;
  }


}
