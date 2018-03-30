import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ChatWsComponent } from '../shared/chatws/chatws.component';

@NgModule({
  imports: [
    CommonModule,
    AngularSvgIconModule
  ],
  declarations: [ChatWsComponent],
  exports: [ChatWsComponent]
})
export class SharedModule { }
