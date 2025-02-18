import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TRegistro } from 'src/app/model/registro.model';
import { TNota } from 'src/app/model/nota.model';
import { TAtividade } from 'src/app/model/atividade.model';
import { TCategoria } from 'src/app/model/categoria.model';
import { RegistroService } from 'src/app/service/registro.service';
import { NotaService } from 'src/app/service/nota.service';
import { CategoriaService } from 'src/app/service/categoria.service';
import { RegistroAtividadeService } from 'src/app/service/registroAtividade.service';

@Component({
  selector: 'app-ver-registro',
  templateUrl: './ver-registro.component.html',
  styleUrls: ['./ver-registro.component.css'],
})
export class VerRegistroComponent implements OnInit {
  registro!: TRegistro;
  nota: TNota = { id: 0, texto: '' };
  categorias: TCategoria[] = [];
  atividadesPorCategoria: { [key: number]: TAtividade[] } = {};
  atividadesSelecionadas: Set<number> = new Set();
  iconPath = './assets/icons/';

  constructor(
    private route: ActivatedRoute,
    private registroService: RegistroService,
    private notaService: NotaService,
    private categoriaService: CategoriaService,
    private registroAtividadeService: RegistroAtividadeService
  ) {}

  ngOnInit() {
    const registroId = +this.route.snapshot.params['id'];
    this.carregarRegistro(registroId);
    this.carregarCategoriasEAtividades();
  }

  carregarRegistro(registroId: number) {
    this.registroService.get(registroId).subscribe((registro) => {
      this.registro = registro;
      if (registro.nota) {
        this.nota = registro.nota;
      }
      if (registro.id) {
        this.carregarAtividadesSelecionadas(registro.id);
      }
    });
  }

  carregarAtividadesSelecionadas(registroId: number) {
    this.registroAtividadeService.getAll().subscribe((registroAtividades) => {
      const atividadesDoRegistro = registroAtividades.filter((ra) => ra.registro?.id === registroId);
      atividadesDoRegistro.forEach((ra) => {
        if (ra.atividade?.id) {
          this.atividadesSelecionadas.add(ra.atividade.id);
        }
      });
    });
  }

  carregarCategoriasEAtividades() {
    this.categoriaService.getAll().subscribe((categorias) => {
      this.categorias = categorias;
      this.atividadesPorCategoria = {};
      categorias.forEach((categoria) => {
        this.atividadesPorCategoria[categoria.id] = categoria.atividades;
      });
    });
  }

  getIconPath(iconName: string | null): string {
    return iconName ? `${this.iconPath}${iconName}.svg` : `${this.iconPath}default.svg`;
  }

  isAtividadeSelecionada(atividadeId: number): boolean {
    return this.atividadesSelecionadas.has(atividadeId);
  }

  toggleAtividade(atividadeId: number) {
    if (this.atividadesSelecionadas.has(atividadeId)) {
      this.atividadesSelecionadas.delete(atividadeId);
    } else {
      this.atividadesSelecionadas.add(atividadeId);
    }
  }

  salvarAlteracoes() {
    this.notaService.update(this.nota).subscribe(() => {
      this.registroAtividadeService.getAll().subscribe((regAtividades) => {
        const relacionados = regAtividades.filter((ra) => ra.registro?.id === this.registro.id);

        // Remover atividades não selecionadas
        relacionados.forEach((ra) => {
          if (!this.atividadesSelecionadas.has(ra.atividade.id)) {
            this.registroAtividadeService.delete(ra.id!).subscribe();
          }
        });

        // Adicionar atividades selecionadas que não estão relacionadas
        this.atividadesSelecionadas.forEach((atividadeId) => {
          if (!relacionados.some((ra) => ra.atividade.id === atividadeId)) {
            const atividade = this.encontrarAtividadePorId(atividadeId);
            if (atividade) {
              this.registroAtividadeService.create({
                registro: this.registro,
                atividade: atividade,
              }).subscribe();
            }
          }
        });

        alert('Alterações salvas com sucesso!');
      });
    });
  }

  encontrarAtividadePorId(atividadeId: number): TAtividade | undefined {
    for (const categoriaId in this.atividadesPorCategoria) {
      const atividade = this.atividadesPorCategoria[categoriaId].find((a) => a.id === atividadeId);
      if (atividade) {
        return atividade;
      }
    }
    return undefined;
  }
}