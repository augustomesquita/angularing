import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginLayoutComponent } from './login-layout.component';
import { LoginComponent } from './login.component';

// A rota de login para cair neste children primeiro, o valor do children
// deve ser o mesmo valor do path.
const loginRoutes: Routes = [
    {
        path: '', component: LoginLayoutComponent,
        children: [
            { path: '', component: LoginComponent }]
    }
]

@NgModule({
    imports: [RouterModule.forChild(loginRoutes)],
    exports: [RouterModule]
})
export class LoginRoutingModule { }
