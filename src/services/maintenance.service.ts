import { ConnectionOptions, createConnection} from "typeorm";
import { DatabaseInitiator } from "../databaseInitiator";

class MaintenanceService {
    private db = new DatabaseInitiator();
    
    //Return all recipes of the database
    public async dbInit(): Promise<void> {
        await this.db.createNew();
    }

    public async dbReset(): Promise<void> {

    }
}
export default MaintenanceService;
