import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignupSqlService } from 'services/signup/signup-sql.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signupForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private signupSqlService: SignupSqlService
  ) 
  {
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
        next: (response) => {
          console.log('Usuario cadastrado com sucesso:', response);
        },
        error: (error) => {
          console.error('Erro ao cadastrar usuario:', error);
        }
      })
    }
  }

}
