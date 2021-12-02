import { Inject, Service } from "typedi";
import {Request, Response} from "express";
import { IViagemService } from "../@types/services/IViagemService";
import { OnibusNaoEncontrado } from "../@types/errors/OnibusNaoEncontrado";
import { ViagemNaoEncontrada } from "../@types/errors/ViagemNaoEncontrada";
import { ViacaoInvalida } from "../@types/errors/ViacaoInvalida";
import { ViagemInativa } from "../@types/errors/ViagemInativa";
import { ViagemSemAssentos } from "../@types/errors/ViagemSemAssentos";
import { ViagemFiltroDto } from "../@types/dto/ViagemFiltroDto";
import { RequestWithUsuario } from "../@types/middlewares/requestUserData";
import { UpdateValuesMissingError } from "typeorm";
import { OnibusInvalido } from "../@types/errors/OnibusInvalido";
import { IsReservado } from "../@types/errors/IsReservado";
import { DataInvalida } from "../@types/errors/DataInvalida";

@Service('ViagemController')
export class ViagemController {
  constructor(@Inject('ViagemService') private viagemService: IViagemService) {}

  async adicionarViagem(request: RequestWithUsuario, response: Response): Promise<void> {
    try {
      const viagem = await this.viagemService.criarViagem(request.body, request.usuario.id);
      response.status(201).send(viagem);
    } catch (error) {
      if (error instanceof OnibusNaoEncontrado) {
        response.status(404).send("Onibus não encontrado no sistema");
        return;
      }
      if (error instanceof OnibusInvalido) {
        response.status(422).send("O Onibus selecionado não possui essa quantidade de lugares");
        return;
      }
      if (error?.code === "ER_NO_DEFAULT_FOR_FIELD") {
        response.status(400).send("Há campos obrigatórios que não foram informados");
        return;
      }
      throw error;
    }
  }
  async atualizarViagem(request: RequestWithUsuario, response: Response): Promise<void> {
    try {
      const { id } = request.params;
      await this.viagemService.atualizarViagem(Number(id), request.body, request.usuario.id);
      response.status(204).send();
    } catch (error) {
      if (error instanceof ViagemNaoEncontrada) {
        response.status(404).send("Viagem não encontrada no sistema");
        return;
      }
      if (error instanceof ViacaoInvalida) {
        response.status(422).send("Você não pode alterar viagens de outra viação");
        return;
      }
      if (error instanceof UpdateValuesMissingError) {
        response.status(400).send("Você não pode passar um objeto vazio");
        return;
      }
      throw error;
    }
  }
  async buscarViagem(request: Request, response: Response): Promise<void> {
    try {
      const { id } = request.params;
      const viagem = await this.viagemService.buscarViagem(Number(id));
      response.status(200).send(viagem);
    } catch (error) {
      throw error;
    }
  }
  async listarViagem(request: Request, response: Response): Promise<void> {
    try {
      const { dataInicio, dataFinal, origem, destino } = request.query;
      const filtro: ViagemFiltroDto = {
        origem: origem.toString(),
        destino: destino.toString(),
        dataInicio: dataInicio ? new Date(dataInicio.toString()) : null,
        dataFinal: dataFinal ? new Date(dataFinal.toString()) : null
      }
      const viagens = await this.viagemService.listarViagens(filtro);
      response.status(200).send(viagens);
    } catch (error) {
      if (error instanceof DataInvalida) {
        response.status(400).send("Data passada na query está inválida");
        return;
      }
      throw error;
    }
  }
  async reservarAssento(request: RequestWithUsuario, response: Response): Promise<void> {
    try {
      const { id } = request.params;
      await this.viagemService.reservarAssento(Number(id), request.usuario.id);
      response.status(200).send("Assento reservado com sucesso");
    } catch (error) {
      if (error instanceof ViagemNaoEncontrada) {
        response.status(404).send("Viagem não encontrada no sistema");
        return;
      }
      if (error instanceof ViagemInativa) {
        response.status(422).send("Viagem não está ativa no sistema");
        return;
      }
      if (error instanceof ViagemSemAssentos) {
        response.status(422).send("Viagem não possui assentos disponíveis");
        return;
      }
      if (error instanceof UpdateValuesMissingError) {
        response.status(422).send("Você não pode passar um objeto vazio");
        return;
      }
      if (error instanceof IsReservado) {
        response.status(400).send("Você já reservou um assento para esta viagem");
        return;
      }
      throw error;
    }
  }
}
