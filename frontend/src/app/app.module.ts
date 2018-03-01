// Módulos do angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Registra local para Brasil
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
registerLocaleData(ptBr)

// Módulos de terceiros
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularSvgIconModule } from 'angular-svg-icon';

// Elementos criados para o projeto
import { AppRouting } from './app.routing'
import { MouseOverHighlightDirective } from './shared/mouse-over-highlight/mouse-over-highlight.directive';
import { MeuServicoService } from './service/meu-servico/meu-servico.service';
import { SettingsService } from './service/settings/settings.service';
import { LoginService } from './service/login/login.service';
import { AppComponent } from './app.component';
import { LoginComponent } from './login-layout/login/login.component';
import { ComponenteReusavelComponent } from './main-layout/main/home/componente-reusavel/componente-reusavel.component';
import { HomeComponent } from './main-layout/main/home/home.component';
import { AboutComponent } from './main-layout/main/about/about.component';
import { NavComponent } from './main-layout/main/nav/nav.component';
import { LoginLayoutComponent } from './login-layout/login-layout.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { CursoComponent } from './main-layout/main/home/curso/curso.component';
import { CursoService } from './service/curso/curso.service';

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
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    AngularSvgIconModule,
    AppRouting
  ],
  providers: [
    MeuServicoService,
    SettingsService,
    CursoService,
    LoginService,
    {
      provide: LOCALE_ID,
      deps: [SettingsService],
      useFactory: settingService => settingService.getLocale()
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
