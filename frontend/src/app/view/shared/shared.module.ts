import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { StompConfig, StompService } from '@stomp/ng2-stompjs';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { SettingsService } from '../../control/settings/settings.service';
import { AuthenticateUser } from '../../model/entity/authenticate-user.model';
import { ChatWsComponent } from '../shared/chatws/chatws.component';
import { ChatwsTextComponent } from './chatws/chatws-text/chatws-text.component';


@NgModule({
  // imports:
  // Importa declarações  que foram 'exports' (exportadas) de outros módulos tornando-os disponíveis
  // no módulo atual.
  imports: [
    CommonModule,
    AngularSvgIconModule
  ],

  // exports:
  // Faz com componentes, diretivas ou pipes fiquem disponíveis em outros módulos que importem ESTE módulo.
  // Também é geralmente usado para 're-exportar' módulos como CommonModule e FormsModule através do módulo shared.
  // Isso facilita pois assim não precisamos ter que importar o módulo CommonModule e FormsModule sempre, apenas o SharedModule.
  exports: [ChatWsComponent, ChatwsTextComponent],

  // declarations:
  // Usado para fazer com que diretivas do módulo atual fiquem disponíveis para outras diretivas dentro deste mesmo módulo.
  // Simplificando: É usado para declarar componentes, diretivas ou pipes que pertencem a ESTE módulo.
  // Todos os elements dentro do array de declarations conhecem um ao outro.
  declarations: [ChatWsComponent, ChatwsTextComponent],

  // Permite realização de injeção de dependência deste serviço dentro dos components e de serviços presentes no módulo.
  providers: [StompService],
  entryComponents: [ ChatwsTextComponent ],
})

export class SharedModule {
  public static forChild(): ModuleWithProviders {

    let userIdentification: string;
    userIdentification = 'guest';

    if (this.getValidUserAtLocalStorage() != null && this.getValidUserAtLocalStorage().user != null) {
      userIdentification = this.getValidUserAtLocalStorage().user.email;
    }

    if (userIdentification === null
      || userIdentification === undefined
      || userIdentification.length == 0) {
      userIdentification = 'guest';
    }


    const stompConfig: StompConfig = {
      // Which server?
      url: 'ws://localhost:8080/angularing-ws',

      // Headers
      // Typical keys: login, passcode, host
      headers: {
        login: userIdentification,
        passcode: userIdentification
      },

      // How often to heartbeat?
      // Interval in milliseconds, set to 0 to disable
      heartbeat_in: 0, // Typical value 0 - disabled
      heartbeat_out: 20000, // Typical value 20000 - every 20 seconds

      // Wait in milliseconds before attempting auto reconnect
      // Set to 0 to disable
      // Typical value 5000 (5 seconds)
      reconnect_delay: 5000,

      // Will log diagnostics on console
      debug: true
    }

    return {
      ngModule: SharedModule,
      providers: [{ provide: StompConfig, useValue: stompConfig }]
    }
  }

  private static getValidUserAtLocalStorage(): AuthenticateUser {
    return JSON.parse(localStorage.getItem(SettingsService.LOGGED_USER)) as AuthenticateUser;
  }

}



