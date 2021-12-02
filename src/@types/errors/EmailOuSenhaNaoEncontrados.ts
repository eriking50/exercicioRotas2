import { BaseError } from "./BaseError";

export class EmailOuSenhaNaoEncontrados extends Error implements BaseError {
  public name: string;
  constructor() {
    super('Email ou senha não encontrados');
    this.name = 'EmailOuSenhaNaoEncontrados';
  }
}
