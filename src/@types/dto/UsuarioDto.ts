import { Viacao } from "../../models/ViacaoEntity";
import { Roles } from "../enum/Roles";

export interface UsuarioDto {
  nome: string,
  email: string,
  senha: string,
  role?: Roles,
  viacaoId?: number
}

export interface UsuarioRetornoDto {
  nome: string,
  email: string,
  role?: Roles,
  viacao?: Viacao
}

export interface UsuarioAtualizarDto {
  nome?: string,
  senha?: string
}