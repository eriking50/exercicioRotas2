import { IUsuarioRepository } from "../@types/repositories/IUsuarioRepository";
import { IUsuarioService } from "../@types/services/IUsuarioService";
import { Inject, Service } from "typedi";
import { UsuarioAtualizarDto, UsuarioDto, UsuarioRetornoDto } from "../@types/dto/UsuarioDto";
import { IViacaoRepository } from "../@types/repositories/IViacaoRepository";
import { Viacao } from "models/ViacaoEntity";
import { Usuario } from "models/UsuarioEntity";
import { hashSenha } from "helpers/HashSenha";
import { validarEmail } from "helpers/ValidarEmail";

@Service('UsuarioService')
export class UsuarioService implements IUsuarioService {
  constructor(
    @Inject('UsuarioRepository') private usuarioRepository: IUsuarioRepository,
    @Inject('ViacaoRepository') private viacaoRepository: IViacaoRepository
  ) {}

  async criarUsuario(dadosUsuario: UsuarioDto, idViacao?: number): Promise<UsuarioRetornoDto> {
    let viacao: Viacao;
    if (dadosUsuario?.viacaoId) {
      viacao = await this.viacaoRepository.findById(dadosUsuario.viacaoId);
      if (!viacao) {
        throw new Error("Viação não encontrada");
      }
    }
    if (idViacao) {
      viacao = await this.viacaoRepository.findById(idViacao);
      if (!viacao) {
        throw new Error("Viação não encontrada");
      }
    }
    const usuario = this.usuarioFactory(dadosUsuario, viacao);
    await this.usuarioRepository.save(usuario);
    return this.gerarRetornoUsuario(usuario);
  }

  async atualizarUsuario(idUsuario: number, dadosUsuario: UsuarioAtualizarDto): Promise<void> {
    const usuario = this.usuarioRepository.findById(idUsuario);
    if (!usuario) {
      throw new Error("Usuário não encontrado");
    }
    await this.usuarioRepository.update(idUsuario, dadosUsuario);
  }

  async removerUsuario(idUsuario: number): Promise<void> {
    const usuario = await this.usuarioRepository.findById(idUsuario);
    if (!usuario) {
      throw new Error("Usuário não encontrado");
    }
    await this.usuarioRepository.remove(usuario);
  }

  async buscarUsuario(idUsuario: number): Promise<Usuario> {
    return await this.usuarioRepository.findById(idUsuario);
  }

  private usuarioFactory(dadosUsuario: UsuarioDto, viacao?: Viacao): Usuario {
    const usuario = new Usuario();
    if (!validarEmail(dadosUsuario.email)) {
      throw new Error("Email inválido");
    }
    usuario.email = dadosUsuario.email;
    usuario.hashSenha = hashSenha(dadosUsuario.senha);
    usuario.nome = dadosUsuario.nome;
    usuario.viacao = viacao ? viacao : null;
    usuario.role = dadosUsuario.role ? dadosUsuario.role : 0;
    return usuario;
  }

  private gerarRetornoUsuario(usuario: Usuario): UsuarioRetornoDto {
    return {
      email: usuario.email,
      nome: usuario.nome,
      role: usuario.role,
      viacao: usuario.viacao
    }
  }
}