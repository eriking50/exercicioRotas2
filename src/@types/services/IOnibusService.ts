import { OnibusAtualizarDto, OnibusDto } from "../dto/OnibusDto";
import { Onibus } from "../../models/OnibusEntity";

export interface IOnibusService {
  criarOnibus(dadosOnibus: OnibusDto): Promise<Onibus>;
  atualizarOnibus(idOnibus: number, dadosOnibus: OnibusAtualizarDto): Promise<void>
  buscarOnibus(idOnibus: number): Promise<Onibus>;
  listarOnibus(): Promise<Onibus[]>;
}