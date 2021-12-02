import { BaseError } from "./BaseError";

export class IsReservado extends Error implements BaseError {
  public name: string;
  constructor() {
    super('Você já reservou vaga nesta viagem');
    this.name = 'IsReservado';
  }
}
