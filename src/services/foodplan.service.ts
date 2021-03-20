import {Foodplan} from "../models/foodplan";
import {User} from "../models/user";
import {HttpException} from "../exceptionTypes/httpException";
import {Recipe} from "../models/recipe";
import {Cookday} from "../models/cookday";


class FoodplanService {

    //Return all recipes of the database
    public async getCurrentFoodplan(userId:number): Promise<Foodplan> {
        const foundUser: User = await User.findOne({where: {id: userId}})
        const result = await Foodplan.findOne({where:{user:foundUser},relations:["cookdays","cookdays.recipes"]});
        return result;
    }

    public async addRecipeToCookday(userId:number,cookdayId:number, recipeId:number,cookdayData:Cookday): Promise<string> {
        const foundUser: User = await User.findOne({
            where: {id: userId},
            relations:["foodplan","foodplan.cookdays"]
        })
        if (!foundUser) throw new HttpException(404, `User with Id: ${userId} not found`);

        const foundRecipe: Recipe = await Recipe.findOne({where: {id: recipeId}});
        if (!foundRecipe) throw new HttpException(404, `Recipe with Id: ${recipeId} not found 
                                                                            under User with Id: ${userId}`);

        const foundCookday: Cookday = await Cookday.findOne({where: {id: cookdayId},relations:["recipes"]});
        if (!foundRecipe) throw new HttpException(404, `Recipe with Id: ${recipeId} not found 
                                                                        under Cookday Id ${cookdayId}  
                                                                            under User with Id: ${userId}`);

        foundCookday.recipes.push(foundRecipe);
        await foundCookday.save();
        return "Added Recipe to Cookday";

    }

    public async deleteRecipeFromCookday(userId:number,cookdayId:number, recipeId:number): Promise<string> {
        const foundUser: User = await User.findOne({where: {id: userId}})
        if (!foundUser) throw new HttpException(404, `User with Id: ${userId} not found`);

        const foundRecipe = await Recipe.findOne({where: {id: recipeId, author:foundUser}});
        if (!foundRecipe) throw new HttpException(404, `Recipe with Id: ${recipeId} not found under User with Id: ${userId}`);

        const foundCookday: Cookday = await Cookday.findOne({where: {id: cookdayId},relations:["recipes"]});
        if (!foundCookday) throw new HttpException(404, `Recipe with Id: ${recipeId} not found 
                                                                        under Cookday Id ${cookdayId}  
                                                                            under User with Id: ${userId}`);


        foundCookday.recipes = foundCookday.recipes.filter(function( recipe:Recipe ) {
            return recipe.id !==recipeId ;
        });

        await foundCookday.save();


        return "Recipe deleted from cookday sucessfull";
    }



}
export default FoodplanService;
