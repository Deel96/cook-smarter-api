
import 'reflect-metadata';
import {App}from './app'
import RecipeRoute from "./routes/recipe.route";
import {DatabaseInitiator} from "./databaseInitiator";
import AuthRoute from "./routes/auth.route";
import FoodplanRoute from "./routes/foodplan.route";
import GrocerylistRoute from "./routes/grocerylist.route";
import MaintenanceRoute from './routes/maintenance.route';
const port = process.env.PORT || 3000;
const app = new App([new RecipeRoute(), new AuthRoute(), new FoodplanRoute(), new GrocerylistRoute, new MaintenanceRoute]);

const dataBaseInitiator = new DatabaseInitiator();

const drop = false;
dataBaseInitiator.initDataBase(drop,drop).then(

app.express.listen(port, (err) => {
    if (err) {
        console.error(`Error starting server: ${err}`);
        process.abort();
    }
    console.log(`Server is listening on port ${port}.`);


    return;
})

)
