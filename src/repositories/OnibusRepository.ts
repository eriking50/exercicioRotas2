
import { EntityRepository, Repository } from "typeorm";
import { Onibus } from "../models/OnibusEntity";
import { IOnibusRepository } from "../@types/repositories/IOnibusRepository";

@EntityRepository(Onibus)
export class OnibusRepository extends Repository<Onibus> implements IOnibusRepository{
}