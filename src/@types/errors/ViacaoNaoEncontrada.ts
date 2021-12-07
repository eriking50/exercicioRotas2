import { BaseError } from "./BaseError";

export class ViacaoNaoEncontrada extends Error implements BaseError {
  public name: string;
  constructor() {
    super('Viacao não encontrada');
    this.name = 'ViacaoNaoEncontrada';
  }
}
