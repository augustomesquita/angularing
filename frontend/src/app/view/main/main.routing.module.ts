// Angular imports
import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { Routes, RouterModule } from '@angular/router';

// Views imports
import { AboutComponent } from './../main/about/about.component';
import { CursoComponent } from './../main/home/curso/curso.component';
import { HomeComponent } from './../main/home/home.component';
import { MainLayoutComponent } from './../main/main-layout.component';

// AuthGuard import
import { AuthGuardService } from './../../control/auth-guard/auth-guard.service';

const mainRoutes: Routes = [
    {
        path: '', component: MainLayoutComponent, canActivate: [AuthGuardService],
        children: [
            { path: 'home', component: HomeComponent },
            { path: 'curso/:id', component: CursoComponent },
            { path: 'about', component: AboutComponent }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(mainRoutes)],
    exports: [RouterModule],
})
export class MainRoutingModule { }
