import { Router } from 'express';
import Container from 'typedi';
const router = Router();
import { ViagemController  } from '../controllers/ViagemController';

const getController = (): ViagemController => {
  return Container.get<ViagemController>('ViagemController');
};

const crateRouter = () => {
  router.get('', (req, res) => getController().listarViagem(req, res));
  router.get('/:id', (req, res) => getController().buscarViagem(req, res));
  router.post('', (req, res) => getController().adicionarViagem(req, res));
  router.patch('/:id', (req, res) => getController().atualizarViagem(req, res));
  router.patch('/reservar/:id', (req, res) => getController().reservarAssento(req, res));
  
  return router;
};

export default crateRouter;
