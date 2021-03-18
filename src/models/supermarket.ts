import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne} from "typeorm";
import {Grocerylist} from "./grocerylist";

@Entity()
export class Supermarket extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(()=>Grocerylist, grocerylist => grocerylist.supermarket)
    grocerylists : Grocerylist[];
}