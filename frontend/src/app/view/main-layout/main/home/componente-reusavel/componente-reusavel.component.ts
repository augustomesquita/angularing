import { Component, OnInit, Input, OnChanges, Output, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-componente-reusavel',
  templateUrl: './componente-reusavel.component.html',
  styleUrls: ['./componente-reusavel.component.scss']
})
export class ComponenteReusavelComponent implements OnChanges {

  @Input() valor: number
  @Input() componenteReusavelSlcColorPage: string
  @Output() valorMudou = new EventEmitter()

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    console.log('OnChange ocorreu!')

    if (changes.valor) {
      console.log(`Mudança em 'valor':`)
      console.log(changes.valor)
    }

    if (changes.componenteReusavelSlcColorPage) {
      console.log(`Mudança em 'componenteReusavelSlcColorPage':`)
      console.log(changes.componenteReusavelSlcColorPage)
    }

  }

  incrementa() {
    this.valor++
    this.valorMudou.emit({ novoValor: this.valor })
  }

  decrementa() {
    this.valor--
    this.valorMudou.emit({ novoValor: this.valor })
  }

  borderClass(): Object {
    return {
      'border-blue': this.componenteReusavelSlcColorPage === 'blue',
      'border-orange': this.componenteReusavelSlcColorPage === 'orange',
      'border-red': this.componenteReusavelSlcColorPage === 'red'
    }
  }

  btnClass(): Object {
    return {
      'btn-primary': this.componenteReusavelSlcColorPage === 'blue',
      'btn-warning': this.componenteReusavelSlcColorPage === 'orange',
      'btn-danger': this.componenteReusavelSlcColorPage === 'red'
    }
  }

}
