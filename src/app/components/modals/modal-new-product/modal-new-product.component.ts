import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-modal-new-product',
  templateUrl: './modal-new-product.component.html',
  styleUrls: ['./modal-new-product.component.scss'],
})
export class ModalNewProductComponent implements OnInit {
  newProductForm: FormGroup = new FormGroup({});
  url = 'http://localhost:3001/enviar-dados';

  constructor(
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.newProductForm = this.formBuilder.group({
      Codigo: ['', [Validators.required]],
      Produto: ['', [Validators.required]],
      Marca: ['', [Validators.required]],
      Data: ['', [Validators.required]],
      Estoque: ['', [Validators.required]],
      Entrada: [0],
      Saida: [0],
    });
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    if (this.newProductForm.valid) {
      const formData = this.newProductForm.value;
      
      this.http.post('http://localhost:3001/enviar-dados', formData)
        .subscribe(
          (response) => {
            console.log('Dados enviados com sucesso!');
            // Faça qualquer ação adicional que desejar após enviar os dados
            this.modalCtrl.dismiss(null, 'confirm');
          },
          (error) => {
            console.error('Erro ao enviar dados:', error);
          }
        );
    } else {
      console.log('Formulário inválido');
    }
    
    return this.modalCtrl.dismiss(null, 'confirm');
  }
  


}