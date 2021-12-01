import { Inject, Service } from "typedi";
import {Request, Response} from "express";
import { IViagemService } from "../@types/services/IViagemService";
import { OnibusNaoEncontrado } from "../@types/errors/OnibusNaoEncontrado";
import { ViagemNaoEncontrada } from "../@types/errors/ViagemNaoEncontrada";
import { ViacaoInvalida } from "../@types/errors/ViacaoInvalida";
import { ViagemInativa } from "../@types/errors/ViagemInativa";
import { ViagemSemAssentos } from "../@types/errors/ViagemSemAssentos";

@Service('ViagemController')
export class ViagemController {
  constructor(@Inject('ViagemService') private viagemService: IViagemService) {}

  async adicionarViagem(request: Request, response: Response): Promise<void> {
    try {
      const idUsuario = 1; //enviar via token id do usuário
      const viagem = await this.viagemService.criarViagem(request.body, idUsuario);
      response.status(201).send(viagem);
    } catch (error) {
      if (error instanceof OnibusNaoEncontrado) {
        response.status(404).send("Onibus não encontrado no sistema");
      }
      throw error;
    }
  }
  async atualizarViagem(request: Request, response: Response): Promise<void> {
    try {
      const { id } = request.params;
      const idUsuario = 1; //enviar via token id do usuário
      await this.viagemService.atualizarViagem(Number(id), request.body, idUsuario);
      response.status(204).send();
    } catch (error) {
      if (error instanceof ViagemNaoEncontrada) {
        response.status(404).send("Viagem não encontrada no sistema");
      }
      if (error instanceof ViacaoInvalida) {
        response.status(422).send("Você não pode alterar viagens de outra viação");
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
      const viagens = await this.viagemService.listarViagens();
      response.status(200).send(viagens);
    } catch (error) {
      throw error;
    }
  }
  async reservarAssento(request: Request, response: Response): Promise<void> {
    try {
      const { id } = request.params;
      const idUsuario = 1; //enviar via token id do usuário
      await this.viagemService.reservarAssento(Number(id), idUsuario);
      response.status(200).send("Assento reservado com sucesso");
    } catch (error) {
      if (error instanceof ViagemNaoEncontrada) {
        response.status(404).send("Viagem não encontrada no sistema");
      }
      if (error instanceof ViagemInativa) {
        response.status(422).send("Viagem não está ativa no sistema");
      }
      if (error instanceof ViagemSemAssentos) {
        response.status(422).send("Viagem não possui assentos disponíveis");
      }
      throw error;
    }
  }
}
