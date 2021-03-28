import passport from "passport";
import {User} from "../models/entities/user";
import passportLocal from "passport-local";
import { HttpException } from "../exceptionTypes/httpException";

passport.serializeUser((user:User, done)=> {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) =>{
    const foundUser = await User.findOne(id);
    if(!foundUser)return done(new HttpException(401,"User not found while deserialize"));
    done(null, foundUser);
});

passport.use(new passportLocal.Strategy({
        usernameField: 'email',
        passwordField: 'password',
    },

    async (email, password, done) =>{
        const test = password;
        const foundUser = await User.findOne({email:email, password:password});
        if(!foundUser) return done(new HttpException(401,"User not found in Strategy"));
        return done(null, foundUser);
    }
));
