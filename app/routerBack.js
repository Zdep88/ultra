import { Router } from "express";
import errorHandler from "./errorHandler.js";
import authController from "./controllers/auth.js";
import indexController from "./controllers/index.js";
import usersController from "./controllers/users.js";

const routerBack = Router();

routerBack.get('/', indexController.getIndex);

routerBack.post('/login', authController.login);
routerBack.get('/auth-check', authController.auth, authController.authCheck);
routerBack.get('/admin-check', authController.auth, authController.admin, authController.adminCheck);

routerBack.use('/users', authController.auth, authController.admin);
routerBack.get('/users', usersController.getAll);
routerBack.get('/users/:id', usersController.getOne);
routerBack.post('/users', usersController.create);

routerBack.use(errorHandler.notFound);
routerBack.use(errorHandler.errorBack);

export default routerBack;