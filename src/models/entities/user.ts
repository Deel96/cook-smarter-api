import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, ManyToMany, JoinTable, OneToOne} from "typeorm";
import {Foodplan} from "./foodplan";
import {Recipe} from "./recipe";
import {Rating} from "./rating";
import {Comment} from "./comment"

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique:true})
    username: string;

    @Column({unique:true})
    email: string;

    @Column()
    password: string;

    @Column({default:1})
    servingsize: number;

    @Column({default:"Montag"})
    planday: string;

    @OneToOne(type => Foodplan, foodplan => foodplan.user)
    foodplan: Foodplan;

    @OneToMany(()=> Rating, rating=>rating.author)
    createdRatings: Rating[];

    @OneToMany(()=> Comment, comment=>comment.author)
    createdComments: Comment[];

    @OneToMany(()=> Recipe, recipe=>recipe.author,{ cascade: true })
    createdRecipes: Recipe[];

    @ManyToMany(()=>Recipe)
    @JoinTable()
    likedRecipes: Recipe[];
}