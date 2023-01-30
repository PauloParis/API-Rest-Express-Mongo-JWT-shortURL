import { User } from "../models/User.js" 
import { generateRefreshToken, generateToken } from "../utils/tokenManager.js"

export const login = async(req, res) => {
    const {email, password} = req.body
    try {
        let user = await User.findOne({email})
        if(!user) return res.status(403).json({error: 'No existe el usuario'})

        const respuestaPassword = await user.comparePassword(password);

        if(!respuestaPassword) {
            return res.status(403).json({error: 'contraseña incorrecta'})
        }

        //generar jwt
        //const token = jwt.sign({uid: user.id},  process.env.JWT_SECRET) //sign({ payload })
        const {token, expiresIn} = generateToken(user.id)
        generateRefreshToken(user.id, res);

        return res.json({token, expiresIn});
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Error de servidor"})
    }
}

export const register = async(req, res) => {
    const {email, password} = req.body
    try {

        //Alternativa buscando por email
        let user = await User.findOne({email}) //busca si existe el user
        if(user) throw ({code: 11000}) // no se pone new Error, sino, no se podria enviar un objeto || salta al catch

        user = new User({email: email, password: password});

        await user.save();

        const {token, expiresIn} = generateToken(user.id)
        generateRefreshTOken(user.id, res);


        return res.status(201).json({ token, expiresIn });

    } catch (error) {
        console.log(error)
        // Alternativa pord efecto mongoose
        if(error.code === 11000) { //si fuese throw new error, sería error.message

            return res.status(400).json({error: 'Ya existe este usuario'})
        }  
        return res.status(500).json({error: "Error de servidor"})
    }
}

export const infoUser = async(req, res) => {
    try {
        const user = await User.findById(req.uid).lean(); //lean para consultas mas rapidas

        return res.json({uid: user.id,  email: user.email});

    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Error de servidor"})
    }
}


export const refreshToken = (req, res) => {
    try {
        const { token, expiresIn } = generateToken(req.uid);
        
        return res.json({ token, expiresIn })
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Error de servidor"})
    }
}

export const logout = (req, res) => {
    res.clearCookie('refreshToken')
    res.json({ok: 'logout'})
}
