import {Request, Router} from 'express';
import FoodplanController from '../controllers/foodplan.controller';

class FoodplanRoute {
    public router = Router();
    public foodplanController = new FoodplanController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get("/me/foodplan", this.foodplanController.getCurrentFoodplan);
        this.router.post(`/me/foodplan/cookdays/:cookdayId/recipes`, this.foodplanController.addRecipeToCookday);
        this.router.delete(`/me/foodplan/cookdays/:cookdayId/recipes/:recipeId`, this.foodplanController.deleteRecipeFromCookday);

    }
}

export default FoodplanRoute;


