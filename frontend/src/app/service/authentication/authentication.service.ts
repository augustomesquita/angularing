import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { AuthService } from 'angular4-social-login';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Rx';
import { GoogleLoginProvider } from 'angular4-social-login';
import { FacebookLoginProvider } from 'angular4-social-login';
import { AuthenticateUser } from './../../model/authenticate-user.model';
import { User } from './../../model/user.model';
import { SettingsService } from './../settings/settings.service';

@Injectable()
export class AuthenticationService {

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: Http) { }

  doLoginFacebook() {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  doLoginGoogle() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  sendCredential(name: string, email: string, password: string, photoUrl: string): Observable<Response> {
    const url = SettingsService.API_URL + '/auth';
    const body = { name, email, password, photoUrl }
    const headers = new Headers({ 'Content-Type': 'application/json' });

    return this.http.post(url, body, { headers });
  }

  login(): Subscription {
    return this.authService.authState.subscribe((socialUser) => {
      if (socialUser != null) {
        this.sendCredential(socialUser.name, socialUser.email, socialUser.email, socialUser.photoUrl).subscribe(res => {
          if (res.ok) {
            const userAuth: AuthenticateUser = res.json() && res.json().data;
            if (userAuth.token) {
              localStorage.setItem(SettingsService.LOGGED_USER, JSON.stringify({ userAuth }));
            }

            this.router.navigate(['/home']);
          }
        });
      }
    });
  }

  logout(): void {
    // Remove usuário do localStorage (invalidando)
    localStorage.removeItem('loggedUser');
  }

}
