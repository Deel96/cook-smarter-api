import {Recipe} from "../models/recipe";
import {HttpException} from "../exceptionTypes/httpException";
import {Comment} from "../models/comment";
import {Rating} from "../models/rating";
import {User} from "../models/user";
import { RatingInfoDTO } from "../models/DTOs/rating";
import { RecipePreviewDTO } from "../models/DTOs/recipe-preview.dto";
import { RecipePreviewMapper } from "../mapper/RecipePreviewMapper";
import { RecipeMapper } from "../mapper/RecipeMapper";
import { RecipeDTO } from "../models/DTOs/recipe.dto";
class RecipeService {

    private recipePreviewMapper = new RecipePreviewMapper();
    private recipeMapper = new RecipeMapper();
    constructor(){

    }

    //Return all recipes of the database-
    public async getAllRecipes(): Promise<RecipePreviewDTO[]> {
        const foundRecipes : Recipe[] = await Recipe.find({relations:["author","tags","ratings"]});
        const allRecipes = [];
        for(const item of foundRecipes){
            const result: RecipePreviewDTO = this.recipePreviewMapper.toDTO(item);
            allRecipes.push(result);
        }
         
        return allRecipes;
    }
  

    //Gets a recipe by Id-
    public async getRecipeById(recipeId: number): Promise<RecipeDTO> {
        const foundrecipe: Recipe = await Recipe.findOneOrFail({where:{id:recipeId},relations:["author","tags","ingredients","ratings"]});
        const result: RecipeDTO = this.recipeMapper.toDTO(foundrecipe);
        return result;

    }

    //Gets all recipes from the user that he owns-
    public async getAllRecipesFromLoggedInUser(userId: number): Promise<RecipePreviewDTO[]> {
        const foundRecipes: Recipe[] = await Recipe.find({where: {author: userId},relations:["author","tags","ratings"]});
        const allRecipes = [];

        for(const item of foundRecipes){
            const result: RecipePreviewDTO = this.recipePreviewMapper.toDTO(item);
            allRecipes.push(result);
        }
        
        return allRecipes;
    }

    //Adds an recipe to the database-
    public async addRecipe(userId: number, recipeData: RecipeDTO): Promise<RecipeDTO> {
        const foundUser: User = await User.findOne({
            where: {id: userId},
            relations:["createdRecipes"]
        })
        if (!foundUser) throw new HttpException(404, `User with Id: ${userId} not found`);

        
        recipeData.datePosted= new Date();
        recipeData.author= foundUser.username;
        recipeData.rating = {rating:0,votes:0}

        const newRecipe = Recipe.create({
            name: recipeData.name,
            picture:recipeData.picture,
            directions:recipeData.directions,
            preparationtime : recipeData.preparationtime,
            cookingtime:recipeData.cookingtime,
            difficulty: recipeData.difficulty,
            datePosted: recipeData.datePosted,
            online: recipeData.online,
            tags:recipeData.tags,
            author: foundUser,
            ingredients:recipeData.ingredients,
            rating: recipeData.rating
        });

        await newRecipe.save();
        recipeData.id= newRecipe.id;
        return recipeData;
    }

    //Returns the favorites of the logged in User-
    public async getFavorites(userId:number): Promise<RecipePreviewDTO[]> {
        const foundUser: User = await User.findOne({
            where: {id: userId},relations:["likedRecipes","likedRecipes.ratings","likedRecipes.author"]
        })
        if (!foundUser) throw new HttpException(404, `User with Id: ${userId} not found`);
        const favorites = foundUser.likedRecipes;

        const allRecipes = [];
        for(const item of favorites){
            const result: RecipePreviewDTO = this.recipePreviewMapper.toDTO(item);
            allRecipes.push(result);
        }
        return allRecipes;
    }

    //Updates a recipe with given attributes
    public async updateRecipe(userId:number,recipeId:number, recipeData: RecipeDTO): Promise<RecipeDTO> {
        const foundUser: User = await User.findOne({where: {id: userId}})
        if (!foundUser) throw new HttpException(404, `User with Id: ${userId} not found`);

        const foundRecipe: Recipe = await Recipe.findOne({where: {id: recipeId}});
        if (!foundRecipe) throw new HttpException(404, `Recipe with Id: ${recipeId} not found under User with Id: ${userId}`);

       //let test =  await Recipe.update(recipeId,recipe);
               //recipe.id = foundRecipe.id;
        //let test =  await Recipe.save(recipe);


        const newRecipe = await Recipe.save({
            id:recipeId,
            name: recipeData.name,
            picture:recipeData.picture,
            directions:recipeData.directions,
            preparationtime : recipeData.preparationtime,
            cookingtime:recipeData.cookingtime,
            difficulty: recipeData.difficulty,
            datePosted: new Date(),
            online: recipeData.online,
            tags:recipeData.tags,
            author: foundUser
        }as Recipe);

        console.log(newRecipe);
        return null;
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

        const foundRecipe = await Recipe.findOne({where: {id: recipeId}});
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
}
export default RecipeService;
