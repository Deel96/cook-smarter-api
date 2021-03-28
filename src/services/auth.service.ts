import {Foodplan} from "../models/entities/foodplan";
import {User} from "../models/entities/user";
import {HttpException} from "../exceptionTypes/httpException";
import {Cookday} from "../models/entities/cookday";
import FoodplanService from "./foodplan.service";

class AuthService {
    //Return all recipes of the database
    public async register(userData:User): Promise<User> {
        const newUser = User.create(userData);
        const foodplan = await this.initFoodplan();
        foodplan.user = newUser;
        await newUser.save();
        await foodplan.save();
        
        return newUser;
    }

    //TODO über foodplanservice aufrufen
    private async initFoodplan(){
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
                const cookday = new Cookday();
                cookday.day = new Date(date.setDate(date.getDate() + 7));
                
                //cookday.foodplan = result;
                cookday.recipes =[];
                result.cookdays.push(cookday);
                await cookday.save();
            }
        }
        await addCookdays(7);
        return result;
    }
}
export default AuthService;
