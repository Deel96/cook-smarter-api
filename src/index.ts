import 'reflect-metadata';
import { createConnection } from 'typeorm';

import {App}from './app'
import {User} from "./models/user";
const port = process.env.PORT || 3000;
const app = new App();

import * as passport from "passport"
import * as passportLocal from "passport-local"
import {Recipe} from "./models/recipe";
import {DatabaseInitiator} from "./databaseInitiator";

const LocalStrategy = passportLocal.Strategy;


const userSession:Record<number,string> = {}

const dataBaseInitiator = new DatabaseInitiator();

dataBaseInitiator.initDataBase(true).then(

app.express.listen(port, (err) => {
    if (err) {
        console.error(`Error starting server: ${err}`);
        process.abort();
    }
    console.log(`Server is listening on port ${port}.`);
    return;
})

)

