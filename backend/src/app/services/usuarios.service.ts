import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Usuario } from "../domain/usuario.entity";
@Injectable()
export class UsuarioService {
    constructor(
        @Inject('USUARIO')
        private readonly repository: Repository<Usuario>
    ) {}

    // Recuperar todos os usuários
    async getAll(): Promise<Usuario[]> {
        return this.repository.find();
    }

    // Recuperar um usuário específico pelo ID
    async get(id: number): Promise<Usuario> {
        return this.repository.findOneBy({ id });
    }

    // Criar um novo usuário
    async create(usuario: Usuario): Promise<Usuario> {
        return this.repository.save(usuario);
    }

    // Atualizar as informações de um usuário
    async update(id: number, usuario: Usuario): Promise<Usuario> {
        const existingUsuario = await this.repository.findOneBy({ id });
        if (!existingUsuario) {
            throw new Error('Usuário não encontrado');
        }
        existingUsuario.nome = usuario.nome;
        existingUsuario.data_nascimento = usuario.data_nascimento;
        existingUsuario.sexo = usuario.sexo;
        existingUsuario.deseja_alerta_vermelho = usuario.deseja_alerta_vermelho;
        existingUsuario.email = usuario.email;
        existingUsuario.senha_hash = usuario.senha_hash;
        return this.repository.save(existingUsuario);
    }

    // Excluir um usuário pelo ID
    async delete(id: number): Promise<void> {
        const existingUsuario = await this.repository.findOneBy({ id });
        if (!existingUsuario) {
            throw new Error('Usuário não encontrado');
        }
        await this.repository.delete({ id });
    }
}
