import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from 'app/control/authentication/authentication.service';
import { SettingsService } from 'app/control/settings/settings.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private notificationOption  = SettingsService.NOTIFICATION_OPTION_DEFAULT;
  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit() {
  }

  loginFacebook() {
    this.authenticationService.doLoginFacebook();
  }

  loginGoogle() {
    this.authenticationService.doLoginGoogle();
  }

}
