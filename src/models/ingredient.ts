// import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, ManyToOne} from "typeorm";
// import {IngredientEntry} from "./ingredientEntry";
// import {GroceryEntry} from "./groceryEntry";

// @Entity()
// export class Ingredient extends BaseEntity {

//     constructor(name:string){
//         super();
//         this,name= name;
//     }

//     @PrimaryGeneratedColumn()
//     id: number;

//     @Column()
//     name: string;

//     @OneToMany(()=>IngredientEntry,ingredientEntry => ingredientEntry.ingredient)
//     ingrediententries : IngredientEntry[];

//     @OneToMany(()=>GroceryEntry,groceryEntry => groceryEntry.ingredient)
//     groceryentries : GroceryEntry[];
// }

