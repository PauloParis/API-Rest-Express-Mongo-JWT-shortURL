import Jwt from "jsonwebtoken";
import { generateToken, tokenVerificationErrors } from "../utils/tokenManager.js";

export const requireRefreshToken = (req, res, next) => {
    try {
        console.log("req.cookie.refresh: ", req.cookie.refreshToken)
        const refreshTokenCockie = req.cookie.refreshToken;

        if(!refreshTokenCockie) {
            throw new Error ('No existe el token r')
         }

         const {uid} = Jwt.verify(refreshTokenCockie, process.env.JWT_REFRESH);
         req.uid = uid;
         //const {token, expiresIn} = generateToken(uid);
         //return res.json({token, expiresIn});
         next();

    } catch (error) {
        console.log(error.message);
        return res
        .status(401)
        .json({error: tokenVerificationErrors[error.message]});
    }
}