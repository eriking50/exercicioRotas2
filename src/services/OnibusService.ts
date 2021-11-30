import { Inject, Service } from "typedi";
import { IOnibusService } from "../@types/services/IOnibusService";
import { IOnibusRepository } from "../@types/repositories/IOnibusRepository";
import { OnibusAtualizarDto, OnibusDto } from "../@types/dto/OnibusDto";
import { IViacaoRepository } from "../@types/repositories/IViacaoRepository";
import { Onibus } from "../models/OnibusEntity";
import { Viacao } from "../models/ViacaoEntity";

@Service('OnibusService')
export class OnibusService implements IOnibusService {
  constructor(
    @Inject('OnibusRepository') private onibusRepository: IOnibusRepository,
    @Inject('ViacaoRepository') private viacaoRepository: IViacaoRepository
  ) {}

  async criarOnibus(dadosOnibus: OnibusDto): Promise<Onibus> {
    const viacao = await this.viacaoRepository.findById(dadosOnibus.viacaoId);
    if (!viacao) {
      throw new Error("Viação não encontrada");
    }
    const onibus = this.onibusFactory(dadosOnibus, viacao);
    return await this.onibusRepository.save(onibus);
  }
  
  async atualizarOnibus(idOnibus: number, dadosOnibus: OnibusAtualizarDto): Promise<void> {
    const onibus = this.onibusRepository.findById(idOnibus);
    if (!onibus) {
      throw new Error("Onibus não encontrado");
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