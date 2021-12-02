import { BaseError } from "./BaseError";

export class AdminCadastraFuncionario extends Error implements BaseError {
  public name: string;
  constructor() {
    super('Para cadastrar um funcionaro passe uma viação');
    this.name = 'AdminCadastraFuncionario';
  }
}
