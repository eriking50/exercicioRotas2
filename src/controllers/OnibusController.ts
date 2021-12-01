import { Inject, Service } from "typedi";
import {Request, Response} from "express";
import { IOnibusService } from "../@types/services/IOnibusService";
import { ViacaoNaoEncontrada } from "../@types/errors/ViacaoNaoEncontrada";
import { OnibusNaoEncontrado } from "../@types/errors/OnibusNaoEncontrado";

@Service('OnibusController')
export class OnibusController {
  constructor(@Inject('OnibusService') private onibusService: IOnibusService) {}

  async adicionarOnibus(request: Request, response: Response): Promise<void> {
    try {
      const onibus = await this.onibusService.criarOnibus(request.body);
      response.status(201).send(onibus);
    } catch (error) {
      if (error instanceof ViacaoNaoEncontrada) {
        response.status(404).send("Viação não encontrada no sistema");
      }
      throw error;
    }
  }
  async atualizarOnibus(request: Request, response: Response): Promise<void> {
    try {
      const { id } = request.params;
      await this.onibusService.atualizarOnibus(Number(id), request.body);
      response.status(204).send();
    } catch (error) {
      if (error instanceof OnibusNaoEncontrado) {
        response.status(404).send("Onibus não encontrado no sistema");
      }
      throw error;
    }
  }
  async buscarOnibus(request: Request, response: Response): Promise<void> {
    try {
      const { id } = request.params;
      const onibus = await this.onibusService.buscarOnibus(Number(id));
      response.status(200).send(onibus);
    } catch (error) {
      throw error;
    }
  }
  async listarOnibus(request: Request, response: Response): Promise<void> {
    try {
      const onibus = await this.onibusService.listarOnibus();
      response.status(200).send(onibus);
    } catch (error) {
      throw error;
    }
  }
}
