import {User} from "./models/user";
import {Recipe} from "./models/recipe";
import {Connection, ConnectionOptions, createConnection} from "typeorm";

export class DatabaseInitiator{
    constructor() {
    }

    async initDataBase(drop:boolean){
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
            synchronize: true,
            logging: true,
            dropSchema:drop
        };


        const connection = await createConnection(options);

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
        recipe.datePosted="2021.03.18"
        recipe.picture="";

        const recipe2 = new Recipe();
        recipe2.name = "Butterbrot";
        recipe2.directions = "Brot schneiden";
        recipe2.preparationtime=0;
        recipe2.cookingtime=5;
        recipe2.online = true;
        recipe2.difficulty= 1;
        recipe2.datePosted="18.03.2021"

        recipe2.author= new User();

        const recipe3 = new Recipe();
        recipe3.name = "Butterbrot";
        recipe3.directions = "Brot schneiden";
        recipe3.preparationtime=0;
        recipe3.cookingtime=5;
        recipe3.online = true;
        recipe3.difficulty= 1;
        recipe3.datePosted="2021.03.18"


        await recipe.save();
        //await recipe2.save();
       // await recipe3.save();
    }
}