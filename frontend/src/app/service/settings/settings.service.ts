import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class SettingsService {

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
