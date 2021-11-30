import { IUsuarioRepository } from "../@types/repositories/IUsuarioRepository";
import { IUsuarioService } from "../@types/services/IUsuarioService";
import { Inject, Service } from "typedi";

@Service('UsuarioService')
export class UsuarioService implements IUsuarioService {
  constructor(@Inject('UsuarioRepository') private usuarioRepository: IUsuarioRepository) {}
}