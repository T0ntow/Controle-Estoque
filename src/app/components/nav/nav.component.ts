import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalNewProductComponent } from '../modals/modal-new-product/modal-new-product.component';
import { LoginService } from 'services/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})

export class NavComponent  implements OnInit {

  constructor(
    private modalCtrl: ModalController,
    private loginService: LoginService,
    private router: Router
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

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']); // Substitua 'login' pelo nome da rota de login na sua aplicação
  }
}
