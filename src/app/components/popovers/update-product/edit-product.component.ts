import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalEditProductComponent } from '../../modals/modal-edit-product/modal-edit-product.component';
import { ModalController } from '@ionic/angular';
import { ProductsSqlService } from 'services/products_sql/products-sql.service';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular'; // Importe o AlertController

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
    private popoverController: PopoverController,
    private toastController: ToastController,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    console.log(this.product);
  }

  deleteProduct() {
    const id = this.product.id;
    this.showLoading();

    this.productsSqlService.deletarProduto(id).subscribe({
      next: (response: any) => {
        this.loadingCtrl.dismiss()
        this.productsSqlService.updateObservableProducts();
        this.popoverController.dismiss(null, 'confirm')
      },
      error: (error: any) => {
        this.loadingCtrl.dismiss()
        console.error('Erro ao remover produto:', error);
      }
    });
  }

  updateProduct(quantidade: number, operacao: string) {
    const data = {
      quantidade: quantidade,
      operacao: operacao,
      id: this.product.id
    };

    if (quantidade > 1) {
      this.showLoading()
      this.productsSqlService.atualizarItem(data).subscribe({
        next: async (response: any) => {
          this.loadingCtrl.dismiss()
          await this.presentToast(operacao)
          this.productsSqlService.updateObservableProducts();
          this.popoverController.dismiss();
        },
        error: (error: any) => {
          this.loadingCtrl.dismiss()
          console.error('Erro ao atualizar item:', error);
          this.popoverController.dismiss(null, 'cancel');
        }
      });
    }
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Carregando...',
    });

    loading.present();
  }

  async presentToast(operation: string) {
    if (operation === 'entrada') {
      const toast = await this.toastController.create({
        message: 'Entrada registrada!',
        duration: 1500,
        position: 'top',
        color: 'dark',
      });

      await toast.present();
    }

    if (operation === 'saida') {
      const toast = await this.toastController.create({
        message: 'Saída registrada!',
        duration: 1500,
        position: 'top',
        color: 'dark',
      });

      await toast.present();
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

