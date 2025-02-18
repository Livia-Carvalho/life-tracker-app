import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from "./layout/app.layout.component";
// import {AuthGuard} from "./auth/auth.guard";

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '',
                component: AppLayoutComponent,
                // canActivate: [AuthGuard],
                children: [
                    { path: '', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
                    { path: 'criar-registro/:humor', loadChildren: () => import('./pages/criar-registro/criar-registro.module').then(m => m.CriarRegistroModule) },
                    { path: 'registros', loadChildren: () => import('./pages/registros/registros.module').then(m => m.RegistrosModule) },
                    { path: 'ver-registro/:id', loadChildren: () => import('./pages/ver-registro/ver-registro.module').then(m => m.VerRegistroModule) },
                    { path: 'atividades', loadChildren: () => import('./pages/atividades/atividades.module').then(m => m.AtividadesModule) },
                    { path: 'perfil', loadChildren: () => import('./pages/perfil/perfil.module').then(m => m.PerfilModule) },
                ]
            },
            { path: '**', redirectTo: 'login' },
        ], {
            onSameUrlNavigation: 'reload',
            useHash: false
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
