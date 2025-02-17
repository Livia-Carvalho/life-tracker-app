import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AtividadesComponent } from './atividades.component';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { AtividadesRoutingModule } from './atividades-routing.module';
import { AtividadeUpdateComponent } from './components/atividade-update/atividade-update.component';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';

@NgModule({
    declarations: [
      AtividadesComponent,
      AtividadeUpdateComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ChartModule,
        MenuModule,
        TableModule,
        StyleClassModule,
        PanelMenuModule,
        ButtonModule,
        AtividadesRoutingModule,
        DialogModule,
        DropdownModule,
        ToastModule,
        ToolbarModule,
    ],
})
export class AtividadesModule { }