import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AboutComponent } from './main/about/about.component';
import { HomeComponent } from './main/home/home.component';

const APP_ROUTES: Routes = [
    { path: '', component: LoginComponent },
    { path: 'about', component: AboutComponent },
    { path: 'home', component: HomeComponent}
]

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES)