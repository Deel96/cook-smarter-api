import {User} from "../models/user";
import {HttpException} from "../exceptionTypes/httpException";
import {Recipe} from "../models/recipe";
import {Grocerylist} from "../models/grocerylist";


class GrocerylistService {

    //Return all grocerylists of a given foodplan
    public async getAllGrocerylistsFromFoodplan(userId:number,foodplanId:number): Promise<Grocerylist[]> {
        const foundUser: User = await User.findOne({where: {id: userId}})
        const result = await Grocerylist.find({where:{id: userId,foodplanId : foodplanId},relations:["supermarket","entries"]});
        return result;
    }

    //Returns one grocerylists of a given foodplan
    public async getGrocerylistFromFoodplan(foodplanId:number, grocerylistId:number): Promise<Grocerylist> {
        const result = await Grocerylist.findOne({where:{foodplanId : foodplanId,id:grocerylistId},relations:["supermarket"]});
        return result;
    }

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


//TODO Controller / Routes
//login kotlin / JS