import { BaseError } from "./BaseError";

export class UsuarioNaoEncontrado extends Error implements BaseError {
  public name: string;
  constructor() {
    super('Usuario não encontrado');
    this.name = 'UsuarioNaoEncontrado';
  }
}
