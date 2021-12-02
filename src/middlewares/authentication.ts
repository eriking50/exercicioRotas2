import { RequestWithUsuario } from "../@types/middlewares/requestUserData";
import { Response, NextFunction } from "express";
import { TokenService } from '../services/TokenService';
import { Roles } from "../@types/enum/Roles";
const tokenService = new TokenService();

export const middlewareAutenticacao = (request: RequestWithUsuario, response: Response, next: NextFunction) => {
  const authorization = request.headers.authorization;
  if (!authorization) {
    return response.status(401).send('Não autorizado');
  }
  try {
    const usuario = tokenService.verificarToken(authorization);
    request.usuario = usuario;
  } catch (error) {
    return response.status(401).send('Não autorizado');
  }

  next();
}

export const middlewareAutorizacaoFuncionario = async (request: RequestWithUsuario, response: Response, next: NextFunction) => {
  const { usuario } = request;
  if (usuario.role === Roles.passageiro) {
    return response.status(403).send('Forbidden');
  }

  next();
}

export const middlewareAutorizacaoAdmin = async (request: RequestWithUsuario, response: Response, next: NextFunction) => {
  const { usuario } = request;
  if (usuario.role !== Roles.admin) {
    return response.status(403).send('Forbidden');
  }

  next();
}

