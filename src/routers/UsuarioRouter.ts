import { Router } from 'express';
import Container from 'typedi';
const router = Router();
import { UsuarioController  } from '../controllers/UsuarioController';

const getController = (): UsuarioController => {
  return Container.get<UsuarioController>('UsuarioController');
};

const crateRouter = () => {
  return router;
};

export default crateRouter;
