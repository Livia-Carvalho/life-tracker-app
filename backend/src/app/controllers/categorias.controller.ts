import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CategoriaService } from "../services/categorias.service";
import { Categoria } from "../domain/categoria.entity";

@Controller('/categorias')
export class CategoriaController {
    constructor(private readonly categoriaService: CategoriaService) {}

    @Get()
    getCategorias(): Promise<Categoria[]> {
        return this.categoriaService.getAll()
    }

    @Get(':id')
    getCategoria(@Param('id') id: string): Promise<Categoria> {
        return this.categoriaService.get(Number(id))
    }

    @Post()
    createCategoria(@Body() categoria: Categoria): Promise<Categoria> {
        return this.categoriaService.create(categoria)
    }

    @Put(':id')
    updateCategoria(@Param('id') id: string, @Body() categoria: Categoria): Promise<Categoria> {
        return this.categoriaService.update(Number(id), categoria)
    }

    @Delete(':id')
    deleteCategoria(@Param('id') id: string): Promise<void> {
        return this.categoriaService.delete(Number(id))
    }
}