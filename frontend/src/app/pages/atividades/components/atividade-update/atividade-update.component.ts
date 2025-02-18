import { Component } from '@angular/core';
import { TAtividade } from "../../../../model/atividade.model";
import { TCategoria } from "../../../../model/categoria.model";
import { AtividadeService } from "../../../../service/atividade.service";
import { CategoriaService } from "../../../../service/categoria.service";
import { MessageService } from "primeng/api";
import { Observable, Subject } from "rxjs";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-atividade-update-dialog',
  templateUrl: './atividade-update.component.html',
})
export class AtividadeUpdateComponent {

  atividade: TAtividade = <TAtividade>{};
  categorias: TCategoria[] = [];
  icons: string[] = [];
  updateDialog: boolean = false;
  submitted: boolean = false;

  private closeSubject: Subject<void> = new Subject<void>();

  constructor(
    private atividadeService: AtividadeService,
    private categoriaService: CategoriaService,
    private messageService: MessageService,
    private http: HttpClient
  ) { }

  open(id?: number | null): Observable<void> {
    this.categoriaService.getAll().subscribe((categorias: TCategoria[]) => {
      this.categorias = categorias;
    });
  
    this.loadIcons();
  
    if (id) {
      this.atividadeService.get(id).subscribe((_atividade: TAtividade): void => {
        this.atividade = _atividade;
        // Verifique se a categoria da atividade foi corretamente atribuída
        if (this.atividade.categoria) {
          console.log('Categoria carregada:', this.atividade.categoria);
        }
      });
    } else {
      this.atividade = <TAtividade>{};
    }
    this.updateDialog = true;
    return this.closeSubject.asObservable();
  }

  loadIcons(): void {
    this.http.get<string[]>('/assets/icons/icons.json').subscribe((icons) => {
      this.icons = icons;
    });
  }

  selectIcon(icon: string): void {
    this.atividade.url = icon;
  }

  getIconPath(iconName: string | null): string {
    return iconName ? `/assets/icons/${iconName}.svg` : '/assets/icons/default.svg';
  }

  onSave(): void {
    this.submitted = true;
  
    console.log('Categoria selecionada:', this.atividade.categoria);
  
    if (!this.atividade.categoria || !this.atividade.categoria.id) {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Selecione uma categoria válida', life: 3000 });
      return;
    }
  
    if (this.atividade.id) {
      this.atividadeService.update(this.atividade as TAtividade).subscribe(() => {
        this.onClose();
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Atividade Atualizada', life: 3000 });
      });
    } else {
      this.atividadeService.create(this.atividade as TAtividade).subscribe(() => {
        this.onClose();
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Atividade Criada', life: 3000 });
      });
    }
  }

  onClose(): void {
    this.atividade = <TAtividade>{};
    this.updateDialog = false;
    this.closeSubject.next();
  }
}
