import { Router, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { SettingsService } from 'app/control/settings/settings.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  canActivate() {
    // Verifica se existe usuário no localStorage.
    // Em caso positivo, retorna true, permitindo que a navegação continue.
    if (localStorage.getItem(SettingsService.LOGGED_USER)) {
      return true;
    }

    // Em caso negativo, cancela a requisição e redireciona usuário para página de login(no caso '/').
    this.router.navigate(['/']);
    return false;
  }

  constructor(private router: Router) { }



}
