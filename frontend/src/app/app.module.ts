// Módulos do angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Módulos de terceiros
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSvgIconModule } from 'ngx-svg-icon'

// Módulos criados para o projeto
import { AppComponent } from './app.component';
import { ComponenteReusavelComponent } from './componente-reusavel/componente-reusavel.component';
import { NavComponent } from './nav/nav.component';

@NgModule({
  declarations: [
    AppComponent,
    ComponenteReusavelComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule.forRoot(),
    NgxSvgIconModule.forRoot({ basePath: '/assets' })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
