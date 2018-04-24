import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SimpleNotificationsModule } from 'angular2-notifications';
import { SocialLoginModule } from 'angularx-social-login';

import { LoginComponent } from './login.component';
import { LoginLayoutComponent } from './login-layout.component';
import { AuthenticationService } from '../../control/authentication/authentication.service';
import { LoginRoutingModule } from './login.routing.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SharedModule } from '../shared/shared.module';
import { StompConfig } from '@stomp/ng2-stompjs';
import * as SockJS from 'sockjs-client';

export function socketProvider() {
  return new SockJS('http://localhost:8080/chat');
}

const STOMP_CONFIG: StompConfig = {
  // Which server?
  url: socketProvider,

  // Headers
  // Typical keys: login, passcode, host
  headers: {
   login: 'guest',
   passcode: 'guest'
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
    LoginRoutingModule,
    AngularSvgIconModule,
    SocialLoginModule,
    SimpleNotificationsModule.forRoot(),
  ],
  declarations: [LoginComponent, LoginLayoutComponent],
  providers: []
})
export class LoginModule { }
