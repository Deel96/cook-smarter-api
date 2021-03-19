import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, ManyToMany, JoinTable} from "typeorm";
import {Foodplan} from "./foodplan";
import {Recipe} from "./recipe";
import {Rating} from "./rating";
import {Comment} from "./comment"

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    servingsize: number;

    @Column()
    planday: string;

    @OneToMany(type => Foodplan, foodplan => foodplan.user)
    foodplans: Foodplan[];

    @OneToMany(()=> Rating, rating=>rating.author)
    createdRatings: Rating[];

    @OneToMany(()=> Comment, comment=>comment.author)
    createdComments: Comment[];

    @OneToMany(()=> Recipe, recipe=>recipe.author)
    createdRecipes: Recipe[];

    @ManyToMany(()=>Recipe)
    @JoinTable()
    likedRecipes: Recipe[];
}