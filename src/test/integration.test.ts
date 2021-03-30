import RecipeRoute from "../routes/recipe.route"
import {App}from "../app"
import request from "supertest"
import { DatabaseInitiator } from "../databaseInitiator";

const testApp = new App([new RecipeRoute()]);




describe("Test API",()=>{


    describe("GET /movies",()=>{

    it("should return all movies on GET /movies",async ()=>{  


        const dataBaseInitiator = new DatabaseInitiator();

        const drop = false;
        await dataBaseInitiator.initDataBase(drop,drop)

        const { body,res } = await request(testApp.express).get("/recipes");

        expect(res.statusCode).toEqual(200);
        })


    })      


})

