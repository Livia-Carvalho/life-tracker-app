import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CriarRegistroComponent } from './criar-registro.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: CriarRegistroComponent }
    ])],
    exports: [RouterModule]
})
export class CriarRegistroRoutingModule { }
