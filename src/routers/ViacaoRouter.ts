import { Router } from 'express';
import Container from 'typedi';
const router = Router();
import { ViacaoController  } from '../controllers/ViacaoController';

const getController = (): ViacaoController => {
  return Container.get<ViacaoController>('ViacaoController');
};

const crateRouter = () => {
  return router;
};

export default crateRouter;
