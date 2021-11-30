import { Inject, Service } from "typedi";
import { IViagemService } from "../@types/services/IViagemService";
import { IViagemRepository } from "../@types/repositories/IViagemRepository";

@Service('ViagemService')
export class ViagemService implements IViagemService {
  constructor(@Inject('ViagemRepository') private viagemRepository: IViagemRepository) {}
}