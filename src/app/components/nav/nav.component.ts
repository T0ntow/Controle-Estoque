import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

  exibirServicos = false;

  mostrarServicos() {
    this.exibirServicos = !this.exibirServicos;
  }

  exibirAlteracao = false;

  mostrarAlteracao() {
    this.exibirAlteracao = !this.exibirAlteracao;
  }
}
