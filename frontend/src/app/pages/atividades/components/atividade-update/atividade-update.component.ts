import { Component } from '@angular/core';
import { TAtividade } from '../../../../model/atividade.model';
import { AtividadeService } from '../../../../service/atividade.service';
import { MessageService } from 'primeng/api';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-atividade-update',
  templateUrl: './atividade-update.component.html',
})
export class AtividadeUpdateComponent {

  atividade: TAtividade = <TAtividade>{};

  updateDialog: boolean = false;
  submitted: boolean = false;
  categoriaId!: number;

  private closeSubject: Subject<void> = new Subject<void>();

  constructor(
      private atividadeService: AtividadeService,
      private messageService: MessageService
  ) { }

  open(categoriaId: number, atividadeId?: number | null): Observable<void> {
    this.categoriaId = categoriaId;
    if (atividadeId) {
      this.atividadeService.get(atividadeId).subscribe((_atividade: TAtividade): void => {
        this.atividade = _atividade;
      });
    } else {
      this.atividade = { categoria_id: categoriaId } as TAtividade;
    }
    this.updateDialog = true;
    return this.closeSubject.asObservable();
  }

  onSave(): void {
    this.submitted = true;

    if (!this.atividade.nome) {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Nome é obrigatório', life: 3000 });
      return;
    }

    if (this.atividade.id) {
      this.atividadeService.update(this.atividade).subscribe(() => {
        this.onClose();
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Atividade Atualizada', life: 3000 });
      });
    } else {
      this.atividadeService.create({ ...this.atividade, categoria_id: this.categoriaId }).subscribe(() => {
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