import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

    date!: Date;

    constructor(
        private router: Router
    ) { }

    ngOnInit() {
        this.date = new Date()
    }

    navegarParaCriarRegistro(humor: number) {
        this.router.navigate(['/criar-registro', humor]);
    }
}
