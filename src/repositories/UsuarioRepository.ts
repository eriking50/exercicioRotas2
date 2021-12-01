import { EntityRepository, Repository } from "typeorm";
import { IUsuarioRepository } from "../@types/repositories/IUsuarioRepository";
import { Usuario } from "../models/UsuarioEntity";

@EntityRepository(Usuario)
export class UsuarioRepository extends Repository<Usuario> implements IUsuarioRepository{
  findById(idUsuario: number): Promise<Usuario> {
    return this.findOne({
      where: {
        id: idUsuario
      }
    })
  }
}