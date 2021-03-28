import { NextFunction, Request, Response } from 'express';
import {User} from "../models/entities/user";
import GrocerylistService from "../services/grocerylist.service";

import {Grocerylist} from "../models/entities/grocerylist";

class GrocerylistController {
    //Return the current foodplan
    public getAllGroceryListsFromFoodplan = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            console.log(req.user);
            const user : User = req.user as User;
            const userId = Number(user.id);
            const foundGroceryLists: Grocerylist[] = await this.grocerylistService.getAllGrocerylistsFromFoodplan(userId);

            res.status(200).json({ data: foundGroceryLists, message: 'getAllGroceryListsFromFoodplan' });
        } catch (error) {
            next(error);
        }
    };

    public grocerylistService = new GrocerylistService();
}

export default GrocerylistController;
