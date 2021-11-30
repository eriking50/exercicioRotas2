import { Router } from 'express';
import Container from 'typedi';
const router = Router();
import { OnibusController  } from '../controllers/OnibusController';

const getController = (): OnibusController => {
  return Container.get<OnibusController>('OnibusController');
};

const crateRouter = () => {
  return router;
};

export default crateRouter;
