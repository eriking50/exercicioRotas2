import * as express from "express";
import createRouters from "../routers";
import createErrorMiddleware from "./dependencies/createErrorMiddleware";
import createMiddlewares from "./middlewares";

const createApp = (): express.Express => {
  const app = express();
  createMiddlewares(app);
  createRouters(app);
  createErrorMiddleware(app);

  return app;
};

export default createApp;
