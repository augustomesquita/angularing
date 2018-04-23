// Angular imports
import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { Routes, RouterModule } from '@angular/router';
import { UrlService } from './control/url/url.service';
import { AuthGuard } from './control/auth-guard/auth.guard';
import { PageNotFoundComponent } from './view/page-not-found/page-not-found.component';

// ** Importante que esse módulo seja importado antes dos demais
// módulos do projeto que possuem outros módulos de roteamento,
// para que sua configuração de redirecionamento seja chamada antes das demais.
const appRoutes: Routes = [
    { path: UrlService.WEB_MAIN_URL, loadChildren: 'app/view/main/main.module#MainModule', canActivate: [AuthGuard], canLoad: [AuthGuard] },
    { path: UrlService.WEB_LOGIN_URL, loadChildren: 'app/view/login/login.module#LoginModule' },
    { path: '', redirectTo: UrlService.WEB_LOGIN_FULL_URL, pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)]
})
export class AppRoutingModule { }
