import { NextFunction, Request, Response } from 'express';

import RecipeService from '../services/recipe.service';
import {Recipe} from "../models/recipe";

class RecipeController {
    public recipeService = new RecipeService();

    public getAllRecipes = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const findAllRecipeDate: Recipe[] = await this.recipeService.getAllRecipes();

            res.status(200).json({ data: findAllRecipeDate, message: 'findAll' });
        } catch (error) {
            next(error);
        }
    };

    public addRecipe = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const recipeData: Recipe = req.body;
            const createdRecipeData : Recipe= await this.recipeService.addRecipe(recipeData);

            res.status(200).json({ data: createdRecipeData, message: 'Recipe created' });
        } catch (error) {
            next(error);
        }
    };

}

export default RecipeController;
