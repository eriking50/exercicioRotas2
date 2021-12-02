import { IUsuarioRepository } from "../@types/repositories/IUsuarioRepository";
import { IUsuarioService } from "../@types/services/IUsuarioService";
import { Inject, Service } from "typedi";
import { LoginDto, UsuarioAtualizarDto, UsuarioDto, UsuarioLogadoDTO, UsuarioRetornoDto } from "../@types/dto/UsuarioDto";
import { IViacaoRepository } from "../@types/repositories/IViacaoRepository";
import { Viacao } from "../models/ViacaoEntity";
import { Usuario } from "../models/UsuarioEntity";
import { hashSenha } from "../helpers/HashSenha";
import { validarEmail } from "../helpers/ValidarEmail";
import { ViacaoNaoEncontrada } from "../@types/errors/ViacaoNaoEncontrada";
import { UsuarioNaoEncontrado } from "../@types/errors/UsuarioNaoEncontrado";
import { EmailInvalido } from "../@types/errors/EmailInvalido";
import { EmailOuSenhaNaoEncontrados } from "../@types/errors/EmailOuSenhaNaoEncontrados";
import { TokenDTO } from "../@types/dto/TokenDTO";
import { TokenService } from "./TokenService";
import { Roles } from "../@types/enum/Roles";
import { ApenasAdminCadastraAdmin } from "../@types/errors/ApenasAdminCadastraAdmin";
import { AdminCadastraFuncionario } from "../@types/errors/AdminCadastraFuncionario";
import { NaoPodeCriarAdminOuFunc } from "../@types/errors/NaoPodeCriarAdminOuFunc";

@Service('UsuarioService')
export class UsuarioService implements IUsuarioService {
  constructor(
    @Inject('TokenService') private tokenService: TokenService,
    @Inject('UsuarioRepository') private usuarioRepository: IUsuarioRepository,
    @Inject('ViacaoRepository') private viacaoRepository: IViacaoRepository
  ) {}

  async criarUsuario(dadosUsuario: UsuarioDto, idUsuario?: number): Promise<UsuarioRetornoDto> {
    let viacao: Viacao;
    if (idUsuario) {
      const usuario = await this.usuarioRepository.findByIdWithViacao(idUsuario);
      this.validarCadastro(dadosUsuario, usuario);
      if (dadosUsuario?.viacaoId && !usuario.viacao) {
        viacao = await this.viacaoRepository.findById(dadosUsuario.viacaoId);
        if (!viacao) {
          throw new ViacaoNaoEncontrada();
        }
      } else {
        viacao = usuario.viacao;
      }
    } else {
      if (dadosUsuario.role !== Roles.passageiro) {
        throw new NaoPodeCriarAdminOuFunc();
      }
    }
    const usuarioASalvar = this.usuarioFactory(dadosUsuario, viacao);
    const usuarioBD = await this.usuarioRepository.save(usuarioASalvar);
    return this.gerarRetornoUsuario(usuarioBD);
  }

  async atualizarUsuario(idUsuario: number, dadosUsuario: UsuarioAtualizarDto): Promise<void> {
    const usuario = this.usuarioRepository.findById(idUsuario);
    if (!usuario) {
      throw new UsuarioNaoEncontrado();
    }
    await this.usuarioRepository.update(idUsuario, dadosUsuario);
  }

  async removerUsuario(idUsuario: number): Promise<void> {
    const usuario = await this.usuarioRepository.findById(idUsuario);
    if (!usuario) {
      throw new UsuarioNaoEncontrado();
    }
    await this.usuarioRepository.remove(usuario);
  }

  async buscarUsuario(idUsuario: number): Promise<UsuarioRetornoDto> {
    const usuario = await this.usuarioRepository.findById(idUsuario);
    if (!usuario) {
      return;
    }
    return this.gerarRetornoUsuario(usuario);
  }

  async autenticarUsuario(login: LoginDto): Promise<TokenDTO> {
    const usuario = await this.usuarioRepository.findByEmail(login.email);
    if (!usuario) {
      throw new EmailOuSenhaNaoEncontrados();
    }
    if (usuario.hashSenha !== hashSenha(login.senha)) {
      throw new EmailOuSenhaNaoEncontrados();
    }
    const usuarioLogado: UsuarioLogadoDTO = {
      email: usuario.email,
      id: usuario.id,
      role: usuario.role
    }
    return this.tokenService.gerarToken(usuarioLogado);
  }

  private validarCadastro(dadosUsuario: UsuarioDto, usuario: Usuario) {
    if (dadosUsuario.role !== Roles.admin && usuario?.role !== Roles.admin ) {
      throw new ApenasAdminCadastraAdmin();
    }
    if (dadosUsuario?.role === Roles.funcionario) {
      if (usuario?.role === Roles.admin && !dadosUsuario.viacaoId) {
        throw new AdminCadastraFuncionario();
      }
    }
  }

  private usuarioFactory(dadosUsuario: UsuarioDto, viacao?: Viacao): Usuario {
    const usuario = new Usuario();
    if (!validarEmail(dadosUsuario.email)) {
      throw new EmailInvalido();
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
      id: usuario.id,
      email: usuario.email,
      nome: usuario.nome,
      role: usuario.role,
      viacao: usuario.viacao
    }
  }
}