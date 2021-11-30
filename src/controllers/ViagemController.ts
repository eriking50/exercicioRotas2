import { Inject, Service } from "typedi";
import {Request, Response} from "express";
import { IViagemService } from "../@types/services/IViagemService";

@Service('ViagemController')
export class ViagemController {
  constructor(@Inject('ViagemService') private viagemService: IViagemService) {}
}
