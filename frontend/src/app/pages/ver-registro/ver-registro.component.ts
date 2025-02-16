import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TRegistro } from 'src/app/model/registro.model';
import { TNota } from 'src/app/model/nota.model';
import { TAtividade } from 'src/app/model/atividade.model';
import { TCategoria } from 'src/app/model/categoria.model';
import { RegistroService } from 'src/app/service/registro.service';
import { NotaService } from 'src/app/service/nota.service';
import { AtividadeService } from 'src/app/service/atividade.service';
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
  iconPath = './shared/icons/';

  constructor(
    private route: ActivatedRoute,
    private registroService: RegistroService,
    private notaService: NotaService,
    private atividadeService: AtividadeService,
    private categoriaService: CategoriaService,
    private registroAtividadeService: RegistroAtividadeService
  ) {}

  ngOnInit() {
    const registroId = +this.route.snapshot.params['id'];
    this.carregarRegistro(registroId);
    this.carregarCategoriasEAtividades();
  }

  carregarRegistro(registroId: number) {
    this.registroService.get(registroId).subscribe(
      (registro) => {
        this.registro = registro;
        console.log('Registro carregado:', this.registro);

        // Carregar nota associada ao registro
        if (registro.nota) {
          this.nota = registro.nota;
          console.log('Nota carregada:', this.nota);
        } else {
          console.log('Nota não encontrada para o registro.');
        }

        // Carregar atividades associadas ao registro
        if (registro.id) {
          this.carregarAtividadesSelecionadas(registro.id);
        }
      },
      (error) => {
        console.error('Erro ao carregar registro:', error);
      }
    );
  }

  carregarAtividadesSelecionadas(registroId: number) {
    this.registroAtividadeService.getAll().subscribe((registroAtividades) => {
      // Filtra as atividades associadas ao registro
      const atividadesDoRegistro = registroAtividades.filter((ra) => ra.registro.id === registroId);

      // Adiciona as atividades ao Set de atividades selecionadas
      atividadesDoRegistro.forEach((ra) => {
        this.atividadesSelecionadas.add(ra.atividade.id);
      });
    });
  }

  carregarCategoriasEAtividades() {
    this.categoriaService.getAll().subscribe((categorias) => {
      this.categorias = categorias;
      this.atividadesPorCategoria = {};

      categorias.forEach((categoria) => {
        this.atividadesPorCategoria[categoria.id] = [];
      });

      this.atividadeService.getAll().subscribe((atividades) => {
        atividades.forEach((atividade) => {
          if (atividade.categoria_id && this.atividadesPorCategoria[atividade.categoria_id]) {
            this.atividadesPorCategoria[atividade.categoria_id].push(atividade);
          }
        });
      });
    });
  }

  salvarNota() {
    this.notaService.update(this.nota).subscribe(() => {
      alert('Anotação atualizada com sucesso!');
    });
  }

  getIconPath(iconName: string | null): string {
    return iconName ? `${this.iconPath}${iconName}.svg` : `${this.iconPath}default.svg`;
  }

  isAtividadeSelecionada(atividadeId: number): boolean {
    return this.atividadesSelecionadas.has(atividadeId);
  }
}
