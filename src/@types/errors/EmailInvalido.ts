import { BaseError } from "./BaseError";

export class EmailInvalido extends Error implements BaseError {
  public name: string;
  constructor() {
    super('Email Invalido');
    this.name = 'EmailInvalido';
  }
}
