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
  // filteredProducts: any[] = [];

  selectedFilter: string | null = null; // Valor inicial é null

  sortOrder: string = "asc"; // Valor padrão é "asc" para ordem crescente
  selectedDate!: string;
  selectedMark: string = '';

  errorGetProducts: boolean = false;

  constructor(
    private productService: ProductsService,
    private popoverController: PopoverController) {
    this.productService.getObservableProducts().subscribe(isUpdated => {
      console.log('chegou isUpdated: ', isUpdated);
      // this.getProducts()
    })
  }

  ngOnInit() {
    // this.getProducts()
  }

  filteredProducts = [
    {
      Codigo: 1,
      Produto: 'Produto 1',
      Marca: 'Marca A',
      Data: '2023-10-11',
      Estoque: 100,
      Entrada: 50,
      Saida: 20,
    },
    {
      Codigo: 2,
      Produto: 'Produto 2',
      Marca: 'Marca B',
      Data: '2023-10-10',
      Estoque: 75,
      Entrada: 30,
      Saida: 25,
    },
    {
      Codigo: 3,
      Produto: 'Produto 3',
      Marca: 'Marca C',
      Data: '2023-10-09',
      Estoque: 60,
      Entrada: 40,
      Saida: 10,
    },
    {
      Codigo: 4,
      Produto: 'Produto 4',
      Marca: 'Marca A',
      Data: '2023-10-08',
      Estoque: 80,
      Entrada: 45,
      Saida: 15,
    },
    {
      Codigo: 5,
      Produto: 'Produto 5',
      Marca: 'Marca D',
      Data: '2023-10-07',
      Estoque: 120,
      Entrada: 60,
      Saida: 30,
    },
    {
      Codigo: 6,
      Produto: 'Produto 6',
      Marca: 'Marca B',
      Data: '2023-10-06',
      Estoque: 90,
      Entrada: 55,
      Saida: 35,
    },
    {
      Codigo: 7,
      Produto: 'Produto 7',
      Marca: 'Marca A',
      Data: '2023-10-05',
      Estoque: 110,
      Entrada: 70,
      Saida: 40,
    },
    {
      Codigo: 8,
      Produto: 'Produto 8',
      Marca: 'Marca C',
      Data: '2023-10-04',
      Estoque: 70,
      Entrada: 50,
      Saida: 20,
    },
    {
      Codigo: 9,
      Produto: 'Produto 9',
      Marca: 'Marca D',
      Data: '2023-10-03',
      Estoque: 85,
      Entrada: 45,
      Saida: 40,
    },
    {
      Codigo: 10,
      Produto: 'Produto 10',
      Marca: 'Marca B',
      Data: '2023-10-02',
      Estoque: 95,
      Entrada: 60,
      Saida: 30,
    },
  ];
  

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
        this.errorGetProducts = true;
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