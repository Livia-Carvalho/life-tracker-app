import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./usuario.entity";
import { Nota } from "./nota.entity";
import { RegistroAtividade } from "./registroAtividade.entity";

@Entity('registro')
export class Registro {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'reg_date', type: 'datetime' })
    reg_date: Date;

    @Column()
    humor: number;

    @Column({ name: 'alerta_vermelho' })
    alerta_vermelho: boolean;

    @Column()
    analise: string;

    // Relacionamento com a tabela NOTA
    @ManyToOne(() => Nota, (nota) => nota.registro)
    nota: Nota;

    // Relacionamento com a tabela USUARIO
    @ManyToOne(() => Usuario, (usuario) => usuario.registros)
    usuario: Usuario;

    // Relacionamento com a tabela REGISTRO_ATIVIDADE
    @OneToMany(() => RegistroAtividade, (registroAtividade) => registroAtividade.registro)
    registroAtividades: RegistroAtividade[];
}
