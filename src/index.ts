

import {App}from './app'
import RecipeRoute from "./routes/recipe.route";
import {DatabaseInitiator} from "./databaseInitiator";
import AuthRoute from "./routes/auth.route";
import FoodplanRoute from "./routes/foodplan.route";
import GrocerylistController from "./controllers/grocerylist.controller";
import GrocerylistRoute from "./routes/grocerylist.route";
const port = process.env.PORT || 3000;
const recipeRoute = new RecipeRoute();
const app = new App([new RecipeRoute(), new AuthRoute(), new FoodplanRoute(), new GrocerylistRoute]);




const dataBaseInitiator = new DatabaseInitiator();

dataBaseInitiator.initDataBase(false,false).then(

app.express.listen(port, (err) => {
    if (err) {
        console.error(`Error starting server: ${err}`);
        process.abort();
    }
    console.log(`Server is listening on port ${port}.`);
    return;
})

)

//test