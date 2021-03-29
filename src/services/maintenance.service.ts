import { ConnectionOptions, createConnection} from "typeorm";
import {User} from "../models/entities/user";


class MaintenanceService {
    //Return all recipes of the database
    public async dbInit(): Promise<void> {
    }

    public async dbReset(): Promise<void> {

    }
}
export default MaintenanceService;
