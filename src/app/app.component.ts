import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  private textoParaSerMostrado: string
  private textoParaSerSalvo: string
  private isMouseOver: boolean
  private twoWayText: string
  private slcColorPage: string
  private valorEnviado: number

  constructor() {
    this.isMouseOver = false
    this.twoWayText = 'two-way-data-binding'
    this.slcColorPage = 'red'
    this.valorEnviado = 50
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

  divClass(): Object {
    return {
      'background-blue': this.slcColorPage === 'blue',
      'background-orange': this.slcColorPage === 'orange',
      'background-red': this.slcColorPage === 'red'
    }
  }

  borderClass(): Object {
    return {
      'border-blue': this.slcColorPage === 'blue',
      'border-orange': this.slcColorPage === 'orange',
      'border-red': this.slcColorPage === 'red'
    }
  }

  divWithMouseEffectClass(): Object {
    return {
      'background-blue': this.slcColorPage === 'blue' && this.isMouseOver,
      'background-orange': this.slcColorPage === 'orange' && this.isMouseOver,
      'background-red': this.slcColorPage === 'red' && this.isMouseOver
    }
  }

  divMouseStyle(): Object {
    return {
      'color': this.isMouseOver ? 'white' : 'black'
    }
  }


}
