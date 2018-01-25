import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-componente-reusavel',
  templateUrl: './componente-reusavel.component.html',
  styleUrls: ['./componente-reusavel.component.css']
})
export class ComponenteReusavelComponent implements OnInit {

  @Input() valor: number
  @Output() valorMudou = new EventEmitter()

  constructor() { }

  ngOnInit() {
  }

  incrementa() {
    this.valor++
    this.valorMudou.emit({novoValor: this.valor})
  }

  decrementa() {
    this.valor--
    this.valorMudou.emit({novoValor: this.valor})
  }

}
