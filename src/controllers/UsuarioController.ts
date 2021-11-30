import { Inject, Service } from "typedi";
import {Request, Response} from "express";
import { IUsuarioService } from "../@types/services/IUsuarioService";

@Service('UsuarioController')
export class UsuarioController {
  constructor(@Inject('UsuarioService') private usuarioService: IUsuarioService) {}
}
