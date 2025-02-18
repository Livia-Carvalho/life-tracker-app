import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TAtividade } from 'src/app/model/atividade.model';
import { TCategoria } from 'src/app/model/categoria.model';
import { TNota } from 'src/app/model/nota.model';
import { TRegistro } from 'src/app/model/registro.model';
import { TRegistroAtividade } from 'src/app/model/registroAtividade.model';
import { AtividadeService } from 'src/app/service/atividade.service';
import { CategoriaService } from 'src/app/service/categoria.service';
import { NotaService } from 'src/app/service/nota.service';
import { RegistroService } from 'src/app/service/registro.service';
import { RegistroAtividadeService } from 'src/app/service/registroAtividade.service';

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
    anotacao: string = '';
    iconPath = '/assets/icons/';

    constructor(
        private route: ActivatedRoute,
        private categoriaService: CategoriaService,
        private atividadeService: AtividadeService,
        private notaService: NotaService,
        private registroService: RegistroService,
        private registroAtividadeService: RegistroAtividadeService
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
          this.atividadesPorCategoria[categoria.id] = categoria.atividades;
        });

        console.log('Atividades carregadas por categoria:', this.atividadesPorCategoria);
      });
    }
    

      getIconPath(iconName: string | null): string {
        return iconName ? `${this.iconPath}${iconName}.svg` : `${this.iconPath}water.svg`;
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

      salvarRegistro() {
        const novaNota: TNota = {
          texto: this.anotacao,
        };
      
        this.notaService.create(novaNota).subscribe((notaSalva) => {
          console.log('Nota salva:', notaSalva);
      
          const novoRegistro: TRegistro = {
            reg_date: new Date().toISOString(),
            humor: this.humor,
            alerta_vermelho: false,
            analise: '',
            nota: notaSalva,
            usuario: { id: 1 },
          };
      
          this.registroService.create(novoRegistro).subscribe((registroSalvo) => {
            console.log('Registro salvo:', registroSalvo);
      
            if (!registroSalvo.id) {
              throw new Error('ID do registro não foi definido pelo backend.');
            }
      
            this.atividadesSelecionadas.forEach((atividadeId) => {
              const atividadeSelecionada = this.encontrarAtividadePorId(atividadeId);
      
              if (atividadeSelecionada) {
                const registroAtividade: TRegistroAtividade = {
                  registro: registroSalvo,
                  atividade: atividadeSelecionada,
                };
      
                this.registroAtividadeService.create(registroAtividade).subscribe(
                  () => {
                    console.log('Atividade associada ao registro:', atividadeId);
                  },
                  (error) => {
                    console.error('Erro ao associar atividade:', error);
                  }
                );
              } else {
                console.error('Atividade não encontrada:', atividadeId);
              }
            });
      
            alert('Registro salvo com sucesso!');
          });
        });
      }
      

      encontrarAtividadePorId(atividadeId: number): TAtividade | undefined {
        for (const categoriaId in this.atividadesPorCategoria) {
          const atividade = this.atividadesPorCategoria[categoriaId].find(a => a.id === atividadeId);
          if (atividade) {
            return atividade;
          }
        }
        return undefined;
      }
}
