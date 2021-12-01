import * as express from 'express';
import createUserRouter from './userRouter';
import createEnderecoRouter from './enderecoRouter';
import createOnibusRouter from './OnibusRouter';
import createUsuarioRouter from './UsuarioRouter';
import createViacaoRouter from './ViacaoRouter';
import createViagemRouter from './ViagemRouter';

const createRouters = (app: express.Express) => {
  app.use('/users', createUserRouter());
  app.use('/enderecos', createEnderecoRouter());
  
  app.use('/onibus', createOnibusRouter());
  app.use('/usuarios', createUsuarioRouter());
  app.use('/viacoes', createViacaoRouter());
  app.use('/viagens', createViagemRouter());
};

export default createRouters;
