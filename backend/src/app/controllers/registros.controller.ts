import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { RegistroService } from "../services/registros.service";
import { Registro } from "../domain/registro.entity";

@Controller('/api/registros')
export class RegistroController {
    constructor(private readonly registroService: RegistroService) {}

    @Get()
    getRegistros(): Promise<Registro[]> {
        return this.registroService.getAll()
    }

    @Get(':id')
    getRegistro(@Param('id') id: string): Promise<Registro> {
        return this.registroService.get(Number(id))
    }

    @Post()
    createRegistro(@Body() registro: Registro): Promise<Registro> {
        return this.registroService.create(registro)
    }

    @Put(':id')
    updateRegistro(@Param('id') id: string, @Body() registro: Registro): Promise<Registro> {
        return this.registroService.update(Number(id), registro)
    }

    @Delete(':id')
    deleteRegistro(@Param('id') id: string): Promise<void> {
        return this.registroService.delete(Number(id))
    }
}