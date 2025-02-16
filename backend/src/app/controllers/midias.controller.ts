import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { MidiaService } from "../services/midias.service";
import { Midia } from "../domain/midia.entity";

@Controller('/api/midias')
export class MidiaController {
    constructor(private readonly midiaService: MidiaService) {}

    @Get()
    getMidias(): Promise<Midia[]> {
        return this.midiaService.getAll()
    }

    @Get(':id')
    getMidia(@Param('id') id: string): Promise<Midia> {
        return this.midiaService.get(Number(id))
    }

    @Post()
    createMidia(@Body() midia: Midia): Promise<Midia> {
        return this.midiaService.create(midia)
    }

    @Put(':id')
    updateMidia(@Param('id') id: string, @Body() midia: Midia): Promise<Midia> {
        return this.midiaService.update(Number(id), midia)
    }

    @Delete(':id')
    deleteMidia(@Param('id') id: string): Promise<void> {
        return this.midiaService.delete(Number(id))
    }
}