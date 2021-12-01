import { IViacaoRepository } from "../@types/repositories/IViacaoRepository";
import { Viacao } from "../models/ViacaoEntity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Viacao)
export class ViacaoRepository extends Repository<Viacao> implements IViacaoRepository{
  findById(idViacao: number): Promise<Viacao> {
    return this.findOne({
      where: {
        id: idViacao
      }
    })
  }

  findAll(): Promise<Viacao[]> {
    return this.find();
  }
}