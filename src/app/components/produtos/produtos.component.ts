import { Component, OnInit } from '@angular/core';
import { format } from 'date-fns';
import { PopoverController } from '@ionic/angular';
import { EditProductComponent } from '../popovers/update-product/edit-product.component';
import { utcToZonedTime } from 'date-fns-tz';
import { ProductsSqlService } from 'services/products_sql/products-sql.service';

import { isBefore, differenceInDays } from 'date-fns';
import { AlertController } from '@ionic/angular';

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
  sortedProducts: boolean = false

  selectedFilter: string | null = null; // Valor inicial é null

  sortOrder: string = "asc"; // Valor padrão é "asc" para ordem crescente
  selectedDate!: string;
  selectedValidate!: string;

  selectedMark: string = '';
  isLoading: boolean = true; // Inicialize isLoading como true

  constructor(
    private popoverController: PopoverController,
    private productsSqlService: ProductsSqlService,
    private alertController: AlertController,
  ) {
    this.productsSqlService.getObservableProducts().subscribe(isUpdated => {
      console.log('chegou isUpdated: ', isUpdated);
      this.getProductsFromSql()
    })
  }

  ngOnInit() {
    this.getProductsFromSql()
  }

  filterProducts(filterType: string) {
    this.selectedFilter = filterType;

    const timeZone = 'America/Sao_Paulo'; // Fuso horário desejado
    let filteredProducts = this.products; // Comece com todos os produtos

    if (this.selectedFilter === 'date' && this.selectedDate) {
      const zonedDate = utcToZonedTime(this.selectedDate, timeZone);
      const formattedDate = format(zonedDate, 'dd/MM/yyyy');
      console.log("filtro data", formattedDate);

      // Filtrar por data
      filteredProducts = filteredProducts.filter(product =>
        product.data_inscricao === formattedDate
      );
    }

    if (this.selectedFilter === 'validate' && this.selectedValidate) {
      const zonedDate = utcToZonedTime(this.selectedValidate, timeZone);
      const formattedDate = format(zonedDate, 'dd/MM/yyyy');
      console.log("filtro data", formattedDate);

      // Filtrar por data
      filteredProducts = filteredProducts.filter(product =>
        product.data_validade === formattedDate
      );
    }

    if (this.selectedFilter === 'mark' && this.selectedMark) {
      console.log("filtro marca");

      // Filtrar por marca
      filteredProducts = filteredProducts.filter(product =>
        product.marca.toLowerCase() === this.selectedMark.toLowerCase()
      );
    }

    // Agora a variável filteredProducts contém os produtos filtrados de acordo com todos os filtros aplicados
    this.filteredProducts = filteredProducts;
  }

  removeFilters() {
    this.selectedFilter = '';
    this.selectedMark = '';
    this.selectedDate = '';
    this.selectedValidate = ''

    this.getProductsFromSql();
    this.popoverController.dismiss(); //fechar popover
  }

  searchProducts(event: any) {
    this.searchTerm = event.target.value;
    console.log("termo: " + this.searchTerm);

    this.filteredProducts = this.products.filter(product =>
      product.nome.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    console.log(this.filteredProducts);
  }

  getMarks() {
    this.marcas = Array.from(new Set(this.products.map(product => product.marca)));
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

  getProductsFromSql() {
    this.isLoading = true; // Define isLoading como true antes de buscar produtos

    this.productsSqlService.getAllProducts().subscribe({
      next: (data: any) => {
        this.products = data as any[];
        // this.formatDates(); // Chame a função formatDates após obter os produtos
        this.getMarks(); // Chame a função getMarks após obter os produtos
        this.addExpirationColors(); // Adicione a função para definir cores com base no vencimento

        this.filteredProducts = this.products
        this.isLoading = false; // Certifique-se de definir isLoading como false em caso de erro também.
      },
      error: (error) => {
        console.error('Erro ao obter os produtos:', error);
        this.alertErrorGetProducts()
        this.isLoading = false; // Certifique-se de definir isLoading como false em caso de erro também.
      }
    });
  }

  async alertErrorGetProducts() {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: 'Falha ao recuperar produtos!',
      buttons: ['OK'],
    });

    await alert.present();
  }


  addExpirationColors() {
    const today = new Date();

    this.products.forEach(product => {
      const expirationDate = new Date(product.data_validade);
      const daysUntilExpiration = differenceInDays(expirationDate, today);

      console.log("daysUntilExpiration", daysUntilExpiration);

      if (daysUntilExpiration >= 60) {
        product.colorClass = 'green'; // Produto vencido
      }
      if (daysUntilExpiration < 60) {
        product.colorClass = 'yellow'; // Vencimento em até 1 mês
      }
      if (daysUntilExpiration < 30) {
        product.colorClass = 'red'; // Vencimento em até 1 mês
      }

      product.data_validade = this.aplicarMascaraData(product.data_validade);
      product.data_inscricao = this.aplicarMascaraData(product.data_inscricao);

    });
  }

  aplicarMascaraData(data) {
    if (data) {
      // Separa os componentes da data.
      const ano = data.substr(0, 4);
      const mes = data.substr(5, 2);
      const dia = data.substr(8, 2);

      // Aplica a máscara (dd/MM/yyyy).
      console.log(`${dia}/${mes}/${ano}`);

      return `${dia}/${mes}/${ano}`;
    } else {
      return data; // Retorna a data original se estiver em um formato incorreto.
    }
  }

  sortProducts() {
    if (!this.sortedProducts) {
      console.log("ordenar");
      this.filteredProducts = [...this.products].sort(function (a, b) {
        return a.nome < b.nome ? -1 : a.nome > b.nome ? 1 : 0;
      });
      this.sortedProducts = true;
    } else {
      console.log("não ordenar");
      this.filteredProducts = [...this.products];
      this.sortedProducts = false;
    }
  }

  filterByColor(color: string) {
    if (color === 'green' || color === 'yellow' || color === 'red') {
      this.filteredProducts = this.products.filter(product => product.colorClass === color);
    }
  }

  getColorClass(product: any) {
    return product.colorClass; // Este campo deve conter a classe de cor (ex: 'green-light', 'yellow-light', 'red-light')
  }
}