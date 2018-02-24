import { Component, OnInit } from '@angular/core';
import { LoginService } from 'app/service/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  fazerLogin() {
    this.loginService.fazerLogin()
  }

}
