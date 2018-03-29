import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class SettingsService {

  // Constantes
  public static LOGGED_USER = 'loggedUser';
  public static API_URL = 'http://192.168.0.10:8080'

  // Variáveis
  themeColorEmitter = new EventEmitter
  private themeColor = 'blue'

  public static getHeaderOptions(): Object {
    const user = JSON.parse(localStorage.getItem(SettingsService.LOGGED_USER));
    const headerOptions = {
      headers: {
        Authorization: 'Bearer ' + user.userAuth.token
      }
    }
    return headerOptions;
  }

  constructor() { }

  public getLocale(): string {
    return 'pt'
  }

  public setThemeColor(themeColor: string): void {
    this.themeColor = themeColor
    this.themeColorEmitter.emit(this.themeColor)
  }

}
