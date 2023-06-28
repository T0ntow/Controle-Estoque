import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'services/products.service';
import { format } from 'date-fns';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss'],
})

export class ProdutosComponent implements OnInit {
  searchTerm: string = "";
  products: any[] = [];
  filteredProducts: any[] = [];

  constructor(private productService: ProductsService) {
    this.productService.getObservableProducts().subscribe(isUpdated => {
      console.log('chegou isUpdated: ', isUpdated);
      this.getProducts()
    })
  }

  ngOnInit() {
    this.getProducts()
  }

  searchProducts(event: any) {
    console.log("termo: " + this.searchTerm);

    this.searchTerm = event.target.value;
    this.filteredProducts = this.products.filter(product =>
      product.Produto.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  getProducts() {
    this.productService.getProducts().subscribe({
      next: (data: any) => {
        this.products = data as any[];
        this.formatDates(); // Chame a função formatDates após obter os produtos
        this.filteredProducts = this.products;

      },
      error: (error) => {
        console.error('Erro ao obter os produtos:', error);
      }
    });
  }

 


  formatDates() {
    this.products.forEach(product => {
      product.Data = format(new Date(product.Data), 'dd/MM/yyyy');
    });
  }

}