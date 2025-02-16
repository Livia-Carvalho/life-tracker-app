import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TRegistro } from 'src/app/model/registro.model';
import { RegistroService } from 'src/app/service/registro.service';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styleUrls: ['./registros.component.css'],
})
export class RegistrosComponent implements OnInit {
  registros: TRegistro[] = [];

  constructor(
    private registroService: RegistroService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarRegistros();
  }

  carregarRegistros(): void {
    this.registroService.getAll().subscribe((registros) => {
      // Ordena os registros por data (mais recente primeiro)
      this.registros = registros.sort((a, b) => {
        return new Date(b.reg_date).getTime() - new Date(a.reg_date).getTime();
      });
    });
  }

  getHumorIcon(humor: number): string {
    switch (humor) {
      case 1:
        return 'fa-solid fa-face-laugh text-teal-600';
      case 2:
        return 'fa-solid fa-face-smile text-green-500';
      case 3:
        return 'fa-solid fa-face-meh text-yellow-500';
      case 4:
        return 'fa-solid fa-face-frown text-orange-500';
      case 5:
        return 'fa-solid fa-face-sad-tear text-red-500';
      default:
        return 'fa-solid fa-face-meh text-gray-500';
    }
  }

  verRegistro(id: number): void {
    this.router.navigate(['/ver-registro', id]);
  }
}