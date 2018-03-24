// Módulos do angular
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

// Módulos de terceiros
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SocialLoginModule, AuthServiceConfig } from 'angular4-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angular4-social-login';
import { SimpleNotificationsModule } from 'angular2-notifications';

// Módulos do projeto
import { AppRoutingModule } from './app.routing.module';

// Registra local para Brasil
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
registerLocaleData(ptBr)

// Elementos criados para o projeto
// Services
import { AuthenticationService } from './control/authentication/authentication.service';
import { AuthGuardService } from './control/auth-guard/auth-guard.service';
import { SettingsService } from './control/settings/settings.service';
import { MeuServicoService } from './control/meu-servico/meu-servico.service';
import { CursoService } from './control/curso/curso.service';

// Diretivas
import { MouseOverHighlightDirective } from './view/shared/mouse-over-highlight/mouse-over-highlight.directive';
// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './view/login-layout/login/login.component';
import { ComponenteReusavelComponent } from './view/main-layout/main/home/componente-reusavel/componente-reusavel.component';
import { HomeComponent } from './view/main-layout/main/home/home.component';
import { AboutComponent } from './view/main-layout/main/about/about.component';
import { NavComponent } from './view/main-layout/main/nav/nav.component';
import { LoginLayoutComponent } from './view/login-layout/login-layout.component';
import { MainLayoutComponent } from './view/main-layout/main-layout.component';
import { CursoComponent } from './view/main-layout/main/home/curso/curso.component';



const config = new AuthServiceConfig([
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('1604161956329292')
  },
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('331487605606-uelg4mi5n56qajtsk10i9hg6nf13cbln.apps.googleusercontent.com')
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    MouseOverHighlightDirective,
    AppComponent,
    NavComponent,
    AboutComponent,
    HomeComponent,
    LoginComponent,
    ComponenteReusavelComponent,
    LoginLayoutComponent,
    MainLayoutComponent,
    CursoComponent
  ],
  imports: [
    HttpModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    SocialLoginModule,
    SimpleNotificationsModule.forRoot(),
    FormsModule,
    NgbModule.forRoot(),
    AngularSvgIconModule,
    AppRoutingModule,
  ],
  providers: [
    HttpClientModule,
    AuthenticationService,
    AuthGuardService,
    MeuServicoService,
    SettingsService,
    CursoService,
    {
      provide: LOCALE_ID,
      deps: [SettingsService],
      useFactory: settingService => settingService.getLocale()
    },
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
