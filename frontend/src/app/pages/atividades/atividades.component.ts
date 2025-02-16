import { Component, OnInit } from '@angular/core';
import { TCategoria } from 'src/app/model/categoria.model';
import { TAtividade } from 'src/app/model/atividade.model';
import { CategoriaService } from 'src/app/service/categoria.service';
import { AtividadeService } from 'src/app/service/atividade.service';

@Component({
  selector: 'app-atividades',
  templateUrl: './atividades.component.html',
  styleUrls: ['./atividades.component.css'],
})
export class AtividadesComponent implements OnInit {
  categorias: TCategoria[] = [];
  atividadesPorCategoria: { [key: number]: TAtividade[] } = {};
  iconPath = '/assets/icons/';

  constructor(
    private categoriaService: CategoriaService,
    private atividadeService: AtividadeService
  ) {}

  ngOnInit(): void {
    this.carregarCategoriasEAtividades();
  }

  carregarCategoriasEAtividades() {
    this.categoriaService.getAll().subscribe(categorias => {
      console.log('Categorias carregadas:', categorias);
      this.categorias = categorias;
      this.atividadesPorCategoria = {};
  
      categorias.forEach(categoria => {
        this.atividadesPorCategoria[categoria.id] = [];
      });
  
      this.atividadeService.getAll().subscribe(atividades => {
        atividades.forEach(atividade => {
          if (atividade.categoria_id && this.atividadesPorCategoria[atividade.categoria_id]) {
            this.atividadesPorCategoria[atividade.categoria_id].push(atividade);
          }
        });
        console.log('Atividades carregadas por categoria:', this.atividadesPorCategoria);
      });
    });
  }

  getIconPath(iconName: string | null): string {
    return iconName ? `${this.iconPath}${iconName}.svg` : `${this.iconPath}default.svg`;
  }
}