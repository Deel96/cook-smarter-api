

import {App}from './app'
import RecipeRoute from "./routes/recipe.route";
import {DatabaseInitiator} from "./databaseInitiator";
const port = process.env.PORT || 3000;
const recipeRoute = new RecipeRoute();
const app = new App([new RecipeRoute()]);




const dataBaseInitiator = new DatabaseInitiator();

dataBaseInitiator.initDataBase(true,true).then(

app.express.listen(port, (err) => {
    if (err) {
        console.error(`Error starting server: ${err}`);
        process.abort();
    }
    console.log(`Server is listening on port ${port}.`);
    return;
})

)

