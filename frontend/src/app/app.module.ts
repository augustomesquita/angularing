// Módulos do angular
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// Módulos do projeto
import { StompService } from 'ng2-stomp-service';
import { LanguageModule } from './control/language/language.module';
import { LoginModule } from './view/login/login.module';
import { MainModule } from './view/main/main.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { SettingsService } from './control/settings/settings.service';
import { AuthenticationService } from './control/authentication/authentication.service';
import { AuthServiceConfig, AuthService } from 'angularx-social-login';
import { LoginOpt } from 'angularx-social-login';
import { FacebookLoginProvider } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { NotificationsService } from 'angular2-notifications';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { AuthGuard } from './control/auth-guard/auth.guard';

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
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    RouterModule,
    LanguageModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    NotificationsService,
    AuthGuard,
    AuthService,
    RouterModule,
    StompService,
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
