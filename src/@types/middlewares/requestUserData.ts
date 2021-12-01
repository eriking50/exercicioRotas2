import { UsuarioLogadoDTO } from "../dto/UsuarioDto";
import { Request } from "express";

export interface RequestWithUsuario extends Request {
  usuario: UsuarioLogadoDTO;
}