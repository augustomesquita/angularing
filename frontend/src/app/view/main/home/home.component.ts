import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../../control/authentication/authentication.service';
import { MeuServicoService } from '../../../control/meu-servico/meu-servico.service';
import { SettingsService } from '../../../control/settings/settings.service';
import { AuthenticateUser } from '../../../model/entity/authenticate-user.model';


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

  private loggedUser: AuthenticateUser;
  private loggedIn: boolean;

  constructor(private meuServico: MeuServicoService,
    private settingsService: SettingsService,
    private router: Router,
    private authService: AuthenticationService
  ) {

    this.slcColorPage = 'blue'
    this.isMouseOver = false
    this.twoWayText = 'two-way-data-binding'
    this.valorEnviado = 50
    this.stringsFromService = meuServico.getAllStrings()
    this.settingsService.themeColorEmitter.subscribe(res => this.slcColorPage = res)
    this.livro = {
      titulo: 'Easy Angularing',
      dataLancamento: 1518782264848,
      preco: 30
    }

  }

  ngOnInit(): void {
    this.loggedUser = this.authService.getValidUserAtLocalStorage();
    console.log(JSON.stringify(this.loggedUser));
  }

  fazerLogout() {
    this.authService.logout();
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
