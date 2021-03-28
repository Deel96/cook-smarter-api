import { Router} from 'express';
import RecipeController from '../controllers/recipe.controller';

class RecipeRoute {
    public recipeController = new RecipeController();
    public router = Router();

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
    }
}

export default RecipeRoute;
