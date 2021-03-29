import {User} from "../models/entities/user";
import {HttpException} from "../exceptionTypes/httpException";
import {Recipe} from "../models/entities/recipe";
import {Grocerylist} from "../models/entities/grocerylist";
import { Foodplan } from "../models/entities/foodplan";
import { GrocerylistUpdateDTO } from "../models/DTOs/grocerylist-update.dto";
import { GroceryEntry } from "../models/entities/groceryEntry";

class GrocerylistService {
    //Return all grocerylists of a given foodplan
    public async getAllGrocerylistsFromFoodplan(userId:number): Promise<Grocerylist[]> {


        const foundUser: User = await User.findOne({where: {id: userId},relations:["foodplan","foodplan.grocerylists"]})

        const foundFoodplanId = foundUser.foodplan.id;

        const foundFoodplan = await Foodplan.findOne({where: {id: foundFoodplanId},relations:["grocerylists","grocerylists.entries"]})

        //const foundGrocerylists = Grocerylist.find()
        const result =foundFoodplan.grocerylists;
        return result;
    }

    //Returns one grocerylists of a given foodplan //TODO unnötig?
    public async getGrocerylistFromFoodplan(foodplanId:number, grocerylistId:number): Promise<Grocerylist> {
        const result = await Grocerylist.findOne({where:{foodplanId : foodplanId,id:grocerylistId},relations:["supermarket"]});
        return result;
    }

    //Updates the Grocerylist of the foodplan
    public async updateGrocerylist(userId, grocerylistId:number, grocerylistData: GrocerylistUpdateDTO):Promise<string>{

        const foundUser: User = await User.findOne({where: {id: userId}})
        if (!foundUser) throw new HttpException(404, `User with Id: ${userId} not found`);
        
        const foundGroceryList: Grocerylist = await Grocerylist.findOne({
            where: {id: grocerylistId},
            relations:["entries"]
        });
        if (!foundGroceryList) throw new HttpException(404, `Grocerylist with Id: ${grocerylistId} not found`);


        const entryToUpdate =  await GroceryEntry.findOne({where:{id:grocerylistData.id,grocerylist:foundGroceryList}});

        entryToUpdate.checked=grocerylistData.checked;
        await entryToUpdate.save();


        return "Update of grocerylist sucessfull";
    }
}
export default GrocerylistService;