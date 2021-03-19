import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany, JoinTable, OneToMany, ManyToOne} from "typeorm";
import {Tag} from "./tag";
import {IngredientEntry} from "./ingredientEntry";
import {User} from "./user";
import {Rating} from "./rating";
import {Comment} from "./comment";

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
    difficulty: string;

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

    @OneToMany(()=>Comment, comment => comment.recipe)
    comments: Comment[];

    @OneToMany(()=>Rating, rating => rating.recipe)
    ratings: Rating[];


}