import { Usuario } from "models/UsuarioEntity";
import { UpdateResult } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export interface IUsuarioRepository {
  save(usuario: Usuario): Promise<Usuario>;
  update(idUsuario: number, partialEntity: QueryDeepPartialEntity<Usuario>): Promise<UpdateResult>;
  findById(idUsuario: number): Promise<Usuario>;
  remove(usuario: Usuario): Promise<Usuario>;
}