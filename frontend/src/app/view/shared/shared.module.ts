import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ChatWsComponent } from '../shared/chatws/chatws.component';
import { StompConfig, StompService } from '@stomp/ng2-stompjs';


@NgModule({
  imports: [
    CommonModule,
    AngularSvgIconModule
  ],
  declarations: [ChatWsComponent],
  exports: [ChatWsComponent],
  providers: [StompService]
})

export class SharedModule { 
  static forChild(stompConfig: StompConfig) : ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [{provide: StompConfig, useValue: stompConfig}]
    }
  }
}
