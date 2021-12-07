import { Router } from 'express';
import { middlewareAutenticacao, middlewareAutorizacaoAdmin, middlewareAutorizacaoFuncionario } from '../middlewares/authentication';
import Container from 'typedi';
const router = Router();
import { ViacaoController  } from '../controllers/ViacaoController';

const getController = (): ViacaoController => {
  return Container.get<ViacaoController>('ViacaoController');
};

const crateRouter = () => {
  router.get('', middlewareAutenticacao, middlewareAutorizacaoFuncionario, (req, res) => getController().listarViacao(req, res));
  router.get('/:id', middlewareAutenticacao, middlewareAutorizacaoAdmin, (req, res) => getController().buscarViacao(req, res));
  router.post('', middlewareAutenticacao, middlewareAutorizacaoAdmin, (req, res) => getController().adicionarViacao(req, res));
  router.patch('/:id', middlewareAutenticacao, middlewareAutorizacaoFuncionario, (req, res) => getController().atualizarViacao(req, res));

  return router;
};

export default crateRouter;
