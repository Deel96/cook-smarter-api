import {Router} from 'express';
import MaintenanceController from '../controllers/maintenance.controller';


class MaintenanceRoute {
    public maintenanceController = new MaintenanceController();
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post("/initDb",this.maintenanceController.dbInit);
        this.router.post("/dbReset", this.maintenanceController.dbReset);
        }
}

export default MaintenanceRoute;
