import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class SettingsService {

  themeColorEmitter = new EventEmitter
  private themeColor = 'blue'
  
  // Constantes
  public static LOGGED_USER: string = 'loggedUser';
  public static API_URL: string = 'http://localhost:8080'

  constructor() { }

  public getLocale(): string {
    return 'pt'
  }

  public setThemeColor(themeColor: string): void {
    this.themeColor = themeColor
    this.themeColorEmitter.emit(this.themeColor)
  }

}
