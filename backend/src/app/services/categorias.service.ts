import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Categoria } from "../domain/categoria.entity";

@Injectable()
export class CategoriaService {
    constructor(
        @Inject('CATEGORIA')
        private readonly repository: Repository<Categoria>
    ) {}

    async getAll(): Promise<Categoria[]> {
        return this.repository.find()
    }

    async get(id: number): Promise<Categoria> {
        return this.repository.findOneBy({ id })
    }

    async create(categoria: Categoria): Promise<Categoria> {
        return this.repository.save(categoria)
    }

    async update(id: number, categoria: Categoria): Promise<Categoria> {
        const existingCategoria = await this.repository.findOneBy({ id })
        existingCategoria.nome = categoria.nome
        existingCategoria.atividades = categoria.atividades
        return this.repository.save(existingCategoria)
    }

    async delete(id: number): Promise<void> {
        this.repository.delete({ id })
    }
}