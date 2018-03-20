import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Headers, Http, Response } from '@angular/http';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider } from 'angular4-social-login';
import { Subscription } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { NotificationsService } from 'angular2-notifications';
import { AuthenticationService } from 'app/control/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private notificationOption = {
    position: ['bottom', 'center'],
    timeOut: 3000,
    lastOnBottom: true,
    showProgressBar: true
  }

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  loginFacebook() {
    this.authenticationService.doLoginFacebook();
  }

  loginGoogle() {
    this.authenticationService.doLoginGoogle();
  }

}
