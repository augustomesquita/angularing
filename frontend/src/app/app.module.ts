// Módulos do angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Módulos de terceiros
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularSvgIconModule } from 'angular-svg-icon';

// Módulos criados para o projeto
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { ComponenteReusavelComponent } from './home/componente-reusavel/componente-reusavel.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    AboutComponent,
    HomeComponent,
    ComponenteReusavelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    AngularSvgIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
