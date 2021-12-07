import { Inject, Service } from "typedi";
import { IOnibusService } from "../@types/services/IOnibusService";
import { IOnibusRepository } from "../@types/repositories/IOnibusRepository";
import { OnibusAtualizarDto, OnibusDto } from "../@types/dto/OnibusDto";
import { IViacaoRepository } from "../@types/repositories/IViacaoRepository";
import { Onibus } from "../models/OnibusEntity";
import { Viacao } from "../models/ViacaoEntity";
import { ViacaoNaoEncontrada } from "../@types/errors/ViacaoNaoEncontrada";
import { OnibusNaoEncontrado } from "../@types/errors/OnibusNaoEncontrado";
import { IUsuarioRepository } from "../@types/repositories/IUsuarioRepository";
import { ViacaoInvalida } from "../@types/errors/ViacaoInvalida";
import { ViacaoIsObrigatorio } from "../@types/errors/ViacaoIsObrigatorio";

@Service('OnibusService')
export class OnibusService implements IOnibusService {
  constructor(
    @Inject('OnibusRepository') private onibusRepository: IOnibusRepository,
    @Inject('ViacaoRepository') private viacaoRepository: IViacaoRepository,
    @Inject('UsuarioRepository') private usuarioRepository: IUsuarioRepository,
  ) {}

  async criarOnibus(dadosOnibus: OnibusDto, idUsuario: number): Promise<Onibus> {
    const usuario = await this.usuarioRepository.findByIdWithViacao(idUsuario);
    if (!usuario.viacao) {
      throw new ViacaoIsObrigatorio();
    }
    const viacao = await this.viacaoRepository.findById(usuario.viacao.id);
    if (!viacao) {
      throw new ViacaoNaoEncontrada();
    }
    const onibus = this.onibusFactory(dadosOnibus, viacao);
    return await this.onibusRepository.save(onibus);
  }
  
  async atualizarOnibus(idOnibus: number, dadosOnibus: OnibusAtualizarDto, idUsuario: number): Promise<void> {
    const onibus = await this.onibusRepository.findById(idOnibus);
    if (!onibus) {
      throw new OnibusNaoEncontrado();
    }
    const usuario = await this.usuarioRepository.findByIdWithViacao(idUsuario);
    if (usuario.viacao.id !== onibus.viacao.id) {
      throw new ViacaoInvalida();
    }
    await this.onibusRepository.update(idOnibus, dadosOnibus);
  }

  async buscarOnibus(idOnibus: number): Promise<Onibus> {
    return await this.onibusRepository.findById(idOnibus);
  }
  
  async listarOnibus(): Promise<Onibus[]> {
    const onibus = await this.onibusRepository.findAll();
    if (!onibus) {
      return [];
    }
    return onibus;
  }

  private onibusFactory(dadosOnibus: OnibusDto, viacao: Viacao): Onibus {
    const onibus = new Onibus();
    onibus.ano = dadosOnibus.ano;
    onibus.marca = dadosOnibus.marca;
    onibus.numeroAssentos = dadosOnibus.numeroAssentos;
    onibus.placa = dadosOnibus.placa;
    onibus.status = dadosOnibus.status;
    onibus.viacao = viacao;
    return onibus;
  }
}