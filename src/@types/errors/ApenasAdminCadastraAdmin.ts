import { BaseError } from "./BaseError";

export class ApenasAdminCadastraAdmin extends Error implements BaseError {
  public name: string;
  constructor() {
    super('Apenas administradores podem cadastrar outros admnistradores');
    this.name = 'ApenasAdminCadastraAdmin';
  }
}
