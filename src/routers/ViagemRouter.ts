import { Router } from 'express';
import Container from 'typedi';
const router = Router();
import { ViagemController  } from '../controllers/ViagemController';

const getController = (): ViagemController => {
  return Container.get<ViagemController>('ViagemController');
};

const crateRouter = () => {
  return router;
};

export default crateRouter;
