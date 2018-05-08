import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../control/settings/settings.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html'
})
export class MainLayoutComponent implements OnInit {

  private notificationOption  = SettingsService.NOTIFICATION_OPTION_DEFAULT;
  constructor() { }

  ngOnInit() {
  }

}
