import { Router } from "express";
import errorHandler from "./errorHandler.js";

const routerFront = Router();

routerFront.use(errorHandler.notFound);
routerFront.use(errorHandler.errorFront);

export default routerFront;