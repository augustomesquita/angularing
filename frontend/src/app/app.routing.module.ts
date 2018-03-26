// Angular imports
import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { Routes, RouterModule } from '@angular/router';

// AuthGuard imports
import { AuthGuardService } from './control/auth-guard/auth-guard.service';

// ** Importante que esse módulo seja importado antes dos demais
// módulos do projeto que possuem outros módulos de roteamento,
// para que sua configuração (redirecionamento) seja ativada antes das demais.
const appRoutes: Routes = [
    {
        path: '', redirectTo: '/login', pathMatch: 'full'
    }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule],
    providers: [AuthGuardService]
})
export class AppRoutingModule { }
