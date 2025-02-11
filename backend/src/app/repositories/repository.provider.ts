import { DataSource } from "typeorm";
import { Atividade } from "../domain/atividade.entity";
import { Categoria } from "../domain/categoria.entity";
import { Midia } from "../domain/midia.entity";
import { Nota } from "../domain/nota.entity";
import { Registro } from "../domain/registro.entity";
import { RegistroAtividade } from "../domain/registroAtividade.entity";
import { Usuario } from "../domain/usuario.entity";

export const repositoryProvider = [
    {
        provide: 'ATIVIDADE',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Atividade),
        inject: ['MYSQL_DATA_SOURCE'],        
    },
    {
        provide: 'CATEGORIA',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Categoria),
        inject: ['MYSQL_DATA_SOURCE'],
    },
    {
        provide: 'MIDIA',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Midia),
        inject: ['MYSQL_DATA_SOURCE'],
    },
    {
        provide: 'NOTA',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Nota),
        inject: ['MYSQL_DATA_SOURCE'],
    },
    {
        provide: 'REGISTRO',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Registro),
        inject: ['MYSQL_DATA_SOURCE'],
    },
    {
        provide: 'REGISTRO_ATIVIDADE',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(RegistroAtividade),
        inject: ['MYSQL_DATA_SOURCE'],
    },
    {
        provide: 'USUARIO',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Usuario),
        inject: ['MYSQL_DATA_SOURCE'],
    },
]