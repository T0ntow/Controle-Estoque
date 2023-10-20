import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf'; // Import the jspdf library
import html2canvas from 'html2canvas'
// import html2pdf from 'html2pdf.js';
import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})

export class ReportPage implements OnInit {
  registros: any[] = [];
  registrosFiltrados: any[] = []; // Nova lista para registros filtrados
  @ViewChild('content', { static: false }) content!: ElementRef;

  constructor() { }

  ngOnInit() {
    this.registros = [
      { tipo: 'Entrada', nomeProduto: 'Produto A', quantidade: 10, dataHora: '2023-10-18 10:00:00' },
      { tipo: 'Saída', nomeProduto: 'Produto B', quantidade: 5, dataHora: '2023-10-18 14:30:00' },
      { tipo: 'Entrada', nomeProduto: 'Produto C', quantidade: 8, dataHora: '2023-10-18 15:45:00' },
      { tipo: 'Entrada', nomeProduto: 'Produto D', quantidade: 10, dataHora: '2023-10-18 10:00:00' },
      { tipo: 'Saída', nomeProduto: 'Produto E', quantidade: 5, dataHora: '2023-10-18 14:30:00' },
      { tipo: 'Entrada', nomeProduto: 'Produto F', quantidade: 8, dataHora: '2023-10-18 15:45:00' },
      { tipo: 'Entrada', nomeProduto: 'Produto G', quantidade: 10, dataHora: '2023-10-18 10:00:00' },
      { tipo: 'Saída', nomeProduto: 'Produto H', quantidade: 5, dataHora: '2023-10-18 14:30:00' },
      { tipo: 'Entrada', nomeProduto: 'Produto I', quantidade: 8, dataHora: '2023-10-18 15:45:00' },
      { tipo: 'Entrada', nomeProduto: 'Produto J', quantidade: 10, dataHora: '2023-10-18 10:00:00' },
      { tipo: 'Saída', nomeProduto: 'Produto K', quantidade: 5, dataHora: '2023-10-18 14:30:00' },
      { tipo: 'Entrada', nomeProduto: 'Produto L', quantidade: 8, dataHora: '2023-10-18 15:45:00' },
      { tipo: 'Entrada', nomeProduto: 'Produto M', quantidade: 10, dataHora: '2023-10-18 10:00:00' },
      { tipo: 'Entrada', nomeProduto: 'Produto A', quantidade: 10, dataHora: '2023-10-18 10:00:00' },
      { tipo: 'Saída', nomeProduto: 'Produto B', quantidade: 5, dataHora: '2023-10-18 14:30:00' },
      { tipo: 'Entrada', nomeProduto: 'Produto C', quantidade: 8, dataHora: '2023-10-18 15:45:00' },
      { tipo: 'Entrada', nomeProduto: 'Produto D', quantidade: 10, dataHora: '2023-10-18 10:00:00' },
      { tipo: 'Saída', nomeProduto: 'Produto E', quantidade: 5, dataHora: '2023-10-18 14:30:00' },
      { tipo: 'Entrada', nomeProduto: 'Produto F', quantidade: 8, dataHora: '2023-10-18 15:45:00' },
      { tipo: 'Entrada', nomeProduto: 'Produto G', quantidade: 10, dataHora: '2023-10-18 10:00:00' },
      { tipo: 'Saída', nomeProduto: 'Produto H', quantidade: 5, dataHora: '2023-10-18 14:30:00' },
      { tipo: 'Entrada', nomeProduto: 'Produto I', quantidade: 8, dataHora: '2023-10-18 15:45:00' },
      { tipo: 'Entrada', nomeProduto: 'Produto J', quantidade: 10, dataHora: '2023-10-18 10:00:00' },
      { tipo: 'Saída', nomeProduto: 'Produto K', quantidade: 5, dataHora: '2023-10-18 14:30:00' },
      { tipo: 'Entrada', nomeProduto: 'Produto L', quantidade: 8, dataHora: '2023-10-18 15:45:00' },
      { tipo: 'Entrada', nomeProduto: 'Produto M', quantidade: 10, dataHora: '2023-10-18 10:00:00' },

    ];

    this.registrosFiltrados = this.registros;
  }

  filtrarRegistros(event: any) {
    const searchTerm = event.target.value;
    if (searchTerm) {
      // Filtrar registros com base no termo de pesquisa
      this.registrosFiltrados = this.registros.filter(registro => {
        return registro.nomeProduto.toLowerCase().includes(searchTerm.toLowerCase());
      });
    } else {
      // Se a barra de pesquisa estiver vazia, exiba todos os registros
      this.registrosFiltrados = this.registros;
    }
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

  mostrarFiltro() {
    // Lógica para mostrar opções de filtro (por data, semana, mês)
    // Você pode abrir um modal ou outra interface para configurar o filtro
  }

}
