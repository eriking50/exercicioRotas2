import { UsuarioLogadoDTO } from "../@types/dto/UsuarioDto";
import { sign, verify } from "jsonwebtoken";
import { TokenDTO } from "../@types/dto/TokenDTO";
import { Usuario } from "../models/UsuarioEntity";

export class TokenService {
  verificarToken(token: string): UsuarioLogadoDTO {
    return verify(token, process.env.AUTH_SECRET) as UsuarioLogadoDTO;
  }
  gerarToken(usuario: UsuarioLogadoDTO): TokenDTO {
    const token = sign(usuario, process.env.AUTH_SECRET);
    return { token };
  }
}