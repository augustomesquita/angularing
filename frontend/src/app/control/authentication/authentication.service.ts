import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Rx';
import { AuthService, GoogleLoginProvider, FacebookLoginProvider } from 'angular4-social-login';
import { SettingsService } from 'app/control/settings/settings.service';
import { AuthenticateUser } from 'app/model/entity/authenticate-user.model';
import { NotificationsService } from 'angular2-notifications';

@Injectable()
export class AuthenticationService {

  private subscription: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: Http,
    private service: NotificationsService) { }

  doLoginFacebook() {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.doLogin();
  }

  doLoginGoogle() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.doLogin();
  }

  doLogin() {
    this.subscription = this.login();
    this.subscription.unsubscribe();
  }

  login(): Subscription {
    let connectionError = true;
    return this.authService.authState.subscribe((socialUser) => {
      if (socialUser != null) {
        this.sendCredential(socialUser.name, socialUser.email, socialUser.email, socialUser.photoUrl).subscribe(res => {
          if (res.ok) {
            connectionError = false;
            this.userSessionValidating(res);
          }
        });

        // Envia notificação visual para usuário caso o servidor
        // não esteja ativo.
        if (connectionError) {
          this.service.error('Ops!', 'Servidor não respondeu...')
        }
      }
    });
  }

  sendCredential(name: string, email: string, password: string, photoUrl: string): Observable<Response> {
    const url = SettingsService.API_URL + '/auth';
    const body = { name, email, password, photoUrl }
    const headers = new Headers({ 'Content-Type': 'application/json' });

    return this.http.post(url, body, { headers });
  }

  logout(): void {
    // Remove usuário do localStorage (invalidando)
    // e redireciona o mesmo para página inicial.
    localStorage.removeItem('loggedUser');
    this.router.navigate(['/']);
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

}
