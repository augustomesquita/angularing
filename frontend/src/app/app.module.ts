import { AngularSvgIconModule } from 'angular-svg-icon';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { AuthService, AuthServiceConfig, FacebookLoginProvider, GoogleLoginProvider, LoginOpt } from 'angularx-social-login';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { AuthGuard } from './control/auth-guard/auth.guard';
import { AuthenticationService } from './control/authentication/authentication.service';
import { LanguageModule } from './control/language/language.module';
import { SettingsService } from './control/settings/settings.service';
import { PageNotFoundComponent } from './view/page-not-found/page-not-found.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from './view/shared/shared.module';
import { LoginRoutingModule } from './view/login/login.routing.module';
import { SocialLoginModule } from 'angularx-social-login';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { LoginLayoutComponent } from './view/login/login-layout.component';
import { LoginComponent } from './view/login/login.component';

export function providerConfig() {
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
    HttpClientModule,
    CommonModule,
    FormsModule,
    SharedModule.forChild(),
    LoginRoutingModule,
    AngularSvgIconModule,
    SocialLoginModule,
    SimpleNotificationsModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    LanguageModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LoginComponent, LoginLayoutComponent
  ],
  providers: [
    NotificationsService,
    AuthGuard,
    AuthService,
    RouterModule,
    SettingsService,
    AuthenticationService,
    {
      provide: AuthServiceConfig,
      useFactory: providerConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
