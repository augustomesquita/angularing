import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ChatWsComponent } from '../shared/chatws/chatws.component';
import { StompConfig, StompService } from '@stomp/ng2-stompjs';

const stompConfig: StompConfig = {
  // Which server?
  url: 'ws://localhost:8080/chat',

  // Headers
  // Typical keys: login, passcode, host
  headers: {
   // login: 'guest',
   // passcode: 'guest'
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
    AngularSvgIconModule
  ],
  declarations: [ChatWsComponent],
  exports: [ChatWsComponent],
  providers: [StompService, {provide: StompConfig, useValue: stompConfig}]
})
export class SharedModule { }
