import { Inject, Service } from "typedi";
import {Request, Response} from "express";
import { IViacaoService } from "../@types/services/IViacaoService";
import { ViacaoNaoEncontrada } from "../@types/errors/ViacaoNaoEncontrada";
import { RequestWithUsuario } from "../@types/middlewares/requestUserData";
import { ViacaoInvalida } from "../@types/errors/ViacaoInvalida";

@Service('ViacaoController')
export class ViacaoController {
  constructor(@Inject('ViacaoService') private viacaoService: IViacaoService) {}

  async adicionarViacao(request: Request, response: Response): Promise<void> {
    try {
      const viacao = await this.viacaoService.criarViacao(request.body);
      response.status(201).send(viacao);
    } catch (error) {
      throw error;
    }
  }
  async atualizarViacao(request: RequestWithUsuario, response: Response): Promise<void> {
    try {
      const { id } = request.params;
      await this.viacaoService.atualizarViacao(Number(id), request.body, request?.usuario?.id);
      response.status(204).send();
    } catch (error) {
      if (error instanceof ViacaoNaoEncontrada) {
        response.status(404).send("Viacao não encontrada no sistema");
        return;
      }
      if (error instanceof ViacaoInvalida) {
        response.status(422).send("Você não pode atualizar uma viação que não seja a sua");
        return;
      }
      throw error;
    }
  }
  async buscarViacao(request: Request, response: Response): Promise<void> {
    try {
      const { id } = request.params;
      const viacao = await this.viacaoService.buscarViacao(Number(id));
      response.status(200).send(viacao);
    } catch (error) {
      throw error;
    }
  }
  async listarViacao(request: Request, response: Response): Promise<void> {
    try {
      const viacoes = await this.viacaoService.listarViacoes();
      response.status(200).send(viacoes);
    } catch (error) {
      throw error;
    }
  }
}
