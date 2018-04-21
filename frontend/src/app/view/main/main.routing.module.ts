// Angular imports
import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { Routes, RouterModule } from '@angular/router';

// Views imports
import { AboutComponent } from './../main/about/about.component';
import { CursoComponent } from './../main/curso/curso.component';
import { HomeComponent } from './../main/home/home.component';
import { MainLayoutComponent } from './../main/main-layout.component';

// AuthGuard import
import { AuthGuard } from './../../control/auth-guard/auth.guard';
import { UrlService } from './../../control/url/url.service';
import { CustomDeactivateGuard } from '../../control/auth-guard/custom-deactivate.guard';

const mainRoutes: Routes = [
    {
        path: '', component: MainLayoutComponent,
        children: [
            { path: UrlService.WEB_HOME_URL, component: HomeComponent },
            { path: UrlService.WEB_COURSE_URL + '/:id', component: CursoComponent },
            { path: UrlService.WEB_ABOUT_URL, component: AboutComponent, canDeactivate: [CustomDeactivateGuard] }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(mainRoutes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class MainRoutingModule { }
