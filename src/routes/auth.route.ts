import {Request, Router} from 'express';
import passport from "passport";
import AuthController from "../controllers/auth.controller";

class AuthRoute {
    //public path = '/recipes';
    public router = Router();
    public authController = new AuthController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post("/login2", passport.authenticate('local'),this.authController.login);
        this.router.post("/logout", this.authController.logout);
        this.router.post(`/register`, this.authController.register);


        };

}

export default AuthRoute;


