import { Onibus } from "../../models/OnibusEntity";
import { UpdateResult } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export interface IOnibusRepository {
  save(onibus: Onibus): Promise<Onibus>;
  update(idOnibus: number, partialEntity: QueryDeepPartialEntity<Onibus>): Promise<UpdateResult>;
  findById(idOnibus: number): Promise<Onibus>;
  findAll(): Promise<Onibus[]>;
}