import axios from "axios";
import { body, param, validationResult } from "express-validator";

export const validatorResultExpress = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) { //si errors no está vacio, se cometio un error en enviar la solicitud
        return res.status(400).json({
            errors: errors.array()
        })
    }
    next();
}


export const bodyRegisterValidator = [

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
        }),
    validatorResultExpress
]


export const bodyLoginValidator = [
    body('email', "formato de email incorrecto")
        .trim() //como regla, siempre hacer el trim primero
        .isEmail()
        .normalizeEmail(),
    body('password', "formato de password incorrecto")
        .trim() //como regla, siempre hacer el trim primero
        .isLength({min: 6}),
    validatorResultExpress
]


export const bodyLinkValidator = [
    body("longLink", "formato de link incorrecto")
        .trim()
        .notEmpty()
        .custom(async (value) => {
            try {

                if(value.startWith('http://')){ //para ver si comienza con https
                    value = 'https://' + value
                }
                
                await axios.get(value)
                return value
            } catch (error) {
                //console.log(error)
                throw new Error('not found longLink 404')
            }
        }),
    validatorResultExpress
]


export const paramsLinkValidator = [
    param("id", "formato no válido (expressValidator)")
        .trim()
        .notEmpty()
        .escape(), // por si se envia un script
    validatorResultExpress
]