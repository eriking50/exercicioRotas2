import { Router } from 'express';
import Container from 'typedi';
const router = Router();
import { ViacaoController  } from '../controllers/ViacaoController';

const getController = (): ViacaoController => {
  return Container.get<ViacaoController>('ViacaoController');
};

const crateRouter = () => {
  router.get('', (req, res) => getController().listarViacao(req, res));
  router.get('/:id', (req, res) => getController().buscarViacao(req, res));
  router.post('', (req, res) => getController().adicionarViacao(req, res));
  router.patch('/:id', (req, res) => getController().atualizarViacao(req, res));

  return router;
};

export default crateRouter;
