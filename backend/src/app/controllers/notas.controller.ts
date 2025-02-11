import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { NotaService } from "../services/notas.service";
import { Nota } from "../domain/nota.entity";

@Controller('/notas')
export class NotaController {
    constructor(private readonly notaService: NotaService) {}

    @Get()
    getNotas(): Promise<Nota[]> {
        return this.notaService.getAll()
    }

    @Get(':id')
    getNota(@Param('id') id: string): Promise<Nota> {
        return this.notaService.get(Number(id))
    }

    @Post()
    createNota(@Body() nota: Nota): Promise<Nota> {
        return this.notaService.create(nota)
    }

    @Put(':id')
    updateNota(@Param('id') id: string, @Body() nota: Nota): Promise<Nota> {
        return this.notaService.update(Number(id), nota)
    }

    @Delete(':id')
    deleteNota(@Param('id') id: string): Promise<void> {
        return this.notaService.delete(Number(id))
    }
}