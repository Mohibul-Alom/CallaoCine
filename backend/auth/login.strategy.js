const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User.model');
const bcrypt = require('bcrypt');


const loginStrategy = new LocalStrategy(
    {
        usernameField:"email",
        passwordField:"password",
        passReqToCallback: true
    },
    async (req,email,password,done) => {

        try {

            const existingUser = await User.findOne({ email });

            if (!existingUser) return throwError(400, 'El usuario no existe', done);

            const isValidPassword = await bcrypt.compare(password, existingUser.password);

            if (!isValidPassword) return throwError(401, 'Las contraseñas no coicniden', done);


            //IMPORTANTE
            existingUser.password = undefined;
            return done(null,existingUser);

        } catch (error) {
            return done(error);
        }
    }
);

module.exports = loginStrategy;