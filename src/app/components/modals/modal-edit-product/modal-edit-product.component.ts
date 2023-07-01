import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ProductsService } from 'services/products.service';
import { format } from 'date-fns';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-modal-edit-product',
  templateUrl: './modal-edit-product.component.html',
  styleUrls: ['./modal-edit-product.component.scss'],
})
export class ModalEditProductComponent implements OnInit {
  @Input() product: any;
  editProductForm: FormGroup = new FormGroup({});
  data!: string; // propriedade para armazenar a data atual

  constructor(
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private productsService: ProductsService,
    private http: HttpClient,
    private popoverController: PopoverController
  ) {
    this.setDataAtual();
  }

  setDataAtual() {
    const dataAtual = new Date();
    this.data = format(dataAtual, 'yyyy-MM-dd');
  }

  ngOnInit() {
    this.editProductForm = this.formBuilder.group({
      Produto: [this.product.Produto, [Validators.required]],
      Marca: [this.product.Marca, [Validators.required]],
      Data: [this.product.Data, [Validators.required]],
      Estoque: [this.product.Estoque, [Validators.required]],
      Entrada: [this.product.Entrada],
      Saida: [this.product.Saida],
    });
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    if (this.editProductForm.valid) {
      const formData = this.editProductForm.value;

      this.http.put(`http://localhost:3001/editar-produto/${this.product.Codigo}`, formData).subscribe({
        next: (response: any) => {
          console.log('Produto atualizado com sucesso!');
          this.productsService.updateObservableProducts();
          this.modalCtrl.dismiss(null, 'confirm');
          this.popoverController.dismiss(null, 'confirm')
        },
        error: (error: any) => {
          console.error('Erro ao atualizar o produto:', error);
        },
      });
    } else {
      console.log('Formulário inválido');
    }

    return this.modalCtrl.dismiss(null, 'confirm');
  }
}
