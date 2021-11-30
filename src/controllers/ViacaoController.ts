import { Inject, Service } from "typedi";
import {Request, Response} from "express";
import { IViacaoService } from "../@types/services/IViacaoService";

@Service('ViacaoController')
export class ViacaoController {
  constructor(@Inject('ViacaoService') private viacaoService: IViacaoService) {}
}
