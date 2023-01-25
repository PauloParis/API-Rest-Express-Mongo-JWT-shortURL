import express from "express"; // ó import {Router} from "express";
import { infoUser, login, logout, refreshToken, register } from "../controllers/auth.controller.js";
import {body} from 'express-validator'
//import { validatorResultExpress } from "../middlewares/validatorResultExpress.js"; //este archivo ya no se considera
import { requireToken } from "../middlewares/requireToken.js";
import { requireRefreshToken } from "../middlewares/requireRefreshToken.js";
import { bodyLoginValidator, bodyRegisterValidator } from "../middlewares/validatorManager.js";

const router = express.Router(); // ó const router = Router();

router.post('/login', bodyLoginValidator, login)
router.post('/register', bodyRegisterValidator, register)

router.get('/protected', requireToken, infoUser);
router.get('/refresh', requireRefreshToken, refreshToken)
router.get('/logout', logout)


export default router;