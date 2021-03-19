import {Recipe} from "../models/recipe";
import HttpException from "../ExceptionTypes/HTTPException";
import {Comment} from "../models/comment";
import {Rating} from "../models/rating";

class RecipeService {
    public async getAllRecipes(): Promise<Recipe[]> {

        const result = await Recipe.find();
        return result;
    }

    public async getRecipeById(recipeId: number): Promise<Recipe> {
        const foundrecipe: Recipe = await Recipe.findOne({where: {id: recipeId}});
        if (!foundrecipe) throw new HttpException(404, `Recipe with Id: ${recipeId} not found`);

        return foundrecipe;
    }

    public async addRecipe(recipe: Recipe): Promise<Recipe> {
        Recipe.save(recipe);
        return recipe;
    }

    public async getAllCommentsFromRecipe(recipeId: number): Promise<Comment[]> {
        const foundRecipe = await Recipe.findOne({where: {id: recipeId}});
        if (!foundRecipe) throw new HttpException(404, `Recipe with Id: ${recipeId} not found`);
        const foundComments = foundRecipe.comments;

        return foundComments;
    }

    public async getAllRatingsFromRecipe(recipeId: number): Promise<Rating[]> {
        const foundRecipe = await Recipe.findOne({where: {id: recipeId}});
        if (!foundRecipe) throw new HttpException(404, `Recipe with Id: ${recipeId} not found`);
        const foundRatings = foundRecipe.ratings;

        return foundRatings;
    }

}
export default RecipeService;
