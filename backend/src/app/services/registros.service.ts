import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Registro } from "../domain/registro.entity";

@Injectable()
export class RegistroService {
    constructor(
        @Inject('REGISTRO')
        private readonly repository: Repository<Registro>
    ) {}

    async getAll(): Promise<Registro[]> {
        return this.repository.find()
    }

    async get(id: number): Promise<Registro> {
        return this.repository.findOne({
            where: { id },
            relations: ['nota', 'registroAtividades', 'registroAtividades.atividade']
        });
    }    

    async create(registro: Registro): Promise<Registro> {
        return this.repository.save(registro)
    }

    async update(id: number, registro: Registro): Promise<Registro> {
        const existingRegistro = await this.repository.findOneBy({ id })
        existingRegistro.alerta_vermelho = registro.alerta_vermelho
        existingRegistro.reg_date = registro.reg_date
        existingRegistro.humor = registro.humor
        existingRegistro.analise = registro.analise
        return this.repository.save(existingRegistro)
    }

    async delete(id: number): Promise<void> {
        this.repository.delete({ id })
    }
}