import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RegistrosComponent } from './registros.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: RegistrosComponent }
    ])],
    exports: [RouterModule]
})
export class RegistrosRoutingModule { }
