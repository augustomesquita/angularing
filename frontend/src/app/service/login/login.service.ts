import { Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class LoginService {

  mostrarNavBar = new EventEmitter

  constructor(private router: Router) { }

  ngOnInit() {
  }

  fazerLogin() {
    this.mostrarNavBar.emit(true)
    this.router.navigate(['/home'])
  }

  esconderNavbar() {
    this.mostrarNavBar.emit(false)
  }

}
