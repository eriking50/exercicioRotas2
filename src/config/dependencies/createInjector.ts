
import { getCustomRepository } from "typeorm";
import Container from "typedi";
import { OnibusRepository } from "../../repositories/OnibusRepository";
import { ViacaoRepository } from "../../repositories/ViacaoRepository";
import { ViagemRepository } from "../../repositories/ViagemRepository";
import { UsuarioRepository } from "../../repositories/UsuarioRepository";
import { UserRepository } from "../../repositories/UserRepository";

// inicializador de dependências:
// inicializa controllers
import "../../controllers/UserController";
import "../../controllers/EnderecoController";

import "../../controllers/OnibusController";
import "../../controllers/UsuarioController";
import "../../controllers/ViagemController";
import "../../controllers/ViacaoController";

// inicializa services
import "../../services/UserService";
import "../../services/EnderecoService";

import "../../services/OnibusService";
import "../../services/UsuarioService";
import "../../services/ViagemService";
import "../../services/ViacaoService";
import "../../services/TokenService";

// inicializa clientes
import "../../clients/CepClient"
import "../../infra/http/AxiosHttpClient";


const createDependencyInjector = () => {
  Container.set("UserRepository", getCustomRepository(UserRepository));
  Container.set("OnibusRepository", getCustomRepository(OnibusRepository));
  Container.set("ViacaoRepository", getCustomRepository(ViacaoRepository));
  Container.set("ViagemRepository", getCustomRepository(ViagemRepository));
  Container.set("UsuarioRepository", getCustomRepository(UsuarioRepository));
};

export default createDependencyInjector;
