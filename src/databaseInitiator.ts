import 'reflect-metadata';
import {User} from "./models/user";
import {Recipe} from "./models/recipe";
import {Connection, ConnectionOptions, createConnection} from "typeorm";
import {Tag} from "./models/tag";
import {IngredientEntry} from "./models/ingredientEntry";
import {Ingredient} from "./models/ingredient";

export class DatabaseInitiator{
    constructor() {
    }

    async initDataBase(drop:boolean,sync:boolean){
        let options:ConnectionOptions= {
            type: "mariadb",
            host: "j5zntocs2dn6c3fj.chr7pe7iynqr.eu-west-1.rds.amazonaws.com",
            port: 3306,
            username: "imo9y7s1o40t52dh",
            password: "a8ho7luvk4li0q6z",
            database: "vniujjdsyxjngjym",
            entities: [
            "src/models/*.ts"
        ],
            synchronize: sync,
            logging: true,
            dropSchema:drop
        };


        const connection = await createConnection(options);

        this.createEntities();





    }

    async createEntities(){
        const user = new User();
        user.username = "Dennis2";
        user.servingsize = 1;
        user.planday ="Montag";
        user.password="1234";
        user.email="test@test.de";
        user.likedRecipes=[];
        await user.save();

        // const user2 = new User();
        // user.username2 = "Lukas";
        // user.servingsize = 2;
        // user.planday ="Dienstag";
        // user.password="sicher";
        // user.email="ele@fant.de";
        // await user2.save();



        const tag = new Tag();
        tag.name="kalt";
        tag.description ="Speisen, die kalt gegessen werden."
        await tag.save();

        const ingredient = new Ingredient();
        ingredient.name="Brot";
        await ingredient.save();

        const ingredient2 = new Ingredient();
        ingredient2.name="Butter";
        await ingredient2.save();

        //Brot
        const ientry = new IngredientEntry();
        ientry.amount=100;
        ientry.unit="g";
        ientry.freshness="frisch";
        ientry.ingredient = ingredient;
        await ientry.save();

        //Butter
        const ientry2 = new IngredientEntry();
        ientry2.amount=10;
        ientry2.unit="g";
        ientry2.freshness="verpackt";
        ientry2.ingredient = ingredient2;
        await ientry2.save();


        const recipe = new Recipe();
        recipe.name = "Butterbrot  Liked";
        recipe.directions = "Brot schneiden";
        recipe.preparationtime=0;
        recipe.cookingtime=5;
        recipe.online = true;
        recipe.difficulty= "einfach";
        recipe.datePosted="2021.03.18"
        recipe.picture= "data:image/jpeg;base64"
        recipe.author = user;
        recipe.ingredients= [ientry,ientry2];
        recipe.tags = [tag]
        await recipe.save();

        user.likedRecipes.push(recipe);
        await user.save();
    }
}