import {Recipe} from "../models/recipe";
import {HttpException} from "../exceptionTypes/httpException";
import {Comment} from "../models/comment";
import {Rating} from "../models/rating";
import {User} from "../models/user";
import {now} from "../util/timeGetter"
import {RatingInfo} from "../models/DTOs/rating";
class RecipeService {

    //Return all recipes of the database
    public async getAllRecipes(): Promise<Recipe[]> {

        let result = await Recipe.find({relations:["tags","ratings"]});

        for(const entry of result){
            const finalRating = this.calcRatingOfRecipe(entry);
            entry.rating= finalRating;
        }
        return result;
    }

    //Gets a recipe by Id
    public async getRecipeById(recipeId: number): Promise<Recipe> {
        const foundrecipe: Recipe = await Recipe.findOneOrFail({relations:["author","tags","ingredients","ingredients.ingredient","ratings"]});

        const finalRating = this.calcRatingOfRecipe(foundrecipe);
        foundrecipe.rating= finalRating;
        return foundrecipe;

    }

    //Gets all recipes from the user that he owns
    public async getAllRecipesFromLoggedInUser(userId: number): Promise<Recipe[]> {
        const foundrecipes: Recipe[] = await Recipe.find({where: {author: userId}});

        return foundrecipes;
    }

    //Adds an recipe to the database
    public async addRecipe(userId: number, recipeData: Recipe): Promise<Recipe> {
        const foundUser: User = await User.findOne({
            where: {id: userId},
            relations:["createdRecipes"]
        })
        if (!foundUser) throw new HttpException(404, `User with Id: ${userId} not found`);

        const newRecipe = Recipe.create(recipeData);
        newRecipe.author = foundUser;
        await newRecipe.save();
        return newRecipe;
    }

    //Returns the favorites of the logged in User
    public async getFavorites(userId:number): Promise<Recipe[]> {
        const foundUser: User = await User.findOne({
            where: {id: userId},relations:["likedRecipes"]
        })
        if (!foundUser) throw new HttpException(404, `User with Id: ${userId} not found`);
        const favorites = foundUser.likedRecipes;
        return favorites;
    }

    //Updates a recipe with given attributes
    public async updateRecipe(userId:number,recipeId:number, recipe: Recipe): Promise<Recipe> {
        const foundUser: User = await User.findOne({where: {id: userId}})
        if (!foundUser) throw new HttpException(404, `User with Id: ${userId} not found`);

        const foundRecipe: Recipe = await Recipe.findOne({where: {id: recipeId}});
        if (!foundRecipe) throw new HttpException(404, `Recipe with Id: ${recipeId} not found under User with Id: ${userId}`);

        await Recipe.update(recipeId,recipe);

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
    public async addFavorite(userId: number,recipeId:number):Promise<string> {
        const foundUser: User = await User.findOne({where: {id: userId},relations:["likedRecipes"]})
        if (!foundUser) throw new HttpException(404, `User with Id: ${userId} not found`);

        const foundRecipe: Recipe = await Recipe.findOne({where: {id: recipeId}})
        if (!foundRecipe) throw new HttpException(404, `Recipe with Id: ${recipeId} not found`);
        if(!foundUser.likedRecipes) foundUser.likedRecipes=[];

        foundUser.likedRecipes.push(foundRecipe);
        await foundUser.save();

        return "Added to Favorite"
    }

    //deletes a favorite from a user
    public async deleteFavorite(userId:number, recipeId:number):Promise<string> {
        const foundUser: User = await User.findOne({where: {id: userId},relations:["likedRecipes"]})
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
        const foundRecipe = await Recipe.findOne({where: {id: recipeId},relations:["comments"]});
        if (!foundRecipe) throw new HttpException(404, `Recipe with Id: ${recipeId} not found`);
        const foundComments = foundRecipe.comments;

        return foundComments;
    }

    //Adds an Comment to a given recipe
    public async addComment(userId:number,recipeId: number, commentData:Comment): Promise<Comment> {
        const foundRecipe = await Recipe.findOne({where: {id: recipeId}});
        if (!foundRecipe) throw new HttpException(404, `Recipe with Id: ${recipeId} not found`);

        const foundUser: User = await User.findOne({where: {id: userId}})
        if (!foundUser) throw new HttpException(404, `User with Id: ${userId} not found`);

        const newComment = Comment.create(commentData);
        newComment.author = foundUser;
        newComment.recipe = foundRecipe;

        await newComment.save();

        return newComment;
    }

    //Rerurns all ratings from a given Recipe
    public async getAllRatingsFromRecipe(recipeId: number): Promise<Rating[]> {
        const foundRecipe = await Recipe.findOne({where: {id: recipeId}});
        if (!foundRecipe) throw new HttpException(404, `Recipe with Id: ${recipeId} not found`);
        const foundRatings = foundRecipe.ratings;

        return foundRatings;
    }

    //Adds an rating to a given recipe
    public async addRating(userId:number, recipeId:number,ratingData: Rating): Promise<Rating> {
        const foundRecipe = await Recipe.findOne({where: {id: recipeId}});
        if (!foundRecipe) throw new HttpException(404, `Recipe with Id: ${recipeId} not found`);

        const foundUser: User = await User.findOne({where: {id: userId}})
        if (!foundUser) throw new HttpException(404, `User with Id: ${userId} not found`);

        const newRating = Rating.create(ratingData);
        newRating.author = foundUser;
        newRating.recipe = foundRecipe;

        await newRating.save();

        return newRating;
    }

    private calcRatingOfRecipe(recipe:Recipe):RatingInfo{
        const length = recipe.ratings.length;
        let sum =0;
        for(const rating of recipe.ratings){
            sum+= rating.stars;
        }
        const finalRating = new RatingInfo();
        if(length>0){
            finalRating.rating= sum/length;
        }else{
            finalRating.rating =0;
        }
        finalRating.votes= length;

        return finalRating;
    }

}
export default RecipeService;
