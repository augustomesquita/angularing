// Angular imports
import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { Routes, RouterModule } from '@angular/router';

// Views imports
import { LoginComponent } from './view/login/login.component';
import { AboutComponent } from './view/main/about/about.component';
import { HomeComponent } from './view/main/home/home.component';
import { MainLayoutComponent } from './view/main/main-layout.component';
import { LoginLayoutComponent } from './view/login/login-layout.component';
import { CursoComponent } from './view/main/home/curso/curso.component';

// AuthGuard imports
import { AuthGuardService } from './control/auth-guard/auth-guard.service';

const APP_ROUTES: Routes = [
    // A ORDEM IMPORTA NO MOMENTO DA VERIFICAÇÃO
    // QUANDO OS DOIS PATH SÃO O MESMOS... COMO NO CASO
    // DE HOME-LAYOUT-COMPONENT E LOGIN-LAYOUT-COMPONENT.
    {
        path: '', component: LoginLayoutComponent, // PRIMEIRO
        children: [{ path: '', component: LoginComponent }] // SEGUNDO
    },
    {
        path: '', component: MainLayoutComponent, canActivate: [AuthGuardService],  // TERCEIRO
        children: [
            { path: 'home', component: HomeComponent }, // QUARTO
            { path: 'curso/:id', component: CursoComponent }, // QUINTO
            { path: 'about', component: AboutComponent } // SEXTO
        ]
    }
]

@NgModule({
    imports: [RouterModule.forRoot(APP_ROUTES)],
    exports: [RouterModule],
    providers: [AuthGuardService]

})
export class AppRoutingModule { }
