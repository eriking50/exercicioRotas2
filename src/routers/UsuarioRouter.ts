import { Router } from 'express';
import { middlewareAutenticacao, middlewareAutorizacaoAdmin, middlewareAutorizacaoFuncionario } from '../middlewares/authentication';
import Container from 'typedi';
const router = Router();
import { UsuarioController  } from '../controllers/UsuarioController';

const getController = (): UsuarioController => {
  return Container.get<UsuarioController>('UsuarioController');
};

const crateRouter = () => {
  router.post('/singin', (req, res) => getController().autenticarUsuario(req, res));
  router.get('/:id', middlewareAutenticacao, middlewareAutorizacaoAdmin, (req, res) => getController().buscarUsuario(req, res));
  router.post('', (req, res) => getController().adicionarPassageiro(req, res));
  router.post('/admin/', middlewareAutenticacao, middlewareAutorizacaoAdmin, (req, res) => getController().adicionarAdmin(req, res));
  router.post('/funcionario/', middlewareAutenticacao, middlewareAutorizacaoFuncionario, (req, res) => getController().adicionarFuncionario(req, res));
  router.patch('/:id', middlewareAutenticacao, (req, res) => getController().atualizarUsuario(req, res));
  router.delete('/:id', middlewareAutenticacao, middlewareAutorizacaoAdmin, (req, res) => getController().removerUsuario(req, res));

  return router;
};

export default crateRouter;
