import { Inject, Service } from "typedi";
import { IViacaoService } from "../@types/services/IViacaoService";
import { IViacaoRepository } from "../@types/repositories/IViacaoRepository";

@Service('ViacaoService')
export class ViacaoService implements IViacaoService {
  constructor(@Inject('ViacaoRepository') private viacaoRepository: IViacaoRepository) {}
}