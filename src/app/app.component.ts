import { Component } from '@angular/core';

@Component({
  selector: 'asq-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  private textoParaSerMostrado: string
  private textoParaSerSalvo: string
  private isMouseOver: boolean
  private twoWayText: string

  constructor() {
    this.isMouseOver = false
    this.twoWayText = 'two-way-data-binding'
  }

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

  recebeValorModificado(event: Object) {
    console.log(event)
  }

}
