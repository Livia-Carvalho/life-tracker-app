import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Nota } from "../domain/nota.entity";

@Injectable()
export class NotaService {
    constructor(
        @Inject('NOTA')
        private readonly repository: Repository<Nota>
    ) {}

    async getAll(): Promise<Nota[]> {
        return this.repository.find()
    }

    async get(id: number): Promise<Nota> {
        return this.repository.findOneBy({ id })
    }

    async create(nota: Nota): Promise<Nota> {
        return this.repository.save(nota)
    }

    async update(id: number, nota: Nota): Promise<Nota> {
        const existingNota = await this.repository.findOneBy({ id })
        existingNota.texto = nota.texto
        existingNota.midias = nota.midias
        return this.repository.save(existingNota)
    }

    async delete(id: number): Promise<void> {
        this.repository.delete({ id })
    }
}