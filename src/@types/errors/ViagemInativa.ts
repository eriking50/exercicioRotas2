import { BaseError } from "./BaseError";

export class ViagemInativa extends Error implements BaseError {
  public name: string;
  constructor() {
    super('Viagem inativa');
    this.name = 'ViagemInativa';
  }
}
