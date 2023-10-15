import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignupSqlService } from 'services/signup/signup-sql.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signupForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private signupSqlService: SignupSqlService,
    private router: Router,
    private alertController: AlertController
  ) {
    this.signupForm = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
  }

  newUser() {
    console.log("new user");

    if (this.signupForm.valid) {
      const userData = this.signupForm.value;

      this.signupSqlService.newUser(userData).subscribe({
        next: async (response) => {
          console.log('Usuario cadastrado com sucesso:', response);
          await this.presentSignupSuccessAlert();
          this.router.navigate(['/login']);
        },
        error: async (error) => {
          console.error('Erro ao cadastrar usuario:', error);

          if (error.error.error === "E-mail já em uso") {
            await this.presentEmailInUseAlert();
          }

        }
      })
    }
  }

  async presentSignupSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Cadastro bem-sucedido',
      message: 'Sua conta foi cadastrada com sucesso!',
      buttons: ['OK']
    });
  
    await alert.present();
  }
  
  async presentEmailInUseAlert() {
    const alert = await this.alertController.create({
      header: 'Erro',
      subHeader: 'E-mail já em uso',
      message: 'O e-mail inserido já está associado a uma conta. Tente usar um e-mail diferente.',
      buttons: ['OK']
    });
  
    await alert.present();
  }
}
