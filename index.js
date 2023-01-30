import express from "express";
import './database/connectdb.js';
import 'dotenv/config'; //se puede poner en el coonectdb.js
import authRouter from './routes/auth.route.js';
import linkRouter from './routes/link.route.js'
import cookieParser from "cookie-parser";
import redirectRouter from './routes/redirect.route.js'
import cors from 'cors'
//import { corsConfiguration } from "./utils/corsConfiguration.js";

const app = express(); //en la app activamos todos los metodos de express
                      // por ejemplo para inicializar el servidor


const whiteList = [process.env.ORIGIN1, process.env.ORIGIN2] //aqui se agregar los dominios que acepta el backend
app.use(cors({
    origin: function(origin, callback){
        if(!origin || whiteList.includes(origin)){
            return callback(null, origin);
        }
        return callback("Error de Cors: " + origin + " No autorizado!")
    },
    credentials: true,
}));
//app.use(corsConfiguration);

app.use(express.json()); //habilitamos express para que pueda leer las solicitudes en json
app.use(cookieParser()); //se le dice a express q se trabajará con cookies

// ejemplo back redirect (opcional) || conviene si back y front están en el mismo servidor
app.use('/', redirectRouter);

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/links', linkRouter);



const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log("🎈🎈🎈 http://localhost:"+ PORT))