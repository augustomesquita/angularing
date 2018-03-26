// Angular imports
import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { Routes, RouterModule } from '@angular/router';

// Views imports
import { LoginLayoutComponent } from './login-layout.component';
import { LoginComponent } from './login.component';

// AuthGuard import
import { AuthGuardService } from './../../control/auth-guard/auth-guard.service';

// A rota de login para cair neste children primeiro, o valor do children
// deve ser o mesmo valor do path.
const loginRoutes: Routes = [
    {
        path: '', component: LoginLayoutComponent, 
        children: [
            { path: 'login', component: LoginComponent }]
    }
]

@NgModule({
    imports: [RouterModule.forChild(loginRoutes)],
    exports: [RouterModule],
})
export class LoginRoutingModule { }
