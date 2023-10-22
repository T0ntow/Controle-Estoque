import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'services/login/login.service';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular'; // Importe o AlertController

interface AuthResponse {
  token?: string;
}


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private alertController: AlertController,
    private loadingCtrl: LoadingController
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
  }

  login() {
    console.log("submit form");

    if (this.loginForm.valid) {
      const userData = this.loginForm.value;
      this.showLoading()

      this.loginService.login(userData).subscribe({

        next: (response: AuthResponse) => {
          this.loadingCtrl.dismiss()
          console.log('Usuário logado com sucesso:', response);

          if (response && response.token) {
            localStorage.setItem('token', response.token);
          }
          this.router.navigate(['/home']);
        },

        error: async (error) => {
          this.loadingCtrl.dismiss()
          console.error('Erro ao logar usuário:', error);

          if(error.status === 403) {
            await this.emailNotVerified()
          } else {
            await this.presentErrorAlert();
          }
        }
      });
    }
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Carregando...',
    });

    loading.present();
  }

  async presentErrorAlert() {
    const alert = await this.alertController.create({
      header: 'Erro de login',
      message: 'Credenciais incorretas. Por favor, verifique seu email e senha.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async emailNotVerified() {
    const alert = await this.alertController.create({
      header: 'Erro de login',
      message: 'E-mail não verificado.',
      buttons: ['OK']
    });

    await alert.present();
  }
}
