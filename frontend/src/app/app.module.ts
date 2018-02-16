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
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { ComponenteReusavelComponent } from './home/componente-reusavel/componente-reusavel.component';
import { MouseOverHighlightDirective } from './shared/mouse-over-highlight/mouse-over-highlight.directive';
import { MeuServicoService } from './service/meu-servico/meu-servico.service';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    AboutComponent,
    HomeComponent,
    ComponenteReusavelComponent,
    MouseOverHighlightDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    AngularSvgIconModule
  ],
  providers: [MeuServicoService, { provide: LOCALE_ID, useValue: 'pt' }], 
  bootstrap: [AppComponent]
})
export class AppModule { }
