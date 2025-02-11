import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Atividade } from "./atividade.entity";

@Entity('categoria')
export class Categoria {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nome: string

    @OneToMany(() => Atividade, (atividade) => atividade.categoria)
    atividades: Atividade[];
}