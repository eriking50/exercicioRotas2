import { ViacaoAtualizarDto, ViacaoDto } from "../dto/ViacaoDto";
import { Viacao } from "../../models/ViacaoEntity";

export interface IViacaoService {
  criarViacao(dadosViacao: ViacaoDto): Promise<Viacao>;
  atualizarViacao(idViacao: number, dadosViacao: ViacaoAtualizarDto): Promise<void>;
  buscarViacao(idViacao: number): Promise<Viacao>;
  listarViacao(): Promise<Viacao[]>;
}