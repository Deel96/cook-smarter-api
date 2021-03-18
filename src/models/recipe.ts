import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany, JoinTable, OneToMany, ManyToOne} from "typeorm";
import {Tag} from "./tag";
import {IngredientEntry} from "./ingredientEntry";
import {User} from "./user";
import {Cookday} from "./cookday";

@Entity()
export class Recipe extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    directions: string;

    @Column()
    preparationtime: number;

    @Column()
    cookingtime: number;

    @Column()
    difficulty: number;

    @Column({type:"date"})
    datePosted: string;

    @Column()
    online: boolean;

    @Column({type:"longtext"})
    picture: string;

    @ManyToOne(()=>User,user => user.createdRecipes)
    author:User;

    @ManyToMany(type => Tag)
    @JoinTable()
    tags: Tag[];

    @OneToMany(()=>IngredientEntry, ingredientEntry => ingredientEntry.recipe)
    ingredients: IngredientEntry[];

    @ManyToOne(()=>Cookday,cookday => cookday.recipes)
    cookday:Cookday;


}