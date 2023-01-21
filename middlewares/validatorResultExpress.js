import { validationResult } from "express-validator";

export const validatorResultExpress = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) { //si errors no está vacio, se cometio un error en enviar la solicitud
        return res.status(400).json({
            errors: errors.array()
        })
    }
    next();
}