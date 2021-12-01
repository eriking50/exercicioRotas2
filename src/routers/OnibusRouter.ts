import { Router } from 'express';
import Container from 'typedi';
const router = Router();
import { OnibusController  } from '../controllers/OnibusController';

const getController = (): OnibusController => {
  return Container.get<OnibusController>('OnibusController');
};

const crateRouter = () => {
  router.get('', (req, res) => getController().listarOnibus(req, res));
  router.get('/:id', (req, res) => getController().buscarOnibus(req, res));
  router.post('', (req, res) => getController().adicionarOnibus(req, res));
  router.patch('/:id', (req, res) => getController().atualizarOnibus(req, res));

  return router;
};

export default crateRouter;
