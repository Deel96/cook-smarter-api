import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, ManyToMany, JoinTable} from "typeorm";
import {Foodplan} from "./foodplan";
import {Recipe} from "./recipe";

@Entity()
export class Cookday extends BaseEntity {
    constructor() {
        super();
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    day: Date;

    @ManyToOne(() => Foodplan, foodplan => foodplan.cookdays)
    foodplan: Foodplan;


    @ManyToMany(type=>Recipe)
    @JoinTable()
    recipes:Recipe[];


}