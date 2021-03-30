import {User} from "../models/entities/user";
import FoodplanService from "./foodplan.service";

class AuthService {
    //Return all recipes of the database
    public async register(userData:User): Promise<User> {
        const newUser = User.create(userData);
        const foodplanService = new FoodplanService();
        const foodplan = await foodplanService.initFoodplan();
        foodplan.user = newUser;
        await newUser.save();
        await foodplan.save();
        
        return newUser;
    }
}
export default AuthService;
