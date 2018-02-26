import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login-layout/login/login.component';
import { AboutComponent } from './main-layout/main/about/about.component';
import { HomeComponent } from './main-layout/main/home/home.component';
import { MainLayoutComponent } from 'app/main-layout/main-layout.component';
import { LoginLayoutComponent } from 'app/login-layout/login-layout.component';

const APP_ROUTES: Routes = [
    // A ORDEM IMPORTA NO MOMENTO DA VERIFICAÇÃO
    // QUANDO OS DOIS PATH SÃO O MESMOS, COMO NO CASO
    // DE HOME-LAYOUT-COMPONENT E LOGIN-LAYOUT-COMPONENT
    {
        path: '', component: LoginLayoutComponent, // PRIMEIRO
        children: [{ path: '', component: LoginComponent }] // SEGUNDO
    },
    {
        path: '', component: MainLayoutComponent, // TERCEIRO
        children: [
            {path: 'home', component: HomeComponent }, // QUARTO
            {path: 'about', component: AboutComponent } // QUINTO
        ]
    }
]

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES)
