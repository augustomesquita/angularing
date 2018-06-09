import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http'
import { Router } from '@angular/router';

import { NotificationsService } from 'angular2-notifications';
import { Observable } from 'rxjs/Observable';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider, SocialUser } from 'angularx-social-login';

import { AuthUser, AuthResponse } from '../../model/entity/authentication.model';
import { SettingsService } from '../settings/settings.service';
import { UrlService } from './../url/url.service';

const FACEBOOK_STRING = 'Facebook';
const GOOGLE_STRING = 'Google'

@Injectable()
export class AuthenticationService {

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient,
    private notificationService: NotificationsService) { }

  public doLoginFacebook() {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID)
      .then((socialUser) => this.login(socialUser), (error) => this.errorOnSocialProfileCredentials(FACEBOOK_STRING, error))
      .catch((error) => this.errorOnSocialProfileConnection(FACEBOOK_STRING, error));
  }

  public doLoginGoogle() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((socialUser) => this.login(socialUser), (error) => this.errorOnSocialProfileCredentials(GOOGLE_STRING, error))
      .catch((error) => this.errorOnSocialProfileConnection(GOOGLE_STRING, error));
  }

  // Remove usuário do localStorage (invalidando)
  // e redireciona o mesmo para página inicial.
  public logout(): void {
    this.authService.signOut().then(
      (sucess) => {
        localStorage.removeItem(SettingsService.LOGGED_USER);
        this.router.navigate([UrlService.WEB_LOGIN_URL])
      },
      (error) => console.log(error)
    );
  }

  public getValidUserAtLocalStorage(): AuthUser {
    return JSON.parse(localStorage.getItem(SettingsService.LOGGED_USER)) as AuthUser;
  }

  private login(socialUser: SocialUser) {
    if (socialUser != null) {
      this.sendCredential(socialUser.name, socialUser.email, socialUser.email, socialUser.photoUrl).subscribe(
        (response) => this.setValidUserAtLocalStorage(response),
        (error) => this.notificationService.error('Ops!', 'Servidor não respondeu...')
      );
    }
  }

  private sendCredential(name: string, email: string, password: string, photoUrl: string): Observable<AuthResponse> {
    const url = SettingsService.API_URL + '/auth';
    const body = { name, email, password, photoUrl };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<AuthResponse>(url, body, { headers });
  }

  private setValidUserAtLocalStorage(res: AuthResponse) {
    if (res) {
      if (res.data.token) {
         // Adiciona usuário no localStorage (validando)
        // e redireciona o mesmo para home.
        localStorage.setItem(SettingsService.LOGGED_USER, JSON.stringify(res.data));
        this.router.navigate([UrlService.WEB_HOME_FULL_URL]);
      } else {
        this.notificationService.error('Ops!', 'Usuário inválido no sistema.');
      }
    }
  }

  private errorOnSocialProfileCredentials(socialPlataform: string, error: any) {
    console.log(error);
    this.notificationService.error('Ops!', 'Sua conta de ' + socialPlataform + ' não é válida. Tente novamente.');
  }

  private errorOnSocialProfileConnection(socialPlataform: string, error: any) {
    console.log(error);
    this.notificationService.error('Ops!', 'Houve um erro de comunicação com o ' + socialPlataform + '. Tente mais tarde.');
  }

}
