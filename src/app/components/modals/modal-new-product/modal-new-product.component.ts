import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { format } from 'date-fns';
import { ProductsSqlService } from 'services/products_sql/products-sql.service';

@Component({
  selector: 'app-modal-new-product',
  templateUrl: './modal-new-product.component.html',
  styleUrls: ['./modal-new-product.component.scss'],
})

export class ModalNewProductComponent implements OnInit {
  newProductForm: FormGroup = new FormGroup({});
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
    private productsSqlService: ProductsSqlService,
    private http: HttpClient
  ) {
    this.setDataAtual();
    this.getLastProduct();
  }

  ngOnInit() {
    this.newProductForm = this.formBuilder.group({
      nome: ['', [Validators.required]],
      marca: ['', [Validators.required]],
      data_inscricao: ['', [Validators.required]],
      estoque_inicial: ['', [Validators.required]],
      entrada: [0],
      saida: [0],
    });
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    if (this.newProductForm.valid) {
      const formData = this.newProductForm.value;
      console.log(formData);

      this.productsSqlService.newProduct(formData).subscribe({
        next: (response) => {
          console.log('Produto adicionado com sucesso:', response);
          this.productsSqlService.updateObservableProducts();
          this.modalCtrl.dismiss(null, 'confirm');
        },
        error: (error) => {
          // A solicitação encontrou um erro, você pode lidar com o erro aqui, se necessário.
          console.error('Erro ao adicionar o produto:', error);
        }
      })
    }
  }


  getLastProduct() {
    // this.productsService.getProducts().subscribe({
    //   next: (data: any) => {
    //     this.products = data as any[];

    //     if (this.products.length > 0) {
    //       this.lastProduct = this.products[this.products.length - 1];

    //     } else {
    //       console.log("O array está vazio.");
    //     }
    //   },
    //   error: (error) => {
    //     console.error('Erro ao obter os produtos:', error);
    //   }
    // });
  }


}
