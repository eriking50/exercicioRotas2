import { Inject, Service } from "typedi";
import {Request, Response} from "express";
import { IOnibusService } from "../@types/services/IOnibusService";

@Service('OnibusController')
export class OnibusController {
  constructor(@Inject('OnibusService') private onibusService: IOnibusService) {}
}
