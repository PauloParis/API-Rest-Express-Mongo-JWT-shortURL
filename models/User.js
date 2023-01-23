import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const {Schema, model} = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        index: {unique: true},
    },
    password: {
        type: String,
        required: true,
    }
})

//métodos para interceptar datos, ANTES que se guarde en la BD
userSchema.pre("save", async function(next){ // no hacer funciones de flecha, necesitamos el alcance del this
    const user = this //instanciando el usuario
    if(!user.isModified('password')) return next()  //sino se modifica la password, no la hashea | en caso que se modifique el usuario
    try {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        next();
    } catch (error) {
        console.log(error)
        throw new Error('Falló el hash de password');
    }
})

userSchema.methods.comparePassword = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword, this.password) //retorna true o false
}

export const User = model('User', userSchema);