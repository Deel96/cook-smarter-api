import 'reflect-metadata';
import {Comment} from "./models/comment";
import {User} from "./models/user";
import {Recipe} from "./models/recipe";
import {Connection, ConnectionOptions, createConnection} from "typeorm";
import {Tag} from "./models/tag";
import {IngredientEntry} from "./models/ingredientEntry";
//import {Ingredient} from "./models/ingredient";
import {Foodplan} from "./models/foodplan";
import {now} from "./util/timeGetter";
import {Cookday} from "./models/cookday";
import AuthService from './services/auth.service';
import RecipeService from './services/recipe.service';
import { RecipeDTO } from './models/DTOs/recipe.dto';
import { Supermarket } from './models/supermarket';

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

        // const ingredient = new Ingredient();
        // ingredient.name="Brot";
        // await ingredient.save();

        // const ingredient2 = new Ingredient();
        // ingredient2.name="Butter";
        // await ingredient2.save();

        //Brot
        const ientry = new IngredientEntry();
        ientry.amount=100;
        ientry.unit="g";
        ientry.freshness="frisch";
        ientry.name="Brot"
        //ientry.ingredient = ingredient;
        await ientry.save();

        //Butter
        const ientry2 = new IngredientEntry();
        ientry2.amount=10;
        ientry2.unit="g";
        ientry2.freshness="verpackt";
        ientry2.name= "Butter";
        //ientry2.ingredient = ingredient2;
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
                //recipe.datePosted=
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
                    commentDennis.date=new Date();
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


    async createIngredients(){
        const ingredients = 
        [
        await new IngredientEntry("Zwiebel(n)").save(),
        await new IngredientEntry("Hackfleisch").save(),
        await new IngredientEntry("Nudeln").save(),
        await new IngredientEntry("Tomaten").save(),
        await new IngredientEntry("Brot").save(),
        await new IngredientEntry("Brot").save(),
        await new IngredientEntry("Brot").save(),
        await new IngredientEntry("Brot").save(),
        await new IngredientEntry("Brot").save(),
        await new IngredientEntry("Brot").save(),
        await new IngredientEntry("Brot").save(),

        ]



        const ingredient2 = new IngredientEntry();
        ingredient2.name="Butter";
        await ingredient2.save();


        return [
            new IngredientEntry().name="Nudeln"
        ]
    }


    async createSupermarkets(){
        const supermarkets = ["Aldi,Lidl,Netto, Marktkauf, Wochenmarkt, Sonstiges"]

        for(const name of supermarkets){
            const supermarket = new Supermarket();
            supermarket.name=name
            await supermarket.save();
        }
        
    } 

    async createUsers(){
        const service = new AuthService();

        const dennis = new User();
        dennis.password="123";
        dennis.username="Dennis96";
        dennis.email = "dennis@mail.de";
        await dennis.save();
        const addedDennis= await service.register(dennis);


        await this.createRecipes(addedDennis.id);
    }


    async createTags(){
        const tag = new Tag();
        tag.name="vegan";
        tag.description ="Speisen ohne Tierprodukte."
        await tag.save();

        const tag2 = new Tag();
        tag2.name="vegetarisch";
        tag2.description ="Speisen ohne Fleisch."
        await tag2.save();

        const tag3 = new Tag();
        tag3.name="schnell";
        tag3.description ="Speisen unter 20 Minuten."
        await tag3.save();

        const tag4 = new Tag();
        tag4.name="Klassiker";
        tag4.description ="Speisen die jeder kennt."
        await tag4.save();
    }

    async createRecipes(userId:number){
        const service = new RecipeService();

        const spaghettiBolognese : RecipeDTO=
        {
        id: null,
        name: "Spagetthi Bolognese",
        picture: "Bild",
        rating:null,
        directions: 
        `Zwiebeln und Knoblauch sehr fein würfeln (ich mache alles zusammen in der Küchenmaschine).  Das Hackfleisch kurz anbraten lassen. Dosentomaten zufügen und mit Salz, Pfeffer und Paprika würzen. So lange köcheln lassen, bis eine pastenartige Masse entstanden ist. Soll die Soße flüssiger sein, kann man noch etwas Wein oder Brühe zugeben.

        Die Spaghetti in Salzwasser bissfest kochen und zusammen mit der Soße servieren..
        Wer es etwas pikanter mag, kann zu dieser Soße auch Chili-Bandnudeln essen. Wir finden, dass das auch sehr gut zusammenpasst. `,
        preparationtime: 5,
        cookingtime: 25,
        difficulty: "einfach",
        datePosted:null,
        tags: [
        {
            id: 4
        }
        ],
        online: true,
        ingredients: [
            {
            name: "Spagetthi",
            unit: "g",
            amount: 500,
            freshness: "verpackt"
            },
            {
            name: "Hackfleisch",
            unit: "g",
            amount: 500,
            freshness: "verpackt"
            },
            {
            name: "Zwiebel(n)",
            unit: "",
            amount: 2,
            freshness: "frisch"
            },
            {
            name: "Dosentomaten",
            amount: 400,
            unit: "g",   
            freshness: "verpackt"
            },
            {
            name: "Knoblauchzehe(n)",
            amount: 1,
            unit: "1",   
            freshness: "verpackt"
            }              
    ],
        author:null
        }

        const gebratenerReis : RecipeDTO=
        {
        id: null,
        name: "Gebtratener Reis mit Gemüse",
        picture: "Bild",
        rating:null,
        directions: 
        `Zwiebeln und Knoblauch sehr fein würfeln (ich mache alles zusammen in der Küchenmaschine).  Das Hackfleisch kurz anbraten lassen. Dosentomaten zufügen und mit Salz, Pfeffer und Paprika würzen. So lange köcheln lassen, bis eine pastenartige Masse entstanden ist. Soll die Soße flüssiger sein, kann man noch etwas Wein oder Brühe zugeben.

        Die Spaghetti in Salzwasser bissfest kochen und zusammen mit der Soße servieren.
        Wer es etwas pikanter mag, kann zu dieser Soße auch Chili-Bandnudeln essen. Wir finden, dass das auch sehr gut zusammenpasst. `,
        preparationtime: 5,
        cookingtime: 25,
        difficulty: "einfach",
        datePosted:null,
        tags: [
        {
            id: 1
        }
        ],
        online: true,
        ingredients: [
            {
            name: "Reis",
            unit: "g",
            amount: 500,
            freshness: "verpackt"
            },
            {
            name: "Paprika",
            unit: "g",
            amount: 500,
            freshness: "frisch"
            },
            {
            name: "Zucchini",
            unit: "g",
            amount: 500,
            freshness: "frisch"
            },
            {
            name: "Möhre(n)",
            unit: "g",
            amount: 500,
            freshness: "frisch"
            },
            {
            name: "Zwiebel(n)",
            unit: "",
            amount: 2,
            freshness: "frisch"
            },
            {
            name: "Dosentomaten",
            amount: 400,
            unit: "g",   
            freshness: "verpackt"
            },
            {
            name: "Knoblauchzehe(n)",
            amount: 1,
            unit: "1",   
            freshness: "verpackt"
            }              
    ],
        author:null
        }

        const buttterBrot : RecipeDTO=
        {
        id: null,
        name: "Gebtratener Reis mit Gemüse",
        picture: "Bild",
        rating:null,
        directions: 
        `Zwiebeln und Knoblauch sehr fein würfeln (ich mache alles zusammen in der Küchenmaschine).  Das Hackfleisch kurz anbraten lassen. Dosentomaten zufügen und mit Salz, Pfeffer und Paprika würzen. So lange köcheln lassen, bis eine pastenartige Masse entstanden ist. Soll die Soße flüssiger sein, kann man noch etwas Wein oder Brühe zugeben.

        Die Spaghetti in Salzwasser bissfest kochen und zusammen mit der Soße servieren.
        Wer es etwas pikanter mag, kann zu dieser Soße auch Chili-Bandnudeln essen. Wir finden, dass das auch sehr gut zusammenpasst. `,
        preparationtime: 0,
        cookingtime: 2,
        difficulty: "einfach",
        datePosted:null,
        tags: [
        {
            id: 2
        },
        {
            id: 3
        },
        {
            id: 4
        }
        ],
        online: true,
        ingredients: [
            {
            name: "Brot",
            unit: "g",
            amount: 200,
            freshness: "verpackt"
            },
            {
            name: "Butter",
            unit: "g",
            amount: 50,
            freshness: "frisch"    
            }       
        ],
        author:null
        }

        const lasagne : RecipeDTO=
        {
        id: null,
        name: "Lasagne",
        picture: "Bild",
        rating:null,
        directions: 
        `Zwiebeln und Knoblauch sehr fein würfeln (ich mache alles zusammen in der Küchenmaschine).  Das Hackfleisch kurz anbraten lassen. Dosentomaten zufügen und mit Salz, Pfeffer und Paprika würzen. So lange köcheln lassen, bis eine pastenartige Masse entstanden ist. Soll die Soße flüssiger sein, kann man noch etwas Wein oder Brühe zugeben.

        Die Spaghetti in Salzwasser bissfest kochen und zusammen mit der Soße servieren.
        Wer es etwas pikanter mag, kann zu dieser Soße auch Chili-Bandnudeln essen. Wir finden, dass das auch sehr gut zusammenpasst. `,
        preparationtime: 10,
        cookingtime: 30,
        difficulty: "mittel",
        datePosted:null,
        tags: [
        {
            id: 4
        }
        ],
        online: true,
        ingredients: [
            {
            name: "Hackfleisch",
            unit: "g",
            amount: 200,
            freshness: "verpackt"
            },
            {
            name: "Zwiebel(n)",
            unit: "",
            amount: 1,
            freshness: "frisch"    
            },
            {
            name: "Knoblauchzehe(n)",
            unit: "",
            amount: 1,
            freshness: "frisch"    
            },
            {
            name: "Dosentomaten",
            unit: "g",
            amount: 400,
            freshness: "verpackt"    
            },
            {
            name: "Lasagneplatten",
            unit: "g",
            amount: 400,
            freshness: "verpackt"    
            },
            {
            name: "Streukäse",
            unit: "g",
            amount: 200,
            freshness: "verpackt"    
            }
        ],
        author:null
        }

        const kartoffelbrei : RecipeDTO=
        {
        id: null,
        name: "Kartoffelbrei mit Buttergemüse",
        picture: "Bild",
        rating:null,
        directions: 
        `Zwiebeln und Knoblauch sehr fein würfeln (ich mache alles zusammen in der Küchenmaschine).  Das Hackfleisch kurz anbraten lassen. Dosentomaten zufügen und mit Salz, Pfeffer und Paprika würzen. So lange köcheln lassen, bis eine pastenartige Masse entstanden ist. Soll die Soße flüssiger sein, kann man noch etwas Wein oder Brühe zugeben.

        Die Spaghetti in Salzwasser bissfest kochen und zusammen mit der Soße servieren.
        Wer es etwas pikanter mag, kann zu dieser Soße auch Chili-Bandnudeln essen. Wir finden, dass das auch sehr gut zusammenpasst. `,
        preparationtime: 5,
        cookingtime: 15,
        difficulty: "einfach",
        datePosted:null,
        tags: [
        {
            id: 2
        },
        {
            id: 3
        },
        {
            id: 4
        }
        ],
        online: true,
        ingredients: [
            {
            name: "Kartoffeln",
            unit: "g",
            amount: 200,
            freshness: "frisch"
            },
            {
            name: "Butter",
            unit: "g",
            amount: 10,
            freshness: "verpackt"    
            },
            {
            name: "Milch",
            unit: "ml",
            amount: 50,
            freshness: "verpackt"    
            },
            {
            name: "Paprika",
            unit: "g",
            amount: 100,
            freshness: "frisch"    
            },
            {
            name: "Erbsen",
            unit: "g",
            amount: 100,
            freshness: "frisch"    
            },
            {
            name: "Dosenmais",
            unit: "g",
            amount: 100,
            freshness: "verpackt"    
            }             
        ],
        author:null
        }

        const salat : RecipeDTO=
        {
        id: null,
        name: "Gesunder Salat",
        picture: "Bild",
        rating:null,
        directions: 
        `Zwiebeln und Knoblauch sehr fein würfeln (ich mache alles zusammen in der Küchenmaschine).  Das Hackfleisch kurz anbraten lassen. Dosentomaten zufügen und mit Salz, Pfeffer und Paprika würzen. So lange köcheln lassen, bis eine pastenartige Masse entstanden ist. Soll die Soße flüssiger sein, kann man noch etwas Wein oder Brühe zugeben.

        Die Spaghetti in Salzwasser bissfest kochen und zusammen mit der Soße servieren.
        Wer es etwas pikanter mag, kann zu dieser Soße auch Chili-Bandnudeln essen. Wir finden, dass das auch sehr gut zusammenpasst. `,
        preparationtime: 5,
        cookingtime: 10,
        difficulty: "einfach",
        datePosted:null,
        tags: [
        {
            id: 2
        },
        {
            id: 3
        },
        {
            id: 4
        }
        ],
        online: true,
        ingredients: [
            {
            name: "Kopfsalat",
            unit: "g",
            amount: 200,
            freshness: "frisch"
            },
            {
            name: "Olivenöl",
            unit: "ml",
            amount: 30,
            freshness: "verpackt"    
            },
            {
            name: "Tomaten",
            unit: "g",
            amount: 100,
            freshness: "frisch"    
            },
            {
            name: "Paprika",
            unit: "g",
            amount: 100,
            freshness: "frisch"    
            },
            {
            name: "Gurke(n)",
            unit: "",
            amount: 1,
            freshness: "frisch"    
            },
            {
            name: "Dosenmais",
            unit: "g",
            amount: 100,
            freshness: "verpackt"    
            }             
        ],
        author:null
        }

        const lauchsuppe : RecipeDTO=
        {
        id: null,
        name: "Einfache Lauchsuppe",
        picture: "Bild",
        rating:null,
        directions: 
        `Zwiebeln und Knoblauch sehr fein würfeln (ich mache alles zusammen in der Küchenmaschine).  Das Hackfleisch kurz anbraten lassen. Dosentomaten zufügen und mit Salz, Pfeffer und Paprika würzen. So lange köcheln lassen, bis eine pastenartige Masse entstanden ist. Soll die Soße flüssiger sein, kann man noch etwas Wein oder Brühe zugeben.

        Die Spaghetti in Salzwasser bissfest kochen und zusammen mit der Soße servieren.
        Wer es etwas pikanter mag, kann zu dieser Soße auch Chili-Bandnudeln essen. Wir finden, dass das auch sehr gut zusammenpasst. `,
        preparationtime: 5,
        cookingtime: 15,
        difficulty: "einfach",
        datePosted:null,
        tags: [
        {
            id: 2
        },
        {
            id: 3
        }
        ],
        online: true,
        ingredients: [
            {
            name: "Poree",
            unit: "",
            amount: 2,
            freshness: "frisch"
            },
            {
            name: "Zwiebel(n)",
            unit: "",
            amount: 1,
            freshness: "verpackt"    
            },
            {
            name: "Hackfleisch",
            unit: "g",
            amount: 400,
            freshness: "verpackt"    
            },
            {
            name: "Sahne",
            unit: "ml",
            amount: 200,
            freshness: "verpackt"    
            },
            {
            name: "Schmelzkäse",
            unit: "g",
            amount: 200,
            freshness: "verpackt"    
            },
            {
            name: "Gemüsebrühe",
            unit: "ml",
            amount: 500,
            freshness: "verpackt"    
            }             
        ],
        author:null
        }


        await service.addRecipe(userId,lasagne);
        await service.addRecipe(userId,gebratenerReis);
        await service.addRecipe(userId,spaghettiBolognese);
        await service.addRecipe(userId,buttterBrot);
        await service.addRecipe(userId,kartoffelbrei);
        await service.addRecipe(userId,salat);
        await service.addRecipe(userId,lauchsuppe);

    }

    async createRatings(userId: number,recipeId: number){
        const service = new RecipeService();


        const rating = await service.addRating(userId, recipeId,);
        await rating.save();
  
    }
 

    async createNew(){
        await this.createTags();
        await this.createSupermarkets();
        await this.createUsers();
    }


}