import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'services/products.service';
import { format } from 'date-fns';
import { PopoverController } from '@ionic/angular';
import { EditProductComponent } from '../popovers/edit-product/edit-product.component';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss'],
})

export class ProdutosComponent implements OnInit {
  searchTerm: string = "";
  products: any[] = [];
  marcas: string[] = [];
  filteredProducts: any[] = [];
  selectedMark: string = '';

  constructor(
    private productService: ProductsService,
    private popoverController: PopoverController) {
    this.productService.getObservableProducts().subscribe(isUpdated => {
      console.log('chegou isUpdated: ', isUpdated);
      this.getProducts()
    })
  }

  ngOnInit() {
    this.getProducts()
  }

  filterProductsByMarca(event: any) {
    this.selectedMark = event.target.value;

    if (this.selectedMark) {
      this.filteredProducts = this.products.filter(product =>
        product.Marca.toLowerCase() === this.selectedMark.toLowerCase()
      );

      this.popoverController.dismiss(); //fechar popover apos filtrar

    } else {
      this.filteredProducts = this.products;
    }
  }

  removeFilters() {
    this.selectedMark = '';

    this.getProducts();
    this.popoverController.dismiss(); //fechar popover
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
        this.getMarks(); // Chame a função getMarks após obter os produtos

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

  getMarks() {
    this.marcas = Array.from(new Set(this.products.map(product => product.Marca)));
  }
  
  async openPopoverEdit(event: any, product: any) {
    const popover = await this.popoverController.create({
      component: EditProductComponent,
      event: event,

      componentProps: {
        product: product

      },
    });

    await popover.present();
  }
 
  
}