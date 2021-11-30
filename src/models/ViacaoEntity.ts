import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Viacao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  quantidadeOnibus: string;

  @Column({ unique: true })
  cnpj: string;
}