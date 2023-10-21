import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'services/login/login.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard {
  constructor(private router: Router, private authService: LoginService) {}

  canActivate(): boolean {
    if (this.authService.isTokenValid()) {
      console.log("token verificado com sucesso!");
      return true; // O token é válido, permita o acesso à rota
    } else {
      console.log("token não verificado");
      this.router.navigate(['/login']); // Redirecione o usuário para a página de login
      return false; // Não permita o acesso à rota
    }
  }

}
