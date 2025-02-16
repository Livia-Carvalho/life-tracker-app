import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from '../../../shared/service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Menu',
                items: [
                    { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['/'] },
                    { label: 'Registros', icon: 'pi pi-fw pi-bookmark', routerLink: ['/registros'] },
                    { label: 'Atividades', icon: 'pi pi-fw pi-th-large', routerLink: ['/atividades'] }
                ]
            }
        ];
    }
}