import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Rx';
import { LoginOpt, SocialUser, AuthService, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { SettingsService } from 'app/control/settings/settings.service';
import { AuthenticateUser } from 'app/model/entity/authenticate-user.model';
import { NotificationsService } from 'angular2-notifications';
import { UrlService } from './../url/url.service';

const FACEBOOK_STRING = 'Facebook';
const GOOGLE_STRING = 'Google'

@Injectable()
export class AuthenticationService {

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: Http,
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

  public getValidUserAtLocalStorage(): AuthenticateUser {
    return JSON.parse(localStorage.getItem(SettingsService.LOGGED_USER)) as AuthenticateUser;
  }

  private login(socialUser: SocialUser) {
    if (socialUser != null) {
      this.sendCredential(socialUser.name, socialUser.email, socialUser.email, socialUser.photoUrl).subscribe(
        (response) => this.setValidUserAtLocalStorage(response),
        (error) => this.notificationService.error('Ops!', 'Servidor não respondeu...')
      );
    }
  }

  private sendCredential(name: string, email: string, password: string, photoUrl: string): Observable<Response> {
    const url = SettingsService.API_URL + '/auth';
    const body = { name, email, password, photoUrl };
    const headers = new Headers({ 'Content-Type': 'application/json' });

    return this.http.post(url, body, { headers });
  }

  private setValidUserAtLocalStorage(res: Response) {
    // Adiciona usuário no localStorage (validando)
    // e redireciona o mesmo para home.
    let userAuth: AuthenticateUser = null;
    if (res.json() && res.json().data) {
      userAuth = res.json().data;
      if (res.json().data.token) {
        localStorage.setItem(SettingsService.LOGGED_USER, JSON.stringify(userAuth));
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
