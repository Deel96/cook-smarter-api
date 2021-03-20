import { NextFunction, Request, Response } from 'express';
import passport from "passport"
import "../config/passport.config";
import {User} from "../models/user";
import passportLocal, {IVerifyOptions} from "passport-local";

class AuthController {
    private localPassport = passport;
    constructor() {


    }

    public login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const user:User = req.user as User;
        if(user){
            res.status(200).json({ data: {username:user.username}, message: `Hello ${user.username}. Logged in via ${user.email}`})
            }


    }
       
        
}

export default AuthController;
