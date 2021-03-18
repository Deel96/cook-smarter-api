import {Request, Router} from 'express';
import RecipeController from '../controllers/recipe.controller';
import {User} from "../models/user";
import * as passport from "passport";
import {Recipe} from "../models/recipe";

class RecipeRoute {
    public path = '/recipes';
    public router = Router();
    public recipeController = new RecipeController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.recipeController.getAllRecipes);
      //  this.router.get(`${this.path}/:id(\\d+)`, this.recipeController.getUserById);
      //  this.router.post(`${this.path}`, validationMiddleware(CreateUserDto, 'body'), this.usersController.createUser);
       // this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(CreateUserDto, 'body', true), this.usersController.updateUser);
       // this.router.delete(`${this.path}/:id(\\d+)`, this.usersController.deleteUser);
        this.router.get('/', async (req, res) => {
            res.json({ message: await User.findOne(1)});

        });


        this.router.get('/users/:id', async (req:Request, res) => {
            req.user
            res.json({message: await User.findOne(req.params.id)});
        })

        this.router.post('/login',
            passport.authenticate('local'), function(req,res){
                res.send('Hello login!')
            }
        );


        this.router.get('/foodplan', async (req:Request, res) => {
            res.json( await User.findOne(req.params.id));
        })

        this.router.get('/recipes', async (req:Request, res) => {
            res.json(await Recipe.find());
        })

        this.router.get('/recipes/:id', async (req:Request, res) => {
            res.json(await Recipe.findOne(req.params.id));
        })

        this.router.get('/me/recipes', async (req:Request, res) => {
            const user:any = req.user;
            try {
                res.json(await Recipe.find({author: user.username}));
            }
            catch(err){
                res.statusCode = 500;
                res.send("Server error")
            }

        })

    }
}

export default RecipeRoute;


