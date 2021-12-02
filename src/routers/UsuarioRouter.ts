import { Router } from 'express';
import { middlewareAutenticacao, middlewareAutorizacaoAdmin } from '../middlewares/authentication';
import Container from 'typedi';
const router = Router();
import { UsuarioController  } from '../controllers/UsuarioController';

const getController = (): UsuarioController => {
  return Container.get<UsuarioController>('UsuarioController');
};

const crateRouter = () => {
  router.post('/singin', (req, res) => getController().autenticarUsuario(req, res));
  router.get('/:id', middlewareAutenticacao, middlewareAutorizacaoAdmin, (req, res) => getController().buscarUsuario(req, res));
  router.post('', middlewareAutenticacao, middlewareAutorizacaoAdmin, (req, res) => getController().adicionarUsuario(req, res));
  router.patch('/:id', middlewareAutenticacao, (req, res) => getController().atualizarUsuario(req, res));
  router.delete('/:id', middlewareAutenticacao, middlewareAutorizacaoAdmin, (req, res) => getController().removerUsuario(req, res));

  return router;
};

export default crateRouter;
