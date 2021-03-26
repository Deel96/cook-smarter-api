import {Request, Router} from 'express';
import RecipeController from '../controllers/recipe.controller';


class RecipeRoute {
    //public path = '/recipes';
    public router = Router();
    public recipeController = new RecipeController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get("/recipes", this.recipeController.getAllRecipes);
        this.router.get(`/recipes/:id`, this.recipeController.getRecipeById);

        this.router.get("/me/recipes", this.recipeController.getAllRecipesFromLoggedInUser);
        this.router.post("/me/recipes", this.recipeController.addRecipe);
        this.router.get("/me/favorites", this.recipeController.getFavorites);
        this.router.put("/me/recipes/:id", this.recipeController.updateRecipe);
        this.router.delete("/me/recipes/:id", this.recipeController.deleteRecipeById);

        this.router.post("/me/favorites", this.recipeController.addFavorite);
        this.router.delete("/me/favorites/:id", this.recipeController.deleteFavorite);

        this.router.get("/recipes/:id/comments", this.recipeController.getAllCommentsFromRecipe);
        this.router.post("/recipes/:id/comments", this.recipeController.addComment);

        this.router.post("/recipes/:id/ratings", this.recipeController.addRating);


       // // this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(CreateUserDto, 'body', true), this.usersController.updateUser);
       // // this.router.delete(`${this.path}/:id(\\d+)`, this.usersController.deleteUser);
       //  this.router.get('/', async (req, res) => {
       //      res.json({ message: await User.findOne(1)});
       //
       //  });
       //
       //
       //  this.router.get('/users/:id', async (req:Request, res) => {
       //      req.user
       //      res.json({message: await User.findOne(req.params.id)});
       //  })
       //
       //  // this.router.post('/login',
       //  //     passport.authenticate('local'), function(req,res){
       //  //         res.send('Hello login!')
       //  //     }
       //  // );
       //
       //
       //  this.router.get('/foodplan', async (req:Request, res) => {
       //      res.json( await User.findOne(req.params.id));
       //  })
       //
       //  this.router.get('/recipes', async (req:Request, res) => {
       //      res.json(await Recipe.find());
       //  })
       //
       //  this.router.get('/recipes/:id', async (req:Request, res) => {
       //      res.json(await Recipe.findOne(req.params.id));
       //  })
       //
       //  this.router.get('/me/recipes', async (req:Request, res) => {
       //      const user:any = req.user;
       //      try {
       //          res.json(await Recipe.find({author: user.username}));
       //      }
       //      catch(err){
       //          res.statusCode = 500;
       //          res.send("Server error")
       //      }
       //
       //  })

    }
}

export default RecipeRoute;


