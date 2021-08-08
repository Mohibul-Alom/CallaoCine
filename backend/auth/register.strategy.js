const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/User.model');
const { isValidEmail, isValidPassword, throwError } = require("./utils");


const registerStrategy = new LocalStrategy(
    {
        usernameField:"email",
        passwordField:"password",
        passReqToCallback: true
    },

    async(req,email,password,done)=>{

        try{
            console.log("HOLA???");

            const existingUser = await User.findOne({email});

            if (existingUser) return throwError(400, 'El usuario ya existe', done);

            if (!isValidEmail(email)) return throwError(400, 'Email inváido', done);
        
            if (!isValidPassword(password)) return throwError(400, 'Contraseña debe contener 8 characteres, 1 mayúscula y 1 minúscula', done);
        

            const saltRounds = 10;
            const hash = await bcrypt.hash(password,saltRounds);

            const newUser = new User(
                {
                    email,
                    password: hash,
                    name:req.body.name,
                }
            );

            const savedUser = await newUser.save();
            //IMPORTANTE
            savedUser.password = undefined;
            
            //como ya no hay errores le pasamos el primer parametro de error como null
            return done(null,savedUser)

        }catch(error){
            return done(error);
        }
    }
);

module.exports = registerStrategy;