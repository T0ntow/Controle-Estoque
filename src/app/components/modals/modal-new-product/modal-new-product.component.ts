import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ProductsService } from 'services/products.service';
import { format } from 'date-fns';

@Component({
  selector: 'app-modal-new-product',
  templateUrl: './modal-new-product.component.html',
  styleUrls: ['./modal-new-product.component.scss'],
})
export class ModalNewProductComponent implements OnInit {
  newProductForm: FormGroup = new FormGroup({});
  url = 'http://localhost:3001/enviar-dados';
  data!: string; // propriedade para armazenar a data atual
  products: any[] = [];

  lastProduct: any;
  formData: any;

  setDataAtual() {
    const dataAtual = new Date();
    this.data = format(dataAtual, 'yyyy-MM-dd');
  }

  constructor(
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private productsService: ProductsService,
    private http: HttpClient
  ) {
    this.setDataAtual();
    this.getLastProduct();
   }

  ngOnInit() {
    this.newProductForm = this.formBuilder.group({
      Codigo: [''],
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
      //soma 1 caso tenha produto caso não 0
      const newCodigo = this.lastProduct ? this.lastProduct.Codigo + 1 : 0;
      this.newProductForm.patchValue({ Codigo: newCodigo });
  
      const formData = this.newProductForm.value;
  
      this.http.post('http://localhost:3001/enviar-dados', formData).subscribe({
        next: (response: any) => {
          console.log('Dados enviados com sucesso!');
          this.productsService.updateObservableProducts();
          this.modalCtrl.dismiss(null, 'confirm');
        },
        error: (error: any) => {
          console.error('Erro ao enviar dados:', error);
        }
      });
    } else {
      console.log('Formulário inválido');
    }
  
    return this.modalCtrl.dismiss(null, 'confirm');
  }
  

 
  getLastProduct() {
    this.productsService.getProducts().subscribe({
      next: (data: any) => {
        this.products = data as any[];
  
        if (this.products.length > 0) {
          this.lastProduct = this.products[this.products.length - 1];

        } else {
          console.log("O array está vazio.");
        }
      },
      error: (error) => {
        console.error('Erro ao obter os produtos:', error);
      }
    });
  }
  


}
