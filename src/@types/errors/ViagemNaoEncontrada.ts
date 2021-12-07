import { BaseError } from "./BaseError";

export class ViagemNaoEncontrada extends Error implements BaseError {
  public name: string;
  constructor() {
    super('Viagem não encontrada');
    this.name = 'ViacaoNaoEncontrada';
  }
}
