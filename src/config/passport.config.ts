import passport from "passport";


import { Request, Response, NextFunction } from "express";
import {User} from "../models/user";
import passportLocal from "passport-local";
import { HttpException } from "../exceptionTypes/httpException";


passport.serializeUser((user:User, done)=> {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) =>{
    const foundUser = await User.findOne(id);
    if(!foundUser)return done(new HttpException(401,"User not foundbbbbbbbbbbbbb"))
    done(null, foundUser);
});

passport.use(new passportLocal.Strategy({
        usernameField: 'email',
        passwordField: 'password',
    },    // define the parameter in req.body that passport can use as username and password


    async (email, password, done) =>{
        const test = password;
        const foundUser = await User.findOne({email:email, password:password});
        //if(!foundUser) throw new HttpException(404,"User not found");
        if(!foundUser) return done(new HttpException(401,"User not foundaaaaaaaaaa"));

        //return done("upsi");
        return done(null, foundUser);
    }
));



// /**
//  * Login Required middleware.
//  */
// export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
//     if (req.isAuthenticated()) {
//         return next();
//     }
//     res.redirect("/login");
// };
//
// /**
//  * Authorization Required middleware.
//  */
// export const isAuthorized = (req: Request, res: Response, next: NextFunction) => {
//     const provider = req.path.split("/").slice(-1)[0];
//
//     const user = req.user as UserDocument;
//     if (_.find(user.tokens, { kind: provider })) {
//         next();
//     } else {
//         res.redirect(`/auth/${provider}`);
//     }
// };
