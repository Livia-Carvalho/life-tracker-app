import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Nota } from './nota.entity';

@Entity('midia')
export class Midia {
  
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    tipo: string

    @Column()
    url: string

    @ManyToOne(() => Nota, (nota) => nota.id)
    @JoinColumn({ name: 'nota_id' })
    nota: Nota;

}