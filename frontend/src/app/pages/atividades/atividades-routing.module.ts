import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AtividadesComponent } from './atividades.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: AtividadesComponent }
    ])],
    exports: [RouterModule]
})
export class AtividadesRoutingModule { }
