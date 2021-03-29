import {Entity, PrimaryGeneratedColumn, BaseEntity, ManyToOne, OneToMany} from "typeorm";
import {GroceryEntry} from "./groceryEntry";
import {Supermarket} from "./supermarket";
import {Foodplan} from "./foodplan";

@Entity()
export class Grocerylist extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(()=>GroceryEntry, groceryentry => groceryentry.grocerylist,{onDelete: 'CASCADE', cascade: true })
    entries:GroceryEntry[]

    @ManyToOne(()=>Supermarket,supermarket => supermarket.grocerylists)
    supermarket: Supermarket;

    @ManyToOne(()=>Foodplan,foodplan=> foodplan.grocerylists)
    foodplan: Foodplan;
}