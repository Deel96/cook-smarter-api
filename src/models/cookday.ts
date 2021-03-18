import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany} from "typeorm";
import {Foodplan} from "./foodplan";
import {Recipe} from "./recipe";

@Entity()
export class Cookday extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "date"})
    day: Date;

    @ManyToOne(() => Foodplan, foodplan => foodplan.cookdays)
    foodplan: Foodplan;

    @OneToMany(() => Recipe, recipe => recipe.cookday)
    recipes: Recipe[];

}