// HACER REDIRECCIONAMIENTO DESDE FRONTEND
//ESTO ES A MODO DE EJEMPLO

import { Router } from "express";
import { redirectLink } from "../controllers/redirect.controller.js";

const router = Router();

router.get('/:nanoLink', redirectLink);

export default router;