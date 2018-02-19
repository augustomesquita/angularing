import { Injectable } from '@angular/core';

@Injectable()
export class SettingsService {

  constructor() { }

  public getLocale(): string {
    return 'pt'
  }

}
