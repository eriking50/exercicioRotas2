import { Viacao } from "../../models/ViacaoEntity";
import { UpdateResult } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export interface IViacaoRepository {
  save(viacao: Viacao): Promise<Viacao>;
  findById(idViacao: number): Promise<Viacao>;
  findAll(): Promise<Viacao[]>;
  update(idOnibus: number, partialEntity: QueryDeepPartialEntity<Viacao>): Promise<UpdateResult>;
}