import express from "express"; // ó import {Router} from "express";
import { login, register } from "../controllers/auth.controller.js";
import {body} from 'express-validator'
import { validatorResultExpress } from "../middlewares/validatorResultExpress.js";

const router = express.Router(); // ó const router = Router();

router.post('/login', 
    [
        body('email', "formato de email incorrecto")
            .trim() //como regla, siempre hacer el trim primero
            .isEmail()
            .normalizeEmail(),
        body('password', "formato de password incorrecto")
            .trim() //como regla, siempre hacer el trim primero
            .isLength({min: 6})
    ],
    validatorResultExpress,
    login)

router.post('/register', 
    [
        body('email', "formato de email incorrecto")
            .trim() //como regla, siempre hacer el trim primero
            .isEmail()
            .normalizeEmail(),
        body('password', "formato de password incorrecto")
            .trim() //como regla, siempre hacer el trim primero
            .isLength({min: 6})
            .custom((value, {req}) => {
                if(value !== req.body.repassword){
                    throw new Error('no coinciden las password')
                }
                return value
            })
    ],
    validatorResultExpress,
    register)

export default router;