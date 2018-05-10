import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ChatWsComponent } from '../shared/chatws/chatws.component';
import { StompConfig, StompService } from '@stomp/ng2-stompjs';
import { AuthenticateUser } from '../../model/entity/authenticate-user.model';
import { SettingsService } from '../../control/settings/settings.service';


@NgModule({
  imports: [
    CommonModule,
    AngularSvgIconModule
  ],
  declarations: [ChatWsComponent],
  providers: [StompService]
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



