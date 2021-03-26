import {Foodplan} from "../models/foodplan";
import {User} from "../models/user";
import {HttpException} from "../exceptionTypes/httpException";
import {Recipe} from "../models/recipe";
import {Cookday} from "../models/cookday";
import { Ingredient } from "../models/ingredient";
import { Any } from "typeorm";
import { IngredientEntry } from "../models/ingredientEntry";
import { reduceEachLeadingCommentRange } from "typescript";
import { GroceryEntry } from "../models/groceryEntry";


class FoodplanService {

    //Return all recipes of the database
    public async getCurrentFoodplan(userId:number): Promise<Foodplan> {
        const foundUser: User = await User.findOne({where: {id: userId}})
        let result = await Foodplan.findOne({where:{user:foundUser},relations:["cookdays","cookdays.recipes"]});

        if(!result){
            result = await this.initFoodplan();
            foundUser.foodplan = result;
            //result.user= foundUser;
            await foundUser.save();
            await result.save();
        }

        



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
        await this.updateGrocerylist(foundUser.foodplan)
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


    private async initFoodplan(){

        const result = await new Foodplan();
        const date_start = new Date();
        const date_end = new Date()
        result.startDate = date_start
        result.endDate = new Date(date_end.setDate(date_end.getDate() + 7));
        await result.save();
        
        const addCookdays = async (days:number)=>{
            for(let i=0;i<days;i++){
                const date = new Date()
                const cookday = new Cookday();
                cookday.day = new Date(date.setDate(date.getDate() + i));
                cookday.foodplan = result;
                cookday.recipes =[];
                await cookday.save();
            }
        }
        await addCookdays(7);
        return result;
    }


    private async updateGrocerylist(foodplan:Foodplan):Promise<GroceryEntry[]>{

        const res :GroceryEntry[] = [];
        const cookdays = await Cookday.find({where: {foodplan: foodplan},relations:["recipes","recipes.ingredients","recipes.ingredients.ingredient"]});
        for(const cookday of cookdays){
            for(const recipe of cookday.recipes){
                for(const ingredientEntry of recipe.ingredients){
                    const item = GroceryEntry.create(ingredientEntry);
                    item.checked= false;
                    res.push(item);
                }
            }
        }
        console.log(res);
        return res;
    }

    


}
export default FoodplanService;
