import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Registro } from "./registro.entity";
import { Atividade } from "./atividade.entity";

@Entity('registro_atividade')
export class RegistroAtividade {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Registro, (registro) => registro.registroAtividades)
    @JoinColumn({ name: 'registro_id' })
    registro: Registro;

    @ManyToOne(() => Atividade, (atividade) => atividade.registroAtividades)
    @JoinColumn({ name: 'atividade_id' })
    atividade: Atividade;
}