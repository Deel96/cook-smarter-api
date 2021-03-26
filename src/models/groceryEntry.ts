import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne} from "typeorm";
import {Ingredient} from "./ingredient";
import {Grocerylist} from "./grocerylist";

@Entity()
export class GroceryEntry extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    unit: string;

    @Column()
    amount: number;

    @Column()
    freshness: string;

    @Column()
    checked: boolean;
    
    @Column()
    name:string;
    // @ManyToOne(()=>Ingredient, ingredient=>ingredient.groceryentries)
    // ingredient: Ingredient;

    @ManyToOne(()=>Grocerylist, grocerylist=>grocerylist.entries)
    grocerylist: Grocerylist;
}