import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Midia } from "../domain/midia.entity";

@Injectable()
export class MidiaService {
    constructor(
        @Inject('MIDIA')
        private readonly repository: Repository<Midia>
    ) {}

    async getAll(): Promise<Midia[]> {
        return this.repository.find()
    }

    async get(id: number): Promise<Midia> {
        return this.repository.findOneBy({ id })
    }

    async create(midia: Midia): Promise<Midia> {
        return this.repository.save(midia)
    }

    async update(id: number, midia: Midia): Promise<Midia> {
        const existingMidia = await this.repository.findOneBy({ id })
        existingMidia.url = midia.url
        existingMidia.tipo = midia.tipo
        return this.repository.save(existingMidia)
    }

    async delete(id: number): Promise<void> {
        this.repository.delete({ id })
    }
}