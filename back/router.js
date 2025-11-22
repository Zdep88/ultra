import { Router } from "express";
import indexController from "./controllers/index.js";

const router = Router();

router.get('/', indexController.index);
router.get('/error', indexController.error);

export default router;