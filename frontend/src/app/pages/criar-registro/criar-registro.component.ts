import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TAtividade } from 'src/app/model/atividade.model';
import { TCategoria } from 'src/app/model/categoria.model';
import { AtividadeService } from 'src/app/service/atividade.service';
import { CategoriaService } from 'src/app/service/categoria.service';

@Component({
    selector: 'app-criar-registro',
    templateUrl: './criar-registro.component.html',
    styleUrls: ['./criar-registro.component.css'],
})
export class CriarRegistroComponent implements OnInit {

    humor!: number;
    categorias: TCategoria[] = [];
    atividadesPorCategoria: { [key: number]: TAtividade[] } = {};
    atividadesSelecionadas: Set<number> = new Set();
    iconPath = '../shared/icons/';

    constructor(
        private route: ActivatedRoute,
        private categoriaService: CategoriaService,
        private atividadeService: AtividadeService
    ) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.humor = +params['humor']; // + converte o valor para número
            console.log('Humor selecionado:', this.humor);
        });
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
          });
        });
      }

      getIconPath(iconName: string | null): string {
        return iconName ? `${this.iconPath}${iconName}.svg` : `${this.iconPath}default.svg`;
      }
    
      toggleAtividade(atividadeId: number) {
        if (this.atividadesSelecionadas.has(atividadeId)) {
          this.atividadesSelecionadas.delete(atividadeId);
        } else {
          this.atividadesSelecionadas.add(atividadeId);
        }
      }
    
      isAtividadeSelecionada(atividadeId: number): boolean {
        return this.atividadesSelecionadas.has(atividadeId);
      }
}
