import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AngularSvgIconModule } from 'angular-svg-icon';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { SocialLoginModule } from 'angularx-social-login';

import { SharedModule } from '../shared/shared.module';
import { LoginLayoutComponent } from './login-layout.component';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login.routing.module';

@NgModule({
  imports: [
    LoginComponent, LoginLayoutComponent
  ],
  declarations: [],
  providers: []
})
export class LoginModule { }
