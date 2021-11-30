import { Inject, Service } from "typedi";
import { IOnibusService } from "../@types/services/IOnibusService";
import { IOnibusRepository } from "../@types/repositories/IOnibusRepository";

@Service('OnibusService')
export class OnibusService implements IOnibusService {
  constructor(@Inject('OnibusRepository') private onibusRepository: IOnibusRepository) {}
}