import { Request, Response, NextFunction } from "express";

export const errorRouter = (error: Error, req: Request, res: Response, next: NextFunction) => {
  const errorMessage = error.message;
  const response = process.env.NODE_ENV === 'development' ?
    errorMessage :
    'Erro inesperado, Consulte o admin.'
  ;

  res.status(500).send({response});
}