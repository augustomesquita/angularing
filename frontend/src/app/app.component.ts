import { Component, OnInit } from '@angular/core';
import { LoginService } from 'app/service/login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  private mostrarNavBar: boolean = false

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginService.mostrarNavBar.subscribe(res => this.mostrarNavBar = res)
  }
}
