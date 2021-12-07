import { ViagemFiltroDto } from "../dto/ViagemFiltroDto";
import { Viagem } from "../../models/ViagemEntity";
import { UpdateResult } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export interface IViagemRepository {
  save(viagem: Viagem): Promise<Viagem>;
  findById(idViagem: number): Promise<Viagem>;
  findAll(filtro: ViagemFiltroDto): Promise<Viagem[]>;
  findByIdWithUsuarios(idViagem: number): Promise<Viagem>;
  findByIdWithViacao(idViagem: number): Promise<Viagem>;
  update(idViagem: number, partialEntity: QueryDeepPartialEntity<Viagem>): Promise<UpdateResult>;
}