import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

  registrosFiltrados: any[] = []; // Nova lista para registros filtrados
  @ViewChild('content', { static: false }) content!: ElementRef;

  constructor(
    private reportService: ReportService,
  ) { }

  ngOnInit() {
    this.getEntry();
    this.getExit();
    console.log("registros", this.registros);
  }

  getEntry() {
    this.reportService.getEntry().subscribe({
      next: (response: any) => {
        console.log('Entradas obtidas com sucesso:', response);
        this.entradas = response; // Atribui a resposta a 'entradas'
        this.registros.push({entradas: this.entradas})
      },
      error: (error) => {
        console.error('Erro ao obter entradas:', error);
      }
    });
  }
  
  getExit() {
    this.reportService.getExit().subscribe({
      next: (response: any) => {
        console.log('Saídas obtidas com sucesso:', response);
        this.saidas = response; // Atribui a resposta a 'saidas'
        this.registros.push({saidas: this.saidas})
      },
      error: (error) => {
        console.error('Erro ao obter saídas:', error);
      }
    });
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