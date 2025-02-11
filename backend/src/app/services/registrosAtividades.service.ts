import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { RegistroAtividade } from "../domain/registroAtividade.entity";

@Injectable()
export class RegistroAtividadeService {
    constructor(
        @Inject('REGISTRO_ATIVIDADE')
        private readonly repository: Repository<RegistroAtividade>
    ) {}

    async getAll(): Promise<RegistroAtividade[]> {
        return this.repository.find({
            relations: ["registro", "atividade"], // Caso precise carregar os relacionamentos
        });
    }

    async getById(id: number): Promise<RegistroAtividade> {
        return this.repository.findOne({
            where: { id },
            relations: ["registro", "atividade"], // Caso precise carregar os relacionamentos
        });
    }

    async create(registroAtividade: RegistroAtividade): Promise<RegistroAtividade> {
        return this.repository.save(registroAtividade);
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete({ id });
    }
}
