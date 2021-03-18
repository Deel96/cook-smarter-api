import { NextFunction, Request, Response } from 'express';

import RecipeService from '../services/recipe.service';
import {Recipe} from "../models/recipe";

class RecipeController {
    public recipeService = new RecipeService();

    public getAllRecipes = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const findAllRecipeDate: Recipe[] = await this.recipeService.findAllRecipes();

            res.status(200).json({ data: findAllRecipeDate, message: 'findAll' });
        } catch (error) {
            next(error);
        }
    };

}

export default RecipeController;
