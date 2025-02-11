import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { RegistroAtividadeService } from "../services/registrosAtividades.service";
import { RegistroAtividade } from "../domain/registroAtividade.entity";

@Controller('/registro-atividades')
export class RegistroAtividadeController {
    constructor(private readonly registroAtividadeService: RegistroAtividadeService) {}

    @Get()
    getAll(): Promise<RegistroAtividade[]> {
        return this.registroAtividadeService.getAll();
    }

    @Get(':id')
    getById(@Param('id') id: string): Promise<RegistroAtividade> {
        return this.registroAtividadeService.getById(Number(id));
    }

    @Post()
    create(@Body() registroAtividade: RegistroAtividade): Promise<RegistroAtividade> {
        return this.registroAtividadeService.create(registroAtividade);
    }

    @Delete(':id')
    delete(@Param('id') id: string): Promise<void> {
        return this.registroAtividadeService.delete(Number(id));
    }
}
