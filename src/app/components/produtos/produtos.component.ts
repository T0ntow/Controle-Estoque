import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'services/products.service';
import { format } from 'date-fns';
import { PopoverController } from '@ionic/angular';
import { EditProductComponent } from '../popovers/edit-product/edit-product.component';
import { utcToZonedTime } from 'date-fns-tz';

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

  selectedFilter: string | null = null; // Valor inicial é null

  sortOrder: string = "asc"; // Valor padrão é "asc" para ordem crescente
  selectedDate!: string;
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

  filterProducts(filterType: string) {
    this.selectedFilter = filterType;
  
    const timeZone = 'America/Sao_Paulo'; // Fuso horário desejado
  
    let filteredProducts = this.products;
  
    if (this.selectedFilter === 'date' && this.selectedDate) {
      const zonedDate = utcToZonedTime(this.selectedDate, timeZone);
      // Formatar a data selecionada no formato 'DD/MM/YYYY'
      const formattedDate = format(zonedDate, 'dd/MM/yyyy');
  
      // Filtrar por data
      filteredProducts = filteredProducts.filter(product =>
        product.Data === formattedDate
      );
    }
  
    else if (this.selectedFilter === 'mark' && this.selectedMark) {
      // Filtrar por marca
      filteredProducts = filteredProducts.filter(product =>
        product.Marca.toLowerCase() === this.selectedMark.toLowerCase()
      );
    }
  
    this.filteredProducts = filteredProducts;
  
    console.log(this.filteredProducts);
  }
  
  removeFilters() {
    this.selectedFilter = '';
    this.selectedMark = '';
    this.selectedDate = '';

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
        console.log(this.products);

        this.formatDates(); // Chame a função formatDates após obter os produtos
        this.filteredProducts = this.products;
        this.getMarks(); // Chame a função getMarks após obter os produtos

      },
      error: (error) => {
        console.error('Erro ao obter os produtos:', error);
      }
    });
  }

  sortProducts() {
    //copia dos produtos filrados
    let sortedProducts = [...this.filteredProducts];
  
    if (this.sortOrder === "asc") {
      sortedProducts.sort((a, b) => a.Codigo - b.Codigo);
    } else if (this.sortOrder === "desc") {
      sortedProducts.sort((a, b) => b.Codigo - a.Codigo);
    }
  
    this.filteredProducts = sortedProducts;
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