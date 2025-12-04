import { Router } from "express";
import errorHandler from "./errorHandler.js";

const routerBack = Router();

routerBack.use(errorHandler.notFound);
routerBack.use(errorHandler.errorBack);

export default routerBack;