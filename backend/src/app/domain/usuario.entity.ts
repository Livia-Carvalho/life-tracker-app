import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Registro } from "./registro.entity";

@Entity('usuario')
export class Usuario {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column({ type: 'date' })
    data_nascimento: Date;

    @Column({ type: 'enum', enum: ['M', 'F', 'Outro'] })
    sexo: 'M' | 'F' | 'Outro';

    @Column({ name: 'deseja_alerta_vermelho', type: 'tinyint', default: 0 })
    deseja_alerta_vermelho: boolean;

    @Column({ unique: true })
    email: string;

    @Column({ name: 'senha_hash' })
    senha_hash: string;

    @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    // Relacionamento com a tabela REGISTRO
    @OneToMany(() => Registro, (registro) => registro.usuario)
    registros: Registro[];
}
