import { BaseError } from "./BaseError";

export class ViacaoIsObrigatorio extends Error implements BaseError {
  public name: string;
  constructor() {
    super('É obrigatório possuir uma viação');
    this.name = 'ViacaoIsObrigatorio';
  }
}
