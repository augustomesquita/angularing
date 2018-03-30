// Módulos do angular
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// Módulos do projeto
import { LanguageModule } from './control/language/language.module';
import { LoginModule } from './view/login/login.module';
import { MainModule } from './view/main/main.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    RouterModule,
    LanguageModule,
    AppRoutingModule,
    LoginModule,
    MainModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
