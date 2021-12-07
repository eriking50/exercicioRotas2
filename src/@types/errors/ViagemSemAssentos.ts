import { BaseError } from "./BaseError";

export class ViagemSemAssentos extends Error implements BaseError {
  public name: string;
  constructor() {
    super('Viagem sem assentos disponíveis');
    this.name = 'ViagemSemAssentos';
  }
}
