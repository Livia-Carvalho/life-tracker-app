import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne} from 'typeorm'
import { Midia } from './midia.entity';
import { Registro } from './registro.entity';

@Entity('nota')
export class Nota {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    texto: string

    @OneToMany(() => Midia, (midia) => midia.nota)
    midias: Midia[];

    @OneToOne(() => Registro, (registro) => registro.nota)
    registro: Registro;
}