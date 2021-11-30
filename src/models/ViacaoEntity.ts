import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Onibus } from "./OnibusEntity";
import { Usuario } from "./UsuarioEntity";
import { Viagem } from "./ViagemEntity";

@Entity()
export class Viacao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ unique: true })
  cnpj: string;

  @OneToMany(() => Onibus, onibus => onibus.viacao)
  frota: Onibus[];

  @OneToMany(() => Viagem, viagem => viagem.viacao)
  viagens: Viagem[];

  @OneToMany(() => Usuario, usuario => usuario.viacao)
  funcionarios: Usuario[];
}