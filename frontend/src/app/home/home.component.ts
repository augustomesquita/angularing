import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @Input() slcColorPage: string

  private textoParaSerMostrado: string
  private textoParaSerSalvo: string
  private isMouseOver: boolean
  private twoWayText: string
  private valorEnviado: number

  constructor() {
    this.isMouseOver = false
    this.twoWayText = 'two-way-data-binding'
    this.valorEnviado = 50
  }

  ngOnInit() { }

  mostrarTexto(textoParaSerMostrado: string) {
    this.textoParaSerMostrado = textoParaSerMostrado
  }

  salvarTexto(textoParaSerSalvo: string) {
    this.textoParaSerSalvo = textoParaSerSalvo
  }

  mouseOverOut(): void {
    this.isMouseOver = !this.isMouseOver
  }

  setStyles(): Object {
    const styles = {
      'font-style': this.isMouseOver ? 'italic' : 'normal',
      'font-weight': this.isMouseOver ? 'bold' : null,
      'font-size': this.isMouseOver ? 'large' : null,
      'cursor': this.isMouseOver ? 'pointer' : null,
    };
    return styles;
  }

  recebeValorModificado(event: any) {
    this.valorEnviado = event.novoValor
  }

  btnClass(): Object {
    return {
      'btn-primary': this.slcColorPage === 'blue',
      'btn-warning': this.slcColorPage === 'orange',
      'btn-danger': this.slcColorPage === 'red'
    }
  }

  borderClass(): any {
    return 'border-' + this.slcColorPage
  }

  divWithMouseEffectClass(): Object {
    return {
      'background-blue': this.slcColorPage === 'blue' && this.isMouseOver,
      'background-orange': this.slcColorPage === 'orange' && this.isMouseOver,
      'background-red': this.slcColorPage === 'red' && this.isMouseOver
    }
  }

}
