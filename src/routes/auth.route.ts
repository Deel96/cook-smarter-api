import {Request, Router} from 'express';
import RecipeController from '../controllers/recipe.controller';
import {User} from "../models/user";
import passport from "passport";
import {Recipe} from "../models/recipe";
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
        //this.router.post("/logout", this.recipeController.addRecipe);
        //this.router.post(`/register`, this.recipeController.get);


        };

}

export default AuthRoute;


