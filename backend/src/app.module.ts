import { Module } from '@nestjs/common';
import { AtividadeController } from './app/controllers/atividades.controller';
import { CategoriaController } from './app/controllers/categorias.controller';
import { MidiaController } from './app/controllers/midias.controller';
import { NotaController } from './app/controllers/notas.controller';
import { RegistroController } from './app/controllers/registros.controller';
import { RegistroAtividadeController } from './app/controllers/registrosAtividades.controller';
import { UsuarioController } from './app/controllers/usuarios.controller';
import { AtividadeService } from './app/services/atividades.service';
import { CategoriaService } from './app/services/categorias.service';
import { MidiaService } from './app/services/midias.service';
import { NotaService } from './app/services/notas.service';
import { RegistroService } from './app/services/registros.service';
import { RegistroAtividadeService } from './app/services/registrosAtividades.service';
import { UsuarioService } from './app/services/usuarios.service';
import { DatabaseModule } from './app/repositories/database.module';

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [
    AtividadeController,
    CategoriaController,
    MidiaController,
    NotaController,
    RegistroController,
    RegistroAtividadeController,
    UsuarioController
  ],
  providers: [
    AtividadeService,
    CategoriaService,
    MidiaService,
    NotaService,
    RegistroService,
    RegistroAtividadeService,
    UsuarioService
  ],
})
export class AppModule {}
