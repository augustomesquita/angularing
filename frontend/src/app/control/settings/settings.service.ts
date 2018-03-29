import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class SettingsService {

  // Constantes
  public static LOGGED_USER = 'loggedUser';
  public static API_URL = 'http://localhost:8080'
  public static API_WS = 'ws://localhost:8080'
  public static NOTIFICATION_OPTION_DEFAULT = {
    position: ['bottom', 'center'],
    timeOut: 3000,
    lastOnBottom: true,
    showProgressBar: true
  }

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
