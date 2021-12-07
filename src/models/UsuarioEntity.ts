import { Roles } from "../@types/enum/Roles";
import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne} from "typeorm";
import { Viagem } from "./ViagemEntity";
import { Viacao } from "./ViacaoEntity";

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true
  })
  email: string;

  @Column()
  hashSenha: string;

  @Column({
    type: "enum",
    enum: Roles,
    default: 0
  })
  role: Roles;

  @Column()
  nome: string;

  @ManyToOne(() => Viacao, viacao => viacao.funcionarios)
  viacao: Viacao;

  @ManyToMany(() => Viagem, viagem => viagem.usuarios)
  @JoinTable()
  viagens: Viagem[];
}