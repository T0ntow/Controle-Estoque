import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { format } from 'date-fns';
import { PopoverController } from '@ionic/angular';
import { ProductsSqlService } from 'services/products_sql/products-sql.service';
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
    private http: HttpClient,
    private productsSqlService: ProductsSqlService,
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
      nome: [this.product.nome, [Validators.required]],
      marca: [this.product.marca, [Validators.required]],
      data_inscricao: [this.product.data_inscricao, [Validators.required]],
      estoque_inicial: [this.product.estoque_inicial, [Validators.required]],
      entrada: [this.product.entrada],
      saida: [this.product.saida],
    });
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    if (this.editProductForm.valid) {
      const formData = this.editProductForm.value;
      const id = this.product.id; // Obtém o ID do produto
  
      // Adicione o ID aos dados do formulário
      formData.id = id; 
  
      console.log(id);
      console.log(formData);
  
      this.productsSqlService.editProduct(formData).subscribe({
        next: (response) => {
          // A solicitação foi bem-sucedida, você pode lidar com a resposta aqui, se necessário.
          console.log('Produto editado com sucesso:', response);
  
          // Aqui você pode realizar a ação desejada após a edição bem-sucedida, como fechar o modal.
          this.modalCtrl.dismiss(null, 'confirm');
        },
        error: (error) => {
          // A solicitação encontrou um erro, você pode lidar com o erro aqui, se necessário.
          console.error('Erro ao editar o produto:', error);
        }
      });
    }
  }
  
}
