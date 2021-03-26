import {Request, Router} from 'express';
import GrocerylistController from "../controllers/grocerylist.controller";

class GrocerylistRoute {
    public router = Router();
    public grocerylistController = new GrocerylistController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get("/me/foodplan/grocerylists", this.grocerylistController.getAllGroceryListsFromFoodplan);
       // this.router.post(`/me/foodplan/cookdays/:cookdayId/recipes`, this.foodplanController.addRecipeToCookday);
        //this.router.delete(`/me/foodplan/cookdays/:cookdayId/recipes/:recipeId`, this.foodplanController.deleteRecipeFromCookday);

    }
}

export default GrocerylistRoute;


