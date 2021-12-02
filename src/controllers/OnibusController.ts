import { Inject, Service } from "typedi";
import {Request, Response} from "express";
import { IOnibusService } from "../@types/services/IOnibusService";
import { ViacaoNaoEncontrada } from "../@types/errors/ViacaoNaoEncontrada";
import { OnibusNaoEncontrado } from "../@types/errors/OnibusNaoEncontrado";
import { RequestWithUsuario } from "../@types/middlewares/requestUserData";
import { ViacaoInvalida } from "../@types/errors/ViacaoInvalida";
import { ViacaoIsObrigatorio } from "../@types/errors/ViacaoIsObrigatorio";
import { UpdateValuesMissingError } from "typeorm";

@Service('OnibusController')
export class OnibusController {
  constructor(@Inject('OnibusService') private onibusService: IOnibusService) {}

  async adicionarOnibus(request: RequestWithUsuario, response: Response): Promise<void> {
    try {
      const onibus = await this.onibusService.criarOnibus(request.body, request.usuario.id);
      response.status(201).send(onibus);
    } catch (error) {
      if (error instanceof ViacaoNaoEncontrada) {
        response.status(404).send("Viação não encontrada no sistema");
        return;
      }
      if (error instanceof ViacaoIsObrigatorio) {
        response.status(400).send("Ter uma viação é obrigatório para esta ação");
        return;
      }
      if (error?.code === "ER_NO_DEFAULT_FOR_FIELD") {
        response.status(400).send("Há campos obrigatórios que não foram informados");
        return;
      }
      throw error;
    }
  }

  async atualizarOnibus(request: RequestWithUsuario, response: Response): Promise<void> {
    try {
      const { id } = request.params;
      await this.onibusService.atualizarOnibus(Number(id), request.body, request.usuario.id);
      response.status(204).send();
    } catch (error) {
      if (error instanceof OnibusNaoEncontrado) {
        response.status(404).send("Onibus não encontrado no sistema");
        return;
      }
      if (error instanceof ViacaoInvalida) {
        response.status(422).send("Você não pode atualizar um ônibus de outra viação");
        return;
      }
      if (error instanceof UpdateValuesMissingError) {
        response.status(422).send("Você não pode passar um objeto vazio");
        return;
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
      const frota = await this.onibusService.listarOnibus();
      response.status(200).send(frota);
    } catch (error) {
      throw error;
    }
  }
}
