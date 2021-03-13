import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany, JoinTable, ManyToOne} from "typeorm";
import {Tag} from "./tag";
import {User} from "./user";

@Entity()
export class Foodplan extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:"date"})
    foodplan_start: Date;

    @Column({type:"date"})
    foodplan_end: Date;

    @ManyToOne(type => User, user => user.foodplans) user: User;
}