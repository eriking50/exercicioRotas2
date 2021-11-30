import { IViacaoRepository } from "../@types/repositories/IViacaoRepository";
import { Viacao } from "../models/ViacaoEntity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Viacao)
export class ViacaoRepository extends Repository<Viacao> implements IViacaoRepository{
}