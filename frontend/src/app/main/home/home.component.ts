import { Component, OnInit, Input } from '@angular/core';
import { MeuServicoService } from './../../service/meu-servico/meu-servico.service';
import { SettingsService } from './../../service/settings/settings.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private slcColorPage: string

  private textoParaSerMostrado: string
  private textoParaSerSalvo: string
  private isMouseOver: boolean
  private twoWayText: string
  private valorEnviado: number
  private stringsFromService: string[]
  private livro: LivroInterface


  constructor(private meuServico: MeuServicoService, private settingsService: SettingsService) {
    this.slcColorPage = 'blue'
    this.isMouseOver = false
    this.twoWayText = 'two-way-data-binding'
    this.valorEnviado = 50
    this.stringsFromService = meuServico.getAllStrings()
    this.settingsService.themeColorEmitter.subscribe(res => this.slcColorPage = res)
    this.livro = {
      titulo : 'Easy Angularing',
      dataLancamento : 1518782264848,
      preco: 30
    }
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

  addUsingService(ipt: any): void {
    this.meuServico.putString(ipt.value)
    ipt.value = ''
  }

}

interface LivroInterface {
  titulo: string,
  dataLancamento: number,
  preco: number
}
