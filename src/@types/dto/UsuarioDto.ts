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
  id: number,
  nome: string,
  email: string,
  role?: Roles,
  viacao?: Viacao
}

export interface UsuarioAtualizarDto {
  nome?: string,
  senha?: string
}

export interface UsuarioLogadoDTO {
  id: number,
  email: string,
  role?: Roles
}

export interface LoginDto {
  email: string,
  senha: string
}