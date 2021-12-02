import { Inject, Service } from "typedi";
import {request, Request, Response} from "express";
import { IUsuarioService } from "../@types/services/IUsuarioService";
import { ViacaoNaoEncontrada } from "../@types/errors/ViacaoNaoEncontrada";
import { UsuarioNaoEncontrado } from "../@types/errors/UsuarioNaoEncontrado";
import { EmailInvalido } from "../@types/errors/EmailInvalido";
import { EmailOuSenhaNaoEncontrados } from "../@types/errors/EmailOuSenhaNaoEncontrados";
import { AdminCadastraFuncionario } from "../@types/errors/AdminCadastraFuncionario";
import { ApenasAdminCadastraAdmin } from "../@types/errors/ApenasAdminCadastraAdmin";
import { NaoPodeCriarAdminOuFunc } from "../@types/errors/NaoPodeCriarAdminOuFunc";
import { RequestWithUsuario } from "../@types/middlewares/requestUserData";
import { UpdateValuesMissingError } from "typeorm";

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
        return;
      }
      throw error;
    }
  }

  async adicionarUsuario(request: RequestWithUsuario, response: Response): Promise<void> {
    try {
      const usuario = await this.usuarioService.criarUsuario(request.body, request?.usuario?.id);
      response.status(201).send(usuario);
    } catch (error) {
      if (error instanceof ViacaoNaoEncontrada) {
        response.status(404).send("Viação não encontrada no sistema");
        return;
      }
      if (error instanceof EmailInvalido) {
        response.status(400).send("Email inválido");
        return;
      }
      if (error?.code === "ER_DUP_ENTRY") {
        response.status(400).send("Email já cadastrado no sistema");
        return;
      }
      if (error instanceof AdminCadastraFuncionario) {
        response.status(422).send("Para um admin cadastrar um funcionário é necessário informar a viação");
        return;
      }
      if (error instanceof ApenasAdminCadastraAdmin) {
        response.status(422).send("Apenas admins podem cadastrar outros admins");
        return;
      }
      if (error instanceof NaoPodeCriarAdminOuFunc) {
        response.status(422).send("Sem estar logado só pode ser cadastrado passageiros");
        return;
      }
      throw error;
    }
  }
  async atualizarUsuario(request: RequestWithUsuario, response: Response): Promise<void> {
    try {
      const { id } = request.params;
      await this.usuarioService.atualizarUsuario(Number(id), request.body);
      response.status(204).send();
    } catch (error) {
      if (error instanceof UsuarioNaoEncontrado) {
        response.status(404).send("Usuário não encontrado no sistema");
        return;
      }
      if (error instanceof UpdateValuesMissingError) {
        response.status(422).send("Você não pode passar um objeto vazio");
        return;
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
        return;
      }
      throw error;
    }
  }
}
