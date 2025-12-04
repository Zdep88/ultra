import { Router } from "express";
import errorHandler from "./errorHandler.js";
import indexController from "./controllers/index.js";

const routerBack = Router();

routerBack.get('/', indexController.getIndex);

routerBack.use(errorHandler.notFound);
routerBack.use(errorHandler.errorBack);

export default routerBack;