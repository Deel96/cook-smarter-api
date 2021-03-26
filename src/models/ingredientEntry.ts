import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, ManyToOne} from "typeorm";
import {Recipe} from "./recipe";
//import {Ingredient} from "./ingredient";

@Entity()
export class IngredientEntry extends BaseEntity {

    constructor(name?:string){
        super();
        this.name = name;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    unit: string;

    @Column()
    amount: number;

    @Column()
    freshness: string;

    @ManyToOne(()=>Recipe, recipe => recipe.ingredients,{onDelete: 'CASCADE'})
    recipe: Recipe;

    @Column()
    name:string;
    // @ManyToOne(()=>Ingredient, ingredient=>ingredient.ingrediententries,{onDelete: 'CASCADE'})
    // ingredient: Ingredient;
}