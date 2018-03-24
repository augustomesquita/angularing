import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Rx';
import { SocialUser, AuthService, GoogleLoginProvider, FacebookLoginProvider } from 'angular4-social-login';
import { SettingsService } from 'app/control/settings/settings.service';
import { AuthenticateUser } from 'app/model/entity/authenticate-user.model';
import { NotificationsService } from 'angular2-notifications';

const FACEBOOK_STRING = 'Facebook';
const GOOGLE_STRING = 'Google'

@Injectable()
export class AuthenticationService {

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: Http,
    private notificationService: NotificationsService) { }

  doLoginFacebook() {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID)
      .then((socialUser) => this.doLogin(socialUser), (error) => this.errorOnSocialProfileCredentials(FACEBOOK_STRING, error))
      .catch((error) => this.errorOnSocialProfileConnection(FACEBOOK_STRING, error));
  }

  doLoginGoogle() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((socialUser) => this.doLogin(socialUser), (error) => this.errorOnSocialProfileCredentials(GOOGLE_STRING, error))
      .catch((error) => this.errorOnSocialProfileConnection(GOOGLE_STRING, error));
  }

  doLogin(socialUser: SocialUser) {
    this.login(socialUser);
  }

  login(socialUser: SocialUser) {
    if (socialUser != null) {
      this.sendCredential(socialUser.name, socialUser.email, socialUser.email, socialUser.photoUrl).subscribe(
        (response) => this.userSessionValidating(response),
        (error) => this.notificationService.error('Ops!', 'Servidor não respondeu...')
      );
    }
  }

  sendCredential(name: string, email: string, password: string, photoUrl: string): Observable<Response> {
    const url = SettingsService.API_URL + '/auth';
    const body = { name, email, password, photoUrl };
    const headers = new Headers({ 'Content-Type': 'application/json' });

    return this.http.post(url, body, { headers });
  }

  logout(): void {
    // Remove usuário do localStorage (invalidando)
    // e redireciona o mesmo para página inicial.
    this.authService.signOut().then(
      (sucess) => {
        localStorage.removeItem(SettingsService.LOGGED_USER);
        this.router.navigate(['/'])
      },
      (error) => console.log(error),
    );
  }

  userSessionValidating(res: Response) {
    // Adiciona usuário no localStorage (validando)
    // e redireciona o mesmo para home.
    const userAuth: AuthenticateUser = res.json() && res.json().data;
    if (userAuth.token) {
      localStorage.setItem(SettingsService.LOGGED_USER, JSON.stringify({ userAuth }));
    }
    this.router.navigate(['/home']);
  }

  errorOnSocialProfileCredentials(socialPlataform: string, error: any) {
    console.log(error);
    this.notificationService.error('Ops!', 'Sua conta de ' + socialPlataform + ' não é válida. Tente novamente.');
  }

  errorOnSocialProfileConnection(socialPlataform: string, error: any) {
    console.log(error);
    this.notificationService.error('Ops!', 'Houve um erro de comunicação com o ' + socialPlataform + '. Tente mais tarde.');
  }

}
