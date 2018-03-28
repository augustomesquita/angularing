import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class SettingsService {

  // Constantes
  public static LOGGED_USER = 'loggedUser';
  public static API_URL = 'http://localhost:8080'
  public static API_WS = 'ws://localhost:8080'

  // Variáveis
  themeColorEmitter = new EventEmitter
  private themeColor = 'blue'

  constructor() { }

  public getLocale(): string {
    return 'pt'
  }

  public setThemeColor(themeColor: string): void {
    this.themeColor = themeColor
    this.themeColorEmitter.emit(this.themeColor)
  }

}
