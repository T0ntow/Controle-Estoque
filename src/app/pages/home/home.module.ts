import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';

//components
import { ProdutosComponent } from '../../components/produtos/produtos.component';
import { ModalNewProductComponent } from '../../components/modals/modal-new-product/modal-new-product.component';


//modulo http
import { HttpClientModule } from '@angular/common/http';
//modulo form
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  declarations: [
    HomePage,
    ProdutosComponent,
    ModalNewProductComponent
  ]
})
export class HomePageModule {}
