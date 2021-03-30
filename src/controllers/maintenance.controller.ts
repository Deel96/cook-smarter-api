import { NextFunction, Request, Response } from 'express';
import "../config/passport.config";
import MaintenanceService from '../services/maintenance.service';

class MaintenanceController {
    private maintenanceService = new MaintenanceService();
    constructor() {


    }

    public dbInit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try{           
            this.maintenanceService.dbInit();
            res.status(200).json({ data: null, message: `Database initialized`})
        }
        catch(e)
        {
            next(e);
        }            
    }

    public dbReset = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try{           
            this.maintenanceService.dbReset();
            res.status(200).json({ data: null, message: `Database reseted`})
        }
        catch(e)
        {
            next(e);
        } 
    }
}

export default MaintenanceController;