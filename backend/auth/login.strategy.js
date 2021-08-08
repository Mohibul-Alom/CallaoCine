const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require('bcrypt');


const loginStrategy = new LocalStrategy(
    {
        usernameField:"email",
        passwordField:"password",
        passReqToCallback: true
    },
    async (req,email,password,done) => {

        try {

            const existingUser = await User.findOne({email});

            if (existingUser) throwError(400, 'El usuario ya existe', done);

            if (!isValidEmail(email)) throwError(400, 'Email inváido', done);
        
            if (!isValidPassword(password)) throwError(400, 'Contraseña debe contener 8 characteres, 1 mayúscula y 1 minúscula', done);
        

            //IMPORTANTE
            existingUser.password = undefined;
            return done(null,existingUser);

        } catch (error) {
            return done(error);
        }
    }
);

module.exports = loginStrategy;