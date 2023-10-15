import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalEditProductComponent } from '../../modals/modal-edit-product/modal-edit-product.component';
import { ModalController } from '@ionic/angular';
import { ProductsSqlService } from 'services/products_sql/products-sql.service';

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
    private productsSqlService: ProductsSqlService,
    private modalCtrl: ModalController,
    private popoverController: PopoverController
  ) { }

  ngOnInit() {
    console.log(this.product);
  }

  removerItem() {
    // const codigo = this.product.Codigo;

    // this.http.delete(`http://localhost:3001/remover-item/${codigo}`).subscribe({
    //   next: (response: any) => {
    //     this.productsService.updateObservableProducts();
    //     this.popoverController.dismiss(null, 'confirm')
    //   },
    //   error: (error: any) => {
    //     console.error('Erro ao remover item:', error);
    //   }
    // });
  }

  updateProduct(quantidade: number, operacao: string) {
    const data = {
      quantidade: quantidade,
      operacao: operacao,
      id: this.product.id
    };

    console.log("id", data.id);

    if(quantidade > 1) {
      this.productsSqlService.atualizarItem(data).subscribe({
        next: (response: any) => {
          this.productsSqlService.updateObservableProducts();
          this.popoverController.dismiss();
        },
        error: (error: any) => {
          console.error('Erro ao atualizar item:', error);
          this.popoverController.dismiss(null, 'cancel');
        }
      });
    }
  }

  newEntry() {
    this.updateProduct(this.entryValue, 'entrada');
  }

  newExit() {
    this.updateProduct(this.exitValue, 'saida');
  }

  async openModalEdit() {
    const modal = await this.modalCtrl.create({
      component: ModalEditProductComponent,
      componentProps: {
        product: this.product
      },
    });
    modal.present();
  }

}

