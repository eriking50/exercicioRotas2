import { Router } from 'express';
import Container from 'typedi';
const router = Router();
import { UsuarioController  } from '../controllers/UsuarioController';

const getController = (): UsuarioController => {
  return Container.get<UsuarioController>('UsuarioController');
};

const crateRouter = () => {
  router.get('/:id', (req, res) => getController().buscarUsuario(req, res));
  router.post('', (req, res) => getController().adicionarUsuario(req, res));
  router.patch('/:id', (req, res) => getController().atualizarUsuario(req, res));
  router.delete('/:id', (req, res) => getController().removerUsuario(req, res));

  return router;
};

export default crateRouter;
