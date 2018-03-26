import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';

import { SettingsService } from 'app/control/settings/settings.service';
registerLocaleData(ptBr)

const configLanguage = {
  provide: LOCALE_ID,
  deps: [SettingsService],
  useFactory: settingService => settingService.getLocale()
}

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [configLanguage],
})
export class LanguageModule { }
