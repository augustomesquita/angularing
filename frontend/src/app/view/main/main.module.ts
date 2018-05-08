import { AuthGuard } from './../../control/auth-guard/auth.guard';
import { NgModule } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NavComponent } from './nav/nav.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { ComponenteReusavelComponent } from './home/componente-reusavel/componente-reusavel.component';
import { MainLayoutComponent } from './main-layout.component';
import { CursoComponent } from './curso/curso.component';
import { MouseOverHighlightDirective } from '../shared/mouse-over-highlight/mouse-over-highlight.directive';
import { MeuServicoService } from '../../control/meu-servico/meu-servico.service';
import { SettingsService } from '../../control/settings/settings.service';
import { CursoService } from '../../control/curso/curso.service';
import { MainRoutingModule } from './main.routing.module';
import { SharedModule } from '../shared/shared.module';
import { CustomDeactivateGuard } from '../../control/auth-guard/custom-deactivate.guard';
import { AuthenticateUser } from '../../model/entity/authenticate-user.model';
import { SimpleNotificationsModule } from 'angular2-notifications';

function getValidUserAtLocalStorage(): AuthenticateUser {
  return JSON.parse(localStorage.getItem(SettingsService.LOGGED_USER)) as AuthenticateUser;
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule.forChild(),
    SimpleNotificationsModule.forRoot(),
    MainRoutingModule,
    AngularSvgIconModule
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
    AuthGuard,
    CustomDeactivateGuard,
    MeuServicoService,
    CursoService
  ]
})
export class MainModule {
  constructor() {}
 }
