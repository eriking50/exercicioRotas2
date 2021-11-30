import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Onibus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false
  })
  marca: string;

  @Column({
    nullable: false
  })
  ano: number;

  @Column({
    nullable: false
  })
  numeroAssentos: number;

  @Column({
    nullable: false
  })
  placa: string;
}