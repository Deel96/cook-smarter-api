import { NextFunction, Request, Response } from 'express';


import {User} from "../models/user";
import GrocerylistService from "../services/grocerylists.service";

import {Grocerylist} from "../models/grocerylist";

class GrocerylistController {
    public grocerylistService = new GrocerylistService();

    //Return the current foodplan
    public getAllGroceryListsFromFoodplan = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            console.log(req.user);
            console.log("ich werde übersprungen")
            const user : User = req.user as User;
            const userId = Number(user.id);
            const foodplanId = user.foodplan.id;
            const foundFoodplan: Grocerylist[] = await this.grocerylistService.getAllGrocerylistsFromFoodplan(userId, foodplanId);

            res.status(200).json({ data: foundFoodplan, message: 'getAllGroceryListsFromFoodplan' });
        } catch (error) {
            next(error);
        }
    };



    // public updateGrocerylist = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    //     try {
    //         const user : User = req.user as User;
    //         const userId = Number(user.id);
    //         const recipeData: Recipe = req.body;
    //         const recipeId = Number(req.params.recipeId);
    //         const createdRecipeData: Recipe = await this.recipeService.updateRecipe(userId,recipeId,recipeData);
    //
    //         res.status(200).json({ data: createdRecipeData, message: 'updateRecipe' });
    //     } catch (error) {
    //         next(error);
    //     }
    // };


}

export default GrocerylistController;
