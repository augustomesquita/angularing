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
    const url = 'http://localhost:8080/auth';
    const body = { email, password }
    const headers = new Headers({ 'Content-Type': 'application/json' });

    return this.http.post(url, body, { headers });
  }

  login(): Subscription {
    return this.authService.authState.subscribe((socialUser) => {
      if (socialUser) {
        this.sendCredential(socialUser.email, socialUser.email).subscribe(res => {
          if (res.ok) {

            let tokenReceived: string = res.json() && res.json().data.token;
            if (tokenReceived) {
              let userToken: string = tokenReceived;
              let user: User = new User(res.json().data.user.name, res.json().data.user.email);
              let authenticateUser: AuthenticateUser = new AuthenticateUser(user, userToken);
              localStorage.setItem('loggedUser', JSON.stringify({ authenticateUser }));
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
