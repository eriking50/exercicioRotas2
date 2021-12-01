import { BaseError } from "./BaseError";

export class OnibusNaoEncontrado extends Error implements BaseError {
  public name: string;
  constructor() {
    super('Onibus não encontrado');
    this.name = 'OnibusNaoEncontrado';
  }
}
