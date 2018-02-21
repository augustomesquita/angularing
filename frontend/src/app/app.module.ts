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
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { ComponenteReusavelComponent } from './main/home/componente-reusavel/componente-reusavel.component';
import { HomeComponent } from './main/home/home.component';
import { AboutComponent } from './main/about/about.component';
import { NavComponent } from './main/nav/nav.component';

@NgModule({
  declarations: [
    MouseOverHighlightDirective,
    AppComponent,
    NavComponent,
    AboutComponent,
    HomeComponent,
    LoginComponent,
    ComponenteReusavelComponent,
    MainComponent
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
    {
      provide: LOCALE_ID,
      deps: [SettingsService],
      useFactory: settingService => settingService.getLocale()
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
