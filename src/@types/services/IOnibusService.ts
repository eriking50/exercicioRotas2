import { OnibusAtualizarDto, OnibusDto } from "../dto/OnibusDto";
import { Onibus } from "../../models/OnibusEntity";

export interface IOnibusService {
  criarOnibus(dadosOnibus: OnibusDto, idUsuario: number): Promise<Onibus>;
  atualizarOnibus(idOnibus: number, dadosOnibus: OnibusAtualizarDto, idUsuario: number): Promise<void>
  buscarOnibus(idOnibus: number): Promise<Onibus>;
  listarOnibus(): Promise<Onibus[]>;
}