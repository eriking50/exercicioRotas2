import { BaseError } from "./BaseError";

export class DataInvalida extends Error implements BaseError {
  public name: string;
  constructor() {
    super('Data passada na query');
    this.name = 'DataInvalida';
  }
}
