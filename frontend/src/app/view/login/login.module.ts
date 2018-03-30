import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SimpleNotificationsModule } from 'angular2-notifications';
import { LoginOpt, SocialLoginModule, AuthServiceConfig, FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';

import { LoginComponent } from './login.component';
import { LoginLayoutComponent } from './login-layout.component';
import { AuthenticationService } from '../../control/authentication/authentication.service';
import { LoginRoutingModule } from './login.routing.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SharedModule } from '../shared/shared.module';

export function provideConfig() {
  return config;
}

const fbLoginOptions: LoginOpt = {
  scope: 'pages_messaging_subscriptions,email,pages_show_list,manage_pages',
  return_scopes: true,
  enable_profile_selector: true
}; // https://developers.facebook.com/docs/reference/javascript/FB.login/v2.11

const googleLoginOptions: LoginOpt = {
  scope: 'profile email'
}; // https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiauth2clientconfig

const config = new AuthServiceConfig([
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('1604161956329292', fbLoginOptions)
  },
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('331487605606-uelg4mi5n56qajtsk10i9hg6nf13cbln.apps.googleusercontent.com', googleLoginOptions)
  }
]);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    SimpleNotificationsModule.forRoot(),
    LoginRoutingModule,
    SocialLoginModule,
    AngularSvgIconModule
  ],
  declarations: [LoginComponent, LoginLayoutComponent],
  providers: [
    AuthenticationService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ]
})
export class LoginModule { }
