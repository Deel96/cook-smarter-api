import 'reflect-metadata';
import { createConnection } from 'typeorm';

import {App}from './app'
import {User} from "./models/user";
const port = process.env.PORT || 3000;
const app = new App();

import * as passport from "passport"
import * as passportLocal from "passport-local"
import {Recipe} from "./models/recipe";

const LocalStrategy = passportLocal.Strategy;


const userSession:Record<number,string> = {}

createConnection().then(async connection => {

    const user = new User();

    user.username = "Dennis";
    user.servingsize = 1;
    user.planday ="Montag";
    user.password="1234";
    user.email="test@test.de";
    await user.save();


    const recipe = new Recipe();
    recipe.name = "Butterbrot";
    recipe.directions = "Brot schneiden";
    recipe.preparationtime=0;
    recipe.cookingtime=5;
    recipe.online = true;
    recipe.difficulty= 1;
    recipe.datePosted="";

    const recipe2 = new Recipe();
    recipe2.name = "Butterbrot";
    recipe2.directions = "Brot schneiden";
    recipe2.preparationtime=0;
    recipe2.cookingtime=5;
    recipe2.online = true;
    recipe2.difficulty= 1;
    recipe2.datePosted="";
    recipe2.author="Dennis";

    const recipe3 = new Recipe();
    recipe3.name = "Butterbrot";
    recipe3.directions = "Brot schneiden";
    recipe3.preparationtime=0;
    recipe3.cookingtime=5;
    recipe3.online = true;
    recipe3.difficulty= 1;
    recipe3.datePosted="";


    await recipe.save();
    await recipe2.save();
    await recipe3.save();

});

app.express.listen(port, (err) => {
    if (err) {
        console.error(`Error starting server: ${err}`);
        process.abort();
    }
    console.log(`Server is listening on port ${port}.`);
    return;
})



