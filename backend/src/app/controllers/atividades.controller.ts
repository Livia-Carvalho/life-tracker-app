import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { AtividadeService } from '../services/atividades.service';
import { Atividade } from '../domain/atividade.entity';

@Controller('/atividades')
export class AtividadeController {
    constructor(private readonly atividadeService: AtividadeService) {}

    @Get()
    getAtividades(): Promise<Atividade[]> {
        return this.atividadeService.getAll()
    }

    @Get(':id')
    getAtividade(@Param('id') id: string): Promise<Atividade> {
        return this.atividadeService.get(Number(id))
    }

    @Post()
    createAtividade(@Body() atividade: Atividade): Promise<Atividade> {
        return this.atividadeService.create(atividade)
    }

    @Put(':id')
    updateAtividade(@Param('id') id: string, @Body() atividade: Atividade): Promise<Atividade> {
      return this.atividadeService.update(Number(id), atividade);
    }
  
    @Delete(':id')
    deleteAtividade(@Param('id') id: string): Promise<void> {
      return this.atividadeService.delete(Number(id));
    }

}
