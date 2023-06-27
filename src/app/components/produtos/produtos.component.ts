import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'services/products.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss'],
})

export class ProdutosComponent  implements OnInit {

  products: any[] = [];

  constructor(private productService: ProductsService) { }


  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: (data: any) => {
        this.products = data as any[];
      },
      error: (error) => {
        console.error('Erro ao obter os produtos:', error);
      }
    });

  }
}