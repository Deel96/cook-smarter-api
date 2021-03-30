import {Router} from 'express';
import GrocerylistController from "../controllers/grocerylist.controller";

class GrocerylistRoute {
    public grocerylistController = new GrocerylistController();
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get("/me/foodplan/grocerylists", this.grocerylistController.getAllGroceryListsFromFoodplan);
        this.router.put(`/me/foodplan/grocerylists/:id`, this.grocerylistController.updateGrocerylist);
    }
}

export default GrocerylistRoute;
