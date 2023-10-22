import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { format, utcToZonedTime } from 'date-fns-tz';
import jsPDF from 'jspdf'; // Import the jspdf library
import { ReportService } from 'services/report/report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})

export class ReportPage implements OnInit {
  registros: any[] = [];
  entradas: any[] = [];
  saidas: any[] = [];

  entradasFiltradas: any[] = [];
  saidasFiltradas: any[] = [];


  searchTerm: string = "";

  registrosFiltrados: any[] = []; // Nova lista para registros filtrados
  @ViewChild('content', { static: false }) content!: ElementRef;

  // Adicione uma variável de controle
  orderDescendingExit: boolean = true;
  orderDescendingEntry: boolean = true;

  selectedDate!: string;

  constructor(
    private reportService: ReportService,
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.reportService.getEntry().subscribe({
      next: (response: any) => {
        console.log('Entradas obtidas com sucesso:', response);
        this.entradas = response
        this.entradasFiltradas = this.entradas
      },
      error: (error) => {
        console.error('Erro ao obter entradas:', error);
      }
    });

    this.reportService.getExit().subscribe({
      next: (response: any) => {
        console.log('Saídas obtidas com sucesso:', response);
        this.saidas = response
        this.saidasFiltradas = this.saidas
      },
      error: (error) => {
        console.error('Erro ao obter saídas:', error);
      }
    });

  }

  procurarRegistros(event: any) {
    this.searchTerm = event.target.value;

    // Filtrar entradas com base no termo de pesquisa
    this.entradasFiltradas = this.entradas.filter((registro: { nome_produto: string; }) => {
      return registro.nome_produto.toLowerCase().includes(this.searchTerm.toLowerCase());
    });

    // // Filtrar saídas com base no termo de pesquisa
    this.saidasFiltradas = this.saidas.filter((registro: { nome_produto: string; }) => {
      return registro.nome_produto.toLowerCase().includes(this.searchTerm.toLowerCase());
    });
  }


  downloadPdf() {
    const content = document.getElementById("content");

    const doc = new jsPDF({
      orientation: "portrait",
      format: [800, 1400]
    });

    doc.html(content!, {
      callback: function (pdf) {
        pdf.save("relatorio.pdf");
      }
    });
  }

  invertExit() {
    // Certifique-se de que 'saidas' esteja preenchido
    if (this.saidasFiltradas.length > 0) {
      if (this.orderDescendingExit) {
        // Ordene as saídas com base na data, do mais recente para o mais antigo
        this.saidasFiltradas.sort((a: any, b: any) => {
          const dateA = new Date(a.data_hora); // Supondo que 'data_hora' é o campo da data nas saídas
          const dateB = new Date(b.data_hora);
          return dateB.getTime() - dateA.getTime();
        });
      } else {
        // Ordene as saídas com base na data, do mais antigo para o mais recente
        this.saidasFiltradas.sort((a: any, b: any) => {
          const dateA = new Date(a.data_hora);
          const dateB = new Date(b.data_hora);
          return dateA.getTime() - dateB.getTime();
        });
      }

      // Alterne a variável de controle para o próximo clique
      this.orderDescendingExit = !this.orderDescendingExit;
    } else {
      console.warn("A lista de saídas está vazia. Não é possível ordenar.");
    }
  }


  invertEntry() {
    // Certifique-se de que 'saidas' esteja preenchido
    if (this.entradasFiltradas.length > 0) {
      if (this.orderDescendingEntry) {
        // Ordene as saídas com base na data, do mais recente para o mais antigo
        this.entradasFiltradas.sort((a: any, b: any) => {
          const dateA = new Date(a.data_hora); // Supondo que 'data_hora' é o campo da data nas saídas
          const dateB = new Date(b.data_hora);
          return dateB.getTime() - dateA.getTime();
        });
      } else {
        // Ordene as saídas com base na data, do mais antigo para o mais recente
        this.entradasFiltradas.sort((a: any, b: any) => {
          const dateA = new Date(a.data_hora);
          const dateB = new Date(b.data_hora);
          return dateA.getTime() - dateB.getTime();
        });
      }

      // Alterne a variável de controle para o próximo clique
      this.orderDescendingEntry = !this.orderDescendingEntry;
    } else {
      console.warn("A lista de saídas está vazia. Não é possível ordenar.");
    }
  }

  filterRegisters() {
    const timeZone = 'America/Sao_Paulo'; // Fuso horário desejado

    if (this.selectedDate) {
      const zonedDate = utcToZonedTime(this.selectedDate, timeZone);
      const formattedDate = format(zonedDate, 'dd/MM/yyyy HH:mm:ss');

      // Filtrar por data
      this.registrosFiltrados = this.registros.filter(registro => {
        if (registro.entradas) {
          registro.entradas.data_hora === formattedDate
        } else {
          registro.saidas.data_hora === formattedDate
        }
      });

      // console.log("this.registrosFiltrados", this.registrosFiltrados );
    } else {
      this.registrosFiltrados = this.registros;
    }
  }


  removeFilters() {
    this.selectedDate = ''
    this.filterRegisters()
  }
}