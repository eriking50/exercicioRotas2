import { Router } from 'express';
import { middlewareAutenticacao, middlewareAutorizacaoFuncionario } from '../middlewares/authentication';
import Container from 'typedi';
const router = Router();
import { ViagemController  } from '../controllers/ViagemController';

const getController = (): ViagemController => {
  return Container.get<ViagemController>('ViagemController');
};

const crateRouter = () => {
  router.get('', middlewareAutenticacao, (req, res) => getController().listarViagem(req, res));
  router.get('/:id', middlewareAutenticacao, (req, res) => getController().buscarViagem(req, res));
  router.post('', middlewareAutenticacao, middlewareAutorizacaoFuncionario, (req, res) => getController().adicionarViagem(req, res));
  router.patch('/:id', middlewareAutenticacao, middlewareAutorizacaoFuncionario, (req, res) => getController().atualizarViagem(req, res));
  router.post('/reservar/:id', middlewareAutenticacao, (req, res) => getController().reservarAssento(req, res));
  
  return router;
};

export default crateRouter;
