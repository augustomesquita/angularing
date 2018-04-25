import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SimpleNotificationsModule } from 'angular2-notifications';
import { SocialLoginModule } from 'angularx-social-login';

import { LoginComponent } from './login.component';
import { LoginLayoutComponent } from './login-layout.component';
import { AuthenticationService } from '../../control/authentication/authentication.service';
import { LoginRoutingModule } from './login.routing.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule.forChild(),
    LoginRoutingModule,
    AngularSvgIconModule,
    SocialLoginModule,
    SimpleNotificationsModule.forRoot(),
  ],
  declarations: [LoginComponent, LoginLayoutComponent],
  providers: []
})
export class LoginModule { }
