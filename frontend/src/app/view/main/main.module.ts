import { AuthGuard } from './../../control/auth-guard/auth.guard';
import { NgModule } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NavComponent } from './nav/nav.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { ComponenteReusavelComponent } from './home/componente-reusavel/componente-reusavel.component';
import { MainLayoutComponent } from './main-layout.component';
import { CursoComponent } from './curso/curso.component';
import { MouseOverHighlightDirective } from '../shared/mouse-over-highlight/mouse-over-highlight.directive';
import { MeuServicoService } from '../../control/meu-servico/meu-servico.service';
import { SettingsService } from '../../control/settings/settings.service';
import { CursoService } from '../../control/curso/curso.service';
import { MainRoutingModule } from './main.routing.module';
import { SharedModule } from '../shared/shared.module';
import { CustomDeactivateGuard } from '../../control/auth-guard/custom-deactivate.guard';
import { StompConfig } from '@stomp/ng2-stompjs';
import * as SockJS from 'sockjs-client';
import { AuthenticateUser } from '../../model/entity/authenticate-user.model';

export function socketProvider() {
  return new SockJS('http://localhost:8080/chat');
}


function getValidUserAtLocalStorage(): AuthenticateUser {
  return JSON.parse(localStorage.getItem(SettingsService.LOGGED_USER)) as AuthenticateUser;
}

const STOMP_CONFIG: StompConfig = {
  // Which server?
  url: socketProvider,

  // Headers
  // Typical keys: login, passcode, host
  headers: {
   login: 'master',
   passcode: 'master'
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
};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule.forChild(STOMP_CONFIG),
    MainRoutingModule,
    AngularSvgIconModule
  ],
  declarations: [
    NavComponent,
    AboutComponent,
    HomeComponent,
    ComponenteReusavelComponent,
    MainLayoutComponent,
    CursoComponent,
    MouseOverHighlightDirective
  ],
  providers: [
    AuthGuard,
    CustomDeactivateGuard,
    MeuServicoService,
    CursoService
  ]
})
export class MainModule {
  constructor() {}
 }
