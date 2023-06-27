import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalNewProductComponent } from '../modals/modal-new-product/modal-new-product.component';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent  implements OnInit {

  constructor(
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {}

  exibirServicos = false;

  mostrarServicos() {
    this.exibirServicos = !this.exibirServicos;
  }

  exibirAlteracao = false;

  mostrarAlteracao() {
    this.exibirAlteracao = !this.exibirAlteracao;
  }

  async openModalCreatePrdouct() {
    const modal = await this.modalCtrl.create({
      component: ModalNewProductComponent,
    });
    modal.present();
  }
}
