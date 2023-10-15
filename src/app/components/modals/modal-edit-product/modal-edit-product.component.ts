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
  validade!: string;
 
  constructor(
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private productsSqlService: ProductsSqlService,
  ) {}

  ngOnInit() {
    this.editProductForm = this.formBuilder.group({
      nome: [this.product.nome, [Validators.required]],
      marca: [this.product.marca, [Validators.required]],
      data_inscricao: [this.product.data_inscricao, [Validators.required]],
      data_validade: [this.product.data_validade, [Validators.required]],
      estoque_inicial: [this.product.estoque_inicial, [Validators.required]],
      entrada: [this.product.entrada],
      saida: [this.product.saida],
    });
    this.setDataAtual();
    this.setValidade();
  }

  setDataAtual() {
    const dataAtual = new Date();
    const dataFormatada = format(dataAtual, 'yyyy-MM-dd');
    this.editProductForm.controls['data_inscricao'].setValue(dataFormatada);
  }

  setValidade() {
    const dataValidade = this.product.data_validade;
    console.log(dataValidade);
    
    const dataOriginal = new Date(dataValidade);
    const ano = dataOriginal.getFullYear();
    const mes = (dataOriginal.getMonth() + 1).toString().padStart(2, '0');
    const dia = dataOriginal.getDate().toString().padStart(2, '0');
    const dataFormatada = `${ano}-${mes}-${dia}`;
    
    this.editProductForm.controls['data_validade'].setValue(dataFormatada);
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

          this.productsSqlService.updateObservableProducts();
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
