import { EntityRepository, Repository } from "typeorm";
import { IUsuarioRepository } from "../@types/repositories/IUsuarioRepository";
import { Usuario } from "../models/UsuarioEntity";

@EntityRepository(Usuario)
export class UsuarioRepository extends Repository<Usuario> implements IUsuarioRepository{
  findByEmail(email: string): Promise<Usuario> {
    return this.findOne({
      where: {
        email: email
      }
    })
  }
  findByIdWithViacao(idUsuario: number): Promise<Usuario> {
    return this.findOne({
      relations: ['viacao'],
      where: {
        id: idUsuario
      }
    })
  }
  findById(idUsuario: number): Promise<Usuario> {
    return this.findOne({
      where: {
        id: idUsuario
      }
    })
  }
}