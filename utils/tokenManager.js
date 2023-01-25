import Jwt from "jsonwebtoken"

export const generateToken = (uid) => {
    const expiresIn = 60 * 15; //15 minutos 
    try {
        const token = Jwt.sign({uid}, process.env.JWT_SECRET, {expiresIn: expiresIn})
        return {token, expiresIn}
    } catch (error) {
        console.log(error)
    }
}

export const generateRefreshTOken = (uid, res) => {
    const expiresIn = 60 * 60 *24 *30 //30 dias
    try {
        const refreshToken = Jwt.sign({uid}, process.env.JWT_REFRESH, {expiresIn: expiresIn})
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: !(process.env.MODO === 'developer'),
            expires: new Date(Date.now() + expiresIn * 1000)
        })        
    } catch (error) {
        console.log(error)
    }
}

export const tokenVerificationErrors = {
    'invalid signature': 'Firma del jwt no valida',
    'jwt expired': 'Token expirado',
    'invalid token': 'Token no valido',
    'No Bearer': 'Utiliza el formato Bearer',
    'jwt malformed': 'jwt formato no válido',
}