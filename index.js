import express from "express";
import './database/connectdb.js';
import 'dotenv/config'; //se puede poner en el coonectdb.js
import authRouter from './routes/auth.route.js';
import cookieParser from "cookie-parser";

const app = express(); //en la app activamos todos los metodos de express
                      // por ejemplo para inicializar el servidor

app.use(express.json()) //habilitamos express para que pueda leer las solicitudes en json
app.use(cookieParser()) //se le dice a express q se trabajará con cookies
app.use('/api/v1/auth', authRouter)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log("🎈🎈🎈 http://localhost:"+ PORT))