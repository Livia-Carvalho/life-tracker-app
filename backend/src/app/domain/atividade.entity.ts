import { Column, Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Categoria } from './categoria.entity';
import { RegistroAtividade } from './registroAtividade.entity';

@Entity('atividade')
export class Atividade {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nome: string

    @Column()
    natureza: number

    @Column()
    url: string

    @ManyToOne(() => Categoria, (categoria: Categoria) => categoria.atividades)
    @JoinColumn()
    categoria: Categoria

    @OneToMany(() => RegistroAtividade, (registroAtividade) => registroAtividade.atividade)
    registroAtividades: RegistroAtividade[];
    
}