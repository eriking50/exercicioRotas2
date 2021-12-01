import { ViagemAtualizarDto, ViagemDto } from "../dto/ViagemDto";
import { Viagem } from "../../models/ViagemEntity";

export interface IViagemService {
  criarViagem(dadosViagem: ViagemDto, idViacao: number): Promise<Viagem>;
  atualizarViagem(idViagem: number, dadosViagem: ViagemAtualizarDto, idUsuario: number): Promise<void>;
  buscarViagem(idViagem: number): Promise<Viagem>;
  reservarAssento(idViagem: number, idUsuario: number): Promise<void>;
  listarViagens():Promise<Viagem[]>;
}