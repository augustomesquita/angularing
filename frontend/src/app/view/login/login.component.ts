import { Component, OnInit, OnDestroy, Renderer, ViewChild, ElementRef, ViewEncapsulation, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Headers, Http, Response } from '@angular/http';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import { Subscription } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { NotificationsService } from 'angular2-notifications';
import { AuthenticationService } from 'app/control/authentication/authentication.service';
import { SettingsService } from 'app/control/settings/settings.service';
import * as EventSource from 'eventsource'
import { UrlService } from 'app/control/url/url.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private messagesToAdd: string;
  private message: string;
  private zone: NgZone;

  private notificationOption = {
    position: ['bottom', 'center'],
    timeOut: 3000,
    lastOnBottom: true,
    showProgressBar: true
  }

  private menuOpened: boolean;

  constructor(private authenticationService: AuthenticationService, private http: Http, private renderer: Renderer) {
    this.menuOpened = false
    this.message = '';
    this.zone = new NgZone({enableLongStackTrace: false});

    // Para rotas protegidas por token:
    // const eventSource = new EventSource(SettingsService.API_URL + '/courses', SettingsService.getHeaderOptions());

    // Para rotas com acesso liberado:
    const eventSource = new EventSource(SettingsService.API_URL + '/messagings');
    eventSource.addEventListener('message-created', (event) => this.messageReceivedFromWebSocket(event.data));
  }

  ngOnInit() {
    this.menuOpened = false;
    this.messagesToAdd = '';
  }

  loginFacebook() {
    this.authenticationService.doLoginFacebook();
  }

  loginGoogle() {
    this.authenticationService.doLoginGoogle();
  }

  toggleMessagingBox() {
    this.menuOpened = !this.menuOpened;
  }

  sendMessage(iptMessage: any) {
    this.message = iptMessage.value;

    const url = SettingsService.API_URL + '/messagings/new';
    const headers = new Headers({ 'Content-Type': 'text/plain' });

    if (this.message !== null && this.message.length > 0) {
      this.http.post(url, this.message, { headers }).subscribe(
        (response) => iptMessage.value = '',
        (error) => console.log('Erro... Servidor não respondeu.' + error)
      );
    }
  }

  messageReceivedFromWebSocket(message: string) {
    this.zone.run(() => {
      if (this.message != message) {
        this.messagesToAdd += '<li><div class="left-chat"><img src="assets/yoshi_chat.png"><p>' + message + '</p></div></li>'
      } else {
        this.messagesToAdd += '<li><div class="right-chat"><img src="assets/mario_chat.png"><p>' + message + '</p></div></li>'
      }
    });
  }

}
