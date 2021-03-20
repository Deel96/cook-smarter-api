import { NextFunction, Request, Response } from 'express';


import {User} from "../models/user";
import {Foodplan} from "../models/foodplan";
import FoodplanService from "../services/foodplan.service";
import {Cookday} from "../models/cookday";

class FoodplanController {
    public foodplanService = new FoodplanService();

    //Return the current foodplan
    public getCurrentFoodplan = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const user : User = req.user as User;
            const userId = Number(user.id);
            const foundFoodplan: Foodplan = await this.foodplanService.getCurrentFoodplan(userId);

            res.status(200).json({ data: foundFoodplan, message: 'getCurrentFoodplan' });
        } catch (error) {
            next(error);
        }
    };

    public addRecipeToCookday = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const user : User = req.user as User;
            const userId = Number(user.id);
            const recipeId = Number(req.body.recipeId);
            const cookdayId = Number(req.params.cookdayId);
            const cookdayData : Cookday= req.body;

            const updatedRecipe = await this.foodplanService.addRecipeToCookday(userId, cookdayId, recipeId, cookdayData);

            res.status(200).json({ data: updatedRecipe, message: 'updateRecipeInCookDay' });
        } catch (error) {
            next(error);
        }
    };

    public deleteRecipeFromCookday = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const user : User = req.user as User;
            const userId = Number(user.id);
            const recipeId = Number(req.params.recipeId);
            const cookdayId = Number(req.params.cookdayId);

            const updatedRecipe = await this.foodplanService.deleteRecipeFromCookday(userId, cookdayId, recipeId);

            res.status(200).json({ data: updatedRecipe, message: 'updateRecipeInCookDay' });
        } catch (error) {
            next(error);
        }
    };


}

export default FoodplanController;
