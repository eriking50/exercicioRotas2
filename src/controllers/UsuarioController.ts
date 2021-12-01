import { Inject, Service } from "typedi";
import {request, Request, Response} from "express";
import { IUsuarioService } from "../@types/services/IUsuarioService";
import { ViacaoNaoEncontrada } from "../@types/errors/ViacaoNaoEncontrada";
import { UsuarioNaoEncontrado } from "../@types/errors/UsuarioNaoEncontrado";
import { EmailInvalido } from "../@types/errors/EmailInvalido";
import { EmailOuSenhaNaoEncontrados } from "../@types/errors/EmailOuSenhaNaoEncontrados";

@Service('UsuarioController')
export class UsuarioController {
  constructor(@Inject('UsuarioService') private usuarioService: IUsuarioService) {}

  async autenticarUsuario(request: Request, response: Response) {
    try {
      const token = await this.usuarioService.autenticarUsuario(request.body);
      response.status(201).send(token);
    } catch (error) {
      if (error instanceof EmailOuSenhaNaoEncontrados) {
        response.status(422).send("Email ou Senha não encontrados");
      }
      throw error;
    }
  }

  async adicionarUsuario(request: Request, response: Response): Promise<void> {
    try {
      const usuario = await this.usuarioService.criarUsuario(request.body);
      response.status(201).send(usuario);
    } catch (error) {
      if (error instanceof ViacaoNaoEncontrada) {
        response.status(404).send("Viação não encontrada no sistema");
      }
      if (error instanceof EmailInvalido) {
        response.status(400).send("Email inválido");
      }
      throw error;
    }
  }
  async atualizarUsuario(request: Request, response: Response): Promise<void> {
    try {
      const { id } = request.params;
      await this.usuarioService.atualizarUsuario(Number(id), request.body);
      response.status(204).send();
    } catch (error) {
      if (error instanceof UsuarioNaoEncontrado) {
        response.status(404).send("Usuário não encontrado no sistema");
      }
      throw error;
    }
  }
  async buscarUsuario(request: Request, response: Response): Promise<void> {
    try {
      const { id } = request.params;
      const usuario = await this.usuarioService.buscarUsuario(Number(id));
      response.status(200).send(usuario);
    } catch (error) {
      throw error;
    }
  }
  async removerUsuario(request: Request, response: Response): Promise<void> {
    try {
      const { id } = request.params;
      await this.usuarioService.removerUsuario(Number(id));
      response.status(204).send();
    } catch (error) {
      if (error instanceof UsuarioNaoEncontrado) {
        response.status(404).send("Usuário não encontrado no sistema");
      }
      throw error;
    }
  }
}
