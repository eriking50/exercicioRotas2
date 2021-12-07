import { Inject, Service } from "typedi";
import { IViagemService } from "../@types/services/IViagemService";
import { IViagemRepository } from "../@types/repositories/IViagemRepository";
import { ViagemAtualizarDto, ViagemDto } from "../@types/dto/ViagemDto";
import { IOnibusRepository } from "../@types/repositories/IOnibusRepository";
import { Onibus } from "../models/OnibusEntity";
import { Viagem } from "../models/ViagemEntity";
import { Viacao } from "../models/ViacaoEntity";
import { IUsuarioRepository } from "../@types/repositories/IUsuarioRepository";
import { OnibusNaoEncontrado } from "../@types/errors/OnibusNaoEncontrado";
import { ViagemNaoEncontrada } from "../@types/errors/ViagemNaoEncontrada";
import { ViacaoInvalida } from "../@types/errors/ViacaoInvalida";
import { ViagemInativa } from "../@types/errors/ViagemInativa";
import { ViagemSemAssentos } from "../@types/errors/ViagemSemAssentos";
import { ViagemFiltroDto } from "../@types/dto/ViagemFiltroDto";
import { OnibusInvalido } from "../@types/errors/OnibusInvalido";
import { IsReservado } from "../@types/errors/IsReservado";
import { DataInvalida } from "../@types/errors/DataInvalida";

@Service('ViagemService')
export class ViagemService implements IViagemService {
  constructor(
    @Inject('ViagemRepository') private viagemRepository: IViagemRepository,
    @Inject('OnibusRepository') private onibusRepository: IOnibusRepository,
    @Inject('UsuarioRepository') private usuarioRepository: IUsuarioRepository
  ) {}

  async criarViagem(dadosViagem: ViagemDto, idUsuario: number): Promise<Viagem> {
    const onibus = await this.onibusRepository.findById(dadosViagem.onibusId);
    if (!onibus) {
      throw new OnibusNaoEncontrado();
    }
    if (onibus.numeroAssentos < dadosViagem.totalVagas) {
      throw new OnibusInvalido();
    }
    const usuario = await this.usuarioRepository.findByIdWithViacao(idUsuario);
    const viagem = this.viagemFactory(dadosViagem, onibus, usuario.viacao);
    return await this.viagemRepository.save(viagem);
  }

  async atualizarViagem(idViagem: number, dadosViagem: ViagemAtualizarDto, idUsuario: number): Promise<void> {
    const viagem = await this.viagemRepository.findByIdWithViacao(idViagem);
    if (!viagem) {
      throw new ViagemNaoEncontrada();
    }
    const usuario = await this.usuarioRepository.findByIdWithViacao(idUsuario);
    if (usuario.viacao.id !== viagem.viacao.id) {
      throw new ViacaoInvalida();
    }
    await this.viagemRepository.update(idViagem, dadosViagem);
  }

  async buscarViagem(idViagem: number): Promise<Viagem> {
    return await this.viagemRepository.findById(idViagem);
  }

  async reservarAssento(idViagem: number, idUsuario: number): Promise<void> {
    const viagem = await this.viagemRepository.findByIdWithUsuarios(idViagem);
    if (!viagem) {
      throw new ViagemNaoEncontrada();
    }
    if (!viagem.ativo) {
      throw new ViagemInativa();
    }
    if (viagem.usuarios.length >= viagem.totalVagas) {
      throw new ViagemSemAssentos();
    }
    const usuario = await this.usuarioRepository.findById(idUsuario);
    const isComprado = viagem.usuarios.some(usuarioSome => usuarioSome.id === usuario.id)
    if (isComprado) {
      throw new IsReservado();
    }
    viagem.usuarios.push(usuario);
    await this.viagemRepository.save(viagem);
  }

  async listarViagens(filtro: ViagemFiltroDto): Promise<Viagem[]> {
    filtro = this.validarFiltro(filtro);
    const viagens = await this.viagemRepository.findAll(filtro);
    if (!viagens) {
      return [];
    }
    return viagens;
  }

  private validarFiltro(filtro: ViagemFiltroDto): ViagemFiltroDto {
    if (!filtro.dataFinal) {
      filtro.dataFinal = new Date();
    }
    if (!filtro.dataInicio) {
      filtro.dataInicio = new Date();
    }
    if (isNaN(filtro?.dataInicio.getTime())) {
      throw new DataInvalida();
    }
    if (isNaN(filtro?.dataFinal.getTime())) {
      throw new DataInvalida();
    }
    filtro.dataFinal.setDate(filtro.dataInicio.getDate() + 7);
    return filtro;
  }

  private viagemFactory(dadosViagem: ViagemDto, onibus: Onibus, viacao: Viacao): Viagem {
    const viagem = new Viagem();
    viagem.ativo = true;
    viagem.origem = dadosViagem.origem;
    viagem.destino = dadosViagem.destino;
    viagem.totalVagas = dadosViagem.totalVagas;
    viagem.dataPartida = dadosViagem.dataPartida;
    viagem.viacao = viacao;
    viagem.onibus = onibus;
    return viagem;
  }
}