import { Roles } from "../@types/enum/Roles";
import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
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
}