import { UsuarioAtualizarDto, UsuarioDto, UsuarioRetornoDto } from "../dto/UsuarioDto";
import { Usuario } from "../../models/UsuarioEntity";

export interface IUsuarioService {
  criarUsuario(dadosUsuario: UsuarioDto, idViacao?: number): Promise<UsuarioRetornoDto>;
  atualizarUsuario(idUsuario: number, dadosUsuario: UsuarioAtualizarDto): Promise<void>;
  removerUsuario(idUsuario: number): Promise<void>;
  buscarUsuario(idUsuario: number): Promise<Usuario>;
}