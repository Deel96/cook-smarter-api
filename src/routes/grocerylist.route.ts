import {Request, Router} from 'express';
import GrocerylistController from "../controllers/grocerylist.controller";

class GrocerylistRoute {
    public grocerylistController = new GrocerylistController();
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {//TODO
        this.router.get("/me/foodplan/grocerylists", this.grocerylistController.getAllGroceryListsFromFoodplan);
        this.router.put(`/me/foodplan/grocerylists/:id`, this.grocerylistController.updateGrocerylist);
        //this.router.delete(`/me/foodplan/cookdays/:cookdayId/recipes/:recipeId`, this.foodplanController.deleteRecipeFromCookday);
    }
}

export default GrocerylistRoute;
