import {Recipe} from "../models/recipe";
import HttpException from "../ExceptionTypes/HTTPException";
import {Comment} from "../models/comment";
import {Rating} from "../models/rating";
import {User} from "../models/user";

class RecipeService {

    //Return all recipes of the database
    public async getAllRecipes(): Promise<Recipe[]> {

        const result = await Recipe.find();
        return result;
    }

    //Gets a recipe by Id
    public async getRecipeById(recipeId: number): Promise<Recipe> {
        const foundrecipe: Recipe = await Recipe.findOne({where: {id: recipeId}});
        if (!foundrecipe) throw new HttpException(404, `Recipe with Id: ${recipeId} not found`);

        return foundrecipe;
    }

    //Gets all recipes from the user that he owns
    public async getAllRecipesFromLoggedInUser(userId: number): Promise<Recipe[]> {
        const foundrecipes: Recipe[] = await Recipe.find({where: {author: userId}});

        return foundrecipes;
    }

    //Returns the favorites of the logged in User
    public async getFavorites(userId:number): Promise<Recipe[]> {
        const foundUser: User = await User.findOne({where: {id: userId}})
        if (!foundUser) throw new HttpException(404, `User with Id: ${userId} not found`);
        const favorites = foundUser.likedRecipes;
        return favorites;
    }

    //Adds an recipe to the database
    public async addRecipe(recipe: Recipe): Promise<Recipe> {
        recipe.id= undefined;
        Recipe.save(recipe);
        return recipe;
    }

    //Updates a recipe with a new recipe
    public async updateRecipe(userId:number, recipeId:number, recipe: Recipe): Promise<Recipe> {
        const foundUser: User = await User.findOne({where: {id: userId}})
        if (!foundUser) throw new HttpException(404, `User with Id: ${userId} not found`);

        const foundRecipe: Recipe = await Recipe.findOne({where: {id: recipeId}});
        if (!foundRecipe) throw new HttpException(404, `Recipe with Id: ${recipeId} not found under User with Id: ${userId}`);

        await Recipe.update(recipeId,foundRecipe);
        return foundRecipe;
    }

    //deletes a recipe by Id
    public async deleteRecipeById(userId:number, recipeId:number):Promise<string> {
        const foundUser: User = await User.findOne({where: {id: userId}})
        if (!foundUser) throw new HttpException(404, `User with Id: ${userId} not found`);

        const foundRecipe = await Recipe.findOne({where: {id: recipeId, author:foundUser}});
        if (!foundRecipe) throw new HttpException(404, `Recipe with Id: ${recipeId} not found under User with Id: ${userId}`);
        await Recipe.remove(foundRecipe);
        return "Deletion sucessfull";
    }

    //Adds an favorite to the favoritelsit of the user
    public async addFavorite(userId: number,recipeId:number):Promise<void> {
        const foundUser: User = await User.findOne({where: {id: userId}})
        if (!foundUser) throw new HttpException(404, `User with Id: ${userId} not found`);

        const foundRecipe: Recipe = await Recipe.findOne({where: {id: recipeId}})
        if (!foundRecipe) throw new HttpException(404, `Recipe with Id: ${recipeId} not found`);

        foundUser.likedRecipes.push(foundRecipe);
        await foundUser.save();
    }

    //deletes a favorite from a user
    public async deleteFavorite(userId:number, recipeId:number):Promise<string> {
        const foundUser: User = await User.findOne({where: {id: userId}})
        if (!foundUser) throw new HttpException(404, `User with Id: ${userId} not found`);

        const foundRecipe = await Recipe.findOne({where: {id: recipeId, author:foundUser}});
        if (!foundRecipe) throw new HttpException(404, `Recipe with Id: ${recipeId} not found under User with Id: ${userId}`);

        foundUser.likedRecipes = foundUser.likedRecipes.filter(function( likedRecipe:Recipe ) {
            return likedRecipe.id !==recipeId ;
        });

        await foundUser.save();
        return "Deleted favorite sucessfull";
    }

    //returns all Comments from a given recipe
    public async getAllCommentsFromRecipe(recipeId: number): Promise<Comment[]> {
        const foundRecipe = await Recipe.findOne({where: {id: recipeId}});
        if (!foundRecipe) throw new HttpException(404, `Recipe with Id: ${recipeId} not found`);
        const foundComments = foundRecipe.comments;

        return foundComments;
    }

    //Adds an Comment to a given recipe
    public async addComment(recipeId: number, comment:Comment): Promise<string> {
        const foundRecipe = await Recipe.findOne({where: {id: recipeId}});
        if (!foundRecipe) throw new HttpException(404, `Recipe with Id: ${recipeId} not found`);
        foundRecipe.comments.push(comment);
        foundRecipe.save();

        return "Adding Comment sucessfull";
    }

    //Rerurns all ratings from a given Recipe
    public async getAllRatingsFromRecipe(recipeId: number): Promise<Rating[]> {
        const foundRecipe = await Recipe.findOne({where: {id: recipeId}});
        if (!foundRecipe) throw new HttpException(404, `Recipe with Id: ${recipeId} not found`);
        const foundRatings = foundRecipe.ratings;

        return foundRatings;
    }

    //Adds an rating to a given recipe
    public async addRating(recipeId:number,rating: Rating): Promise<string> {
        const foundRecipe = await Recipe.findOne({where: {id: recipeId}});
        if (!foundRecipe) throw new HttpException(404, `Recipe with Id: ${recipeId} not found`);
        foundRecipe.ratings.push(rating);
        foundRecipe.save();

        return "Adding Comment sucessfull";
    }

}
export default RecipeService;
