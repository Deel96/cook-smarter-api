import {Foodplan} from "../models/foodplan";
import {User} from "../models/user";
import {HttpException} from "../exceptionTypes/httpException";
import {Recipe} from "../models/recipe";
import {Cookday} from "../models/cookday";


class AuthService {

    //Return all recipes of the database
    public async register(userData:User): Promise<User> {
        const newUser = User.create(userData);
        await newUser.save();
        return newUser;
    }

    


}
export default AuthService;
