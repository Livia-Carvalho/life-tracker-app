import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UsuarioService } from "../services/usuarios.service"; // Serviço para manipular usuários
import { Usuario } from "../domain/usuario.entity";  // Entidade Usuario

@Controller('/usuarios')
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) {}

    // Obtém todos os usuários
    @Get()
    getUsuarios(): Promise<Usuario[]> {
        return this.usuarioService.getAll();
    }

    // Obtém um usuário específico pelo ID
    @Get(':id')
    getUsuario(@Param('id') id: string): Promise<Usuario> {
        return this.usuarioService.get(Number(id));
    }

    // Cria um novo usuário
    @Post()
    createUsuario(@Body() usuario: Usuario): Promise<Usuario> {
        return this.usuarioService.create(usuario);
    }

    // Atualiza um usuário existente
    @Put(':id')
    updateUsuario(@Param('id') id: string, @Body() usuario: Usuario): Promise<Usuario> {
        return this.usuarioService.update(Number(id), usuario);
    }

    // Deleta um usuário pelo ID
    @Delete(':id')
    deleteUsuario(@Param('id') id: string): Promise<void> {
        return this.usuarioService.delete(Number(id));
    }
}
