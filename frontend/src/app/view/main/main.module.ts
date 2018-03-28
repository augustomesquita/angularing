import { NgModule } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NavComponent } from './nav/nav.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { ComponenteReusavelComponent } from './home/componente-reusavel/componente-reusavel.component';
import { MainLayoutComponent } from './main-layout.component';
import { CursoComponent } from './home/curso/curso.component';
import { MouseOverHighlightDirective } from '../shared/mouse-over-highlight/mouse-over-highlight.directive';
import { MeuServicoService } from '../../control/meu-servico/meu-servico.service';
import { SettingsService } from '../../control/settings/settings.service';
import { CursoService } from '../../control/curso/curso.service';
import { MainRoutingModule } from './main.routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MainRoutingModule,
    AngularSvgIconModule,
  ],
  declarations: [
    NavComponent,
    AboutComponent,
    HomeComponent,
    ComponenteReusavelComponent,
    MainLayoutComponent,
    CursoComponent,
    MouseOverHighlightDirective
  ],
  providers: [
    MeuServicoService,
    SettingsService,
    CursoService
  ]
})
export class MainModule { }
