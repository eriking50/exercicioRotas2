import { Inject, Service } from "typedi";
import { IViagemService } from "../@types/services/IViagemService";
import { IViagemRepository } from "../@types/repositories/IViagemRepository";
import { ViagemAtualizarDto, ViagemDto } from "../@types/dto/ViagemDto";
import { IOnibusRepository } from "../@types/repositories/IOnibusRepository";
import { Onibus } from "../models/OnibusEntity";
import { Viagem } from "../models/ViagemEntity";
import { IViacaoRepository } from "../@types/repositories/IViacaoRepository";
import { Viacao } from "../models/ViacaoEntity";
import { IUsuarioRepository } from "../@types/repositories/IUsuarioRepository";
import { Usuario } from "../models/UsuarioEntity";

@Service('ViagemService')
export class ViagemService implements IViagemService {
  constructor(
    @Inject('ViagemRepository') private viagemRepository: IViagemRepository,
    @Inject('OnibusRepository') private onibusRepository: IOnibusRepository,
    @Inject('ViacaoRepository') private viacaoRepository: IViacaoRepository,
    @Inject('UsuarioRepository') private usuarioRepository: IUsuarioRepository
  ) {}

  async criarViagem(dadosViagem: ViagemDto, idViacao: number): Promise<Viagem> {
    const onibus = await this.onibusRepository.findById(dadosViagem.onibusId);
    if (!onibus) {
      throw new Error("Onibus não encontrado");
    }
    const viacao = await this.viacaoRepository.findById(idViacao);
    const viagem = this.viagemFactory(dadosViagem, onibus, viacao);
    return await this.viagemRepository.save(viagem);
  }

  async atualizarViagem(idViagem: number, dadosViagem: ViagemAtualizarDto, idUsuario: number): Promise<void> {
    const viagem = await this.viagemRepository.findByIdWithViacao(idViagem);
    if (!viagem) {
      throw new Error("Viagem não encontrada");
    }
    const usuario = new Usuario(); // atualizar quando eu fazer o repo de usuario, pegar com a viação junto
    if (usuario.viacao.id !== viagem.viacao.id) {
      throw new Error("Você não pode alterar uma viação que não seja a sua");
    }
    await this.viagemRepository.update(idViagem, dadosViagem);
  }

  async buscarViagem(idViagem: number): Promise<Viagem> {
    return await this.viagemRepository.findById(idViagem);
  }

  async reservarAssento(idViagem: number, idUsuario: number): Promise<void> {
    const viagem = await this.viagemRepository.findByIdWithUsuarios(idViagem);
    if (!viagem.ativo) {
      throw new Error("Viagem não está ativa");
    }
    if (viagem.usuarios.length >= viagem.totalVagas) {
      throw new Error("A viagem não tem assentos disponíveis");
    }
    const usuario = new Usuario(); // atualizar quando eu fazer o repo de usuario
    viagem.usuarios.push(usuario);
    await this.viagemRepository.update(idViagem, viagem);
  }

  async listarViagens():Promise<Viagem[]> {
    const viagens = await this.viagemRepository.findAll();
    if (!viagens) {
      return [];
    }
    return viagens;
  }

  private viagemFactory(dadosViagem: ViagemDto, onibus: Onibus, viacao: Viacao): Viagem {
    const viagem = new Viagem();
    viagem.origem = dadosViagem.origem;
    viagem.destino = dadosViagem.destino;
    viagem.totalVagas = dadosViagem.totalVagas;
    viagem.dataPartida = dadosViagem.dataPartida;
    viagem.viacao = viacao;
    viagem.onibus = onibus;
    return viagem;
  }
}