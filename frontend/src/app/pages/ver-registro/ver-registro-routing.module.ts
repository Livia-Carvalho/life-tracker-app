import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VerRegistroComponent } from './ver-registro.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: VerRegistroComponent }
    ])],
    exports: [RouterModule]
})
export class VerRegistroRoutingModule { }
