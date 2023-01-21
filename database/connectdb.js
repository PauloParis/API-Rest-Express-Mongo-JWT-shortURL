import mongoose from "mongoose";
import * as dotenv from 'dotenv'; //se puede poner en el coonectdb.js
dotenv.config();

try {
    await mongoose.connect(process.env.URI_MONGO); //no es encesario un async
    console.log('Connect DB ok ')
} catch (error) {
    console.log('Error en la conección DB ' + error)
}