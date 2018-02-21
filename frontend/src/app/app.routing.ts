import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';

const APP_ROUTES: Routes = [
    { path: '', component: LoginComponent },
    { path: 'main', component: MainComponent }
]

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES)