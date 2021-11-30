import { OnibusStatus } from "../@types/enum/OnibusStatus";
import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm";
import { Viacao } from "./ViacaoEntity";
import { Viagem } from "./ViagemEntity";

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
    type: "enum",
    enum: OnibusStatus,
    default: 0
  })
  status: OnibusStatus;

  @Column({
    nullable: false
  })
  placa: string;

  @ManyToOne(() => Viacao, viacao => viacao.frota)
  viacao: Viacao;

  @OneToMany(() => Viagem, viagem => viagem.onibus)
  viagens: Viagem[];
}