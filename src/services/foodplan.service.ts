import {Foodplan} from "../models/entities/foodplan";
import {User} from "../models/entities/user";
import {HttpException} from "../exceptionTypes/httpException";
import {Recipe} from "../models/entities/recipe";
import {Cookday} from "../models/entities/cookday";
import { GroceryEntry } from "../models/entities/groceryEntry";
import { Grocerylist } from "../models/entities/grocerylist";

class FoodplanService {
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
        const entries = await this.createGrocerylist(foundUser.foodplan)
        
        const gl = new Grocerylist();
        gl.entries =entries;

        foundUser.foodplan.grocerylists = [gl];

        await foundUser.foodplan.save();

        await foundUser.save();
        return "Added Recipe to Cookday";
    }

    public async deleteRecipeFromCookday(userId:number,cookdayId:number, recipeId:number): Promise<string> {
        const foundUser: User = await User.findOne({
            where: {id: userId},
            relations:["foodplan","foodplan.cookdays","foodplan.grocerylists"]
        })
        if (!foundUser) throw new HttpException(404, `User with Id: ${userId} not found`);

        const foundRecipe = await Recipe.findOne({where: {id: recipeId}});
        if (!foundRecipe) throw new HttpException(404, `Recipe with Id: ${recipeId} not found`);

        const foundCookday: Cookday = await Cookday.findOne({where: {id: cookdayId},relations:["recipes"]});
        if (!foundCookday) throw new HttpException(404, `Recipe with Id: ${recipeId} not found 
                                                                        under Cookday Id ${cookdayId}  
                                                                            under User with Id: ${userId}`);

        foundCookday.recipes = foundCookday.recipes.filter(function( recipe:Recipe ) {
            return recipe.id !==recipeId ;
        });

        await foundCookday.save();

        const entries = await this.createGrocerylist(foundUser.foodplan)
        
        const gl = new Grocerylist();
        gl.entries =entries;
         Grocerylist.remove(foundUser.foodplan.grocerylists);
         await foundUser.save();

        foundUser.foodplan.grocerylists = [gl];
        await foundUser.save();



       

        return "Recipe deleted from cookday sucessfull";
    }

    //Return all recipes of the database
    public async getCurrentFoodplan(userId:number): Promise<Foodplan> {
        const foundUser: User = await User.findOne({where: {id: userId}})
        if (!foundUser) throw new HttpException(404, `User with Id: ${userId} not found`);



        let result = await Foodplan.findOne({where:{user:foundUser},relations:["cookdays","cookdays.recipes"]});

        if(!result){
            result = await this.initFoodplan();
            foundUser.foodplan = result;
            await foundUser.save();
            await result.save();
        }

        return result;
    }

    public async initFoodplan(){
        const result = new Foodplan();
        result.cookdays=[];
        const date_start = new Date();
        const date_end = new Date()
        result.startDate = date_start
        result.endDate = new Date(date_end.setDate(date_end.getDate() + 7));
        await result.save();

        const addCookdays = async (days:number)=>{
            for(let i=0;i<days;i++){
                const date = new Date()
                date.setDate(date.getDate() + i);
                const cookday = new Cookday();
                cookday.day = date;            
                cookday.recipes =[];
                result.cookdays.push(cookday);
                await cookday.save();
            }
        }
        await addCookdays(7);
        return result;
    }


    private async createGrocerylist(foodplan:Foodplan):Promise<GroceryEntry[]>{
        const res :GroceryEntry[] = [];
        const cookdays = await Cookday.find({where: {foodplan: foodplan},relations:["recipes","recipes.ingredients"]});
        for(const cookday of cookdays){
            for(const recipe of cookday.recipes){
                for(const ingredientEntry of recipe.ingredients){
                    const item = GroceryEntry.create(ingredientEntry);
                    item.checked = false;
                    let found = false;
                    for(const element of res){
                        if(item.name === element.name && item.unit === element.unit && element.freshness === item.freshness){
                            element.amount+= item.amount
                            found = true;
                                break;
                        }
                    }
                        if(!found){ 
                            res.push(item);
                            //await item.save();
                        }
                }
            }
        }
        console.log(res);
        return res;
    }
}
export default FoodplanService;
