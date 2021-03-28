import {User} from "../models/entities/user";
import {HttpException} from "../exceptionTypes/httpException";
import {Recipe} from "../models/entities/recipe";
import {Grocerylist} from "../models/entities/grocerylist";
import { Foodplan } from "../models/entities/foodplan";

class GrocerylistService {
    //Return all grocerylists of a given foodplan
    public async getAllGrocerylistsFromFoodplan(userId:number): Promise<Grocerylist[]> {
        console.log("ser")
        console.log(userId);

        const foundUser: User = await User.findOne({where: {id: userId},relations:["foodplan","foodplan.grocerylists"]})

        const foundFoodplanId = foundUser.foodplan.id;

        const foundFoodplan = await Foodplan.findOne({where: {id: foundFoodplanId},relations:["grocerylists","grocerylists.entries"]})

        //const foundGrocerylists = Grocerylist.find()
        const result =foundFoodplan.grocerylists;
        return result;
    }

    //Returns one grocerylists of a given foodplan
    public async getGrocerylistFromFoodplan(foodplanId:number, grocerylistId:number): Promise<Grocerylist> {
        const result = await Grocerylist.findOne({where:{foodplanId : foodplanId,id:grocerylistId},relations:["supermarket"]});
        return result;
    }

    //Updates the Grocerylist of the foodplan
    public async updateGrocerylist(userId:number,grocerylistId:number, recipe: Recipe): Promise<Grocerylist> {
        const foundUser: User = await User.findOne({where: {id: userId}})
        if (!foundUser) throw new HttpException(404, `User with Id: ${userId} not found`);

        const foundGrocerylist: Grocerylist = await Grocerylist.findOne({where: {id: grocerylistId}});
        if (!foundGrocerylist) throw new HttpException(404, `Grocerylist with Id: ${grocerylistId} not found under User with Id: ${userId}`);

        await Recipe.update(grocerylistId,recipe);

        return foundGrocerylist;
    }
}
export default GrocerylistService;