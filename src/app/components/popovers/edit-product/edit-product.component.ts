import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductsService } from 'services/products.service';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {

  @Input() product: any;

  entryValue!: number;
  exitValue!: number;

  constructor(
    private http: HttpClient,
    private productsService: ProductsService,
    private popoverController: PopoverController,
    private modalCtrl: ModalController,
  ) {

  }
  ngOnInit() {
    console.log(this.product);
  }

  removerItem() {
    const codigo = this.product.Codigo;

    this.http.delete(`http://localhost:3001/remover-item/${codigo}`).subscribe({
      next: (response: any) => {
        this.productsService.updateObservableProducts();
        this.popoverController.dismiss(null, 'confirm')
      },
      error: (error: any) => {
        console.error('Erro ao remover item:', error);
      }
    });
  }

  updateProduct(quantidade: number, operacao: string) {
    const codigo = this.product.Codigo;
    const data = {
      quantidade: quantidade,
      operacao: operacao,
    };

    if (quantidade >= 1) {
      this.http
        .put(`http://localhost:3001/atualizar-item/${codigo}`, data)
        .subscribe({
          next: (response: any) => {
            console.log('Item atualizado com sucesso!');
            this.productsService.updateObservableProducts();
            this.popoverController.dismiss(null, 'confirm');
          },
          error: (error: any) => {
            console.error('Erro ao atualizar item:', error);
          },
        });
    }  else {
      
    }
   
  }

  newEntry() {
    this.updateProduct(this.entryValue, 'entrada');
  }

  newExit() {
    this.updateProduct(this.exitValue, 'saida');
  }

}

