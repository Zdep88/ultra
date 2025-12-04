import { Router } from "express";
import errorHandler from "./errorHandler.js";
import indexController from "./controllers/index.js";
import usersController from "./controllers/users.js";

const routerBack = Router();

routerBack.get('/', indexController.getIndex);

routerBack.post('/login', usersController.login);

routerBack.use(errorHandler.notFound);
routerBack.use(errorHandler.errorBack);

export default routerBack;