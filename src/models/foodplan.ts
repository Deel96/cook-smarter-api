import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany, JoinTable, ManyToOne, OneToMany} from "typeorm";
import {User} from "./user";
import {Grocerylist} from "./grocerylist";
import {Cookday} from "./cookday";

@Entity()
export class Foodplan extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:"date"})
    foodplan_start: Date;

    @Column({type:"date"})
    foodplan_end: Date;

    @ManyToOne(type => User, user => user.foodplans)
    user: User;

    @OneToMany(()=>Grocerylist,grocerylist=>grocerylist.foodplan)
    grocerylists: Grocerylist[];

    @OneToMany(()=>Cookday,cookday=>cookday.foodplan)
    cookdays: Cookday[];
}