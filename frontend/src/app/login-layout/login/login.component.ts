import { AuthenticationService } from './../../service/authentication/authentication.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Headers, Http, Response } from '@angular/http';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider } from 'angular4-social-login';
import { Subscription } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private authSub: Subscription;

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
