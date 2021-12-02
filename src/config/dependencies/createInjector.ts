
import { getCustomRepository } from "typeorm";
import Container from "typedi";
import { OnibusRepository } from "../../repositories/OnibusRepository";
import { ViacaoRepository } from "../../repositories/ViacaoRepository";
import { ViagemRepository } from "../../repositories/ViagemRepository";
import { UsuarioRepository } from "../../repositories/UsuarioRepository";

// inicializador de dependências:
// inicializa controllers
import "../../controllers/OnibusController";
import "../../controllers/UsuarioController";
import "../../controllers/ViagemController";
import "../../controllers/ViacaoController";

// inicializa services
import "../../services/OnibusService";
import "../../services/UsuarioService";
import "../../services/ViagemService";
import "../../services/ViacaoService";
import "../../services/TokenService";


const createDependencyInjector = () => {
  Container.set("OnibusRepository", getCustomRepository(OnibusRepository));
  Container.set("ViacaoRepository", getCustomRepository(ViacaoRepository));
  Container.set("ViagemRepository", getCustomRepository(ViagemRepository));
  Container.set("UsuarioRepository", getCustomRepository(UsuarioRepository));
};

export default createDependencyInjector;
