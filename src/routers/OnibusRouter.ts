import { Router } from 'express';
import { middlewareAutenticacao, middlewareAutorizacaoFuncionario } from '../middlewares/authentication';
import Container from 'typedi';
const router = Router();
import { OnibusController  } from '../controllers/OnibusController';

const getController = (): OnibusController => {
  return Container.get<OnibusController>('OnibusController');
};

const crateRouter = () => {
  router.get('', middlewareAutenticacao, middlewareAutorizacaoFuncionario, (req, res) => getController().listarOnibus(req, res));
  router.get('/:id', middlewareAutenticacao, middlewareAutorizacaoFuncionario, (req, res) => getController().buscarOnibus(req, res));
  router.post('', middlewareAutenticacao, middlewareAutorizacaoFuncionario, (req, res) => getController().adicionarOnibus(req, res));
  router.patch('/:id', middlewareAutenticacao, middlewareAutorizacaoFuncionario, (req, res) => getController().atualizarOnibus(req, res));

  return router;
};

export default crateRouter;
