import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';

import { SettingsService } from '../settings/settings.service';


@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private router: Router) { }

  // Permite carregar o módulo
  canLoad(route: Route): boolean {
    return this.verifyAccess();
  }

  // Permite acessar a página
  canActivate() {
    return this.verifyAccess();
  }

  // Verifica se sessão possui usuário válido.
  verifyAccess() {
    // Verifica se existe usuário no localStorage.
    // Em caso positivo, retorna true, permitindo que a navegação continue.
    if (localStorage.getItem(SettingsService.LOGGED_USER)) {
      return true;
    }

    // Em caso negativo, cancela a requisição e redireciona usuário para página de login(no caso '/').
    this.router.navigate(['/login']);
    return false;
  }

}
