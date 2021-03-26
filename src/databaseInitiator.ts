import 'reflect-metadata';
import {Comment} from "./models/comment";
import {User} from "./models/user";
import {Recipe} from "./models/recipe";
import {Connection, ConnectionOptions, createConnection} from "typeorm";
import {Tag} from "./models/tag";
import {IngredientEntry} from "./models/ingredientEntry";
import {Ingredient} from "./models/ingredient";
import {Foodplan} from "./models/foodplan";
import {now} from "./util/timeGetter";
import {Cookday} from "./models/cookday";

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

       // this.createEntities();





    }

    async createEntities(){
        const user = new User();
        user.username = "Dennis2";
        user.servingsize = 1;
        user.planday ="Montag";
        user.password="123";
        user.email="dennis@test.de";
        user.likedRecipes=[];
        await user.save();

        const user2 = new User();
        user2.username = "Lukas";
        user2.servingsize = 2;
        user2.planday ="Dienstag";
        user2.password="1234";
        user2.email="lukas@test.de";
        await user2.save();

        const user3 = new User();
        user3.username = "Steffen";
        user3.servingsize = 4;
        user3.planday ="Mittwoch";
        user3.password="12345";
        user3.email="stefen@test.de";
        await user3.save();



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

        const dennisFoodplan = new Foodplan();
        dennisFoodplan.user = user;
        const date_start = new Date();
        const date_end = new Date()
        dennisFoodplan.startDate= date_start;
        dennisFoodplan.endDate= new Date(date_end.setDate(date_end.getDate() + 7));
        await dennisFoodplan.save();


        const addRecipe = async(amount:number)=>{
            for(let i=0;i<amount;i++){
                const recipe = new Recipe();
                recipe.name = "Butterbrot  Liked"+i.toString();
                recipe.directions = "Brot schneiden"+i.toString();
                recipe.preparationtime=0;
                recipe.cookingtime=5;
                recipe.online = true;
                recipe.difficulty= "einfach";
                recipe.datePosted=
                recipe.picture= "data:image/jpeg;base64"
                recipe.author = user;
                recipe.ingredients= [ientry,ientry2];
                recipe.tags = [tag]
                await recipe.save();

                const addCookdays = async (days:number)=>{
                    for(let i=0;i<days;i++){
                        const date = new Date()
                        const cookday = new Cookday();
                        cookday.day = new Date(date.setDate(date.getDate() + i));
                        cookday.foodplan = dennisFoodplan;
                        cookday.recipes =[recipe];
                        await cookday.save();
                    }

                }

                if(i%2 !==0){
                    user.likedRecipes.push(recipe);
                }
                if(i%2 !==0){
                    const commentDennis = new Comment();
                    commentDennis.author=user;
                    commentDennis.recipe = recipe;
                    commentDennis.date="2021.03.20";
                    commentDennis.text="Echt tolles Rezept :)";
                    await commentDennis.save();
                }
                if(i%10 ===9) {
                    await addCookdays(7);
                }
            }
        }
            await user.save();
        await addRecipe(10);












    }
}