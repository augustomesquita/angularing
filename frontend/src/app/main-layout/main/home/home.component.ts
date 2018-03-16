import { AuthenticationService } from './../../../service/authentication/authentication.service';
import { Router } from '@angular/router';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MeuServicoService } from 'app/service/meu-servico/meu-servico.service';
import { SettingsService } from 'app/service/settings/settings.service';
import { AuthService, SocialUser } from 'angular4-social-login';
import { Subscription } from 'rxjs/Rx';
import { User } from './../../../model/user.model';

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

  private loggedUser: User;
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
      titulo : 'Easy Angularing',
      dataLancamento : 1518782264848,
      preco: 30
    }
  }

  ngOnInit(): void {
    debugger;
    this.loggedUser = JSON.parse(localStorage.getItem(SettingsService.LOGGED_USER));
    console.log("loogerdUser: " + this.loggedUser)
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
