import * as express from "express";
import { errorRouter } from "../../middlewares/errorRouter";

const createErrorMiddleware = (app: express.Express) => {
  app.use(errorRouter);
};

export default createErrorMiddleware;