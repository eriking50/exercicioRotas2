import { BaseError } from "./BaseError";

export class NaoPodeCriarAdminOuFunc extends Error implements BaseError {
  public name: string;
  constructor() {
    super('Não pode criar admin ou funcionado sem estar cadastrado');
    this.name = 'NaoPodeCriarAdminOuFunc';
  }
}
