import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany} from "typeorm";
import { Onibus } from "./OnibusEntity";
import { Usuario } from "./UsuarioEntity";
import { Viacao } from "./ViacaoEntity";

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

  @ManyToOne(() => Viacao, viacao => viacao.viagens)
  viacao: Viacao;
  
  @ManyToOne(() => Onibus, onibus => onibus.viagens)
  onibus: Onibus;

  @ManyToMany(() => Usuario, usuario => usuario.viagens)
  usuarios: Usuario[];
}