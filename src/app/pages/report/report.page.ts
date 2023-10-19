import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {
  registros: any[] = [];
  registrosFiltrados: any[] = []; // Nova lista para registros filtrados

  constructor() { }

  ngOnInit() {
    // Exemplo de registros (você pode obter os dados de uma API ou banco de dados)
    this.registros = [
      { tipo: 'Entrada', nomeProduto: 'Produto A', quantidade: 10, dataHora: '2023-10-18 10:00:00' },
      { tipo: 'Saída', nomeProduto: 'Produto B', quantidade: 5, dataHora: '2023-10-18 14:30:00' },
      { tipo: 'Entrada', nomeProduto: 'Produto C', quantidade: 8, dataHora: '2023-10-18 15:45:00' },
      // Adicione mais registros conforme necessário
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

  imprimirRelatorio() {
    // Lógica para imprimir o relatório
    // Você pode usar uma biblioteca ou serviço de impressão aqui
  }

  mostrarFiltro() {
    // Lógica para mostrar opções de filtro (por data, semana, mês)
    // Você pode abrir um modal ou outra interface para configurar o filtro
  }
  
}
