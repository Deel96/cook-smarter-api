import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, ManyToOne} from "typeorm";
import {Recipe} from "./recipe";
import {Ingredient} from "./ingredient";

@Entity()
export class IngredientEntry extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    unit: string;

    @Column()
    amount: number;

    @Column()
    freshness: number;

    @OneToMany(()=>Recipe, recipe => recipe.ingredients)
    recipe: Recipe;

    @ManyToOne(()=>Ingredient, ingredient=>ingredient.ingrediententries)
    ingredient: Ingredient;
}