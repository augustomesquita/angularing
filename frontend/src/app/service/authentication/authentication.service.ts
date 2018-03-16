import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { AuthService } from 'angular4-social-login';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';
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

  sendCredential(email: string, password: string): Observable<Response> {
    const url = SettingsService.API_URL + '/auth';
    const body = { email, password }
    const headers = new Headers({ 'Content-Type': 'application/json' });

    return this.http.post(url, body, { headers });
  }

  login(): Subscription {
    return this.authService.authState.subscribe((socialUser) => {
      debugger
      if (socialUser != null) {
        this.sendCredential(socialUser.email, socialUser.email).subscribe(res => {
          debugger;
          if (res.ok) {
            debugger;
            let userAuth: AuthenticateUser = res.json() && res.json().data;
            if (userAuth.token) {
              console.log(userAuth)
              localStorage.setItem(SettingsService.LOGGED_USER, JSON.stringify({ userAuth }));
            }

            this.router.navigate(['/home']);
          }
        });
      }
    });
  }

  logout(): void {
    // remove user from local storage (invalidating)
    localStorage.removeItem('loggedUser');
}

}
