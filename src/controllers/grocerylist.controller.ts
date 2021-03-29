import { NextFunction, Request, Response } from 'express';
import {User} from "../models/entities/user";
import GrocerylistService from "../services/grocerylist.service";

import {Grocerylist} from "../models/entities/grocerylist";
import { GrocerylistUpdateDTO } from '../models/DTOs/grocerylist-update.dto';

class GrocerylistController {
    private grocerylistService = new GrocerylistService();
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


    public updateGrocerylist = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const grocerylistData = req.body as GrocerylistUpdateDTO
            const grocerylistId = Number(req.params.id);
            const user : User = req.user as User;
            const userId = Number(user.id);
            const result = await this.grocerylistService.updateGrocerylist(userId,grocerylistId,grocerylistData);

            res.status(200).json({ data: result, message: 'updateGrocerylist' });
        } catch (error) {
            next(error);
        }
    };

    
}

export default GrocerylistController;
