
import { EntityRepository, Repository } from "typeorm";
import { Viagem } from "../models/ViagemEntity";
import { IViagemRepository } from "../@types/repositories/IViagemRepository";

@EntityRepository(Viagem)
export class ViagemRepository extends Repository<Viagem> implements IViagemRepository{
  findByIdWithViacao(idViagem: number): Promise<Viagem> {
    return this.findOne({
      relations: ['viacao'],
      where: {
        id: idViagem
      }
    })
  }
  findById(idViagem: number): Promise<Viagem> {
    return this.findOne({
      where: {
        id: idViagem
      }
    })
  }
  findAll(): Promise<Viagem[]> {
    return this.find();
  }
  findByIdWithUsuarios(idViagem: number): Promise<Viagem> {
    return this.findOne({
      relations: ['usuarios'],
      where: {
        id: idViagem
      }
    })
  }
}