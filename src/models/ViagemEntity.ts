import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Viagem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  totalVagas: number;

  @Column()
  dataPartida: Date;

  @Column()
  origem: string;

  @Column()
  destino: string;

  @Column()
  ativo: boolean;
  
}