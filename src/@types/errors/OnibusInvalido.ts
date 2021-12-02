import { BaseError } from "./BaseError";

export class OnibusInvalido extends Error implements BaseError {
  public name: string;
  constructor() {
    super('O Onibus selecionado não possui essa quantidade de lugares');
    this.name = 'OnibusInvalido';
  }
}
