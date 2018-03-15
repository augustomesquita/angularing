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
export class LoginComponent implements OnInit, OnDestroy {

  private authStateSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: Http) { }

  ngOnInit() {
    this.authStateSubscription = this.accountValidator(this.authService);
  }

  fazerLoginFacebook() {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  fazerLoginGoogle() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  accountValidator(authService: AuthService): Subscription {
    return authService.authState.subscribe((user) => {
      if (user) {
        this.sendCredential(user.email, user.email).subscribe(res => {
          if (res.ok) {
            console.log(res.json())
            this.router.navigate(['/home']);
          }
        });
      }
    });
  }

  ngOnDestroy() {
    this.authStateSubscription.unsubscribe();
  }

  sendCredential(email: string, password: string): Observable<Response> {
    const url = 'http://localhost:8080/auth';
    const body = { email, password }
    const headers = new Headers({ 'Content-Type': 'application/json' });

    return this.http.post(url, body, { headers: headers });
  }

}
