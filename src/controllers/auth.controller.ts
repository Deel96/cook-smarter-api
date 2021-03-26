import { NextFunction, Request, Response } from 'express';
import passport from "passport"
import "../config/passport.config";
import {User} from "../models/user";
import AuthService from '../services/auth.service';

class AuthController {
    public authService = new AuthService();
    constructor() {


    }

    public login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const user:User = req.user as User;
        if(user){
            res.status(200).json({ data: {username:user.username}, message: `Hello ${user.username}. Logged in via ${user.email}`})
            }
    }

    public register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const newUser:User = req.body as User;
        const createdUser = await this.authService.register(newUser);
        res.status(200).json({ data: {username:createdUser.username}, message: `Hello ${createdUser.username}. registered via ${createdUser.email}`})

    }

    public logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const user:User = req.user as User;
        req.logout();
        res.status(204).json();
    }
       
        
}

export default AuthController;
