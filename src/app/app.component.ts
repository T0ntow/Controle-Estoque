import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { LoginService } from 'services/login/login.service';
import { ModalNewProductComponent } from './components/modals/modal-new-product/modal-new-product.component';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  isProdutosPage: boolean = false;
  isReportPage: boolean = false;
  exibirServicos = false;
  menuType: string = 'overlay';
  exibirAlteracao = false;

  constructor(
    private router: Router,
    private modalCtrl: ModalController,
    private loginService: LoginService,

  ) { }


  ngOnInit() {
    if (this.isOnHomePage()) {
      this.isProdutosPage = true
    }

    if (this.isOnReportPage()) {
      this.isReportPage = true
    }
  }

  isOnHomePage(): boolean {
    return this.router.isActive('/home', { paths: 'subset', queryParams: 'subset', fragment: 'ignored', matrixParams: 'ignored' })
  }

  isOnReportPage(): boolean {
    return this.router.isActive('/report', { paths: 'subset', queryParams: 'subset', fragment: 'ignored', matrixParams: 'ignored' })
  }


  mostrarServicos() {
    this.exibirServicos = !this.exibirServicos;
  }


  mostrarAlteracao() {
    this.exibirAlteracao = !this.exibirAlteracao;
  }

  async openModalCreateProduct() {
    const modal = await this.modalCtrl.create({
      component: ModalNewProductComponent,
    });
    modal.present();
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']); // Substitua 'login' pelo nome da rota de login na sua aplicação
  }

  isOnBlockPages(): boolean {
    return this.router.isActive('/login', { paths: 'subset', queryParams: 'subset', fragment: 'ignored', matrixParams: 'ignored' }) ||
      this.router.isActive('/signup', { paths: 'subset', queryParams: 'subset', fragment: 'ignored', matrixParams: 'ignored' })
  }

}
