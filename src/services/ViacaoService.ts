import { Inject, Service } from "typedi";
import { IViacaoService } from "../@types/services/IViacaoService";
import { IViacaoRepository } from "../@types/repositories/IViacaoRepository";
import { ViacaoDto, ViacaoAtualizarDto } from "../@types/dto/ViacaoDto";
import { Viacao } from "../models/ViacaoEntity";
import { ViacaoNaoEncontrada } from "../@types/errors/ViacaoNaoEncontrada";
import { IUsuarioRepository } from "../@types/repositories/IUsuarioRepository";
import { ViacaoInvalida } from "../@types/errors/ViacaoInvalida";

@Service('ViacaoService')
export class ViacaoService implements IViacaoService {
  constructor(
    @Inject('ViacaoRepository') private viacaoRepository: IViacaoRepository,
    @Inject('UsuarioRepository') private usuarioRepository: IUsuarioRepository
  ) {}

  async criarViacao(dadosViacao: ViacaoDto): Promise<Viacao> {
    const viacao = this.viacaoFactory(dadosViacao);
    return await this.viacaoRepository.save(viacao);
  }

  async atualizarViacao(idViacao: number, dadosViacao: ViacaoAtualizarDto, idUsuario: number): Promise<void> {
    const usuario = await this.usuarioRepository.findByIdWithViacao(idUsuario);
    if (usuario.viacao.id !== idViacao) {
      throw new ViacaoInvalida();
    }
    const viacao = this.viacaoRepository.findById(idViacao);
    if (!viacao) {
      throw new ViacaoNaoEncontrada();
    }
    await this.viacaoRepository.update(idViacao, dadosViacao);
  }

  async buscarViacao(idViacao: number): Promise<Viacao> {
    return this.viacaoRepository.findById(idViacao);
  }

  async listarViacoes(): Promise<Viacao[]> {
    const viacoes = this.viacaoRepository.findAll();
    if (!viacoes) {
      return [];
    }
    return viacoes;
  }

  viacaoFactory(dadosViacao: ViacaoDto): Viacao {
    const viacao = new Viacao();
    viacao.cnpj = dadosViacao.cnpj;
    viacao.nome = dadosViacao.nome;
    return viacao;
  }
}