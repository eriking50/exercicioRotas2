import { Usuario } from "models/UsuarioEntity";
import { UpdateResult } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export interface IUsuarioRepository {
  findByIdWithViacao(idUsuario: number): Promise<Usuario>;
  save(usuario: Usuario): Promise<Usuario>;
  update(idUsuario: number, partialEntity: QueryDeepPartialEntity<Usuario>): Promise<UpdateResult>;
  findById(idUsuario: number): Promise<Usuario>;
  findByEmail(email: string): Promise<Usuario>;
  remove(usuario: Usuario): Promise<Usuario>;
}