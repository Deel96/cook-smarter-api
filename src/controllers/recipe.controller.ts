import { NextFunction, Request, Response } from 'express';

import RecipeService from '../services/recipe.service';
import {Recipe} from "../models/recipe";
import {User} from "../models/user";
import {Comment} from "../models/comment"
import common from "mocha/lib/interfaces/common";
import {Rating} from "../models/rating";
import { HttpException } from '../exceptionTypes/httpException';

class RecipeController {
    public recipeService = new RecipeService();
    //Return all recipes of the database
    public getAllRecipes = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {



            const findAllRecipeDate: Recipe[] = await this.recipeService.getAllRecipes();



            res.status(200).json({ data: findAllRecipeDate, message: 'findAll' });



        } catch (error) {
            next(error);
        }
    };

    //Gets a recipe by Id
    public getRecipeById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const recipeId = Number(req.params.id);
            const recipeData: Recipe = await this.recipeService.getRecipeById(recipeId);

            res.status(200).json({ data: recipeData, message: 'findRecipeById' });
        } catch (error) {
            next(error);
        }
    };

    //Gets all recipes from the user that he owns
    public getAllRecipesFromLoggedInUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            
            const user : User = req.user as User;
            if(!user) throw new HttpException(404,"User not found");
            const userId = Number(user.id);

            const foundRecipes: Recipe[] = await this.recipeService.getAllRecipesFromLoggedInUser(userId);

            res.status(200).json({ data: foundRecipes, message: 'getAllRecipesFromLoggedInUser' });
        } catch (error) {
            next(error);
        }
    };

    //Adds a recipe to the database
    public addRecipe = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const user : User = req.user as User;
            const userId = Number(user.id);
            const recipeData: Recipe = req.body;
            const createdRecipeData: Recipe = await this.recipeService.addRecipe(userId,recipeData);

            res.status(200).json({ data: createdRecipeData, message: 'addRecipe' });
        } catch (error) {
            next(error);
        }
    };

    //Returns the favorites of the logged in User
    public getFavorites = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const user : User = req.user as User;
            const userId = Number(user.id);

            const recipeData: Recipe[] = await this.recipeService.getFavorites(userId);

            res.status(200).json({ data: recipeData, message: 'getFavorites' });
        } catch (error) {
            next(error);
        }
    };

    //Updates a recipe with given attributes
    public updateRecipe = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const user : User = req.user as User;
            const userId = Number(user.id);
            const recipeData: Recipe = req.body;
            const recipeId = Number(req.params.id);
            const createdRecipeData: Recipe = await this.recipeService.updateRecipe(userId,recipeId,recipeData);

            res.status(200).json({ data: createdRecipeData, message: 'updateRecipe' });
        } catch (error) {
            next(error);
        }
    };

    //deletes a recipe by Id
    public deleteRecipeById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const user : User = req.user as User;
            const userId = Number(user.id);

            const recipeId = Number(req.params.id);
            const message= await this.recipeService.deleteRecipeById(userId,recipeId);

            res.status(200).json({ data: message, message: 'deleteRecipeById' });
        } catch (error) {
            next(error);
        }
    };

    //Adds a favorite to the favoritelist of the user
    public addFavorite = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const user : User = req.user as User;
            const userId = Number(user.id);
            const recipeId = Number(req.body.recipeId);

            const message = await this.recipeService.addFavorite(userId,recipeId);

            res.status(200).json({ data: message, message: 'addRecipe' });
        } catch (error) {
            next(error);
        }
    };

    //Deletes a favorite from the favoritelist
    public deleteFavorite = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const user : User = req.user as User;
            const userId = Number(user.id);

            const recipeId = Number(req.params.id);
            const message= await this.recipeService.deleteFavorite(userId,recipeId);

            res.status(200).json({ data: message, message: 'deleteFavorite' });
        } catch (error) {
            next(error);
        }
    };

    //Gets all comments from a specific recipe
    public getAllCommentsFromRecipe = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const recipeId = Number(req.params.id);
            const comments: Comment[] = await this.recipeService.getAllCommentsFromRecipe(recipeId);

            res.status(200).json({ data: comments, message: 'getAllCommentsFromRecipe' });
        } catch (error) {
            next(error);
        }
    };

    //Adds a comment to a recipe
    public addComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

        try {
            const user : User = req.user as User;
            const userId = Number(user.id);
            const recipeId = Number(req.params.id);
            const commentData: Comment = req.body;
            const createdcommentData: Comment = await this.recipeService.addComment(userId,recipeId,commentData);

            res.status(200).json({ data: createdcommentData, message: 'addComment' });
        } catch (error) {
            next(error);
        }
    };


    ///
    ///
    ///
    //unnötig?
    public getAllRatingsFromRecipe = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const ratingId = Number(req.params.id);

            const ratingDate: Rating[] = await this.recipeService.getAllRatingsFromRecipe(ratingId);

            res.status(200).json({ data: ratingDate, message: 'getRatings' });
        } catch (error) {
            next(error);
        }
    };

    public addRating = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

        try {
            const user : User = req.user as User;
            const userId = Number(user.id);
            const recipeId = Number(req.params.id);
            const ratingData: Rating = req.body;
            const createdRatingData: Rating = await this.recipeService.addRating(userId,recipeId,ratingData);

            res.status(200).json({ data: createdRatingData, message: 'addRating' });
        } catch (error) {
            next(error);
        }
    };
}

export default RecipeController;
