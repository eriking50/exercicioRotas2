import { BaseError } from "./BaseError";

export class ViacaoInvalida extends Error implements BaseError {
  public name: string;
  constructor() {
    super('O usuário possui uma viação diferente da viação da viagem');
    this.name = 'ViacaoInvalida';
  }
}
