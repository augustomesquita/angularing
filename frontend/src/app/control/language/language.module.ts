import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';

import { SettingsService } from '../settings/settings.service';

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
