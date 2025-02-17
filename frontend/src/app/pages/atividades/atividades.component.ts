import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { TCategoria } from 'src/app/model/categoria.model';
import { TAtividade } from 'src/app/model/atividade.model';
import { CategoriaService } from 'src/app/service/categoria.service';
import { AtividadeService } from 'src/app/service/atividade.service';
import { AtividadeUpdateComponent } from './components/atividade-update/atividade-update.component';

@Component({
  selector: 'app-atividades',
  templateUrl: './atividades.component.html',
  styleUrls: ['./atividades.component.css'],
  providers: [MessageService]
})
export class AtividadesComponent implements OnInit {

  @ViewChild('atividadeUpdateDialog')
  atividadeUpdateDialog!: AtividadeUpdateComponent;

  deleteDialog: boolean = false;

  categorias: TCategoria[] = [];
  atividadesPorCategoria: { [key: number]: TAtividade[] } = {};
  atividade: Partial<TAtividade> = {};

  iconPath = '/assets/icons/';

  constructor(
    private categoriaService: CategoriaService,
    private atividadeService: AtividadeService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.carregarCategoriasEAtividades();
  }

  carregarCategoriasEAtividades() {
    this.categoriaService.getAll().subscribe(categorias => {
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

  onOpenNew(): void {
    this.atividadeUpdateDialog.open().subscribe((): void => {
      this.carregarCategoriasEAtividades();
    });
  }

  onEdit(atividade: TAtividade): void {
    this.atividadeUpdateDialog.open(atividade.id).subscribe((): void => {
      this.carregarCategoriasEAtividades();
    });
  }

  onDelete(atividade: TAtividade): void {
    this.deleteDialog = true;
    this.atividade = atividade;
  }

  onConfirmDelete() {
    this.deleteDialog = false;
    this.atividadeService.delete(this.atividade.id as number)
      .subscribe((): void => {
        this.atividade = {};
        this.carregarCategoriasEAtividades();
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Atividade Removida', life: 3000 });
      });
  }
}