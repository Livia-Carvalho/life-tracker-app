import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Atividade } from '../domain/atividade.entity';

@Injectable()
export class AtividadeService {
    constructor(
        @Inject('ATIVIDADE')
        private readonly repository: Repository<Atividade>,
    ) {}

    async getAll(): Promise<Atividade[]> {
        return this.repository.find()
    }

    async get(id: number): Promise<Atividade> {
      return this.repository.findOneBy({ id });
    }
  
    async create(atividade: Atividade): Promise<Atividade> {
      return this.repository.save(atividade);
    }
  
    async update(id: number, atividade: Atividade): Promise<Atividade> {
      const existingAtividade = await this.repository.findOneBy({
        id
      });

      if (!existingAtividade) {
        throw new Error(`Atividade com ID ${id} não encontrada`); // Ou uma exceção personalizada
      }
      existingAtividade.nome = atividade.nome;
      existingAtividade.natureza = atividade.natureza;
      existingAtividade.url = atividade.url;
      existingAtividade.categoria = atividade.categoria;
      return this.repository.save(existingAtividade);
    }
  
    async delete(id: number): Promise<void> {
      this.repository.delete({ id });
    }
    
}