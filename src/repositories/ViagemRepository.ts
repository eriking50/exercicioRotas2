
import { EntityRepository, Repository } from "typeorm";
import { Viagem } from "../models/ViagemEntity";
import { IViagemRepository } from "../@types/repositories/IViagemRepository";

@EntityRepository(Viagem)
export class ViagemRepository extends Repository<Viagem> implements IViagemRepository{
}